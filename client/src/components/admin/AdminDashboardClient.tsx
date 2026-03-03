'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_BASE_URL as API } from '@/lib/api';

const cards = [
  { href: '/admin/projects', title: 'Projets développement', description: 'Gérer les projets affichés sur la page Development.', icon: 'code', countKey: 'projects' as const },
  { href: '/admin/designs', title: 'Design', description: 'Galerie design (branding, social, print, UI).', icon: 'palette', countKey: 'designs' as const },
  { href: '/admin/wildlife', title: 'Wildlife', description: 'Photos et vidéos de la page Wildlife.', icon: 'camera', countKey: 'wildlife' as const },
  { href: '/admin/messages', title: 'Messages', description: 'Messages reçus via le formulaire de contact.', icon: 'mail', countKey: 'messages' as const },
  { href: '/admin/settings', title: 'Paramètres site', description: 'Liens sociaux et texte de la page Contact.', icon: 'settings', countKey: 'settings' as const },
];

const icons: Record<string, React.ReactNode> = {
  code: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  palette: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  camera: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    </svg>
  ),
  mail: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  settings: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

export function AdminDashboardClient() {
  const [counts, setCounts] = useState<Record<string, number>>({
    projects: 0,
    designs: 0,
    wildlife: 0,
    messages: 0,
    settings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/projects`, { credentials: 'include' }).then((r) => (r.ok ? r.json() : [])).then((arr) => arr.length),
      fetch(`${API}/designs`, { credentials: 'include' }).then((r) => (r.ok ? r.json() : [])).then((arr) => arr.length),
      Promise.all([
        fetch(`${API}/wildlife/photos`, { credentials: 'include' }).then((r) => (r.ok ? r.json() : [])),
        fetch(`${API}/wildlife/videos`, { credentials: 'include' }).then((r) => (r.ok ? r.json() : [])),
      ]).then(([p, v]) => p.length + v.length),
      fetch(`${API}/contact`, { credentials: 'include' }).then((r) => (r.ok ? r.json() : [])).then((arr) => arr.length),
      fetch(`${API}/settings`, { credentials: 'include' }).then((r) => (r.ok ? 1 : 0)),
    ])
      .then(([projects, designs, wildlife, messages, settings]) =>
        setCounts({ projects, designs, wildlife, messages, settings })
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          Tableau de bord
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Vue d’ensemble et accès rapide aux sections à gérer.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-accent-green hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-accent-green-light"
          >
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-green/10 text-accent-green transition group-hover:bg-accent-green/20 dark:bg-accent-green-light/10 dark:text-accent-green-light">
                  {icons[card.icon]}
                </span>
                {!loading && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-sm font-semibold tabular-nums text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                    {counts[card.countKey]}
                  </span>
                )}
              </div>
              <h2 className="mt-4 font-display font-semibold text-slate-900 dark:text-white">
                {card.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {card.description}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-accent-green group-hover:underline dark:text-accent-green-light">
                Gérer
                <svg className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
