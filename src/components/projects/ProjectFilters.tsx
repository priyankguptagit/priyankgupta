'use client';

import type { ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ProjectFilters({
  categories,
  activeCategory,
  search,
  onCategoryChange,
  onSearchChange,
}: {
  readonly categories: readonly string[];
  readonly activeCategory: string;
  readonly search: string;
  readonly onCategoryChange: (value: string) => void;
  readonly onSearchChange: (value: string) => void;
}) {
  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-ink-950/70 p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              type="button"
              variant={activeCategory === category ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={activeCategory === category ? 'border-aqua-400/50' : 'border-white/10'}
            >
              {category}
            </Button>
          ))}
        </div>

        <label className="relative block w-full max-w-sm">
          <span className="sr-only">Search projects</span>
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onSearchChange(event.target.value)}
            placeholder="Search projects"
            className="w-full border border-white/10 bg-slate-950/60 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-aqua-400/60 focus:outline-none"
          />
        </label>
      </div>
    </div>
  );
}
