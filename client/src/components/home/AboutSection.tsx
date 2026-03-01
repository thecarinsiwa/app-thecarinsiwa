'use client';

import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="about" className="relative border-t border-slate-200/80 bg-gradient-to-b from-slate-50/90 to-slate-100/50 py-20 dark:border-slate-700/80 dark:from-slate-900/60 dark:to-slate-900/40 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-medium uppercase tracking-[0.18em] text-accent-green dark:text-accent-green-light"
        >
          Who I am
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mt-8 text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl"
        >
          I build web applications, craft visual identities, and capture wildlife through photography and video.
          I focus on clean code, thoughtful design, and storytelling that connects people with nature.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-10 h-px w-24 origin-center bg-gradient-to-r from-transparent via-accent-green/50 to-transparent dark:via-accent-green-light/50"
        />
      </div>
    </section>
  );
}
