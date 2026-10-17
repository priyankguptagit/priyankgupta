import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';

interface PageMetaOptions {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly keywords?: readonly string[];
}

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetaOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const pageTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
  return {
    title: { absolute: pageTitle },
    description,
    keywords: [...keywords],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: pageTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: `${siteConfig.url}/images/PriyankGupta.png`,
          width: 181,
          height: 236,
          alt: `${siteConfig.name} — ${siteConfig.role}`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: pageTitle,
      description,
      images: [`${siteConfig.url}/images/PriyankGupta.png`],
    },
  };
}
