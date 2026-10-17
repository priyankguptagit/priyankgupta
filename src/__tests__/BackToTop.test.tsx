import { fireEvent, render, screen } from '@testing-library/react';
import { BackToTop } from '@/components/layout/BackToTop';

it('shows a fixed back-to-top control only after scrolling down', () => {
  let scrollY = 0;
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    get: () => scrollY,
  });

  render(<BackToTop />);

  expect(screen.queryByRole('button', { name: 'Back to top' })).not.toBeInTheDocument();

  scrollY = 100;
  fireEvent.scroll(window);

  const button = screen.getByRole('button', { name: 'Back to top' });
  expect(button).toHaveClass('fixed', 'right-4', 'bottom-4');

  scrollY = 0;
  fireEvent.scroll(window);
  expect(screen.queryByRole('button', { name: 'Back to top' })).not.toBeInTheDocument();
});
