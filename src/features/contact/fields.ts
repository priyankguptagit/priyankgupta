import {
  audienceCategories,
  budgetTypes,
  categories,
  deliveryModes,
  durations,
  eventTypes,
  type InquiryInput,
} from '@/lib/inquiry-contract';

export interface InquiryField {
  name: Exclude<keyof InquiryInput, 'consent' | 'website' | 'source'>;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'time' | 'number' | 'textarea';
  options?: readonly string[];
  required?: boolean;
  eventOnly?: boolean;
  maxLength?: number;
  autoComplete?: string;
}

export const inquiryFields: readonly InquiryField[] = [
  { name: 'fullName', label: 'Full Name', required: true, maxLength: 100, autoComplete: 'name' },
  { name: 'email', label: 'Email Address', type: 'email', required: true, maxLength: 254, autoComplete: 'email' },
  { name: 'phone', label: 'Phone Number', type: 'tel', maxLength: 32, autoComplete: 'tel' },
  { name: 'organization', label: 'Organization or Institution', maxLength: 160, autoComplete: 'organization' },
  { name: 'designation', label: 'Role or Designation', maxLength: 120, autoComplete: 'organization-title' },
  { name: 'category', label: 'Query Category', options: categories, required: true },
  { name: 'eventType', label: 'Event Type', options: eventTypes, required: true, eventOnly: true },
  { name: 'audienceCategory', label: 'Audience Category', options: audienceCategories, required: true, eventOnly: true },
  { name: 'otherAudienceDescription', label: 'Other Audience Description', required: true, maxLength: 200, eventOnly: true },
  { name: 'preferredMode', label: 'Preferred Delivery Mode', options: deliveryModes, required: true, eventOnly: true },
  { name: 'proposedTopic', label: 'Proposed Topic', required: true, maxLength: 200, eventOnly: true },
  { name: 'audienceType', label: 'Audience Type or Additional Context', maxLength: 120, eventOnly: true },
  { name: 'expectedParticipants', label: 'Expected Number of Participants', type: 'number', eventOnly: true },
  { name: 'participantAgeGroup', label: 'Participant Age Group', maxLength: 80, eventOnly: true },
  { name: 'participantExperienceLevel', label: 'Participant Experience Level', maxLength: 120, eventOnly: true },
  { name: 'preferredDate', label: 'Preferred Date', type: 'date', eventOnly: true },
  { name: 'alternateDate', label: 'Alternate Date', type: 'date', eventOnly: true },
  { name: 'preferredStartTime', label: 'Preferred Start Time (venue local time)', type: 'time', eventOnly: true },
  { name: 'expectedDuration', label: 'Expected Session Duration', options: durations, eventOnly: true },
  { name: 'city', label: 'City', maxLength: 100, autoComplete: 'address-level2', eventOnly: true },
  { name: 'state', label: 'State', maxLength: 100, autoComplete: 'address-level1', eventOnly: true },
  { name: 'country', label: 'Country', maxLength: 100, autoComplete: 'country-name', eventOnly: true },
  { name: 'venueAvailable', label: 'Venue Availability', options: ['Yes', 'No', 'To Be Discussed'], eventOnly: true },
  { name: 'technicalFacilities', label: 'Technical Facilities Available', type: 'textarea', maxLength: 1000, eventOnly: true },
  { name: 'budgetType', label: 'Budget Type', options: budgetTypes, eventOnly: true },
  { name: 'message', label: 'Message or Additional Details', type: 'textarea', required: true, maxLength: 4000 },
];