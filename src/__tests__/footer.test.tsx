import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';
import { footerMap } from '@/content/site';

it('shows the configured Manyata Tech Park map in the footer', () => {
  render(<Footer />);

  expect(footerMap.query).toContain('MFAR');
  expect(
    screen.getByRole('heading', { name: footerMap.title, level: 2 })
  ).toBeInTheDocument();
  expect(
    screen.getByTitle(`Map of ${footerMap.title}, ${footerMap.address}`)
  ).toHaveAttribute(
    'src',
    `https://maps.google.com/maps?q=${encodeURIComponent(footerMap.query)}&output=embed`
  );
  expect(screen.getByRole('link', { name: 'Open in Google Maps' })).toHaveAttribute(
    'href',
    footerMap.mapsUrl
  );
});
