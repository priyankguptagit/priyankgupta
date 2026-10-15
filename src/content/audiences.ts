import { audienceCategories } from '@/lib/inquiry-contract';

export const audienceNames = audienceCategories;

export interface Audience {
  id: string;
  name: string;
  slug: string;
  description: string;
  recommendedTopics: readonly string[];
  sessionTypes: readonly string[];
  deliveryModes: readonly string[];
  featured: boolean;
}

export const audiences: readonly Audience[] = audienceNames.map((name, index) => ({
  id: `audience-${index + 1}`,
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  description: name === 'Other' ? 'Other interested people are welcome to suggest their learning goals.' : `Practical learning for ${name.toLowerCase()}, with scope adapted to the group.`,
  recommendedTopics: index < 5
    ? ['Modern web development', 'Technology awareness', 'Career guidance in technology']
    : ['Solution architecture', 'Software engineering best practices', 'AI awareness'],
  sessionTypes: ['Webinar', 'Seminar', 'Workshop', 'Technical Training'],
  deliveryModes: ['Online', 'Offline'],
  featured: [0, 1, 5, 17, 18, 24].includes(index),
}));