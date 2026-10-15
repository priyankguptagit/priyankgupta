import Image from 'next/image';
import { ArrowUpRight, Blocks, Code2, FileClock, Network } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { ButtonLink } from './Button';
import type { Project } from '@/types';
import type { Audience } from '@/content/audiences';
import type { Session } from '@/content/sessions';

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <Card
      as="article"
      interactive
      className={`project-card group h-full overflow-hidden ${featured ? 'project-feature' : 'flex flex-col'}`}
    >
      <div className="project-visual relative mb-5 grid aspect-video min-h-36 place-items-center overflow-hidden rounded-md border border-white/10">
        {project.visibility === 'approved' && project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
        ) : (
          <div
            role="img"
            aria-label={`Abstract architecture illustration for ${project.category}`}
            className="flex items-center gap-3 text-aqua-300 transition-transform duration-500 motion-safe:group-hover:scale-105"
          >
            <Code2 size={25} strokeWidth={1.25} />
            <span className="h-px w-6 bg-aqua-300/40" />
            <span className="grid size-16 place-items-center rounded-lg border border-aqua-300/30 bg-aqua-500/10">
              <Blocks size={29} strokeWidth={1.25} />
            </span>
            <span className="h-px w-6 bg-emerald-300/40" />
            <Network size={25} strokeWidth={1.25} className="text-emerald-300" />
          </div>
        )}
        <span className="absolute bottom-3 left-3 font-mono text-xs uppercase text-slate-400">
          {project.image && project.visibility === 'approved'
            ? 'Project preview'
            : 'Project area / Concept visual'}
        </span>
      </div>
      <div className="project-copy min-w-0">
        <Badge>{project.category}</Badge>
        <h3 className="mt-4 text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-3 leading-relaxed">{project.summary}</p>
        {project.visibility === 'review' && (
          <p className="mt-3 text-sm text-slate-500">
            Public description subject to owner approval.
          </p>
        )}
        {(project.role || project.period) && (
          <details className="mt-4 border-t border-white/10 pt-3">
            <summary className="min-h-11 py-2 text-sm font-medium text-aqua-300">
              Project details
            </summary>
            {project.role && <p className="mt-2 text-sm">Role: {project.role}</p>}
            {project.period && <p className="text-sm">Period: {project.period}</p>}
          </details>
        )}
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
        {project.highlights.length > 0 && (
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {project.visibility === 'approved' && project.link?.startsWith('https://') && (
          <ButtonLink href={project.link} external variant="secondary">
            View {project.title}
          </ButtonLink>
        )}
      </div>
    </Card>
  );
}

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
