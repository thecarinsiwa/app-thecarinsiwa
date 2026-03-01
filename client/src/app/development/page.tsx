import type { Metadata } from 'next';
import { ProjectCard } from '@/components/development/ProjectCard';
import type { ProjectCardData } from '@/components/development/ProjectCard.types';

export const metadata: Metadata = {
  title: 'Development | Carin Siwa',
  description: 'Web and software development projects by Carin Siwa.',
};

async function getProjects(): Promise<ProjectCardData[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  try {
    const res = await fetch(`${baseUrl}/projects`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data)
      ? data.map((p: { id: string; title: string; description: string; imageUrl: string; techStack: string[]; githubUrl?: string | null; liveUrl?: string | null; featured?: boolean }) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          imageUrl: p.imageUrl,
          techStack: Array.isArray(p.techStack) ? p.techStack : [],
          githubUrl: p.githubUrl ?? null,
          liveUrl: p.liveUrl ?? null,
          featured: p.featured,
        }))
      : [];
  } catch {
    return [];
  }
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
      {projects.length === 0 ? (
        <p className="mt-10 text-slate-500 dark:text-slate-400">Aucun projet pour le moment.</p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
