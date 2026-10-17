import { render, screen } from '@testing-library/react';
import ResumePage from '@/app/resume/page';

it('renders a structured resume and offers the supplied PDF as a download', () => {
  render(<ResumePage />);

  expect(
    screen.getByRole('heading', { level: 1, name: 'Dr. Priyank Gupta' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Professional experience' })
  ).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Education' })).not.toBeInTheDocument();

  const downloadLink = screen.getByRole('link', { name: 'Download résumé (PDF)' });
  expect(downloadLink).toHaveAttribute('href', '/Priyank-Gupta-Resume-2026.pdf');
  expect(downloadLink).toHaveAttribute('download', 'Priyank-Gupta-Resume-2026.pdf');
});
