'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const roles = [
  'Fullstack Developer',
  'Graphic Designer',
  'Wildlife Photographer & Videographer',
];

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 py-20 text-center md:min-h-[90vh] md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-3xl"
      >
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
          Carin Siwa
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 md:text-xl">
          {roles.join(' · ')}
        </p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/development"
            className="rounded-xl bg-accent-green px-6 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-accent-green-light dark:bg-accent-green dark:shadow-soft-dark dark:hover:bg-accent-green-light"
          >
            View projects
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-slate-300 bg-transparent px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-accent-green hover:text-accent-green dark:border-slate-600 dark:text-slate-200 dark:hover:border-accent-green-light dark:hover:text-accent-green-light"
          >
            Get in touch
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
