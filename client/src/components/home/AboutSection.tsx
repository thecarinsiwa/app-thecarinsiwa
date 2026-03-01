'use client';

import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="about" className="border-t border-slate-200 bg-slate-50/50 py-16 dark:border-slate-700 dark:bg-slate-900/50 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300"
        >
          I build web applications, craft visual identities, and capture wildlife through photography and video.
          I focus on clean code, thoughtful design, and storytelling that connects people with nature.
        </motion.p>
      </div>
    </section>
  );
}
