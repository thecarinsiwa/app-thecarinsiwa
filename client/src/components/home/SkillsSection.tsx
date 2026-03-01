'use client';

import { motion } from 'framer-motion';

const skillGroups = [
  {
    title: 'Development',
    items: ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'MySQL'],
  },
  {
    title: 'Design',
    items: ['Branding', 'UI/UX', 'Social Media', 'Print', 'Figma'],
  },
  {
    title: 'Wildlife',
    items: ['Photography', 'Videography', 'Editing', 'Color grading'],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl"
        >
          Skills Overview
        </motion.h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-white p-6 shadow-soft dark:bg-slate-800 dark:shadow-soft-dark"
            >
              <h3 className="font-display text-lg font-semibold text-accent-green dark:text-accent-green-light">
                {group.title}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700 dark:bg-slate-700 dark:text-slate-200"
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
