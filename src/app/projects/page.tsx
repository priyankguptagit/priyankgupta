import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { ProjectCard } from '@/components/ui/ContentCards';
import { projects } from '@/content/projects';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Projects',
  description:
    'High-level project areas across web applications, enterprise software, education and applied AI.',
  path: '/projects',
});
export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Architecture in practice."
        description="Project areas across web applications, enterprise systems and applied AI. Client names, implementation details and results remain private until approved."
      />
      <Section>
        <h2 className="sr-only">Selected project areas</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>
    </>
  );
}
