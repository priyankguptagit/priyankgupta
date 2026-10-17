import { EmptyState } from '@/components/ui/ContentCards';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/types';

export function ProjectGrid({
  projects,
  onSelectProject,
  emptyTitle,
  emptyMessage,
}: {
  readonly projects: readonly Project[];
  readonly onSelectProject: (project: Project) => void;
  readonly emptyTitle: string;
  readonly emptyMessage: string;
}) {
  if (projects.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <div key={project.id} id={project.id} className="scroll-mt-28">
          <ProjectCard project={project} onSelect={onSelectProject} />
        </div>
      ))}
    </div>
  );
}
