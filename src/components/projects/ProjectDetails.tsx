import Link from 'next/link';
import { ArrowLeft, Building2, CalendarRange, MapPin, UserRound } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { Project } from '@/types';

export function ProjectDetails({ project, onClose }: {
  readonly project: Project;
  readonly onClose?: () => void;
}) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {!onClose && (
          <Link href="/projects" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-white/25 hover:text-white">
            <ArrowLeft size={14} aria-hidden="true" />
            Back to projects
          </Link>
        )}
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
        {project.client && (
          <Card className="p-3 sm:p-3.5">
            <div className="mb-1 flex items-center gap-2 text-aqua-300">
              <Building2 size={15} aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-[0.18em]">Client</span>
            </div>
            <p className="text-sm text-slate-200">{project.client}</p>
          </Card>
        )}
        {project.role && (
          <Card className="p-3 sm:p-3.5">
            <div className="mb-1 flex items-center gap-2 text-aqua-300">
              <UserRound size={15} aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-[0.18em]">Role</span>
            </div>
            <p className="text-sm text-slate-200">{project.role}</p>
          </Card>
        )}
        {(project.startDate || project.endDate) && (
          <Card className="p-3 sm:p-3.5">
            <div className="mb-1 flex items-center gap-2 text-aqua-300">
              <CalendarRange size={15} aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-[0.18em]">Duration</span>
            </div>
            <p className="text-sm text-slate-200">
              {project.startDate || 'Start'} – {project.endDate || 'Present'}
            </p>
          </Card>
        )}
        {project.location && (
          <Card className="p-3 sm:p-3.5">
            <div className="mb-1 flex items-center gap-2 text-aqua-300">
              <MapPin size={15} aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-[0.18em]">Location</span>
            </div>
            <p className="text-sm text-slate-200">{project.location}</p>
          </Card>
        )}
      </div>

      <Card className="p-3.5 sm:p-4">
        <h2 className="text-lg font-semibold text-white sm:text-xl">Overview</h2>
        <p className="mt-2.5 max-w-4xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{project.overview}</p>
      </Card>

      <div className="grid gap-3">
        <Card className="p-3.5 sm:p-4">
          <h2 className="text-lg font-semibold text-white sm:text-xl">Responsibilities</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            {project.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-3.5 sm:hidden">
          <h2 className="text-lg font-semibold text-white sm:text-xl">Technology stack</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} tone="muted">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
}
