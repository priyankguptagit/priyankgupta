import 'server-only';
import nodemailer from 'nodemailer';

const sender = 'guptapriyank87@gmail.com';
const recipient = 'priyankguptagwalior@gmail.com';
const allowedLocalHosts = new Set(['localhost', '127.0.0.1', '[::1]']);
const smtpHost = 'smtp.gmail.com';
const smtpPort = 465;

export const runtime = 'nodejs';

function jsonResponse(message: string, status: number): Response {
  return Response.json(
    { success: status === 200, message },
    { status, headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url);
  if (
    process.env.NODE_ENV !== 'development' ||
    !allowedLocalHosts.has(requestUrl.hostname)
  ) {
    return jsonResponse('This test email endpoint is only available locally.', 404);
  }

  if (request.headers.get('origin') !== requestUrl.origin) {
    return jsonResponse('The request origin is not allowed.', 403);
  }

  const password = process.env.SMTP_APP_PASSWORD?.replace(/\s/g, '');
  if (
    !password ||
    process.env.SMTP_HOST?.trim() !== smtpHost ||
    process.env.SMTP_PORT?.trim() !== String(smtpPort) ||
    process.env.SMTP_USER?.trim() !== sender ||
    process.env.MAIL_FROM?.trim() !== sender
  ) {
    return jsonResponse(
      'Gmail SMTP is not configured with the expected local account. Check SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_APP_PASSWORD, and MAIL_FROM in .env.local, then restart the development server.',
      503
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: true,
    auth: { user: sender, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  try {
    await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: 'test',
      text: 'hello test',
    });
    return jsonResponse(`Test email sent to ${recipient}.`, 200);
  } catch {
    return jsonResponse(
      'Gmail could not send the test message. Check the local App Password and Gmail account settings.',
      502
    );
  } finally {
    transporter.close();
  }
}
