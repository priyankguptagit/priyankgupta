import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { ResearchPaperCard } from '@/components/research/ResearchPaperCard';
import { researchWorks } from '@/content/research';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Research & Innovation | Dr. Priyank Gupta',
  description:
    'Research and innovation work by Dr. Priyank Gupta in AI, forecasting, optimization, and applied machine learning.',
  path: '/publications',
});

export default function PublicationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research & Innovation"
        title="Research & innovation"
        description="Academic and applied work in machine learning, optimization, forecasting, and intelligent systems."
      />
      <Section>
        <div className="space-y-6">
          {researchWorks.map((paper) => (
            <ResearchPaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      </Section>
    </>
  );
}
