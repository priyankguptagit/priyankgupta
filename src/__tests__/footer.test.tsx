import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';
import { footerMap } from '@/content/site';

it('shows a user-initiated Google Maps link without embedding an external map', () => {
  render(<Footer />);

  expect(
    screen.getByRole('heading', { name: footerMap.title, level: 2 })
  ).toBeInTheDocument();
  expect(screen.queryByTitle(/Map of/)).not.toBeInTheDocument();
  const mapsLink = screen.getByRole('link', {
    name: 'Open location in Google Maps',
  });
  expect(mapsLink).toHaveAttribute('href', footerMap.mapsUrl);
  expect(mapsLink).toHaveAttribute('target', '_blank');
  expect(mapsLink).toHaveAttribute('rel', 'noopener noreferrer');
});
