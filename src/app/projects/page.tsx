import { createMetadata } from '@/lib/seo';
import { ProjectPortfolio } from '@/components/projects/ProjectPortfolio';
import { projectCategories, publicProjects } from '@/content/projects';

export const metadata = createMetadata({
  title: 'Projects | Dr. Priyank Gupta — Enterprise Architect',
  description:
    'Explore project descriptions cleared for public sharing by Dr. Priyank Gupta.',
  path: '/projects',
});

export default function ProjectsPage() {
  return <ProjectPortfolio projects={publicProjects} categories={projectCategories} />;
}
