import { Hero } from '@/components/home/Hero';
import { AboutSection } from '@/components/home/AboutSection';
import { SkillsSection } from '@/components/home/SkillsSection';
import { FeaturedProjectsSection } from '@/components/home/FeaturedProjectsSection';
import { ContactCTA } from '@/components/home/ContactCTA';
import type { ProjectCardData } from '@/components/development/ProjectCard.types';
import { API_BASE_URL } from '@/lib/api';

interface SocialLink {
  label: string;
  href: string;
}

async function getFeaturedProjects(): Promise<ProjectCardData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects/featured`, { next: { revalidate: 60 } });
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

async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.socialLinks) ? data.socialLinks : [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [featuredProjects, socialLinks] = await Promise.all([
    getFeaturedProjects(),
    getSocialLinks(),
  ]);

  return (
    <>
      <Hero socialLinks={socialLinks} />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjectsSection projects={featuredProjects} />
      <ContactCTA />
    </>
  );
}
