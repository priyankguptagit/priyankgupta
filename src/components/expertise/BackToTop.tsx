'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 80);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  if (!visible) return null;

  return createPortal(
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
      }}
      className="fixed right-4 bottom-4 z-[100] grid size-11 place-items-center rounded-full border border-aqua-300/35 bg-ink-900/95 text-aqua-300 shadow-lg backdrop-blur transition-colors hover:border-aqua-300 hover:bg-ink-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-300 sm:right-6 sm:bottom-6"
    >
      <ArrowUp size={19} aria-hidden="true" />
    </button>,
    document.body
  );
}
