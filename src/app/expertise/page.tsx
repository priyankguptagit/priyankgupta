import type { Metadata } from 'next';
import { ExpertiseScreen } from '@/components/expertise/ExpertiseScreen';
import { createMetadata } from '@/lib/seo';

const expertiseMetadata = createMetadata({
  title: 'Expertise',
  description:
    "Explore Priyank Gupta's professional interests and capabilities across software architecture, engineering, cloud technologies, integration, and emerging technology.",
  path: '/expertise',
});

export const metadata: Metadata = {
  ...expertiseMetadata,
  title: { absolute: 'Expertise | Priyank Gupta' },
  openGraph: {
    ...expertiseMetadata.openGraph,
    title: 'Expertise | Priyank Gupta',
  },
  twitter: {
    ...expertiseMetadata.twitter,
    title: 'Expertise | Priyank Gupta',
  },
};

export default function ExpertisePage() {
  return <ExpertiseScreen />;
}
