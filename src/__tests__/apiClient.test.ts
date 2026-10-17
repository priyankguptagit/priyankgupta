import { submitInquiry } from '@/lib/apiClient';
import { inquirySchema } from '@/lib/inquiry-contract';
const input = inquirySchema.parse({ fullName: 'Example Person', email: 'person@example.org', category: 'General Professional Query', subject: 'Architecture question', message: 'A practical question about application architecture.', consent: true });
afterEach(() => { jest.useRealTimers(); jest.restoreAllMocks(); });
it('does not silently accept malformed success responses', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: true }) });
  expect((await submitInquiry(input)).ok).toBe(false);
});
it('shows the requested confirmation for a successful submission', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 201,
    json: async () => ({
      success: true,
      data: { referenceId: '123e4567-e89b-42d3-a456-426614174000' },
      requestId: '123e4567-e89b-42d3-a456-426614174000',
    }),
  });
  expect((await submitInquiry(input)).message).toContain(
    'Your request has been received.'
  );
});
it('explains when a record was saved but its notification email failed', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 503,
    json: async () => ({
      success: false,
      recordSubmitted: true,
      data: { referenceId: '123e4567-e89b-42d3-a456-426614174000' },
    }),
  });
  const result = await submitInquiry(input);
  expect(result.ok).toBe(false);
  expect(result.recordSubmitted).toBe(true);
  expect(result.message).toContain('request was received and saved');
  expect(result.message).toContain('Please do not submit it again');
});
it('handles invalid JSON safely', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 502, json: async () => { throw new Error('invalid JSON'); } });
  expect((await submitInquiry(input)).message).toMatch(/try again later/);
});
it('maps rate limits without rendering raw backend messages', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 429, json: async () => ({ message: 'private error' }) });
  expect((await submitInquiry(input)).message).toBe('Too many requests. Please try again later.');
});
it('aborts a stalled request', async () => {
  jest.useFakeTimers();
  global.fetch = jest.fn((_url, init) => new Promise((_resolve, reject) => init?.signal?.addEventListener('abort', () => reject(new Error('abort'))))) as typeof fetch;
  const pending = submitInquiry(input);
  await jest.advanceTimersByTimeAsync(12000);
  expect((await pending).message).toMatch(/timed out/);
});