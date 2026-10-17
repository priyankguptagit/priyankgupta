import type { ExpertiseCategory } from '@/types';

export const expertiseCategories: readonly ExpertiseCategory[] = [
  {
    id: 'architecture-strategy',
    title: 'Architecture & Strategy',
    summary:
      'Turning business intent into target architectures, technology decisions and modernization roadmaps that delivery teams can build from.',
    accent: 'indigo',
    skills: [
      'Enterprise Architecture',
      'Solution Architecture',
      'Application Architecture',
      'System Design',
      'Integration Architecture',
      'Architecture Documentation',
      'Architecture Review',
      'Technology Evaluation',
      'Technical Roadmaps',
      'Modernization Strategy',
      'Digital Transformation',
      'Secure-by-Design principles',
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise Architecture',
    summary:
      'Connecting business goals to business capabilities and maintainable enterprise applications.',
    accent: 'amber',
    skills: [
      'Business-to-technology mapping',
      'Enterprise application design',
      'Single Sign-On',
      'Authentication',
      'Authorization',
      'Enterprise application modernization',
      'Legacy application migration',
      'RESTful services',
      'Scalable project design',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    summary:
      'Component-driven, accessible and fast interfaces built with the modern React and TypeScript ecosystem.',
    accent: 'cyan',
    skills: [
      'Next.js',
      'React',
      'Redux',
      'HTML',
      'CSS',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Responsive web design',
      'Component-driven architecture',
      'Frontend performance',
      'Accessibility',
      'Modern UI architecture',
      'Legacy frontend modernization',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & API Engineering',
    summary:
      'Modular services and clear API contracts for maintainable applications.',
    accent: 'emerald',
    skills: [
      'Node.js',
      'Express.js',
      'NestJS',
      'PHP',
      'Django',
      'C#',
      'Java',
      'REST API design',
      'Authentication & authorization concepts',
      'Relational database design',
      'MongoDB',
      'MySQL',
      'SQL Server',
      'API integration',
      'Modular backend architecture',
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    summary:
      'Cloud and DevOps exposure, automated pipelines and controlled releases.',
    accent: 'violet',
    skills: [
      'AWS',
      'Docker',
      'Jenkins',
      'Jira',
      'Cloud-native architecture',
      'CI/CD pipelines',
      'Git',
      'GitHub',
      'Release management',
      'Environment configuration',
      'Deployment architecture',
      'Monitoring & observability',
      'Infrastructure as Code concepts',
    ],
  },
  {
    id: 'ai',
    title: 'AI & Emerging Technology',
    summary:
      'Applied AI and machine learning exposure with an emphasis on responsible educational use.',
    accent: 'rose',
    skills: [
      'Python',
      'Machine learning',
      'Neural networks',
      'AI-related application development',
      'Responsible AI awareness',
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    summary: 'Data modeling and database foundations for business applications.',
    accent: 'emerald',
    skills: ['MongoDB', 'MySQL', 'SQL Server', 'Relational database design'],
  },
  {
    id: 'testing-quality',
    title: 'Testing & Quality',
    summary: 'Maintainable software supported by repeatable checks and review.',
    accent: 'cyan',
    skills: ['Unit testing', 'Integration testing', 'Software quality', 'Code review', 'Clean code'],
  },
  {
    id: 'programming',
    title: 'Programming Languages',
    summary: 'Programming foundations and application development across technology stacks.',
    accent: 'amber',
    skills: ['C', 'C++', 'C#', 'Java', 'Python', 'JavaScript', 'TypeScript', 'PHP'],
  },
  {
    id: 'mentoring',
    title: 'Mentoring & Knowledge Sharing',
    summary: 'Practical technology learning for students, professionals and communities.',
    accent: 'rose',
    skills: ['Technical mentoring', 'Career guidance', 'Workshops', 'Seminars', 'Technology awareness', 'Practical learning'],
  },
  {
    id: 'ways-of-working',
    title: 'Leadership & Ways of Working',
    summary:
      'The non-code half of architecture: alignment, communication, mentoring and knowledge transfer.',
    accent: 'indigo',
    skills: [
      'Stakeholder communication',
      'Technical mentoring',
      'Design & code reviews',
      'Agile delivery collaboration',
      'Architecture decision records',
      'Knowledge sharing & enablement',
      'Public speaking & seminars',
    ],
  },
];

/** Compact list used by the home page and structured data. */
export const coreSkills: readonly string[] = [
  'Enterprise Architecture',
  'Solution Architecture',
  'MERN',
  'MongoDB',
  'Digital Transformation',
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'NestJS',
  'Express.js',
  'AWS',
  'Docker',
  'CI/CD',
  'Applied AI',
];

export const expertiseIntroduction = {
  eyebrow: 'PROFESSIONAL CAPABILITIES',
  title: 'Turning Complex Challenges Into Practical Solutions.',
  description:
    'My professional interests span software architecture, software engineering, cloud technologies, data integration, emerging technologies, and knowledge sharing. I enjoy exploring practical approaches to designing maintainable systems and solving engineering problems.',
} as const;

export const expertiseMapCategories = [
  { id: 'solution-architecture', label: 'Solution Architecture', icon: 'architecture' },
  { id: 'software-engineering', label: 'Software Engineering', icon: 'engineering' },
  { id: 'cloud-devops', label: 'Cloud & DevOps', icon: 'cloud' },
  { id: 'data-integration', label: 'Data & Integration', icon: 'integration' },
  { id: 'ai-emerging', label: 'AI & Emerging Technologies', icon: 'ai' },
  { id: 'web-development', label: 'Web Development', icon: 'web' },
  { id: 'testing-quality', label: 'Testing & Quality', icon: 'quality' },
  { id: 'technical-leadership', label: 'Technical Leadership', icon: 'leadership' },
] as const;

export const capabilityAreas = [
  {
    id: 'solution-architecture',
    title: 'Solution & Enterprise Architecture',
    description:
      'Explore architecture practices for connecting business needs with maintainable systems, integration boundaries, and practical technology choices.',
    icon: 'architecture',
    skills: [
      'Solution Architecture',
      'Enterprise Architecture',
      'System Design',
      'Integration Architecture',
      'Modernization Strategy',
    ],
    subcategoryIds: ['architecture-strategy', 'enterprise'],
    projectIds: ['onemes', 'cardinal'],
  },
  {
    id: 'full-stack-engineering',
    title: 'Full-Stack Engineering',
    description:
      'Build and evolve web applications across user interfaces, application services, APIs, and data-backed features.',
    icon: 'engineering',
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'REST API design'],
    subcategoryIds: ['frontend', 'backend', 'programming', 'testing-quality'],
    projectIds: ['cardinal', 'rise-automation', 'praedico-education-stock-prediction-portal'],
  },
  {
    id: 'cloud-delivery',
    title: 'Cloud, DevOps & Delivery',
    description:
      'Consider cloud platforms, containerization, automation, and release practices that support dependable delivery.',
    icon: 'cloud',
    skills: ['AWS', 'Docker', 'CI/CD pipelines', 'Release management', 'Deployment architecture'],
    subcategoryIds: ['cloud-devops'],
    projectIds: ['onemes', 'cardinal', 'rise-automation'],
  },
  {
    id: 'data-integration',
    title: 'Data, APIs & Integration',
    description:
      'Work with data models, service contracts, and integrations that help applications communicate clearly.',
    icon: 'integration',
    skills: ['REST API design', 'API integration', 'MongoDB', 'MySQL', 'Relational database design'],
    subcategoryIds: ['backend', 'databases'],
    projectIds: ['onemes', 'cardinal', 'praedico-education-stock-prediction-portal'],
  },
  {
    id: 'ai-emerging',
    title: 'AI & Emerging Technologies',
    description:
      'Explore practical applications of AI and machine learning with attention to appropriate use and evaluation.',
    icon: 'ai',
    skills: ['Machine learning', 'Neural networks', 'Python', 'AI-related application development'],
    subcategoryIds: ['ai'],
    projectIds: [
      'onemes',
      'praedico-education-stock-prediction-portal',
      'praedico-neural-portfolio-assist',
    ],
  },
  {
    id: 'leadership-knowledge',
    title: 'Technical Leadership & Knowledge Sharing',
    description:
      'Support collaborative engineering through clear communication, technical reviews, mentoring, and practical learning.',
    icon: 'leadership',
    skills: [
      'Stakeholder communication',
      'Technical mentoring',
      'Design & code reviews',
      'Workshops',
      'Knowledge sharing & enablement',
    ],
    subcategoryIds: ['mentoring', 'ways-of-working'],
    projectIds: ['onemes', 'cardinal'],
  },
] as const;

export const problemSolvingApproach = {
  title: 'How I Approach Technology Challenges',
  introduction:
    'Good technical solutions begin with a clear understanding of the problem. My approach is to connect requirements with thoughtful design, reliable implementation, and continuous improvement.',
  steps: [
    {
      id: 'understand',
      title: 'Understand',
      description: 'Clarify objectives, users, constraints, and requirements.',
    },
    {
      id: 'design',
      title: 'Design',
      description: 'Define system architecture, components, data flows, and integrations.',
    },
    {
      id: 'build',
      title: 'Build',
      description: 'Focus on implementation quality, testing, security, and maintainability.',
    },
    {
      id: 'improve',
      title: 'Improve',
      description: 'Review feedback and identify opportunities for refinement.',
    },
  ],
} as const;

export const expertiseClosing = {
  title: "Let's Connect and Exchange Ideas.",
  description:
    'Interested in technology, software architecture, engineering, or knowledge sharing? Connect with me to exchange ideas or discuss a potential collaboration.',
} as const;
