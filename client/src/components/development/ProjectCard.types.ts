export interface ProjectCardData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  featured?: boolean;
}
