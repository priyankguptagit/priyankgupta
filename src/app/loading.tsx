export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto max-w-6xl px-5 py-12 sm:px-8"
    >
      <span className="sr-only">Loading page...</span>
      <div aria-hidden="true" className="space-y-6">
        <div className="skeleton h-4 w-32 rounded bg-ink-700" />
        <div className="skeleton h-14 w-3/4 max-w-lg rounded bg-ink-700" />
        <div className="skeleton h-5 w-full max-w-2xl rounded bg-ink-700" />
        <div className="grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-[1fr_1.5fr]">
          <div className="skeleton h-64 rounded-lg bg-ink-800" />
          <div className="space-y-5">
            <div className="skeleton h-6 w-3/4 rounded bg-ink-800" />
            <div className="skeleton h-4 rounded bg-ink-800" />
            <div className="skeleton h-4 rounded bg-ink-800" />
            <div className="skeleton h-4 w-2/3 rounded bg-ink-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
