import { eventTypes } from '@/lib/inquiry-contract';

export { eventTypes };

export const sessionTopics = [
  {
    id: 'technology-foundations-for-school-students',
    title: 'Technology foundations for school students',
    description:
      'An age-aware introduction to digital literacy, logical thinking, and how software is built.',
    audience: 'School students',
    level: 'Introductory',
    formats: ['Seminar', 'Webinar'],
    duration: '30–60 minutes',
  },
  {
    id: 'introduction-to-web-development',
    title: 'Introduction to web development',
    description:
      'How HTML, CSS, and JavaScript work together to create interactive websites.',
    audience: 'Beginners and college students',
    level: 'Beginner',
    formats: ['Seminar', 'Webinar', 'Workshop'],
    duration: '45–90 minutes',
  },
  {
    id: 'modern-react-and-typescript',
    title: 'Modern React and TypeScript',
    description:
      'Component-based interfaces, typed application code, and practical frontend patterns.',
    audience: 'College students and working professionals',
    level: 'Intermediate',
    formats: ['Seminar', 'Webinar', 'Workshop', 'Technical Training'],
    duration: '60–90 minutes; workshops may run 1–3 hours',
  },
  {
    id: 'full-stack-application-development',
    title: 'Full-stack application development',
    description:
      'A practical overview of connecting a modern web interface to application services and data.',
    audience: 'College students and working professionals',
    level: 'Intermediate',
    formats: ['Seminar', 'Webinar', 'Workshop', 'Technical Training'],
    duration: '60–90 minutes; workshops may run 1–3 hours',
  },
  {
    id: 'rest-api-design-and-integration',
    title: 'REST API design and integration',
    description:
      'API contracts, request and response design, integration patterns, and maintainability.',
    audience: 'College students and working professionals',
    level: 'Intermediate',
    formats: ['Seminar', 'Webinar', 'Workshop', 'Technical Training'],
    duration: '45–90 minutes',
  },
  {
    id: 'web-application-architecture',
    title: 'Web application architecture and scalability',
    description:
      'Architecture decisions for maintainable web systems, with attention to trade-offs and scale.',
    audience: 'Working professionals and advanced students',
    level: 'Intermediate',
    formats: ['Seminar', 'Webinar', 'Technical Training'],
    duration: '45–90 minutes',
  },
  {
    id: 'solution-architecture-fundamentals',
    title: 'Solution architecture fundamentals',
    description:
      'Mapping business needs to technical choices, system boundaries, and delivery considerations.',
    audience: 'Working professionals and advanced students',
    level: 'Intermediate',
    formats: ['Seminar', 'Webinar', 'Technical Training'],
    duration: '45–90 minutes',
  },
  {
    id: 'software-quality-testing-and-clean-code',
    title: 'Software quality, testing, and clean code',
    description:
      'Foundations for readable code, repeatable testing, and improving software quality.',
    audience: 'College students and working professionals',
    level: 'Beginner to intermediate',
    formats: ['Seminar', 'Webinar', 'Workshop'],
    duration: '45–90 minutes',
  },
  {
    id: 'git-and-version-control',
    title: 'Git and version control workflows',
    description:
      'Core version-control concepts and collaborative development workflows.',
    audience: 'Beginners and college students',
    level: 'Beginner',
    formats: ['Seminar', 'Webinar', 'Workshop'],
    duration: '45–90 minutes',
  },
  {
    id: 'ai-and-machine-learning-awareness',
    title: 'AI and machine-learning awareness',
    description:
      'Introductory concepts, practical applications, responsible use, and common limitations.',
    audience: 'Students and working professionals',
    level: 'Introductory',
    formats: ['Seminar', 'Webinar'],
    duration: '30–60 minutes',
  },
  {
    id: 'machine-learning-and-recurrent-neural-networks',
    title: 'Machine learning and recurrent neural networks',
    description:
      'An introduction to sequence-based prediction and recurrent neural network research.',
    audience: 'University students and working professionals',
    level: 'Intermediate',
    formats: ['Seminar', 'Webinar', 'Technical Training'],
    duration: '60–90 minutes',
  },
  {
    id: 'predictive-modeling-and-feature-selection',
    title: 'Predictive modeling and feature selection',
    description:
      'Research-informed discussion of predictive models, feature selection, and evaluating results.',
    audience: 'University students and working professionals',
    level: 'Intermediate',
    formats: ['Seminar', 'Webinar', 'Technical Training'],
    duration: '60–90 minutes',
  },
  {
    id: 'web-accessibility-fundamentals',
    title: 'Web accessibility fundamentals',
    description:
      'Practical accessibility principles for making modern web interfaces more inclusive.',
    audience: 'College students and working professionals',
    level: 'Beginner',
    formats: ['Seminar', 'Webinar', 'Workshop'],
    duration: '45–90 minutes',
  },
  {
    id: 'technology-career-and-project-guidance',
    title: 'Technology career and project guidance',
    description:
      'Discussing learning paths, technical project planning, and building practical experience.',
    audience: 'Students and early-career professionals',
    level: 'Introductory',
    formats: ['Seminar', 'Webinar', 'Question and Answer'],
    duration: '30–60 minutes',
  },
] as const;

export const topicNames = sessionTopics.map((topic) => topic.title);

export const sessionConditions = [
  'Free knowledge-sharing sessions are offered subject to availability, topic alignment, audience requirements, and mutual scheduling.',
  'Submitting a request does not guarantee confirmation. The topic, audience level, format, dates, and duration are agreed in advance.',
  'Online or in-person arrangements depend on feasibility and mutual agreement.',
  'Travel, accommodation, venue, equipment, or other expenses are not automatically included and must be discussed and agreed beforehand.',
  'Materials, recordings, certificates, and follow-up sessions are optional and must be confirmed separately.',
  'Sessions are educational and do not represent the views of any employer.',
] as const;
