import type { Metadata } from 'next';
import { ProjectCard } from '@/components/development/ProjectCard';
import type { ProjectCardData } from '@/components/development/ProjectCard.types';

export const metadata: Metadata = {
  title: 'Development | Carin Siwa',
  description: 'Web and software development projects by Carin Siwa.',
};

// Replace with API fetch later
async function getProjects(): Promise<ProjectCardData[]> {
  return [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack online store with cart, checkout, and admin dashboard.',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop',
      techStack: ['Next.js', 'NestJS', 'MySQL'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      id: '2',
      title: 'Portfolio CMS',
      description: 'Headless CMS and API for portfolios and blogs.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
      techStack: ['React', 'Node.js', 'PostgreSQL'],
      githubUrl: 'https://github.com',
    },
    {
      id: '3',
      title: 'Wildlife Gallery App',
      description: 'Photo and video gallery with filters and lightbox.',
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=450&fit=crop',
      techStack: ['Next.js', 'TypeScript'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
  ];
}

export default async function DevelopmentPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
        Development
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Web and software projects I&apos;ve built.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
