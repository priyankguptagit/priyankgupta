import type { Stat } from '@/types';

export const professionalSummary: readonly string[] = [
  'Dr. Priyank Gupta is an Enterprise Architecture professional with 14+ years of IT experience, specializing in scalable web applications, full-stack engineering, enterprise architecture, and AI-driven systems.',
  'His experience spans modern JavaScript and TypeScript ecosystems, including React, Next.js, Node.js, and MERN Stack, alongside neural-network-based models and predictive analytics.',
  'He focuses on translating business requirements into scalable technology solutions, integrating intelligent capabilities into enterprise applications, and building secure, maintainable, high-performance software systems.',
];

export const positioningPillars = [
  {
    id: 'architect',
    title: 'Architecture that survives contact with reality',
    body: 'Target-state designs, integration boundaries and technology decisions documented clearly enough that delivery teams can actually build from them.',
  },
  {
    id: 'business',
    title: 'Business-to-technology thinking',
    body: 'Connect business goals with application capabilities, integration contracts and practical delivery choices.',
  },
  {
    id: 'engineering',
    title: 'Still writing code',
    body: 'Full-stack engineering with TypeScript, Next.js, Node.js, MongoDB and CI/CD, grounded in maintainable code and testing.',
  },
  {
    id: 'mentorship',
    title: 'Teaching as a habit',
    body: 'An interest in mentoring engineers and helping learners connect fundamental concepts with practical software development.',
  },
] as const;

/**
 * Deliberately qualitative. No counts of years, projects, students or participants
 * are claimed anywhere on this site unless the owner supplies verified numbers.
 */
export const credibilityStats: readonly Stat[] = [
  {
    label: 'Focus',
    value: 'Enterprise & Solution Architecture',
    hint: 'System design, integration, modernization strategy',
  },
  {
    label: 'Experience',
    value: '14+ years of IT experience',
    hint: 'Software development and enterprise applications',
  },
  {
    label: 'Platform',
    value: 'MERN, Next.js & AWS',
    hint: 'Cloud-native architecture and CI/CD',
  },
  {
    label: 'Sessions',
    value: 'Free weekend sessions',
    hint: 'Subject to availability and confirmation',
  },
];

export const workingPrinciples = [
  'Design for the teams that have to maintain the system, not just the stakeholders who approve the idea.',
  'Prefer proven technology at the core, and keep experimentation at the edges where it can be tested safely.',
  'Make integration boundaries explicit; most enterprise friction shows up between systems, not inside a single codebase.',
  'Treat security, quality, and accessibility as design requirements from the start, not as a final cleanup step.',
  'Document decisions well enough that they outlast the meetings that created them.',
  'Learn in public and teach by doing — the best technical ideas become useful when others can apply them.',
] as const;

export const careerNarrative = [
  {
    id: 'foundation',
    period: 'Foundation',
    title: 'Software engineering and enterprise applications',
    body: 'Early work centred on building and supporting enterprise applications — learning how requirements, data models, releases and production support actually behave outside a textbook.',
  },
  {
    id: 'specialisation',
    period: 'Specialisation',
    title: 'Full-stack applications and applied AI',
    body: 'Connecting application development, data and engineering quality with practical technology choices.',
  },
  {
    id: 'architecture',
    period: 'Architecture',
    title: 'Solution and enterprise architecture',
    body: 'Owning target architectures, technology evaluations, modernization roadmaps and architecture reviews across digital transformation programmes.',
  },
  {
    id: 'now',
    period: 'Now',
    title: 'Architecture, continuous learning and mentoring',
    body: 'Developing an enterprise architecture perspective and sharing practical knowledge with students and professionals.',
  },
] as const;

export const languages = ['English', 'Hindi'] as const;
export const whyLearn = [
  '14+ years of IT experience', 'Enterprise application perspective',
  'Solution architecture thinking', 'Full-stack development with MERN and Next.js',
  'Testing and maintainable code', 'Cloud and DevOps exposure',
  'AI and machine learning exposure', 'Mentoring and knowledge-sharing interest',
  'Sessions adapted to different audience levels',
] as const;
