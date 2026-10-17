/** @jest-environment node */

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { POST } from '@/app/api/test-email/route';

jest.mock('nodemailer', () => ({
  __esModule: true,
  default: { createTransport: jest.fn() },
}));

const originalNodeEnv = process.env.NODE_ENV;
const originalSmtpConfig = {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_APP_PASSWORD: process.env.SMTP_APP_PASSWORD,
  MAIL_FROM: process.env.MAIL_FROM,
};
const sendMail = jest.fn();
const close = jest.fn();

function makeRequest(
  url = 'http://localhost:3000/api/test-email',
  origin = 'http://localhost:3000'
) {
  return new Request(url, {
    method: 'POST',
    headers: { Origin: origin },
  });
}

beforeEach(() => {
  Reflect.set(process.env, 'NODE_ENV', 'development');
  process.env.SMTP_HOST = 'smtp.gmail.com';
  process.env.SMTP_PORT = '465';
  process.env.SMTP_USER = 'guptapriyank87@gmail.com';
  process.env.SMTP_APP_PASSWORD = 'test-app-password';
  process.env.MAIL_FROM = 'guptapriyank87@gmail.com';
  sendMail.mockReset().mockResolvedValue({});
  close.mockReset();
  jest
    .mocked(nodemailer.createTransport)
    .mockReset()
    .mockReturnValue({
      sendMail,
      close,
    } as unknown as Transporter);
});

afterEach(() => {
  if (originalNodeEnv === undefined) Reflect.deleteProperty(process.env, 'NODE_ENV');
  else Reflect.set(process.env, 'NODE_ENV', originalNodeEnv);
  for (const [key, value] of Object.entries(originalSmtpConfig)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

it('does not expose the email endpoint in production', async () => {
  Reflect.set(process.env, 'NODE_ENV', 'production');
  const response = await POST(makeRequest());

  expect(response.status).toBe(404);
  expect(nodemailer.createTransport).not.toHaveBeenCalled();
});

it('only accepts loopback hosts and the matching request origin', async () => {
  const remoteHostResponse = await POST(
    makeRequest('https://example.com/api/test-email', 'https://example.com')
  );
  expect(remoteHostResponse.status).toBe(404);

  const mismatchedOriginResponse = await POST(
    makeRequest('http://localhost:3000/api/test-email', 'https://attacker.example')
  );
  expect(mismatchedOriginResponse.status).toBe(403);
  expect(nodemailer.createTransport).not.toHaveBeenCalled();
});

it('explains when the local Gmail App Password is not configured', async () => {
  delete process.env.SMTP_APP_PASSWORD;
  const response = await POST(makeRequest());

  expect(response.status).toBe(503);
  expect((await response.json()).message).toContain('SMTP_APP_PASSWORD');
});

it('sends only the static test message using the configured Gmail account', async () => {
  process.env.SMTP_APP_PASSWORD = 'abcd efgh ijkl mnop';
  const response = await POST(makeRequest());

  expect(response.status).toBe(200);
  expect(nodemailer.createTransport).toHaveBeenCalledWith(
    expect.objectContaining({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'guptapriyank87@gmail.com',
        pass: 'abcdefghijklmnop',
      },
    })
  );
  expect(sendMail).toHaveBeenCalledWith({
    from: 'guptapriyank87@gmail.com',
    to: 'priyankguptagwalior@gmail.com',
    subject: 'test',
    text: 'hello test',
  });
  expect(close).toHaveBeenCalledTimes(1);
  expect((await response.json()).message).toContain('priyankguptagwalior@gmail.com');
});

it('returns a safe error when Gmail SMTP rejects the message', async () => {
  sendMail.mockRejectedValue(new Error('private SMTP credentials or server details'));
  const response = await POST(makeRequest());
  const body = await response.json();

  expect(response.status).toBe(502);
  expect(body.success).toBe(false);
  expect(JSON.stringify(body)).not.toContain('private SMTP');
  expect(close).toHaveBeenCalledTimes(1);
});
