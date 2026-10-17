'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Send, LoaderCircle } from 'lucide-react';
import {
  categories,
  eventTypes,
  inquirySchema,
  isEventCategory,
  requiresOrganization,
  validationErrors,
  type FieldError,
} from '@/lib/inquiry-contract';
import { Button } from '@/components/ui/Button';
import { Checkbox, Field, FormStatus, Honeypot, controlClasses } from './Field';
import { inquiryFields, type InquiryField } from '@/features/contact/fields';
import { submitInquiry } from '@/lib/apiClient';
import { topicNames } from '@/content/session-topics';

const fieldGroups: readonly {
  title: string;
  names: ReadonlySet<string>;
}[] = [
  {
    title: 'Your contact details',
    names: new Set([
      'fullName',
      'email',
      'phone',
      'organization',
      'organizationWebsite',
      'designation',
    ]),
  },
  {
    title: 'Request details',
    names: new Set([
      'category',
      'subject',
      'eventType',
      'audienceCategory',
      'otherAudienceDescription',
      'proposedTopic',
      'audienceType',
      'expectedParticipants',
      'participantAgeGroup',
      'participantExperienceLevel',
    ]),
  },
  {
    title: 'Session logistics',
    names: new Set([
      'preferredMode',
      'preferredDate',
      'alternateDate',
      'preferredStartTime',
      'expectedDuration',
      'city',
      'state',
      'country',
      'venueAvailable',
    ]),
  },
  {
    title: 'Additional details',
    names: new Set(['technicalFacilities', 'message']),
  },
];

function initialValues(
  category: string,
  topic: string,
  eventType: string
): Record<string, string> {
  return {
    ...Object.fromEntries(inquiryFields.map((field) => [field.name, ''])),
    category: categories.some((value) => value === category) ? category : categories[0],
    proposedTopic: topic.slice(0, 200),
    eventType: eventTypes.some((value) => value === eventType) ? eventType : '',
    budgetType: 'Free Session',
  };
}

export function ContactForm({
  initialCategory = categories[0],
  initialTopic = '',
  initialEventType = '',
}: {
  initialCategory?: string;
  initialTopic?: string;
  initialEventType?: string;
}) {
  const [values, setValues] = useState(() =>
    initialValues(initialCategory, initialTopic, initialEventType)
  );
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const locked = useRef(false);
  const summary = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const eventRequest = isEventCategory(values.category || categories[0]);
  const locationRequired = ['Offline', 'Hybrid'].includes(values.preferredMode || '');
  const inPersonRequest = ['Offline', 'Hybrid', 'Either'].includes(
    values.preferredMode || ''
  );
  const visibleFields = inquiryFields.filter(
    (field) =>
      (!field.eventOnly || eventRequest) &&
      (!field.generalOnly || !eventRequest) &&
      (field.name !== 'otherAudienceDescription' ||
        values.audienceCategory === 'Other') &&
      (field.name !== 'participantAgeGroup' ||
        ['School Students', 'College Students', 'University Students'].includes(
          values.audienceCategory || ''
        )) &&
      (field.name !== 'venueAvailable' ||
        ['Offline', 'Hybrid', 'Either'].includes(values.preferredMode || '')) &&
      (!['city', 'state', 'country', 'technicalFacilities'].includes(field.name) ||
        inPersonRequest)
  );

  useEffect(() => {
    if (!errors.length) return;
    const firstInvalid = form.current?.querySelector<HTMLElement>(
      '[aria-invalid="true"]'
    );
    (firstInvalid || summary.current)?.focus();
  }, [errors]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked.current) return;
    setStatus('idle');
    const payload: Record<string, unknown> = Object.fromEntries(
      visibleFields.map((field) => [field.name, values[field.name]])
    );
    if (payload.expectedParticipants === '') delete payload.expectedParticipants;
    else if (payload.expectedParticipants !== undefined)
      payload.expectedParticipants = Number(payload.expectedParticipants);
    const parsed = inquirySchema.safeParse({
      ...payload,
      consent,
      website,
      source: eventRequest ? 'session-request' : 'contact',
    });
    if (!parsed.success) {
      setErrors(validationErrors(parsed.error));
      setStatus('error');
      setMessage('Please correct the highlighted fields.');
      return;
    }
    locked.current = true;
    setSubmitting(true);
    setErrors([]);
    try {
      const result = await submitInquiry(parsed.data);
      setStatus(result.ok ? 'success' : 'error');
      setMessage(result.message);
      if (result.ok || result.recordSubmitted) {
        setValues(initialValues(initialCategory, initialTopic, initialEventType));
        setConsent(false);
        setWebsite('');
      } else setErrors(result.errors || []);
    } finally {
      locked.current = false;
      setSubmitting(false);
    }
  }

  return (
    <form
      ref={form}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={submitting}
      className="contact-form glass relative space-y-6 rounded-lg p-6 sm:p-7 xl:p-9"
    >
      <p className="text-sm">
        Fields marked * are required. Please avoid confidential information and individual
        participant details.
      </p>
      <Honeypot value={website} onChange={setWebsite} />
      {errors.length > 0 && (
        <div
          ref={summary}
          tabIndex={-1}
          aria-labelledby="error-summary-title"
          className="rounded-lg border border-magenta-400/60 bg-magenta-400/5 p-5"
        >
          <h3 id="error-summary-title" className="font-semibold">
            Please review your request
          </h3>
          <ul className="mt-2 space-y-1">
            {errors.map((error, index) => (
              <li key={`${error.field}-${index}`}>
                <button
                  type="button"
                  className="min-h-11 text-left text-sm underline"
                  onClick={() => {
                    const control = form.current?.elements.namedItem(error.field);
                    if (control instanceof HTMLElement) control.focus();
                  }}
                >
                  {inquiryFields.find((field) => field.name === error.field)?.label ||
                    'Consent'}
                  : {error.message}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="space-y-7">
        {fieldGroups.map((group) => {
          const groupFields = visibleFields.filter((field) =>
            group.names.has(field.name)
          );
          if (groupFields.length === 0) return null;

          return (
            <fieldset
              key={group.title}
              disabled={submitting}
              className="min-w-0 border-t border-white/10 pt-5"
            >
              <legend className="mb-4 px-0 text-base font-semibold text-white">
                {group.title}
              </legend>
              <div className="grid min-w-0 items-end gap-x-5 gap-y-8 sm:grid-cols-2">
                {groupFields.map((field) => (
                  <div
                    key={field.name}
                    className={field.type === 'textarea' ? 'sm:col-span-2' : ''}
                  >
                    <InquiryControl
                      field={field}
                      value={values[field.name] || ''}
                      required={
                        field.required ||
                        (field.name === 'organization' &&
                          requiresOrganization(
                            values.category || categories[0],
                            values.audienceCategory || ''
                          )) ||
                        (['city', 'country'].includes(field.name) && locationRequired)
                      }
                      error={errors.find((error) => error.field === field.name)?.message}
                      onChange={(value) =>
                        setValues((current) => ({
                          ...current,
                          [field.name]: value,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </fieldset>
          );
        })}
      </div>
      {eventRequest && (
        <p className="text-sm">
          Sessions are free and subject to confirmation. Dates must be today or later
          (UTC). In-person or hybrid requests need a city and country so feasibility can
          be considered. Please include a time zone in the message for online sessions.
        </p>
      )}
      <fieldset disabled={submitting} className="min-w-0 border-t border-white/10 pt-6">
        <legend className="sr-only">Privacy consent</legend>
        <Checkbox
          name="consent"
          checked={consent}
          onChange={setConsent}
          error={errors.find((error) => error.field === 'consent')?.message}
        >
          I consent to the use of these details to respond to this request, as described
          in the{' '}
          <Link href="/privacy" className="underline">
            privacy notice
          </Link>
          . No marketing subscription is created. *
        </Checkbox>
      </fieldset>
      <FormStatus state={status} message={message} />
      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? (
          <LoaderCircle
            size={18}
            aria-hidden="true"
            className="motion-safe:animate-spin"
          />
        ) : (
          <Send size={18} aria-hidden="true" />
        )}
        {submitting ? 'Sending request...' : 'Send request'}
      </Button>
    </form>
  );
}

function InquiryControl({
  field,
  value,
  required = field.required,
  error,
  onChange,
}: {
  field: InquiryField;
  value: string;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field
      label={field.label}
      required={required}
      hint={field.hint}
      error={error}
      floating={
        !field.options &&
        !['textarea', 'date', 'number'].includes(field.type || '') &&
        field.label.length < 25
      }
    >
      {(props) => {
        const common = {
          ...props,
          name: field.name,
          required,
          value,
          className: controlClasses,
          onChange: (
            event: React.ChangeEvent<
              HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
          ) => onChange(event.target.value),
        };
        if (field.options)
          return (
            <select {...common}>
              <option value="">Select an option</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        if (field.type === 'textarea')
          return <textarea {...common} rows={5} maxLength={field.maxLength} />;
        return (
          <>
            <input
              {...common}
              type={field.type || 'text'}
              placeholder=" "
              autoComplete={field.autoComplete}
              maxLength={field.maxLength}
              list={field.name === 'proposedTopic' ? 'session-topic-options' : undefined}
              min={field.type === 'number' ? 1 : undefined}
              max={field.type === 'number' ? 100000 : undefined}
              step={field.type === 'number' ? 1 : undefined}
            />
            {field.name === 'proposedTopic' && (
              <datalist id="session-topic-options">
                {topicNames.map((topic) => (
                  <option key={topic} value={topic} />
                ))}
              </datalist>
            )}
          </>
        );
      }}
    </Field>
  );
}
