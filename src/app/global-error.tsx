'use client';
import Link from 'next/link';
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <h1>The application could not be loaded</h1>
          <p>Please try again.</p>
          <button type="button" onClick={reset}>
            Try again
          </button>
          <p>
            <Link href="/">Return home</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
