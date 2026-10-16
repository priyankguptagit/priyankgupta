import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/layout/Header';

jest.mock('next/navigation', () => ({ usePathname: () => '/expertise' }));

it('marks the active page and exposes all required navigation', async () => {
  const user = userEvent.setup();
  render(<Header />);
  await user.click(screen.getByRole('button', { name: 'More' }));
  expect(screen.getByRole('link', { name: 'Expertise' })).toHaveAttribute(
    'aria-current',
    'page'
  );
  expect(screen.getByRole('link', { name: 'Education' })).toHaveAttribute(
    'href',
    '/education'
  );
});
it('toggles mobile navigation and returns focus on Escape', async () => {
  const user = userEvent.setup();
  render(<Header />);
  const toggle = screen.getByRole('button', { name: 'Open main menu' });
  await user.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('navigation', { name: 'Mobile primary' })).toBeInTheDocument();
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
