import { createMetadata } from '@/lib/seo';
import { ProjectPortfolio } from '@/components/projects/ProjectPortfolio';

export const metadata = createMetadata({
  title: 'Projects | Dr. Priyank Gupta — Enterprise Architect',
  description:
    'Explore Dr. Priyank Gupta\'s professional projects across enterprise architecture, full-stack engineering, AI-driven financial analytics, automation, and web applications.',
  path: '/projects',
});

export default function ProjectsPage() {
  return <ProjectPortfolio />;
}
