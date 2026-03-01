import { Hero } from '@/components/home/Hero';
import { AboutSection } from '@/components/home/AboutSection';
import { SkillsSection } from '@/components/home/SkillsSection';
import { FeaturedProjectsSection } from '@/components/home/FeaturedProjectsSection';
import { ContactCTA } from '@/components/home/ContactCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjectsSection />
      <ContactCTA />
    </>
  );
}
