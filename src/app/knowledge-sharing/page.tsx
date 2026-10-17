import { ArrowUpRight, Clock3, UsersRound } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { AudienceCard } from '@/components/ui/ContentCards';
import { audiences } from '@/content/audiences';
import { sessionTopics, sessionConditions } from '@/content/session-topics';
import { createMetadata } from '@/lib/seo';
import { SpeakerSpotlight } from '@/components/home/SpeakerSpotlight';

export const metadata = createMetadata({
  title: 'Knowledge Sharing',
  description:
    'Free technical seminars, webinars, workshops, and training sessions for students, professionals, and organizations, subject to availability.',
  path: '/knowledge-sharing',
});

const faqs = [
  [
    'Are the sessions really free?',
    'Knowledge-sharing sessions are offered without a speaker fee, subject to availability and agreement on the topic and arrangements. Travel, accommodation, venue, equipment, and other expenses must be discussed separately before confirmation.',
  ],
  [
    'Who can request a session?',
    'Schools, colleges, universities, student groups, professional communities, NGOs, and other interested organizations may submit a request.',
  ],
  [
    'Which topics can be covered?',
    'Topics depend on my experience, current interests, and preparation requirements. Select a listed topic or suggest a custom topic for discussion.',
  ],
  [
    'Can we request an advanced session?',
    'Yes. Include the audience’s existing knowledge and learning objectives so the topic and difficulty can be evaluated appropriately.',
  ],
  [
    'Are sessions available online?',
    'Online sessions may be arranged where feasible. In-person sessions depend on location, availability, and mutually agreed arrangements.',
  ],
  [
    'Will participants receive certificates or recordings?',
    'Certificates, recordings, and additional materials are not automatically included. Availability can be discussed while planning the session.',
  ],
  [
    'Does submitting a request confirm the session?',
    'No. Requests are reviewed individually. The topic, date, format, and arrangements must be confirmed before a session is considered scheduled.',
  ],
  [
    'Can we request a session for a small group?',
    'Yes. Include the approximate audience size and learning objectives so a suitable format can be considered.',
  ],
] as const;

function requestTopicHref(topicTitle: string, eventType: string) {
  const category =
    eventType === 'Webinar'
      ? 'Webinar Request'
      : eventType === 'Workshop'
        ? 'Workshop Request'
        : eventType === 'Technical Training'
          ? 'Training Request'
          : eventType === 'Question and Answer'
            ? 'Career-Guidance Request'
            : 'Seminar Request';
  const query = new URLSearchParams({
    category,
    eventType,
    topic: topicTitle,
  });
  return `/contact?${query.toString()}`;
}

export default function KnowledgeSharingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learn. Build. Share."
        title="Free Technical Seminars, Webinars, Workshops & Training"
        description="I welcome requests from educational institutions, professional communities, and organizations interested in practical, research-informed technical learning."
      />
      <Section className="workshop-band">
        <SpeakerSpotlight />
      </Section>
      <Section>
        <SectionHeading
          title="Practical learning, shared freely"
          description="Seminars, webinars, workshops, and technical training are offered without a speaker fee, subject to availability, topic alignment, audience requirements, and mutual scheduling."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Seminars', 'Focused talks that introduce a topic and invite questions.'],
            ['Webinars', 'Online sessions for sharing concepts and practical examples.'],
            ['Workshops', 'Interactive learning and demonstrations, where feasible.'],
            ['Technical training', 'Structured technical learning scoped with the organizer.'],
          ].map(([title, description]) => (
            <article
              key={title}
              className="rounded-xl border border-white/10 bg-ink-900/60 p-5"
            >
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section className="border-y border-white/10 bg-ink-900">
        <SectionHeading
          eyebrow="Expertise & learning topics"
          title="Choose a topic to discuss."
          description="These proposed topics reflect existing skills, projects, and research. Audience level, format, and scope are agreed with the organizer; custom topics can also be discussed."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sessionTopics.map((topic) => {
            const firstFormat = topic.formats[0] ?? 'Seminar';
            return (
              <article
                key={topic.id}
                className="flex h-full flex-col rounded-xl border border-white/10 bg-ink-950/55 p-5"
              >
                <h3 className="text-lg font-semibold leading-snug text-white">
                  {topic.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">
                  {topic.description}
                </p>
                <dl className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
                  <div className="flex gap-2">
                    <dt className="inline-flex shrink-0 items-center gap-1 text-slate-400">
                      <UsersRound size={15} aria-hidden="true" />
                      Audience
                    </dt>
                    <dd>{topic.audience}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt>Level:</dt>
                    <dd>{topic.level}</dd>
                  </div>
                  <div>
                    <dt className="inline">Possible formats: </dt>
                    <dd className="inline">{topic.formats.join(', ')}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="inline-flex shrink-0 items-center gap-1 text-slate-400">
                      <Clock3 size={15} aria-hidden="true" />
                      Example duration
                    </dt>
                    <dd>{topic.duration}</dd>
                  </div>
                </dl>
                <ButtonLink
                  href={requestTopicHref(topic.title, firstFormat)}
                  variant="outline"
                  className="mt-5 w-fit"
                >
                  Request This Topic <ArrowUpRight size={16} aria-hidden="true" />
                </ButtonLink>
              </article>
            );
          })}
        </div>
        <div className="mt-7 rounded-xl border border-white/10 p-5">
          <p className="leading-7 text-slate-300">
            Interested in a different subject? Share your idea, audience, and learning
            goals. Custom topics are considered where they align with my experience and
            preparation.
          </p>
          <ButtonLink
            href="/contact?category=Topic%20Suggestion"
            variant="secondary"
            className="mt-4"
          >
            Discuss a Learning Topic
          </ButtonLink>
        </div>
      </Section>
      <Section>
        <SectionHeading title="Who can participate?" />
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
      <Section className="border-y border-white/10 bg-ink-900">
        <SectionHeading
          title="From request to session"
          description="Submitting a request starts a conversation; it does not reserve a date or confirm a session."
        />
        <ol className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            'Share your topic, audience, learning goals, and preferred dates.',
            'Discuss scope, format, facilities, location, and practical arrangements.',
            'Wait for explicit confirmation before making event commitments.',
          ].map((step, index) => (
            <li key={step} className="border-t border-white/20 pt-5">
              <span className="font-mono text-4xl text-aqua-300">
                0{index + 1}
              </span>
              <p className="mt-3">{step}</p>
            </li>
          ))}
        </ol>
        <ul className="mt-8 max-w-[70ch] list-disc space-y-3 pl-5">
          {sessionConditions.map((condition) => (
            <li key={condition}>{condition}</li>
          ))}
        </ul>
        <ButtonLink
          href="/contact?category=Seminar%20Request"
          className="mt-7"
        >
          Invite Me for a Free Session <ArrowUpRight size={17} aria-hidden="true" />
        </ButtonLink>
      </Section>
      <Section>
        <SectionHeading
          eyebrow="Before you request"
          title="Frequently asked questions"
          description="Important arrangements are discussed and confirmed before a session is scheduled."
        />
        <div className="mt-6 space-y-3">
          {faqs.map(([question, answer]) => (
            <details
              key={question}
              className="rounded-xl border border-white/10 bg-ink-900/60 px-5"
            >
              <summary className="min-h-14 cursor-pointer py-4 font-semibold text-white">
                {question}
              </summary>
              <p className="pb-5 leading-7 text-slate-300">{answer}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
