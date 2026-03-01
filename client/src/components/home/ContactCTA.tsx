'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function ContactCTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-accent-green/10 px-8 py-12 dark:bg-accent-green/20"
        >
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            Let&apos;s work together
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Have a project in mind? I&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-xl bg-accent-green px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-green-light dark:bg-accent-green dark:hover:bg-accent-green-light"
          >
            Get in touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
