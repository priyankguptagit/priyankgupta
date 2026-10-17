import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/forms/ContactForm';
import { topicNames } from '@/content/session-topics';

const reference = '123e4567-e89b-42d3-a456-426614174000';
const success = { success: true, data: { referenceId: reference }, requestId: reference };
function mockResponse(body: unknown = success, status = 201) {
  const fetchMock = jest
    .fn()
    .mockResolvedValue({ ok: status < 400, status, json: async () => body });
  global.fetch = fetchMock;
  return fetchMock;
}
async function fillRequired(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Full Name/), 'Example Person');
  await user.type(screen.getByLabelText(/^Email Address/), 'person@example.org');
  const subject = screen.queryByLabelText(/^Subject/);
  if (subject) await user.type(subject, 'Software architecture question');
  await user.type(
    screen.getByLabelText(/^Audience, Learning Objectives, and Additional Details/),
    'Please discuss a practical software architecture question.'
  );
  await user.click(screen.getByRole('checkbox'));
}

beforeEach(() => {
  mockResponse();
});
afterEach(() => {
  jest.restoreAllMocks();
});
it('validates required fields, focuses the first invalid control and links errors', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  expect(screen.getByRole('group', { name: 'Your contact details' })).toBeInTheDocument();
  expect(screen.getByRole('group', { name: 'Request details' })).toBeInTheDocument();
  expect(screen.getByRole('group', { name: 'Additional details' })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Send request' }));
  expect(global.fetch).not.toHaveBeenCalled();
  expect(screen.getByLabelText(/^Full Name/)).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByLabelText(/^Full Name/)).toHaveFocus();
  await user.click(
    screen.getByRole('button', { name: /Full Name: Enter your full name/ })
  );
  expect(screen.getByLabelText(/^Full Name/)).toHaveFocus();
});
it('requires a subject for general enquiries', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  await user.type(screen.getByLabelText(/^Full Name/), 'Example Person');
  await user.type(screen.getByLabelText(/^Email Address/), 'person@example.org');
  await user.type(
    screen.getByLabelText(/^Audience, Learning Objectives, and Additional Details/),
    'Please discuss a practical software architecture question.'
  );
  await user.click(screen.getByRole('checkbox'));
  await user.click(screen.getByRole('button', { name: 'Send request' }));

  expect(global.fetch).not.toHaveBeenCalled();
  expect(screen.getByLabelText(/^Subject/)).toHaveAttribute('aria-invalid', 'true');
});
it('submits normalized data to the same-origin API route and announces success', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  await fillRequired(user);
  await user.click(screen.getByRole('button', { name: 'Send request' }));
  await waitFor(() =>
    expect(screen.getByRole('status')).toHaveTextContent(
      'Your request has been received.'
    )
  );
  expect(global.fetch).toHaveBeenCalledWith(
    '/api/inquiries',
    expect.objectContaining({ credentials: 'omit', method: 'POST' })
  );
  expect(screen.getByLabelText(/^Full Name/)).toHaveValue('');
});
it('requires conditional event/audience fields and supports offline requests', async () => {
  const user = userEvent.setup();
  render(<ContactForm initialCategory="Workshop Request" />);
  expect(screen.getByRole('group', { name: 'Session logistics' })).toBeInTheDocument();
  await fillRequired(user);
  await user.click(screen.getByRole('button', { name: 'Send request' }));
  expect(global.fetch).not.toHaveBeenCalled();
  await user.selectOptions(screen.getByLabelText(/^Event Type/), 'Workshop');
  await user.selectOptions(screen.getByLabelText(/^Audience Category/), 'Other');
  await user.type(
    screen.getByLabelText(/^Other Audience Description/),
    'Community learners'
  );
  await user.selectOptions(screen.getByLabelText(/^Preferred Delivery Mode/), 'Offline');
  expect(screen.getByLabelText(/^Venue Availability/)).toBeInTheDocument();
  await user.type(
    screen.getByLabelText(/^Organization Website/),
    'https://college.example.edu'
  );
  await user.type(screen.getByLabelText(/^City/), 'Bengaluru');
  await user.type(screen.getByLabelText(/^Country/), 'India');
  fireEvent.change(screen.getByLabelText(/^Preferred Topic/), {
    target: { value: 'Next.js fundamentals' },
  });
  fireEvent.change(screen.getByLabelText(/^Expected Number of Participants/), {
    target: { value: '20' },
  });
  await user.click(screen.getByRole('button', { name: 'Send request' }));
  await waitFor(() =>
    expect(screen.getByRole('status')).toHaveTextContent(
      'Your request has been received.'
    )
  );
  const fetchMock = global.fetch as jest.Mock;
  expect(JSON.parse(fetchMock.mock.calls[0]?.[1].body)).toMatchObject({
    audienceCategory: 'Other',
    expectedParticipants: 20,
    preferredMode: 'Offline',
    organizationWebsite: 'https://college.example.edu',
    source: 'session-request',
  });
}, 15000);
it('prefills topic and session format from a request-topic link', () => {
  render(
    <ContactForm
      initialCategory="Webinar Request"
      initialTopic="AI and machine-learning awareness"
      initialEventType="Webinar"
    />
  );

  expect(screen.getByLabelText(/^Query Category/)).toHaveValue('Webinar Request');
  expect(screen.getByLabelText(/^Event Type/)).toHaveValue('Webinar');
  expect(screen.getByLabelText(/^Preferred Topic/)).toHaveValue(
    'AI and machine-learning awareness'
  );
  expect(document.querySelectorAll('#session-topic-options option')).toHaveLength(
    topicNames.length
  );
});
it('requires an institution for school requests', async () => {
  const user = userEvent.setup();
  render(<ContactForm initialCategory="Seminar Request" />);
  await user.selectOptions(screen.getByLabelText(/^Event Type/), 'Seminar');
  await user.selectOptions(
    screen.getByLabelText(/^Audience Category/),
    'School Students'
  );
  expect(screen.getByLabelText(/^Organization or Institution/)).toBeRequired();
  await fillRequired(user);
  await user.type(screen.getByLabelText(/^Preferred Topic/), 'Technology foundations');
  await user.click(screen.getByRole('button', { name: 'Send request' }));
  expect(global.fetch).not.toHaveBeenCalled();
  expect(screen.getByLabelText(/^Organization or Institution/)).toHaveAttribute(
    'aria-invalid',
    'true'
  );
});
it('preserves input and maps safe backend field errors', async () => {
  mockResponse(
    {
      success: false,
      requestId: reference,
      errors: [{ field: 'email', message: 'Internal text must not be rendered.' }],
    },
    400
  );
  const user = userEvent.setup();
  render(<ContactForm />);
  await fillRequired(user);
  await user.click(screen.getByRole('button', { name: 'Send request' }));
  await waitFor(() =>
    expect(screen.getByLabelText(/^Email Address/)).toHaveAttribute(
      'aria-invalid',
      'true'
    )
  );
  expect(screen.getByLabelText(/^Full Name/)).toHaveValue('Example Person');
  expect(
    screen.queryByText('Internal text must not be rendered.')
  ).not.toBeInTheDocument();
});
it.each(['backend', 'network'])('preserves input after a %s failure', async (kind) => {
  if (kind === 'backend') mockResponse({ success: false }, 503);
  else global.fetch = jest.fn().mockRejectedValue(new Error('private network details'));
  const user = userEvent.setup();
  render(<ContactForm />);
  await fillRequired(user);
  await user.click(screen.getByRole('button', { name: 'Send request' }));
  await waitFor(() =>
    expect(screen.getByRole('status')).toHaveTextContent(
      kind === 'backend' ? /temporarily unavailable/ : /could not reach/
    )
  );
  expect(screen.getByLabelText(/^Full Name/)).toHaveValue('Example Person');
  expect(screen.getByRole('button', { name: 'Send request' })).toBeEnabled();
});
it('prevents duplicate submissions and exposes a loading state', async () => {
  let resolveRequest: (value: unknown) => void = () => undefined;
  global.fetch = jest.fn().mockReturnValue(
    new Promise((resolve) => {
      resolveRequest = resolve;
    })
  );
  const user = userEvent.setup();
  render(<ContactForm />);
  await fillRequired(user);
  const form = screen.getByRole('button', { name: 'Send request' }).closest('form');
  if (!form) throw new Error('Missing form');
  fireEvent.submit(form);
  fireEvent.submit(form);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('button', { name: 'Sending request...' })).toBeDisabled();
  expect(screen.getByLabelText(/^Full Name/)).toBeDisabled();
  expect(screen.getByRole('checkbox')).toBeDisabled();
  resolveRequest({ ok: true, status: 201, json: async () => success });
  await waitFor(() =>
    expect(screen.getByRole('status')).toHaveTextContent(
      'Your request has been received.'
    )
  );
});
it('uses shared phone validation and preserves valid fields', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  await fillRequired(user);
  await user.type(screen.getByLabelText(/^Phone Number/), '+1----');
  await user.click(screen.getByRole('button', { name: 'Send request' }));
  expect(global.fetch).not.toHaveBeenCalled();
  expect(screen.getByLabelText(/^Phone Number/)).toHaveFocus();
  expect(screen.getByLabelText(/^Phone Number/)).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByLabelText(/^Full Name/)).toHaveValue('Example Person');
});
it('keeps the honeypot outside keyboard and accessibility navigation', () => {
  render(<ContactForm />);
  const honeypot = document.querySelector('input[name="website"]');
  expect(honeypot).toHaveAttribute('tabindex', '-1');
  expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull();
});
