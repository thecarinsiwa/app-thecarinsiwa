'use client';

import Link from 'next/link';
import { ProjectCard } from '@/components/development/ProjectCard';
import type { ProjectCardData } from '@/components/development/ProjectCard.types';

interface FeaturedProjectsSectionProps {
  projects: ProjectCardData[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <section id="projects" className="border-t border-slate-200 bg-slate-50/50 py-16 dark:border-slate-700 dark:bg-slate-900/50 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            Featured Projects
          </h2>
          <Link
            href="/development"
            className="text-sm font-medium text-accent-green hover:underline dark:text-accent-green-light"
          >
            View all →
          </Link>
        </div>
        {projects.length === 0 ? (
          <p className="mt-10 text-slate-500 dark:text-slate-400">Aucun projet mis en avant pour le moment.</p>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
