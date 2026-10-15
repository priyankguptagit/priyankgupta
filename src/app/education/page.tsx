import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { EducationList } from '@/components/ui/EducationList';
import { createMetadata } from '@/lib/seo';
export const metadata = createMetadata({
  title: 'Education',
  description: 'Computer Science education from the supplied professional resume.',
  path: '/education',
});
export default function EducationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Academic foundation"
        title="Education"
        description="Computer Science qualifications from the supplied resume. Unconfirmed doctoral information is not published."
      />
      <Section>
        <h2 className="sr-only">Qualifications</h2>
        <EducationList />
      </Section>
    </>
  );
}
