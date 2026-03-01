'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/theme/ThemeProvider';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/development', label: 'Development' },
  { href: '/design', label: 'Design' },
  { href: '/wildlife', label: 'Wildlife' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isAdmin = pathname?.startsWith('/admin');

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-soft dark:shadow-soft-dark'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link
          href={isAdmin ? '/admin' : '/'}
          className="font-display text-lg font-semibold text-accent-green dark:text-accent-green-light"
        >
          Carin Siwa
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {!isAdmin &&
            navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    'text-sm font-medium transition-colors hover:text-accent-green dark:hover:text-accent-green-light',
                    pathname === link.href
                      ? 'text-accent-green dark:text-accent-green-light'
                      : 'text-slate-600 dark:text-slate-300'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          {isAdmin && (
            <li>
              <Link
                href="/"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-accent-green dark:text-slate-300 dark:hover:text-accent-green-light"
              >
                View site
              </Link>
            </li>
          )}
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-accent-green dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-accent-green-light"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <span className="text-lg">☀️</span>
              ) : (
                <span className="text-lg">🌙</span>
              )}
            </button>
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-slate-600 dark:text-slate-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-2 text-slate-600 dark:text-slate-300"
            aria-label="Menu"
          >
            <span className="text-xl">{mobileOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {!isAdmin &&
                navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={clsx(
                        'block rounded-lg px-3 py-2 text-sm font-medium',
                        pathname === link.href
                          ? 'bg-accent-green/10 text-accent-green dark:bg-accent-green-light/10 dark:text-accent-green-light'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              {isAdmin && (
                <li>
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300"
                  >
                    View site
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
