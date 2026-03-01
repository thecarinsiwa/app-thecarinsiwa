'use client';

import { useState, useEffect } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface SocialLink {
  label: string;
  href: string;
}

interface SiteSettings {
  socialLinks: SocialLink[];
  contactSubtitle: string | null;
  contactEmail: string | null;
}

const defaultSubtitle = 'Send a message or connect on social.';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch(`${API}/settings`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data)
          setSettings({
            socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
            contactSubtitle: data.contactSubtitle ?? null,
            contactEmail: data.contactEmail ?? null,
          });
      })
      .catch(() => setSettings(null));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    const body = {
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
    };
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) setStatus('done');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
        Contact
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        {settings?.contactSubtitle || defaultSubtitle}
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400 dark:focus:border-accent-green-light"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400 dark:focus:border-accent-green-light"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400 dark:focus:border-accent-green-light"
            placeholder="Your message..."
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full rounded-xl bg-accent-green px-6 py-3 font-medium text-white transition hover:bg-accent-green-light disabled:opacity-50 dark:bg-accent-green dark:hover:bg-accent-green-light"
        >
          {status === 'sending' ? 'Sending...' : status === 'done' ? 'Sent!' : 'Send message'}
        </button>
        {status === 'error' && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Something went wrong. Please try again or email directly.
          </p>
        )}
      </form>

      <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Social links</p>
        {(settings?.socialLinks?.length ?? 0) > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-4">
            {(settings?.socialLinks ?? []).map((link) => (
              <li key={link.label + link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-green hover:underline dark:text-accent-green-light"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Aucun lien configuré. Ajoutez-en dans l’admin → Paramètres.
          </p>
        )}
        {settings?.contactEmail && (
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Email :{' '}
            <a href={`mailto:${settings.contactEmail}`} className="text-accent-green hover:underline dark:text-accent-green-light">
              {settings.contactEmail}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
