import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { EmptyState } from '@/components/ui/ContentCards';
import { createMetadata } from '@/lib/seo';
export const metadata = createMetadata({
  title: 'Blog',
  description:
    'Future articles on architecture, software engineering and practical learning.',
  path: '/blog',
});
export default function BlogPage() {
  return (
    <>
      <PageHeader eyebrow="Ideas and practical learning" title="Blog" />
      <Section>
        <EmptyState
          title="No articles published yet"
          message="Approved articles on architecture, software engineering and knowledge sharing will appear here."
        />
      </Section>
    </>
  );
}
