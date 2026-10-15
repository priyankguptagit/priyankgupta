import type { Project } from '@/types';

export const projects: readonly Project[] = [
  { id: 'survey', slug: 'survey-application', title: 'Survey application', category: 'Web applications', summary: 'A survey application from the supplied professional project history.', featured: true },
  { id: 'testing', slug: 'testing-platform', title: 'Testing platform', category: 'Software quality', summary: 'An application in the testing domain; the public scope is awaiting review.', featured: true },
  { id: 'automation', slug: 'automation-application', title: 'Automation application', category: 'Enterprise applications', summary: 'An automation project from the supplied professional history.', featured: true },
  { id: 'discussion', slug: 'discussion-forum', title: 'Stock market discussion forum', category: 'Community applications', summary: 'A discussion platform in the stock market domain.' },
  { id: 'education', slug: 'education-portal', title: 'Education web portal', category: 'Education', summary: 'An educational portal from the supplied project history.' },
  { id: 'finance', slug: 'finance-signals', title: 'Finance and signals application', category: 'Financial technology', summary: 'A finance application. No investment performance or advisory outcome is claimed.' },
  { id: 'portfolio', slug: 'portfolio-assistance', title: 'Neural portfolio assistance', category: 'Applied AI', summary: 'Portfolio-assistance application work. Technical responsibilities and scope await owner confirmation.' },
  { id: 'office', slug: 'virtual-office', title: 'Virtual office', category: 'Business applications', summary: 'A virtual-office application from the supplied project history.' },
  { id: 'research-site', slug: 'research-website', title: 'Research organization website', category: 'Web development', summary: 'An organization website, with customer disclosure withheld pending approval.' },
  { id: 'company-site', slug: 'company-website', title: 'Technology company website', category: 'Web development', summary: 'A company website from the supplied professional history.' },
  { id: 'student', slug: 'student-portal', title: 'Student portal', category: 'Education', summary: 'A student portal, with customer identity withheld pending approval.' },
].map(project => ({ ...project, confidential: true, visibility: 'review' as const,
  role: 'Awaiting owner confirmation', period: 'Awaiting owner confirmation',
  technologies: [], highlights: [],
}));

export const projectCategories = ['All', ...new Set(projects.map(project => project.category))];