'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';

function subscribe(callback: () => void) {
  window.addEventListener('themechange', callback);
  return () => window.removeEventListener('themechange', callback);
}

function getTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'dark');
  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={theme === 'light'}
      className="theme-toggle grid size-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-colors hover:border-aqua-400/50 hover:text-aqua-300"
      onClick={() => {
        const next = theme === 'dark' ? 'light' : 'dark';
        const applyTheme = () => {
          document.documentElement.dataset.theme = next;
          window.dispatchEvent(new Event('themechange'));
          try {
            localStorage.setItem('priyank-theme', next);
          } catch {
            return;
          }
        };
        if (
          document.startViewTransition &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          document.startViewTransition(applyTheme);
        } else {
          applyTheme();
        }
      }}
    >
      {theme === 'dark' ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
}
