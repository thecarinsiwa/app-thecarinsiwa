'use client';

import Link from 'next/link';
import { ProjectCard } from '@/components/development/ProjectCard';
import type { ProjectCardData } from '@/components/development/ProjectCard.types';

// Example data – replace with API later
const featuredProjects: ProjectCardData[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack online store with cart, checkout, and admin dashboard.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop',
    techStack: ['Next.js', 'NestJS', 'MySQL'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: '2',
    title: 'Portfolio CMS',
    description: 'Headless CMS and API for portfolios and blogs.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '3',
    title: 'Wildlife Gallery App',
    description: 'Photo and video gallery with filters and lightbox.',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=450&fit=crop',
    techStack: ['Next.js', 'TypeScript'],
    githubUrl: 'https://github.com',
    featured: true,
  },
];

export function FeaturedProjectsSection() {
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
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
