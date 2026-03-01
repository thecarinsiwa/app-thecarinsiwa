'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function ContactCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-accent-green/20 bg-gradient-to-br from-accent-green/10 via-accent-green/5 to-transparent px-8 py-14 text-center dark:border-accent-green-light/20 dark:from-accent-green/20 dark:via-accent-green/10"
        >
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent-green/10 dark:bg-accent-green-light/10" aria-hidden />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-accent-green/5 dark:bg-accent-green-light/5" aria-hidden />
          <h2 className="relative font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            Let&apos;s work together
          </h2>
          <p className="relative mt-4 text-slate-600 dark:text-slate-300">
            Have a project in mind? I&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="relative mt-8 inline-block rounded-xl bg-accent-green px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-accent-green-light hover:shadow-xl dark:bg-accent-green dark:hover:bg-accent-green-light"
          >
            Get in touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
