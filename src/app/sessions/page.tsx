import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { EmptyState, SessionCard } from '@/components/ui/ContentCards';
import { sessions } from '@/content/sessions';
import { sessionTopics } from '@/content/session-topics';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Sessions and Events',
  description: 'Approved public webinars, seminars, workshops and training sessions.',
  path: '/sessions',
});
export default function SessionsPage() {
  const upcoming = sessions.filter((session) => session.status !== 'Completed');
  const previous = sessions.filter((session) => session.status === 'Completed');
  return (
    <>
      <PageHeader
        eyebrow="Free knowledge sharing"
        title="Sessions and Events"
        description="Weekend learning, subject to availability and confirmation."
      />
      <Section>
        {upcoming.length ? (
          <>
            <SectionHeading title="Upcoming sessions" />
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {upcoming.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            title="Upcoming sessions"
            message="No public sessions are currently scheduled. You can submit a session request."
            action
          />
        )}
      </Section>
      <Section>
        <SectionHeading title="Previous sessions" />
        {previous.length ? (
          previous.map((session) => <SessionCard key={session.id} session={session} />)
        ) : (
          <p className="mt-4">Approved previous sessions will appear here.</p>
        )}
      </Section>
      <Section>
        <SectionHeading
          title="Proposed topics"
          description="Topics are configurable proposals, not confirmed events."
        />
        <ul className="mt-6 grid list-disc gap-3 pl-5 sm:grid-cols-2">
          {sessionTopics.map((topic) => (
            <li key={topic.id}>{topic.title}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
