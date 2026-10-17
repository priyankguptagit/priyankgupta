import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { AudienceCard } from '@/components/ui/ContentCards';
import { audiences } from '@/content/audiences';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Audiences',
  description:
    'Practical learning for school students, college students, working professionals and other interested people.',
  path: '/audiences',
});
export default function AudiencesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learning together"
        title="Who Can Participate?"
        description="School students, college students, professionals and other interested people are welcome. Topics and formats are adapted to the audience, subject to availability."
      />
      <Section>
        <h2 className="sr-only">Learning communities</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {audiences.map((audience) => (
            <AudienceCard key={audience.id} audience={audience} />
          ))}
        </div>
      </Section>
    </>
  );
}
