import { coreSkills } from '@/content/expertise';
import { siteConfig } from '@/content/site';

/**
 * Structured data. Only verified, publicly safe fields are emitted — no dates,
 * counts, employers-as-claims or academic credentials are asserted here.
 */
export function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    knowsAbout: coreSkills,
  };

  return <JsonLd id="person-jsonld" data={data} />;
}

export function WebsiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'en-IN',
    description: siteConfig.description,
  };

  return <JsonLd id="website-jsonld" data={data} />;
}

interface BreadcrumbItem {
  readonly name: string;
  readonly path: string;
}

export function BreadcrumbJsonLd({
  items,
}: {
  readonly items: readonly BreadcrumbItem[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };

  return <JsonLd id="breadcrumb-jsonld" data={data} />;
}

interface JsonLdProps {
  readonly id: string;
  readonly data: Record<string, unknown>;
}

function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Serialized from trusted, local content only; `<` escaped to prevent tag breakout.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
