'use client';

import { motion } from 'framer-motion';

const skillGroups = [
  {
    title: 'Development',
    items: ['C#', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', '.Net Core', 'MySQL','Web3','Blockchain'],
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'Design',
    items: ['Branding', 'UI/UX', 'Social Media', 'Print', 'Figma', 'Photoshop', 'Illustrator'],
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Wildlife',
    items: ['Photography', 'Videography', 'Editing', 'Color grading', 'Premiere Pro', 'After Effects'],
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      </svg>
    ),
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-medium uppercase tracking-[0.18em] text-accent-green dark:text-accent-green-light"
        >
          What I do
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl"
        >
          Skills Overview
        </motion.h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:border-accent-green/30 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-800/50 dark:hover:border-accent-green-light/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-green/10 text-accent-green transition group-hover:bg-accent-green/20 dark:bg-accent-green-light/10 dark:text-accent-green-light dark:group-hover:bg-accent-green-light/20">
                {group.icon}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
