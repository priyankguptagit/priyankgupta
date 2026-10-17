import { randomUUID } from 'node:crypto';
import {
  inquiryFailureResponseSchema,
  inquirySchema,
  inquirySuccessResponseSchema,
  validationErrors,
} from '@/lib/inquiry-contract';

const maximumBodyBytes = 16 * 1024;
const upstreamTimeoutMs = 12_000;

function jsonResponse(body: unknown, status: number): Response {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function upstreamUrl(): URL | null {
  const configuredBase = process.env.INQUIRY_API_BASE_URL?.trim();
  if (!configuredBase) return null;

  try {
    const url = new URL(configuredBase);
    const isLocalDevelopment =
      process.env.NODE_ENV !== 'production' &&
      url.protocol === 'http:' &&
      ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
    if (
      (url.protocol !== 'https:' && !isLocalDevelopment) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    ) {
      return null;
    }

    url.pathname = `${url.pathname.replace(/\/+$/, '')}/inquiries`;
    return url;
  } catch {
    return null;
  }
}

async function readJson(
  request: Request
): Promise<{ ok: true; body: unknown } | { ok: false; status: 400 | 413 }> {
  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > maximumBodyBytes) {
    return { ok: false, status: 413 };
  }

  const reader = request.body?.getReader();
  if (!reader) return { ok: false, status: 400 };

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maximumBodyBytes) {
        await reader.cancel();
        return { ok: false, status: 413 };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, status: 400 };
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return { ok: true, body: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch {
    return { ok: false, status: 400 };
  }
}

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse({ success: false, requestId: randomUUID() }, 403);
  }
  if (
    request.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase() !==
    'application/json'
  ) {
    return jsonResponse({ success: false, requestId: randomUUID() }, 415);
  }

  const parsedBody = await readJson(request);
  if (!parsedBody.ok) {
    return jsonResponse({ success: false, requestId: randomUUID() }, parsedBody.status);
  }

  const parsedInquiry = inquirySchema.safeParse(parsedBody.body);
  if (!parsedInquiry.success) {
    return jsonResponse(
      {
        success: false,
        requestId: randomUUID(),
        errors: validationErrors(parsedInquiry.error),
      },
      400
    );
  }

  const target = upstreamUrl();
  if (!target) {
    return jsonResponse({ success: false, requestId: randomUUID() }, 503);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), upstreamTimeoutMs);
  try {
    const upstream = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedInquiry.data),
      cache: 'no-store',
      signal: controller.signal,
    });
    const body: unknown = await upstream.json().catch(() => null);
    const success = inquirySuccessResponseSchema.safeParse(body);
    if (upstream.ok && success.success) {
      return jsonResponse(success.data, 200);
    }

    const failure = inquiryFailureResponseSchema.safeParse(body);
    if (failure.success) {
      return jsonResponse(
        {
          ...failure.data,
          requestId: failure.data.requestId || randomUUID(),
          errors: failure.data.errors?.map(({ field }) => ({
            field,
            message: 'Please review this field.',
          })),
        },
        upstream.ok ? 502 : upstream.status
      );
    }

    return jsonResponse(
      { success: false, requestId: randomUUID() },
      upstream.status === 429 ? 429 : 502
    );
  } catch {
    return jsonResponse(
      { success: false, requestId: randomUUID() },
      controller.signal.aborted ? 504 : 502
    );
  } finally {
    clearTimeout(timeout);
  }
}
