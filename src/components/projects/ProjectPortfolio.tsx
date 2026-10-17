'use client';

import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { projectCategories, projects } from '@/content/projects';
import type { Project } from '@/types';
import { ProjectDetails } from './ProjectDetails';
import { ProjectFilters } from './ProjectFilters';
import { ProjectGrid } from './ProjectGrid';

export function ProjectPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.categories.includes(selectedCategory);
      const searchableText = [
        project.title,
        project.client,
        project.role,
        project.overview,
        ...project.technologies,
        ...project.categories,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const matchesSearch = !query || searchableText.includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Selected Projects"
        description="Enterprise applications, intelligent financial systems, workflow automation, and scalable digital solutions built across my professional journey."
      />
      <Section>
        <div className="space-y-6">
          <div className="max-w-3xl">
            <p className="text-base leading-7 text-slate-300">
              I work across enterprise architecture, full-stack engineering, AI integration, and scalable product delivery — translating business needs into maintainable systems that solve real operational problems.
            </p>
          </div>
          <ProjectFilters
            categories={projectCategories}
            activeCategory={selectedCategory}
            search={search}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearch}
          />
          <ProjectGrid projects={filteredProjects} onSelectProject={setSelectedProject} />
        </div>
      </Section>

      {selectedProject &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink-950/80 p-3 backdrop-blur-sm sm:p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedProject(null);
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              className="project-modal-scroll relative h-[80dvh] w-full max-w-6xl overflow-y-auto overscroll-contain rounded-lg border border-white/10 bg-ink-950 shadow-[0_30px_80px_rgba(15,23,42,0.35)]"
            >
              <div className="sticky top-0 z-10 border-b border-white/10 bg-ink-950/95 px-4 py-3 backdrop-blur-sm sm:px-5">
                <div className="flex items-start gap-3 sm:items-center sm:gap-5">
                  <h2
                    id="project-modal-title"
                    className="min-w-0 flex-1 text-xl font-semibold leading-tight text-white sm:text-2xl"
                  >
                    {selectedProject.title}
                  </h2>
                  <div className="hidden min-w-0 flex-[1.4] sm:block">
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-aqua-300">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] leading-4 text-slate-300"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close project details"
                    className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-300"
                  >
                    <X size={17} aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="project-modal-content p-3.5 sm:p-4 lg:p-5">
                <ProjectDetails
                  project={selectedProject}
                  onClose={() => setSelectedProject(null)}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
