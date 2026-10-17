import { render, screen } from '@testing-library/react';
import { ProjectCard, AudienceCard } from '@/components/ui/ContentCards';
import { Hero } from '@/components/home/Hero';
import { BrandIdentityCards, ResearchPreview } from '@/components/home/BrandSections';
import KnowledgeSharingPage from '@/app/knowledge-sharing/page';
import ResourcesPage from '@/app/resources/page';
import SessionsPage from '@/app/sessions/page';
import { siteConfig, socialLinks } from '@/content/site';
import { createMetadata } from '@/lib/seo';
import { projects } from '@/content/projects';
import { audiences } from '@/content/audiences';
import { publishedArticles } from '@/content/insights';
import { publicAchievements } from '@/content/achievements';
import { experiences } from '@/content/experience';
import { expertiseCategories } from '@/content/expertise';
import {
  audienceCategories,
  eventTypes as contractEventTypes,
} from '@/lib/inquiry-contract';
import { audienceNames } from '@/content/audiences';
import { eventTypes } from '@/content/session-topics';
import { researchWorks } from '@/content/research';

it('keeps learning options aligned with the inquiry contract and dedicated skill groups', () => {
  expect(audienceNames).toEqual(audienceCategories);
  expect(eventTypes).toEqual(contractEventTypes);
  expect(expertiseCategories.map((category) => category.id)).toEqual(
    expect.arrayContaining(['databases', 'testing-quality', 'programming', 'mentoring'])
  );
});

it('keeps route, Open Graph, and Twitter titles consistent without duplicate branding', () => {
  const title = 'Projects | Dr. Priyank Gupta — Enterprise Architect';
  const metadata = createMetadata({
    title,
    description: 'Explore selected projects.',
    path: '/projects',
  });

  expect(metadata.title).toEqual({ absolute: title });
  expect(metadata.openGraph?.title).toBe(title);
  expect(metadata.twitter?.title).toBe(title);
  expect(metadata.twitter).toMatchObject({ card: 'summary' });
});

it('renders the owner identity, professional headline, and portfolio calls to action', () => {
  render(<Hero />);
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Exploring technology. Sharing knowledge. Enabling growth.',
    })
  ).toBeInTheDocument();
  expect(screen.getByText('Dr. Priyank Gupta')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Explore My Work' })).toHaveAttribute(
    'href',
    '/projects'
  );
  expect(screen.getByRole('link', { name: 'Explore Learning Sessions' })).toHaveAttribute(
    'href',
    '/knowledge-sharing'
  );
  expect(
    screen.getByRole('link', { name: 'Invite Me for a Free Session' })
  ).toHaveAttribute('href', '/contact?category=Seminar%20Request');
  expect(screen.queryByRole('link', { name: /View Resume/i })).not.toBeInTheDocument();
  const resumeDownload = screen.getByRole('link', { name: 'Download Resume' });
  expect(resumeDownload).toHaveAttribute('href', '/Priyank-Gupta-Resume-2026.pdf');
  expect(resumeDownload).toHaveAttribute('download', 'Priyank-Gupta-Resume-2026.pdf');
  expect(screen.getByRole('img', { name: /Dr\. Priyank Gupta/ })).toHaveAttribute(
    'src',
    expect.stringContaining('PriyankGupta')
  );
});
it('presents the two brand pillars and previews existing research', () => {
  const firstPaper = researchWorks[0];
  if (!firstPaper) throw new Error('Missing research publication');

  render(
    <>
      <BrandIdentityCards />
      <ResearchPreview />
    </>
  );
  expect(
    screen.getByRole('heading', { name: 'My Professional Journey' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Knowledge Is Better When Shared' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Explore Research & Publications' })
  ).toHaveAttribute('href', '/publications');
  expect(screen.getByRole('heading', { name: firstPaper.title })).toBeInTheDocument();
});
it('does not publish private contact information or unapproved links', () => {
  expect(siteConfig.url).toBe('https://priyankgupta.vercel.app');
  expect(siteConfig.phone).toBe('');
  expect(siteConfig.alternateEmail).toBe('');
  expect(siteConfig.location).toBe('');
  expect(socialLinks).toHaveLength(0);
  expect(publishedArticles).toHaveLength(0);
  expect(publicAchievements).toHaveLength(0);
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
it('offers the curated session topics, prefilled request actions, FAQs, and an honest resources empty state', () => {
  const { unmount } = render(<KnowledgeSharingPage />);
  expect(
    screen.getByRole('heading', { name: 'Frequently asked questions' })
  ).toBeInTheDocument();
  const topicRequest = screen.getAllByRole('link', { name: 'Request This Topic' })[0];
  expect(topicRequest).toHaveAttribute(
    'href',
    expect.stringContaining('/contact?category=')
  );
  expect(topicRequest?.getAttribute('href')).toContain('topic=');
  unmount();

  render(<ResourcesPage />);
  expect(
    screen.getByRole('heading', { name: 'No resources published yet' })
  ).toBeInTheDocument();
});
