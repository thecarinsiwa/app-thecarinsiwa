'use client';

import Link from 'next/link';
import { ProjectCard } from '@/components/development/ProjectCard';
import type { ProjectCardData } from '@/components/development/ProjectCard.types';

interface FeaturedProjectsSectionProps {
  projects: ProjectCardData[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <section id="projects" className="relative border-t border-slate-200/80 bg-gradient-to-b from-slate-50/90 to-slate-100/50 py-20 dark:border-slate-700/80 dark:from-slate-900/60 dark:to-slate-900/40 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.18em] text-accent-green dark:text-accent-green-light">
              Selected work
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/development"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-green hover:underline dark:text-accent-green-light"
          >
            View all
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        {projects.length === 0 ? (
          <p className="mt-12 text-slate-500 dark:text-slate-400">Aucun projet mis en avant pour le moment.</p>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
