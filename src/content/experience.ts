import type { Experience } from '@/types';

/**
 * Career timeline. Titles, dates, responsibilities and achievements for previous
 * employers are intentionally left as placeholders — never infer them.
 * Client names, confidential project names and proprietary systems must not appear here.
 */
export const experiences: readonly Experience[] = [
  {
    id: 'numeric-infosystem',
    company: 'Numeric Info Systems Pvt. Ltd.',
    designation: 'Web Developer',
    employmentType: '[Add employment type]',
    location: '[Add location]',
    startDate: 'July 2013',
    endDate: 'June 2018',
    currentlyWorking: false,
    summary: '[Add public professional summary]',
    responsibilities: [],
    achievements: [],
    technologies: [],
    domain: '[Add industry or domain]',
    projects: [],
    logo: '[Add organization logo]',
    website: '[Add website URL]',
    confidential: false,
    order: 1,
  },
  {
    id: 'praedic-global-research',
    company: 'Praedico Global Research Pvt. Ltd.',
    designation: 'Senior Web, Machine Learning and Neural Network Developer',
    employmentType: '[Add employment type]',
    location: '[Add location]',
    startDate: 'July 2018',
    endDate: 'September 2021',
    currentlyWorking: false,
    summary: '[Add public professional summary]',
    responsibilities: [],
    achievements: [],
    technologies: [],
    domain: '[Add industry or domain]',
    projects: [],
    logo: '[Add organization logo]',
    website: '[Add website URL]',
    confidential: false,
    order: 2,
  },
  {
    id: 'ltm',
    company: 'LTIMindtree Ltd.',
    designation: 'Specialist - Package Implementation Developer',
    employmentType: '[Add employment type]',
    location: '[Add location]',
    startDate: 'October 2021',
    endDate: 'December 2023',
    currentlyWorking: false,
    summary: '[Add public professional summary]',
    responsibilities: [],
    achievements: [],
    technologies: [],
    domain: '[Add industry or domain]',
    projects: [],
    logo: '[Add organization logo]',
    website: '[Add website URL]',
    confidential: false,
    order: 3,
  },
  {
    id: 'current-role',
    company: 'Current employer withheld pending approval',
    designation: 'Senior Tech Lead - Development',
    employmentType: '[Add employment type]',
    location: '[Add location]',
    startDate: 'January 2024',
    endDate: 'Present',
    currentlyWorking: true,
    summary: '[Add public professional summary]',
    responsibilities: [],
    achievements: [],
    technologies: [],
    domain: '[Add industry or domain]',
    projects: [],
    logo: '[Add organization logo]',
    website: '[Add website URL]',
    confidential: false,
    order: 4,
  },
];

export const currentRole =
  experiences.find((item) => item.currentlyWorking) ?? experiences[experiences.length - 1];

export const experiencesNewestFirst: readonly Experience[] = [...experiences].sort(
  (a, b) => b.order - a.order
);
