'use client';

import { ArrowUpRight, BriefcaseBusiness, Building2, CalendarRange, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { Project } from '@/types';

export function ProjectCard({ project, onSelect }: { readonly project: Project; readonly onSelect: (project: Project) => void }) {
  return (
    <Card as="article" interactive className="group flex h-full flex-col overflow-hidden p-4 sm:p-4 lg:p-4">
      <div className="mb-3 border-b border-white/10 pb-3">
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <Badge>{project.category}</Badge>
          {project.featured && <Badge tone="accent">Featured</Badge>}
        </div>
        <h3 className="text-lg font-semibold leading-snug text-white">{project.title}</h3>
      </div>

      <div className="space-y-2 text-sm text-slate-300">
        {project.client && (
          <div className="flex items-center gap-2">
            <Building2 size={14} className="text-aqua-300" aria-hidden="true" />
            <span>{project.client}</span>
          </div>
        )}
        {project.role && (
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={14} className="text-aqua-300" aria-hidden="true" />
            <span>{project.role}</span>
          </div>
        )}
        {(project.startDate || project.endDate) && (
          <div className="flex items-center gap-2">
            <CalendarRange size={14} className="text-aqua-300" aria-hidden="true" />
            <span>
              {project.startDate || 'Start'} – {project.endDate || 'Present'}
            </span>
          </div>
        )}
        {project.location && (
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-aqua-300" aria-hidden="true" />
            <span>{project.location}</span>
          </div>
        )}
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-5 text-slate-300">{project.overview}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((tech) => (
          <Badge key={tech} tone="muted">
            {tech}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
        <Button type="button" variant="ghost" size="sm" onClick={() => onSelect(project)} className="gap-2 text-aqua-300 hover:text-white">
          View details
          <ArrowUpRight size={15} aria-hidden="true" />
        </Button>
      </div>
    </Card>
  );
}
