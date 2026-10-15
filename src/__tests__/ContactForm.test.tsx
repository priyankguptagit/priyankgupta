import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/forms/ContactForm';

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
  await user.type(
    screen.getByLabelText(/^Message or Additional Details/),
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
  await user.click(screen.getByRole('button', { name: 'Send request' }));
  expect(global.fetch).not.toHaveBeenCalled();
  expect(screen.getByLabelText(/^Full Name/)).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByLabelText(/^Full Name/)).toHaveFocus();
  await user.click(
    screen.getByRole('button', { name: /Full Name: Enter your full name/ })
  );
  expect(screen.getByLabelText(/^Full Name/)).toHaveFocus();
});
it('submits normalized data to the separate REST API and announces success', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  await fillRequired(user);
  await user.click(screen.getByRole('button', { name: 'Send request' }));
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(reference));
  expect(global.fetch).toHaveBeenCalledWith(
    'http://localhost:5000/api/v1/inquiries',
    expect.objectContaining({ credentials: 'omit', method: 'POST' })
  );
  expect(screen.getByLabelText(/^Full Name/)).toHaveValue('');
});
it('requires conditional event/audience fields and supports offline requests', async () => {
  const user = userEvent.setup();
  render(<ContactForm initialCategory="Workshop Request" />);
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
  await user.type(screen.getByLabelText(/^Proposed Topic/), 'Next.js fundamentals');
  await user.type(screen.getByLabelText(/^Expected Number of Participants/), '20');
  await user.click(screen.getByRole('button', { name: 'Send request' }));
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(reference));
  const fetchMock = global.fetch as jest.Mock;
  expect(JSON.parse(fetchMock.mock.calls[0]?.[1].body)).toMatchObject({
    audienceCategory: 'Other',
    expectedParticipants: 20,
    preferredMode: 'Offline',
    source: 'session-request',
  });
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
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/could not/));
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
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(reference));
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
