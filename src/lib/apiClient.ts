import { z } from 'zod';
import {
  successMessage,
  type FieldError,
  type InquiryInput,
} from '@/lib/inquiry-contract';

const successSchema = z.object({ success: z.literal(true), data: z.object({ referenceId: z.string().uuid() }), requestId: z.string().uuid() });
const failureSchema = z.object({
  success: z.literal(false),
  requestId: z.string().uuid().optional(),
  recordSubmitted: z.boolean().optional(),
  data: z.object({ referenceId: z.string().uuid() }).optional(),
  errors: z.array(z.object({ field: z.string().max(100), message: z.string().max(300) })).max(40).optional(),
});
export type ApiResult = { ok: boolean; message: string; recordSubmitted?: boolean; errors?: FieldError[]; requestId?: string };

export async function submitInquiry(payload: InquiryInput): Promise<ApiResult> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/api/v1');
  if (!base) return { ok: false, message: 'The inquiry service is not configured yet. Please try again later.' };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(`${base.replace(/\/$/, '')}/inquiries`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload), signal: controller.signal, credentials: 'omit',
    });
    const body: unknown = await response.json().catch(() => null);
    const success = successSchema.safeParse(body);
    if (response.ok && success.success) return { ok: true, message: successMessage, requestId: success.data.requestId };
    const failure = failureSchema.safeParse(body);
    return {
      ok: false,
      message: failure.success && failure.data.recordSubmitted
        ? `Record submitted, but the notification email could not be sent. Please do not submit it again. Reference: ${failure.data.data?.referenceId ?? 'unavailable'}.`
        : response.status === 429 ? 'Too many requests. Please try again later.' : response.status === 400 ? 'Please correct the highlighted fields.' : 'We could not submit your request. Please try again later.',
      recordSubmitted: failure.success ? failure.data.recordSubmitted : undefined,
      requestId: failure.success ? failure.data.requestId : undefined,
      errors: response.status === 400 && failure.success ? failure.data.errors?.filter(error => Object.hasOwn(payload, error.field)).map(error => ({ field: error.field, message: 'Please review this field.' })) : undefined,
    };
  } catch {
    return { ok: false, message: controller.signal.aborted ? 'The request timed out. Please try again.' : 'We could not reach the server. Check your connection and try again.' };
  } finally { clearTimeout(timeout); }
}