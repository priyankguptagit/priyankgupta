'use client';

import type { ReactNode } from 'react';
import { useId } from 'react';
import { CheckCircle2, CircleAlert } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FieldShellProps {
  readonly label: string;
  readonly error?: string;
  readonly hint?: string;
  readonly required?: boolean;
  readonly floating?: boolean;
  readonly children: (props: {
    id: string;
    'aria-invalid': boolean | undefined;
    'aria-describedby': string | undefined;
  }) => ReactNode;
}

export function Field({
  label,
  error,
  hint,
  required,
  floating = false,
  children,
}: FieldShellProps) {
  const id = useId();
  const reduced = useReducedMotion();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className="space-y-2">
      <div className={floating ? 'field-floating relative' : 'space-y-2'}>
        <label htmlFor={id} className="block text-sm font-medium text-white">
          {label}
          {required ? (
            <span className="ml-1 text-magenta-400" aria-hidden="true">
              *
            </span>
          ) : (
            <span className="ml-2 text-xs font-normal text-slate-500">(optional)</span>
          )}
        </label>

        {children({
          id,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': describedBy,
        })}
      </div>

      {hint ? (
        <p id={hintId} className="text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <m.p
          id={errorId}
          role="alert"
          className="flex items-start gap-2 text-sm font-medium text-magenta-400"
          initial={false}
          animate={reduced ? undefined : { x: [-3, 3, 0] }}
          transition={{ duration: 0.2 }}
        >
          <CircleAlert size={15} className="mt-1" aria-hidden="true" />
          {error}
        </m.p>
      ) : null}
    </div>
  );
}

export const controlClasses =
  'form-control w-full min-h-13 rounded-lg border border-white/20 px-3 py-3 text-base text-white transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-slate-500 hover:border-white/40 focus:border-aqua-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-300 aria-invalid:border-magenta-400';

interface CheckboxProps {
  readonly name: string;
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
  readonly error?: string;
  readonly children: ReactNode;
}

export function Checkbox({ name, checked, onChange, error, children }: CheckboxProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-1 size-5 shrink-0 cursor-pointer rounded border-white/20 bg-ink-900 accent-aqua-400"
        />
        <label htmlFor={id} className="text-base leading-relaxed text-slate-300">
          {children}
        </label>
      </div>
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-xs font-medium text-magenta-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Off-screen bot trap. Not `display:none` so naive bots still fill it. */
export function Honeypot({
  value,
  onChange,
}: {
  readonly value: string;
  readonly onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website-field">Leave this field empty</label>
      <input
        id="website-field"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

interface FormStatusProps {
  readonly state: 'idle' | 'success' | 'error';
  readonly message: string;
}

export function FormStatus({ state, message }: FormStatusProps) {
  const reduced = useReducedMotion();
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        state === 'idle'
          ? 'sr-only'
          : 'flex items-start gap-3 rounded-lg border px-5 py-4 text-sm',
        state === 'success'
          ? 'border-emerald-300/40 bg-emerald-300/5 text-emerald-300'
          : 'border-magenta-400/40 bg-magenta-400/5 text-magenta-400'
      )}
    >
      {state !== 'idle' && (
        <m.span
          aria-hidden="true"
          initial={false}
          animate={reduced ? undefined : { scale: [0.8, 1.1, 1] }}
          transition={{ duration: 0.35 }}
        >
          {state === 'success' ? <CheckCircle2 size={20} /> : <CircleAlert size={20} />}
        </m.span>
      )}
      <span>{message}</span>
    </div>
  );
}
