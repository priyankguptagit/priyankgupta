'use client';

import Link from 'next/link';
import { ArrowUpRight, BookOpenText, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import type { ResearchPaper } from '@/content/research';

export function ResearchPaperCard({ paper }: { readonly paper: ResearchPaper }) {
  const [expanded, setExpanded] = useState(false);
  const abstractText = expanded ? paper.abstract : `${paper.abstract.slice(0, 260).trim()}...`;

  return (
    <Card as="article" className="space-y-5 rounded-2xl border border-white/10 bg-ink-950/60 p-5 sm:p-6 lg:p-7">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-aqua-300">
          <span>{paper.type}</span>
          <span className="text-slate-500">•</span>
          <span>{paper.year}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={paper.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-aqua-400/40 bg-aqua-400/10 px-3 py-2 text-sm font-medium text-aqua-200 transition hover:border-aqua-300 hover:bg-aqua-400/15"
          >
            <FileText size={16} aria-hidden="true" />
            Full Paper
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          {paper.articleLink && (
            <Link
              href={paper.articleLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:text-white"
            >
              Article Link
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      <h2 className="max-w-[70ch] text-2xl font-semibold leading-tight text-white sm:text-[28px]">
        {paper.title}
      </h2>

      <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
        <p>
          <span className="font-medium text-white">Publisher:</span> {paper.publisher}
        </p>
        <p>
          <span className="font-medium text-white">Published:</span>{' '}
          {paper.publicationDate ?? paper.year}
        </p>
        <p className="sm:col-span-2">
          <span className="font-medium text-white">Authors:</span>{' '}
          {paper.authors.join(', ')}
        </p>
        {paper.reads && <p>Reads: {paper.reads}</p>}
        {paper.citations && <p>Citations: {paper.citations}</p>}
      </div>

      <div className="rounded-2xl border border-white/10 bg-ink-950/70 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
            <BookOpenText size={14} aria-hidden="true" /> Abstract
          </p>
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            aria-controls={`abstract-${paper.id}`}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-white/20 hover:text-white"
          >
            {expanded ? 'Collapse abstract' : 'Expand abstract'}
            {expanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
          </button>
        </div>

        <div className="w-full">
          <p id={`abstract-${paper.id}`} className="text-base leading-7 text-slate-300">
            {abstractText}
          </p>
        </div>
      </div>
    </Card>
  );
}
