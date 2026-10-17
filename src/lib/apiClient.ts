import {
  inquiryFailureResponseSchema,
  inquirySuccessResponseSchema,
  successMessage,
  type FieldError,
  type InquiryInput,
} from '@/lib/inquiry-contract';

export type ApiResult = {
  ok: boolean;
  message: string;
  recordSubmitted?: boolean;
  errors?: FieldError[];
  requestId?: string;
};

export async function submitInquiry(payload: InquiryInput): Promise<ApiResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
      credentials: 'omit',
    });
    const body: unknown = await response.json().catch(() => null);
    const success = inquirySuccessResponseSchema.safeParse(body);
    if (response.ok && success.success) {
      return {
        ok: true,
        message: successMessage,
        requestId: success.data.requestId,
      };
    }

    const failure = inquiryFailureResponseSchema.safeParse(body);
    return {
      ok: false,
      message:
        failure.success && failure.data.recordSubmitted
          ? `Your request was received and saved, but the notification email could not be sent. Please do not submit it again. Reference: ${failure.data.data?.referenceId ?? 'unavailable'}.`
          : response.status === 429
            ? 'Too many requests. Please try again later.'
            : response.status === 400
              ? 'Please correct the highlighted fields.'
              : response.status === 503
                ? 'The inquiry service is not configured or is temporarily unavailable. Please try again later.'
                : 'We could not submit your request. Please try again later.',
      recordSubmitted: failure.success ? failure.data.recordSubmitted : undefined,
      requestId: failure.success ? failure.data.requestId : undefined,
      errors:
        response.status === 400 && failure.success
          ? failure.data.errors
              ?.filter((error) => Object.hasOwn(payload, error.field))
              .map((error) => ({
                field: error.field,
                message: 'Please review this field.',
              }))
          : undefined,
    };
  } catch {
    return {
      ok: false,
      message: controller.signal.aborted
        ? 'The request timed out. Please try again.'
        : 'We could not reach the server. Check your connection and try again.',
    };
  } finally {
    clearTimeout(timeout);
  }
}
