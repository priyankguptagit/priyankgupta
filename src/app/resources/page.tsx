import { BookOpenText } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Learning Resources',
  description:
    'Technical learning resources and presentations will be shared here as materials become available.',
  path: '/resources',
});

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learning resources"
        title="Practical knowledge, when it is ready to share."
        description="A home for technical notes, presentations, explainers, and other learning materials."
      />
      <Section width="narrow">
        <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-6 text-center sm:p-10">
          <BookOpenText
            size={32}
            className="mx-auto text-aqua-300"
            aria-hidden="true"
          />
          <h2 className="mt-5 text-2xl font-semibold text-white">
            No resources published yet
          </h2>
          <p className="mx-auto mt-3 max-w-[55ch] leading-7 text-slate-300">
            Learning resources will be added as new materials become available. No
            sessions, recordings, or downloads are listed until they are ready to share.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/knowledge-sharing" variant="outline">
              Explore Learning Sessions
            </ButtonLink>
            <ButtonLink href="/contact?category=Seminar%20Request">
              Invite Me for a Free Session
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
