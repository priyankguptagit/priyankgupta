import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { EmptyState } from '@/components/ui/ContentCards';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Writing',
  description:
    'Practical writing on architecture, software engineering, and technology leadership.',
  path: '/writing',
});

export default function WritingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ideas and practical learning"
        title="Writing"
        description="Architecture notes, engineering thinking, and useful lessons from building and learning in technology."
      />
      <Section>
        <EmptyState
          title="No public writing published yet"
          message="Selected articles and engineering notes will appear here when they are ready to share."
        />
      </Section>
    </>
  );
}
