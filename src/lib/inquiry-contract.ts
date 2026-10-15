import { z } from 'zod';

export { ZodError } from 'zod';

export const categories = [
  'General Professional Query',
  'Webinar Request',
  'Seminar Request',
  'Workshop Request',
  'Training Request',
  'Awareness Session Request',
  'Guest Lecture Request',
  'Mentoring Request',
  'Speaking Invitation',
  'Collaboration Request',
  'Career-Guidance Request',
  'Topic Suggestion',
  'Other',
] as const;

export const eventTypes = [
  'Webinar',
  'Seminar',
  'Workshop',
  'Technical Training',
  'Technology Awareness',
  'Career Guidance',
  'Mentoring',
  'Practical Learning',
  'Community Session',
  'Guest Lecture',
  'Technical Presentation',
  'Software Development Awareness',
  'Architecture Awareness',
  'Question and Answer',
] as const;

export const audienceCategories = [
  'School Students',
  'College Students',
  'University Students',
  'Final-Year Students',
  'Freshers',
  'Working Professionals',
  'IT Professionals',
  'Software Developers',
  'Technical Architects',
  'QA and Testing Professionals',
  'DevOps Professionals',
  'Business Analysts',
  'Product Professionals',
  'Startup Founders',
  'Entrepreneurs',
  'Teachers',
  'Faculty Members',
  'Educational Institutions',
  'Corporate Teams',
  'Technology Communities',
  'NGOs',
  'Non-Profit Organizations',
  'Career-Change Aspirants',
  'Job Seekers',
  'Other',
] as const;

export const deliveryModes = ['Online', 'Offline', 'Hybrid', 'Either'] as const;
export const budgetTypes = [
  'Free Session',
  'Sponsored Session',
  'To Be Discussed',
] as const;
export const durations = [
  '30 Minutes',
  '45 Minutes',
  '60 Minutes',
  '90 Minutes',
  '2 Hours',
  'Half Day',
  'Full Day',
  'To Be Discussed',
] as const;
export const inquiryStatuses = [
  'new',
  'reviewed',
  'contacted',
  'scheduled',
  'closed',
  'rejected',
  'spam',
] as const;

export const successMessage =
  'Thank you. Your request has been received. I will review the details and respond based on availability.';

export function isEventCategory(category: string): boolean {
  return ![
    'General Professional Query',
    'Collaboration Request',
    'Topic Suggestion',
    'Other',
  ].includes(category);
}

const safeText = (max: number, multiline = false) =>
  z
    .string()
    .trim()
    .max(max, `Use at most ${max} characters.`)
    .refine(
      (value) =>
        [...value].every((character) => {
          const code = character.charCodeAt(0);
          return (
            (code >= 32 && code !== 127) ||
            (multiline && ['\n', '\r', '\t'].includes(character))
          );
        }),
      'Remove unsupported control characters.'
    );

const optionalText = (max: number) => safeText(max).optional();

const optionalEnum = <Values extends [string, ...string[]]>(values: Values) =>
  z.union([z.enum(values), z.literal('')]).optional();

const calendarDate = z
  .string()
  .refine((value) => {
    if (value === '') return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, 'Use a valid date in YYYY-MM-DD format.')
  .optional();

export const inquirySchema = z
  .object({
    fullName: safeText(100)
      .pipe(z.string().min(2, 'Enter your full name.'))
      .refine(
        (value) => /\p{L}/u.test(value) && !/[<>]/.test(value),
        'Enter a name using letters, not only numbers or symbols.'
      ),
    email: safeText(254).pipe(
      z.string().toLowerCase().email('Please enter a valid email address.')
    ),
    phone: safeText(32)
      .refine(
        (value) =>
          value === '' ||
          (/^\+?[()\d .-]+$/.test(value) &&
            /^[0-9]{7,15}$/.test(value.replace(/\D/g, ''))),
        'Enter a phone number with 7 to 15 digits, or leave it empty.'
      )
      .optional(),
    organization: optionalText(160),
    designation: optionalText(120),
    category: z.enum(categories, {
      errorMap: () => ({ message: 'Select a query category.' }),
    }),
    eventType: optionalEnum([...eventTypes]),
    audienceCategory: optionalEnum([...audienceCategories]),
    otherAudienceDescription: optionalText(200),
    preferredMode: optionalEnum([...deliveryModes]),
    proposedTopic: optionalText(200),
    audienceType: optionalText(120),
    expectedParticipants: z
      .number({ invalid_type_error: 'Enter a whole number of participants.' })
      .int('Enter a whole number of participants.')
      .min(1, 'Enter at least 1 participant.')
      .max(100000, 'Enter no more than 100,000 participants.')
      .optional(),
    participantAgeGroup: optionalText(80),
    participantExperienceLevel: optionalText(120),
    preferredDate: calendarDate,
    alternateDate: calendarDate,
    preferredStartTime: z
      .string()
      .regex(/^$|^(?:[01]\d|2[0-3]):[0-5]\d$/, 'Use a valid 24-hour time.')
      .optional(),
    expectedDuration: optionalEnum([...durations]),
    city: optionalText(100),
    state: optionalText(100),
    country: optionalText(100),
    venueAvailable: optionalEnum(['Yes', 'No', 'To Be Discussed']),
    technicalFacilities: safeText(1000, true).optional(),
    budgetType: z.enum(budgetTypes).default('Free Session'),
    message: safeText(4000, true).pipe(
      z.string().min(20, 'Please provide at least 20 characters of context.')
    ),
    consent: z.literal(true, {
      errorMap: () => ({
        message: 'Please confirm consent to respond to your request.',
      }),
    }),
    website: z.string().max(0, 'Unable to submit this request.').default(''),
    source: z.enum(['contact', 'session-request']).default('contact'),
  })
  .strict()
  .superRefine((input, context) => {
    if (isEventCategory(input.category)) {
      const today = new Date().toISOString().slice(0, 10);
      for (const field of ['preferredDate', 'alternateDate'] as const) {
        if (input[field] && input[field] < today) {
          context.addIssue({
            code: 'custom',
            path: [field],
            message: 'Choose today or a future date (UTC).',
          });
        }
      }
      for (const field of [
        'eventType',
        'audienceCategory',
        'preferredMode',
        'proposedTopic',
      ] as const) {
        if (!input[field]) {
          context.addIssue({
            code: 'custom',
            path: [field],
            message: 'This field is required for an event request.',
          });
        }
      }
    }
    if (input.audienceCategory === 'Other' && !input.otherAudienceDescription) {
      context.addIssue({
        code: 'custom',
        path: ['otherAudienceDescription'],
        message: 'Describe the audience.',
      });
    }
  });

export type InquiryInput = z.infer<typeof inquirySchema>;
export type StoredInquiryInput = Omit<InquiryInput, 'website'>;
export type FieldError = { field: string; message: string };
export type InquiryResponse =
  | {
      success: true;
      message: string;
      data: { referenceId: string };
      requestId: string;
    }
  | {
      success: false;
      message: string;
      errors?: FieldError[];
      requestId: string;
    };

export function validationErrors(error: z.ZodError): FieldError[] {
  return error.issues.map((issue) => ({
    field: String(issue.path[0] || 'form'),
    message:
      issue.code === 'unrecognized_keys'
        ? 'Unexpected fields are not allowed.'
        : issue.message,
  }));
}
