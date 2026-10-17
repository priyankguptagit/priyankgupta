/** @jest-environment node */

import { POST } from '@/app/api/inquiries/route';
import { inquirySchema } from '@/lib/inquiry-contract';

const referenceId = '123e4567-e89b-42d3-a456-426614174000';
const inquiry = {
  fullName: 'Example Person',
  email: 'person@example.org',
  category: 'General Professional Query',
  subject: 'Architecture question',
  message: 'A practical question about application architecture.',
  consent: true,
};
const originalBaseUrl = process.env.INQUIRY_API_BASE_URL;
const originalFetch = global.fetch;

function makeRequest(
  body: unknown,
  headers: Record<string, string> = { 'Content-Type': 'application/json' }
) {
  return new Request('http://localhost/api/inquiries', {
    method: 'POST',
    headers,
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

function successResponse() {
  return Response.json({
    success: true,
    data: { referenceId },
    requestId: referenceId,
  });
}

beforeEach(() => {
  process.env.INQUIRY_API_BASE_URL = 'http://localhost:5000/api/v1';
});

afterEach(() => {
  if (originalBaseUrl === undefined) delete process.env.INQUIRY_API_BASE_URL;
  else process.env.INQUIRY_API_BASE_URL = originalBaseUrl;
  global.fetch = originalFetch;
  jest.useRealTimers();
});

it('rejects cross-origin requests before forwarding them', async () => {
  const response = await POST(
    makeRequest(inquiry, {
      'Content-Type': 'application/json',
      Origin: 'https://attacker.example',
    })
  );

  expect(response.status).toBe(403);
  expect(global.fetch).toBe(originalFetch);
});

it('rejects unsupported content types and oversized request bodies', async () => {
  const contentTypeResponse = await POST(
    makeRequest(inquiry, { 'Content-Type': 'text/plain' })
  );
  expect(contentTypeResponse.status).toBe(415);

  const oversizedResponse = await POST(
    makeRequest('x', {
      'Content-Type': 'application/json',
      'Content-Length': String(16 * 1024 + 1),
    })
  );
  expect(oversizedResponse.status).toBe(413);
});

it('accepts a case-insensitive JSON content type', async () => {
  global.fetch = jest.fn().mockResolvedValue(successResponse()) as typeof fetch;
  const response = await POST(
    makeRequest(inquiry, {
      'Content-Type': 'Application/JSON; charset=utf-8',
    })
  );

  expect(response.status).toBe(200);
});

it('validates inquiry data on the server before forwarding', async () => {
  const response = await POST(makeRequest({ ...inquiry, message: '' }));
  const body = await response.json();

  expect(response.status).toBe(400);
  expect(body.errors).toEqual(
    expect.arrayContaining([expect.objectContaining({ field: 'message' })])
  );
  expect(global.fetch).toBe(originalFetch);
});

it('returns an explicit unavailable response when no upstream is configured', async () => {
  delete process.env.INQUIRY_API_BASE_URL;
  const response = await POST(makeRequest(inquiry));

  expect(response.status).toBe(503);
  expect((await response.json()).success).toBe(false);
});

it('does not allow an insecure remote upstream URL', async () => {
  process.env.INQUIRY_API_BASE_URL = 'http://api.example.org/api/v1';
  const response = await POST(makeRequest(inquiry));

  expect(response.status).toBe(503);
  expect(global.fetch).toBe(originalFetch);
});

it('forwards validated data to the configured inquiry service', async () => {
  const fetchMock = jest.fn().mockResolvedValue(successResponse());
  global.fetch = fetchMock as typeof fetch;
  const response = await POST(makeRequest(inquiry));

  expect(response.status).toBe(200);
  expect(fetchMock).toHaveBeenCalledWith(
    new URL('http://localhost:5000/api/v1/inquiries'),
    expect.objectContaining({
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify(inquirySchema.parse(inquiry)),
    })
  );
  expect((await response.json()).success).toBe(true);
});

it('sanitizes upstream field errors before returning them', async () => {
  global.fetch = jest.fn().mockResolvedValue(
    Response.json(
      {
        success: false,
        requestId: referenceId,
        errors: [{ field: 'email', message: 'private upstream details' }],
      },
      { status: 400 }
    )
  ) as typeof fetch;
  const response = await POST(makeRequest(inquiry));
  const body = await response.json();

  expect(response.status).toBe(400);
  expect(body.errors).toEqual([{ field: 'email', message: 'Please review this field.' }]);
  expect(JSON.stringify(body)).not.toContain('private upstream details');
});

it('maps upstream failures with invalid response bodies to a safe gateway error', async () => {
  global.fetch = jest
    .fn()
    .mockResolvedValue(
      Response.json({ message: 'private upstream details' }, { status: 500 })
    ) as typeof fetch;
  const response = await POST(makeRequest(inquiry));
  const body = await response.json();

  expect(response.status).toBe(502);
  expect(body.success).toBe(false);
  expect(JSON.stringify(body)).not.toContain('private upstream details');
});

it('returns a gateway timeout when the upstream does not respond in time', async () => {
  jest.useFakeTimers();
  global.fetch = jest.fn(
    (_input, init) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new Error('aborted')));
      })
  ) as typeof fetch;

  const pendingResponse = POST(makeRequest(inquiry));
  await jest.advanceTimersByTimeAsync(12_000);
  const response = await pendingResponse;

  expect(response.status).toBe(504);
  expect((await response.json()).success).toBe(false);
});
