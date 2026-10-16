import { EmptyState } from '@/components/ui/ContentCards';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/types';

export function ProjectGrid({ projects, onSelectProject }: { readonly projects: readonly Project[]; readonly onSelectProject: (project: Project) => void }) {
  if (projects.length === 0) {
    return (
      <EmptyState
        title="No matching projects"
        message="Try a different category or search query to explore more of the project portfolio."
      />
    );
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
