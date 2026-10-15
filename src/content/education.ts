import type { Education } from '@/types';

const academicRecords: readonly Education[] = [
  {
    id: 'mphil',
    degree: 'Master of Philosophy (M.Phil.)',
    shortDegree: 'M.Phil.',
    specialization: 'Computer Science',
    institution: 'Jiwaji University',
    location: '[Add location]',
    startYear: '[Add year]',
    endYear: '2013',
    researchArea: '[Add research area]',
    thesisTitle: '[Add dissertation title]',
    achievements: [],
    description: '[Add description of the M.Phil. research focus]',
    order: 3,
  },
  {
    id: 'msc',
    degree: 'Master of Science (M.Sc.)',
    shortDegree: 'M.Sc.',
    specialization: 'Computer Science',
    institution: '[Add university]',
    location: '[Add location]',
    startYear: '[Add year]',
    endYear: '2010',
    researchArea: '[Add research area]',
    thesisTitle: '[Add thesis title]',
    achievements: [],
    description: '[Add description of the postgraduate programme and key subjects]',
    order: 2,
  },
  {
    id: 'bsc',
    degree: 'Bachelor of Science (B.Sc.)',
    shortDegree: 'B.Sc.',
    specialization: 'Computer Science',
    institution: '[Add university]',
    location: '[Add location]',
    startYear: '[Add year]',
    endYear: '2008',
    researchArea: '[Add research area]',
    thesisTitle: '[Add thesis title]',
    achievements: [],
    description: '[Add description of the undergraduate programme and key subjects]',
    order: 1,
  },
];

export const education = academicRecords;

export const academicInterests: readonly string[] = [
  '[Add research interest]',
  '[Add publication or paper]',
  '[Add academic collaboration]',
];
