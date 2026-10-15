import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { EmptyState } from '@/components/ui/ContentCards';
import { createMetadata } from '@/lib/seo';
export const metadata = createMetadata({
  title: 'Testimonials',
  description: 'Contributor-approved feedback, when available.',
  path: '/testimonials',
});
export default function TestimonialsPage() {
  return (
    <>
      <PageHeader eyebrow="Community feedback" title="Testimonials" />
      <Section>
        <EmptyState
          title="Awaiting contributor approval"
          message="Testimonials will be added after receiving approval from contributors."
        />
      </Section>
    </>
  );
}
