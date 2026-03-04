'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Profile image: served from the app so the homepage doesn't depend on the API's ephemeral uploads.
const profileImageUrl = '/images/profile.jpg';

const roles = [
  'Fullstack Developer',
  'Graphic Designer',
  'Wildlife Photographer & Videographer',
];

export interface SocialLinkItem {
  label: string;
  href: string;
}

const socialIcons: Record<string, React.ReactNode> = {
  github: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  ),
  linkedin: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  instagram: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  twitter: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  x: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  youtube: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  facebook: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  behance: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 2.445 4.919 5.555 4.919 2.6 0 4.164-1.063 4.853-2.9h-4.653V14h9.064c.058.67.09 1.347.09 2.023-.003 2.987-.581 4.977-2.003 4.977zM15.97 11.18h4.998c.039-1.953-.481-3.18-2.006-3.18-1.519 0-2.515 1.227-2.992 3.18zM6.432 8.846c-1.209 0-2.35.658-2.864 1.686H2.9V6.965h3.528c.617 0 1.101.537 1.101 1.24v.64zm-.657 7.245c1.209 0 2.35-.658 2.864-1.686h.668v1.282c0 .617-.484 1.24-1.101 1.24H2.9v-3.021h2.875c.413.669 1.182 1.185 2.864 1.185zM2.9 2.165h3.528v2.332H2.9V2.165zm3.528 13.602H2.9v-2.332h3.528v2.332zM12 2.165h3.528v2.332H12V2.165z" />
    </svg>
  ),
  dribbble: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-2.17-.43-2.35-.43-.26-.02-.44.12-.53.27-.46.96-1.17 2.31-2.54 4.1-.14.17-.27.26-.47.26-.67 0-1.36-.61-2.02-1.18-.66-.57-1.26-1.17-1.88-1.8.08-.11.17-.22.24-.33.45-.64.82-1.18 1.11-1.64.29-.45.49-.82.6-1.08.11-.26.14-.4.14-.54 0-.2-.06-.38-.18-.53-.12-.15-.32-.27-.6-.39-.27-.12-.65-.23-1.12-.34-.46-.11-.94-.21-1.43-.31-.49-.1-.96-.19-1.41-.27-.46-.08-.86-.15-1.22-.2-.36-.04-.65-.08-.88-.1-.23-.02-.38-.03-.45-.03-.08 0-.13.01-.15.03-.02.01-.04.03-.05.06-.01.02-.02.05-.02.08 0 .07.04.15.11.25.07.1.16.2.26.31.1.11.21.22.33.33.12.11.23.21.34.31.11.1.2.18.28.25.08.07.14.12.18.16.04.04.06.07.08.09l.01.01c.17.26.35.54.54.83.19.29.38.58.57.87.19.29.36.57.52.84.16.27.3.52.42.76.12.24.2.45.26.64.06.19.09.34.09.45 0 .07-.01.13-.03.18-.02.05-.05.09-.08.12-.03.03-.07.05-.12.07-.09.02-.2.03-.32.03-.24 0-.54-.05-.9-.14-.36-.09-.76-.2-1.2-.33-.44-.13-.9-.28-1.36-.44-.46-.16-.9-.32-1.33-.48-.43-.16-.82-.31-1.17-.45-.35-.14-.64-.26-.87-.36-.23-.1-.4-.18-.51-.24-.11-.06-.16-.09-.16-.09s.02.06.07.17c.05.11.12.27.21.46.09.19.2.41.32.65.12.24.25.5.39.77.14.27.28.54.42.81.14.27.26.52.38.76.12.24.21.45.27.64.06.19.09.34.09.44 0 .11-.03.21-.08.3-.05.09-.12.16-.21.22-.09.06-.2.09-.32.09-.15 0-.33-.05-.54-.15-.21-.1-.45-.23-.72-.39-.27-.16-.56-.35-.87-.55-.31-.2-.63-.41-.96-.62-.33-.21-.65-.41-.97-.61-.32-.2-.62-.38-.91-.54-.29-.16-.55-.3-.79-.41-.24-.11-.44-.19-.6-.24-.16-.05-.27-.08-.33-.08-.09 0-.16.02-.21.07-.05.05-.07.12-.07.21 0 .09.03.2.08.32.05.12.12.27.2.43.08.16.17.34.27.52.1.18.2.36.31.54.11.18.21.35.31.51.1.16.18.3.24.42.06.12.1.21.12.27.02.06.03.1.03.13 0 .05-.02.1-.05.15-.03.05-.08.08-.14.08-.12 0-.29-.06-.51-.18-.22-.12-.48-.28-.77-.46-.29-.18-.6-.38-.93-.58-.33-.2-.67-.41-1.02-.61-.35-.2-.69-.39-1.02-.57-.33-.18-.63-.34-.9-.48-.27-.14-.5-.25-.68-.33-.18-.08-.31-.12-.39-.12-.06 0-.11.02-.15.05-.04.03-.06.08-.06.14 0 .05.02.12.05.2.03.08.07.17.12.27.05.1.1.2.15.31.05.11.09.21.12.3.03.09.05.16.05.21 0 .06-.02.11-.05.15-.03.04-.08.06-.14.06-.07 0-.17-.03-.3-.08-.13-.05-.28-.12-.45-.2-.17-.08-.36-.17-.56-.26-.2-.09-.41-.18-.62-.26-.21-.08-.41-.15-.6-.2-.19-.05-.35-.08-.48-.08-.12 0-.21.02-.27.06-.06.04-.09.1-.09.18 0 .05.01.11.03.18.02.07.05.15.08.24.03.09.06.18.09.27.03.09.05.17.07.24.02.07.03.12.03.16 0 .06-.02.11-.05.15-.03.04-.09.06-.16.06z" />
    </svg>
  ),
};

function getSocialIcon(label: string): React.ReactNode {
  const key = label.toLowerCase().replace(/\s+/g, '');
  return socialIcons[key] ?? (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

interface HeroProps {
  socialLinks?: SocialLinkItem[];
}

export function Hero({ socialLinks = [] }: HeroProps) {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 py-20 md:min-h-[90vh] md:py-28">
      {/* Subtle background gradient + grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-transparent to-transparent dark:from-slate-900/50" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl ring-2 ring-slate-200 dark:border-slate-700 dark:ring-slate-600 md:h-40 md:w-40"
        >
          <Image
            src={profileImageUrl}
            alt="Carin Siwa"
            fill
            className="object-cover"
            sizes="160px"
            priority
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-accent-green dark:text-accent-green-light"
        >
          Portfolio
        </motion.p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Carin Siwa
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-5 text-lg text-slate-600 dark:text-slate-300 md:text-xl"
        >
          {roles.join(' · ')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/development"
            className="group relative rounded-xl bg-accent-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-accent-green-light hover:shadow-xl dark:bg-accent-green dark:hover:bg-accent-green-light"
          >
            View projects
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border-2 border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur-sm transition hover:border-accent-green hover:bg-accent-green/5 hover:text-accent-green dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-accent-green-light dark:hover:bg-accent-green/10 dark:hover:text-accent-green-light"
          >
            Get in touch
          </Link>
        </motion.div>
        {socialLinks.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            aria-label="Réseaux sociaux"
          >
            {socialLinks.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 transition hover:border-accent-green hover:bg-accent-green/10 hover:text-accent-green dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-accent-green-light dark:hover:bg-accent-green/20 dark:hover:text-accent-green-light"
                title={link.label}
              >
                {getSocialIcon(link.label)}
              </a>
            ))}
          </motion.nav>
        )}
      </motion.div>
    </section>
  );
}
