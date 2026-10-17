import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { AudienceCard } from '@/components/ui/ContentCards';
import { audiences } from '@/content/audiences';
import { eventTypes, sessionTopics, sessionConditions } from '@/content/session-topics';
import { createMetadata } from '@/lib/seo';
import { SpeakerSpotlight } from '@/components/home/SpeakerSpotlight';

export const metadata = createMetadata({
  title: 'Knowledge Sharing',
  description:
    'Free weekend webinars, seminars, workshops, mentoring and practical technology training.',
  path: '/knowledge-sharing',
});
export default function KnowledgeSharingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learn. Build. Share."
        title="Learn something that stays with you."
        description="Free weekend learning for awareness, practical education, professional development and community contribution. Online and offline sessions are subject to availability."
      />
      <Section className="workshop-band">
        <SpeakerSpotlight />
      </Section>
      <Section>
        <SectionHeading
          title="Practical learning, at no cost"
          description="The primary purpose is free knowledge sharing. Any sponsored arrangements must be explicitly discussed and agreed; no commitment is created by submitting a request."
        />
        <ul className="mt-6 grid list-disc gap-3 pl-5 sm:grid-cols-2 lg:grid-cols-3">
          {eventTypes.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
      </Section>
      <Section className="border-y border-white/10 bg-ink-900">
        <SectionHeading
          eyebrow="The learning index"
          title="Find your next question."
          description="These are initial proposals. Topic, depth and format are confirmed with the organizer."
        />
        <div className="mt-8 grid items-start gap-x-9 md:grid-cols-2">
          {sessionTopics.map((topic, index) => (
            <details
              key={topic.id}
              className="topic-disclosure border-b border-white/15 px-1"
            >
              <summary className="grid grid-cols-[24px_1fr_20px] items-start gap-3 py-5">
                <span className="mt-1 font-mono text-xs text-aqua-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-medium leading-snug text-white">
                  {topic.title}
                </h3>
                <Plus
                  size={19}
                  aria-hidden="true"
                  className="topic-plus mt-1 text-aqua-300 transition-transform"
                />
              </summary>
              <p className="pb-5 pl-9 text-base text-slate-400">{topic.description}</p>
            </details>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeading title="Who Can Participate?" />
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {audiences
            .filter((audience) => audience.featured)
            .map((audience) => (
              <AudienceCard key={audience.id} audience={audience} />
            ))}
        </div>
        <div className="mt-6">
          <ButtonLink href="/audiences" variant="secondary">
            All audiences
          </ButtonLink>
        </div>
      </Section>
      <Section>
        <SectionHeading title="From request to session" />
        <ol className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            'Share your topic, audience and preferred dates.',
            'Discuss scope, format, facilities and practical arrangements.',
            'Receive explicit confirmation before making event commitments.',
          ].map((step, index) => (
            <li key={step} className="border-t border-white/20 pt-5">
              <span className="font-mono text-4xl text-aqua-300">0{index + 1}</span>
              <p className="mt-3">{step}</p>
            </li>
          ))}
        </ol>
        <ul className="mt-8 max-w-[70ch] list-disc space-y-3 pl-5">
          {sessionConditions.map((condition) => (
            <li key={condition}>{condition}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            ['Request a Session', 'Training Request'],
            ['Suggest a Topic', 'Topic Suggestion'],
            ['Invite for a Workshop', 'Workshop Request'],
            ['Request a Webinar', 'Webinar Request'],
            ['Request a Seminar', 'Seminar Request'],
            ['Collaborate', 'Collaboration Request'],
          ].map(([label, category]) => (
            <ButtonLink
              key={label}
              href={`/contact?category=${encodeURIComponent(category ?? '')}`}
              variant="secondary"
            >
              {label}
            </ButtonLink>
          ))}
        </div>
      </Section>
    </>
  );
}
