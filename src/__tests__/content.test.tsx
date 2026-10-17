import { render, screen } from '@testing-library/react';
import { ProjectCard, AudienceCard } from '@/components/ui/ContentCards';
import { Hero } from '@/components/home/Hero';
import SessionsPage from '@/app/sessions/page';
import { siteConfig, socialLinks } from '@/content/site';
import { projects } from '@/content/projects';
import { audiences } from '@/content/audiences';
import { publishedArticles } from '@/content/insights';
import { publicAchievements } from '@/content/achievements';
import { education } from '@/content/education';
import { experiences } from '@/content/experience';
import { expertiseCategories } from '@/content/expertise';
import {
  audienceCategories,
  eventTypes as contractEventTypes,
} from '@/lib/inquiry-contract';
import { audienceNames } from '@/content/audiences';
import { eventTypes } from '@/content/session-topics';

it('keeps learning options aligned with the inquiry contract and dedicated skill groups', () => {
  expect(audienceNames).toEqual(audienceCategories);
  expect(eventTypes).toEqual(contractEventTypes);
  expect(expertiseCategories.map((category) => category.id)).toEqual(
    expect.arrayContaining(['databases', 'testing-quality', 'programming', 'mentoring'])
  );
});

it('renders the owner identity and requested experience wording', () => {
  render(<Hero />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'Dr. Priyank Gupta' })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/14\+ years of experience delivering scalable enterprise solutions/)
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Explore My Work' })).toHaveAttribute(
    'href',
    '/projects'
  );
  expect(screen.getByRole('link', { name: 'Book a Session' })).toHaveAttribute(
    'href',
    '/contact?category=Workshop%20Request'
  );
  expect(screen.getByRole('img', { name: /Dr\. Priyank Gupta/ })).toHaveAttribute(
    'src',
    expect.stringContaining('PriyankGupta')
  );
});
it('does not publish private contact information or unapproved links', () => {
  expect(siteConfig.phone).toBe('');
  expect(siteConfig.alternateEmail).toBe('');
  expect(siteConfig.location).toBe('');
  expect(socialLinks).toHaveLength(0);
  expect(siteConfig.publicResumeUrl).toBe('');
  expect(publishedArticles).toHaveLength(0);
  expect(publicAchievements).toHaveLength(0);
  expect(education.map((item) => item.shortDegree)).toEqual([
    'Ph.D.',
    'M.Phil.',
    'M.Sc.',
    'B.Sc.',
  ]);
  expect(experiences.filter((item) => item.currentlyWorking)).toHaveLength(1);
  expect(experiences.find((item) => item.currentlyWorking)?.company).toBe(
    'Bayer Crop Science Ltd.'
  );
});
it('renders safe project cards and approval status', () => {
  const project = projects[0];
  if (!project) throw new Error('Missing project');
  render(<ProjectCard project={project} />);
  expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
  expect(
    screen.getByText('Public description subject to owner approval.')
  ).toBeInTheDocument();
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});
it('renders configured audience recommendations', () => {
  const audience = audiences.find((item) => item.name === 'College Students');
  if (!audience) throw new Error('Missing audience');
  render(<AudienceCard audience={audience} />);
  expect(screen.getByRole('heading', { name: 'College Students' })).toBeInTheDocument();
  expect(screen.getByText('Modern web development')).toBeInTheDocument();
});
it('renders the honest session empty state', () => {
  render(<SessionsPage />);
  expect(
    screen.getByText(
      'No public sessions are currently scheduled. You can submit a session request.'
    )
  ).toBeInTheDocument();
});
