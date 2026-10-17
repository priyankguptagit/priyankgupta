import { z } from 'zod';

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
const institutionalAudienceCategories = [
  'School Students',
  'College Students',
  'University Students',
  'Teachers',
  'Faculty Members',
  'Educational Institutions',
  'NGOs',
  'Non-Profit Organizations',
] as const;

export const deliveryModes = ['Online', 'Offline', 'Hybrid', 'Either'] as const;
const budgetTypes = ['Free Session', 'Sponsored Session', 'To Be Discussed'] as const;
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
export const successMessage =
  'Thank you for your interest in organizing a learning session. Your request has been received. I will review the details and respond if the topic, schedule, and arrangements are feasible.';

export function isEventCategory(category: string): boolean {
  return ![
    'General Professional Query',
    'Collaboration Request',
    'Topic Suggestion',
    'Other',
  ].includes(category);
}

export function requiresOrganization(category: string, audience: string): boolean {
  return (
    isEventCategory(category) &&
    (institutionalAudienceCategories.some((item) => item === audience) ||
      ['Corporate Teams', 'Technology Communities'].includes(audience))
  );
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
    organizationWebsite: z
      .string()
      .trim()
      .max(250, 'Use at most 250 characters.')
      .refine(
        (value) =>
          value === '' ||
          (/^https?:\/\//i.test(value) && z.string().url().safeParse(value).success),
        'Enter a valid website URL starting with http:// or https://.'
      )
      .optional(),
    designation: optionalText(120),
    subject: optionalText(160),
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
    if (!isEventCategory(input.category) && !input.subject) {
      context.addIssue({
        code: 'custom',
        path: ['subject'],
        message: 'Enter a subject for your enquiry.',
      });
    }
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
    if (
      requiresOrganization(input.category, input.audienceCategory || '') &&
      !input.organization
    ) {
      context.addIssue({
        code: 'custom',
        path: ['organization'],
        message: 'Enter the organization or institution name.',
      });
    }
    if (
      isEventCategory(input.category) &&
      ['Offline', 'Hybrid'].includes(input.preferredMode || '')
    ) {
      if (!input.city) {
        context.addIssue({
          code: 'custom',
          path: ['city'],
          message: 'Enter the city for an in-person session.',
        });
      }
      if (!input.country) {
        context.addIssue({
          code: 'custom',
          path: ['country'],
          message: 'Enter the country for an in-person session.',
        });
      }
    }
  });

export type InquiryInput = z.infer<typeof inquirySchema>;
export type FieldError = { field: string; message: string };
export const inquirySuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({ referenceId: z.string().uuid() }),
  requestId: z.string().uuid(),
});
export const inquiryFailureResponseSchema = z.object({
  success: z.literal(false),
  requestId: z.string().uuid().optional(),
  recordSubmitted: z.boolean().optional(),
  data: z.object({ referenceId: z.string().uuid() }).optional(),
  errors: z
    .array(z.object({ field: z.string().max(100), message: z.string().max(300) }))
    .max(40)
    .optional(),
});
export function validationErrors(error: z.ZodError): FieldError[] {
  return error.issues.map((issue) => ({
    field: String(issue.path[0] || 'form'),
    message:
      issue.code === 'unrecognized_keys'
        ? 'Unexpected fields are not allowed.'
        : issue.message,
  }));
}
