'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  ChevronRight,
  ChevronDown,
  Cloud,
  Code2,
  GitBranch,
  Network,
  UsersRound,
} from 'lucide-react';
import { capabilityAreas, expertiseCategories } from '@/content/expertise';
import { projects } from '@/content/projects';

const icons = {
  architecture: Network,
  engineering: Code2,
  cloud: Cloud,
  integration: GitBranch,
  ai: BrainCircuit,
  leadership: UsersRound,
} as const;

const projectsById = new Map(projects.map((project) => [project.id, project]));
const categoriesById = new Map(expertiseCategories.map((category) => [category.id, category]));

export function CapabilityExplorer() {
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const selectedArea = capabilityAreas.find((area) => area.id === selectedAreaId);
  const subcategories =
    selectedArea?.subcategoryIds
      .map((id) => categoriesById.get(id))
      .filter((category) => category !== undefined) ?? [];
  const relatedProjects =
    selectedArea?.projectIds
      .map((id) => projectsById.get(id))
      .filter((project) => project !== undefined) ?? [];

  return (
    <div>
      <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {capabilityAreas.map((area) => {
          const Icon = icons[area.icon];
          const selected = selectedAreaId === area.id;

          return (
            <li key={area.id}>
              <button
                type="button"
                aria-pressed={selected}
                aria-controls={selected ? 'capability-subcategories' : undefined}
                onClick={() => setSelectedAreaId(selected ? null : area.id)}
                className={`group flex h-full w-full flex-col rounded-xl border p-4 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-300 sm:p-5 ${
                  selected
                    ? 'border-aqua-300/55 bg-aqua-400/[0.07]'
                    : 'border-white/10 bg-ink-900/70 hover:border-aqua-300/35 hover:bg-ink-900'
                }`}
              >
                <span className="flex w-full items-start justify-between gap-4">
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-lg border ${
                      selected
                        ? 'border-aqua-300/40 bg-aqua-400/10 text-aqua-200'
                        : 'border-aqua-300/20 bg-aqua-400/5 text-aqua-300'
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`mt-1 shrink-0 text-slate-400 transition-transform ${
                      selected ? 'rotate-180 text-aqua-300' : 'group-hover:text-aqua-300'
                    }`}
                  />
                </span>
                <span className="mt-4 text-lg font-semibold leading-snug text-white">
                  {area.title}
                </span>
                <span className="mt-2 text-sm leading-6 text-slate-300">
                  {area.description}
                </span>
                <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {area.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/10 bg-white/[0.035] px-2 py-1 text-xs text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </span>
                <span className="mt-3 text-xs font-medium text-aqua-300">
                  {selected ? 'Hide subcategories' : 'Explore subcategories'}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {selectedArea && (
        <section
          id="capability-subcategories"
          aria-labelledby="capability-subcategories-title"
          className="mt-5 rounded-2xl border border-aqua-300/20 bg-ink-900/55 p-4 sm:p-6"
        >
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-aqua-300">
                Subcategories
              </p>
              <h3
                id="capability-subcategories-title"
                className="mt-1 text-xl font-semibold text-white sm:text-2xl"
              >
                {selectedArea.title}
              </h3>
            </div>
            <p className="text-sm text-slate-400">
              {subcategories.length} {subcategories.length === 1 ? 'area' : 'areas'}
            </p>
          </div>

          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {subcategories.map((category, index) => (
              <li
                key={category.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-ink-950/70 open:border-aqua-300/25"
              >
                <details className="group/subcategory" open={index === 0}>
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0">
                      <span className="block font-semibold text-white">{category.title}</span>
                      <span className="mt-0.5 block text-xs text-slate-400">
                        {category.skills.length} skills
                      </span>
                    </span>
                    <ChevronRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-aqua-300 transition-transform group-open/subcategory:rotate-90"
                    />
                  </summary>
                  <div className="border-t border-white/10 px-4 pb-4 pt-3">
                    <p className="text-sm leading-6 text-slate-300">{category.summary}</p>
                    <ul
                      aria-label={`${category.title} skills`}
                      className="mt-3 flex flex-wrap gap-1.5"
                    >
                      {category.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-md border border-white/10 bg-white/[0.035] px-2 py-1 text-xs text-slate-300"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </li>
            ))}
          </ul>

          {relatedProjects.length > 0 && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                Applied in projects
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {relatedProjects.map((project) => (
                  <li key={project.id}>
                    <Link
                      href={`/projects#${project.id}`}
                      className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-aqua-300 hover:text-white"
                    >
                      {project.title} <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
      {!selectedArea && (
        <p className="mt-4 text-sm text-slate-400">
          Select a capability to explore its subcategories and skills.
        </p>
      )}
    </div>
  );
}
