import { ArrowUpRight, FileClock } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { ButtonLink } from './Button';
import type { Audience } from '@/content/audiences';
import type { Session } from '@/content/sessions';

export function AudienceCard({ audience }: { audience: Audience }) {
  return (
    <Card as="article" className="border-t-2 border-t-aqua-300">
      <h3 className="text-xl font-semibold text-white">{audience.name}</h3>
      <p className="mt-3">{audience.description}</p>
      <p className="mt-4 text-sm font-semibold">Recommended topics</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {audience.recommendedTopics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
      <p className="mt-4 text-sm">{audience.sessionTypes.join(' / ')}</p>
      <p className="mt-2 text-sm">
        {audience.deliveryModes.join(' / ')}; subject to confirmation.
      </p>
    </Card>
  );
}

export function SessionCard({ session }: { session: Session }) {
  return (
    <Card as="article" className="border-t-2 border-t-gold-400">
      <div className="flex flex-wrap gap-2">
        <Badge>{session.status}</Badge>
        <Badge>{session.mode}</Badge>
        {session.free && <Badge>Free</Badge>}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">{session.title}</h3>
      <p className="mt-3">
        {session.eventType} for {session.audienceCategory}
      </p>
      <p className="mt-2">
        {session.date ? (
          <time dateTime={session.date}>{session.date}</time>
        ) : (
          'Date to be confirmed'
        )}
        {session.duration && ` / ${session.duration}`}
      </p>
    </Card>
  );
}

export function EmptyState({
  title,
  message,
  action = false,
}: {
  title: string;
  message: string;
  action?: boolean;
}) {
  return (
    <div className="grid items-start gap-5 border-y border-white/15 py-9 sm:grid-cols-[64px_1fr] sm:gap-6">
      <div className="grid size-16 place-items-center rounded-lg border border-aqua-400/25 bg-aqua-500/5 text-aqua-300">
        <FileClock size={34} strokeWidth={1.3} aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-[28px] font-semibold leading-tight text-white">{title}</h2>
        <p className="mt-3 max-w-2xl leading-relaxed">{message}</p>
        {action && (
          <div className="mt-6">
            <ButtonLink href="/contact?category=Webinar%20Request">
              Request a Session <ArrowUpRight size={17} aria-hidden="true" />
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}
