'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ProjectCardData } from './ProjectCard.types';

interface ProjectCardProps {
  project: ProjectCardData;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group overflow-hidden rounded-2xl bg-white shadow-soft transition hover:shadow-soft-dark dark:bg-slate-800 dark:shadow-soft-dark"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 md:p-6">
        <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
          {project.description}
        </p>
        {project.techStack?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent-green hover:underline dark:text-accent-green-light"
            >
              GitHub →
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent-orange hover:underline dark:text-accent-orange-light"
            >
              Live demo →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
