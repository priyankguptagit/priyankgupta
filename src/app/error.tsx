'use client';
import { Button } from '@/components/ui/Button';
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-bold text-white">This page could not be loaded</h1>
      <p className="my-5">
        Please try again. Your request details are not included in this error.
      </p>
      <Button onClick={reset}>Try again</Button>
    </section>
  );
}
