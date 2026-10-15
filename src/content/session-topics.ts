export { eventTypes } from '@/lib/inquiry-contract';

export const topicNames = [
  'Modern web development', 'HTML and CSS fundamentals', 'JavaScript fundamentals',
  'TypeScript fundamentals', 'React.js', 'Next.js', 'Node.js', 'Express.js',
  'MERN stack', 'REST API design', 'MongoDB fundamentals', 'Full-stack application development',
  'Enterprise application architecture', 'Solution architecture', 'Scalable frontend architecture',
  'Scalable backend architecture', 'Clean code', 'Unit testing', 'Integration testing',
  'Software quality', 'Accessibility', 'Secure application development', 'CI/CD fundamentals',
  'Jenkins', 'Docker basics', 'AWS awareness', 'Git and version control',
  'Software engineering best practices', 'AI awareness', 'Machine learning awareness',
  'Neural-network awareness', 'Career guidance in technology', 'Technology for school students',
  'Technology for college students', 'Technology for working professionals',
  'Application modernization', 'Legacy-to-modern UI migration', 'Business-to-technology solution mapping',
] as const;

export const sessionTopics = topicNames.map((title, index) => ({
  id: `topic-${index + 1}`, title, status: 'proposed' as const,
  description: `A proposed educational session on ${title.toLowerCase()}. Scope and level are agreed with the organizer.`,
}));

export const sessionConditions = [
  'Primarily weekends, free of cost and subject to availability and explicit confirmation.',
  'Topic, audience, format, dates, duration and facilities must be discussed before confirmation.',
  'Offline sessions depend on location, travel feasibility, venue, equipment and organizer coordination.',
  'Hybrid delivery is a future-ready option; feasibility must be confirmed.',
  'Submitting a request or selecting a budget type creates no contractual or commercial commitment.',
  'Sessions are educational and do not represent the views of any employer.',
] as const;