import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/layout/Header';
import { waitFor } from '@testing-library/react';

jest.mock('next/navigation', () => ({ usePathname: () => '/expertise' }));

it('marks the active page and exposes all required navigation', async () => {
  const user = userEvent.setup();
  render(<Header />);
  await user.click(screen.getByRole('button', { name: 'More' }));
  expect(screen.getByRole('link', { name: 'Expertise' })).toHaveAttribute(
    'aria-current',
    'page'
  );
  expect(screen.queryByRole('link', { name: 'Education' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Resume' })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Learning Resources' })).toHaveAttribute(
    'href',
    '/resources'
  );
  expect(screen.getByRole('link', { name: 'Knowledge Sharing' })).toHaveAttribute(
    'href',
    '/knowledge-sharing'
  );
  expect(screen.getByRole('link', { name: 'Invite Me' })).toHaveAttribute(
    'href',
    '/contact?category=Seminar%20Request'
  );
});
it('shows and sends the local test email only when enabled', async () => {
  const user = userEvent.setup();
  const fetchMock = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      success: true,
      message: 'Test email sent to priyankguptagwalior@gmail.com.',
    }),
  });
  global.fetch = fetchMock;
  const { unmount } = render(<Header />);
  expect(
    screen.queryByRole('button', { name: 'Send test email' })
  ).not.toBeInTheDocument();
  unmount();

  render(<Header showTestEmailButton />);
  const button = screen.getByRole('button', { name: 'Send test email' });
  await user.click(button);

  expect(fetchMock).toHaveBeenCalledWith(
    '/api/test-email',
    expect.objectContaining({ method: 'POST', credentials: 'same-origin' })
  );
  await waitFor(() =>
    expect(screen.getByRole('status')).toHaveTextContent(
      'Test email sent to priyankguptagwalior@gmail.com.'
    )
  );
});
it('toggles mobile navigation and returns focus on Escape', async () => {
  const user = userEvent.setup();
  render(<Header />);
  const toggle = screen.getByRole('button', { name: 'Open main menu' });
  await user.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('navigation', { name: 'Mobile primary' })).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Invite Me for a Free Session' })
  ).toHaveAttribute('href', '/contact?category=Seminar%20Request');
  await user.keyboard('{Escape}');
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveFocus();
});
it('locks scrolling while open and restores it after an outside click', async () => {
  const user = userEvent.setup();
  document.body.style.overflow = 'auto';
  render(<Header />);
  await user.click(screen.getByRole('button', { name: 'Open main menu' }));
  expect(document.body.style.overflow).toBe('hidden');
  await user.click(document.body);
  expect(document.body.style.overflow).toBe('auto');
  expect(
    screen.queryByRole('navigation', { name: 'Mobile primary' })
  ).not.toBeInTheDocument();
  document.body.style.overflow = '';
});
it('restores scrolling when the header unmounts', async () => {
  const user = userEvent.setup();
  const { unmount } = render(<Header />);
  await user.click(screen.getByRole('button', { name: 'Open main menu' }));
  unmount();
  expect(document.body.style.overflow).toBe('');
});
