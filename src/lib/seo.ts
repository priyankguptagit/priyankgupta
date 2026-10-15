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
  return {
    title,
    description,
    keywords: [...keywords],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}
