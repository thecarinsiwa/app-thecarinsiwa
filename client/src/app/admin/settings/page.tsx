'use client';

import { useState, useEffect } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface SocialLink {
  label: string;
  href: string;
}

interface Settings {
  socialLinks: SocialLink[];
  contactSubtitle: string | null;
  contactEmail: string | null;
}

const emptyLink: SocialLink = { label: '', href: '' };

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({ socialLinks: [], contactSubtitle: '', contactEmail: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loadError, setLoadError] = useState(false);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  useEffect(() => {
    setLoadError(false);
    fetch(`${API}/settings`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : { socialLinks: [], contactSubtitle: null, contactEmail: null }))
      .then((data) =>
        setSettings({
          socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
          contactSubtitle: data.contactSubtitle ?? '',
          contactEmail: data.contactEmail ?? '',
        })
      )
      .catch(() => {
        setSettings({ socialLinks: [], contactSubtitle: '', contactEmail: '' });
        setLoadError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const addLink = () => {
    setSettings((s) => ({ ...s, socialLinks: [...s.socialLinks, { ...emptyLink }] }));
  };

  const updateLink = (index: number, field: 'label' | 'href', value: string) => {
    setSettings((s) => ({
      ...s,
      socialLinks: s.socialLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  const removeLink = (index: number) => {
    setSettings((s) => ({
      ...s,
      socialLinks: s.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const body = {
        socialLinks: settings.socialLinks.filter((l) => l.label.trim() && l.href.trim()),
        contactSubtitle: (settings.contactSubtitle ?? '').trim() || null,
        contactEmail: (settings.contactEmail ?? '').trim() || null,
      };
      const res = await fetch(`${API}/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        showMessage('error', 'Erreur lors de l’enregistrement.');
        return;
      }
      showMessage('success', 'Paramètres enregistrés.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl">
        <p className="text-slate-600 dark:text-slate-300">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
        Paramètres du site
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-300">
        Liens sociaux (page Contact) et texte de la page Contact.
      </p>

      {message && (
        <div
          className={
            message.type === 'success'
              ? 'mt-4 rounded-lg bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200'
              : 'mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-200'
          }
        >
          {message.text}
        </div>
      )}

      {loadError && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
          Impossible de joindre l’API ({API}). Vérifiez que le serveur tourne (ex. <code className="rounded bg-amber-200/50 px-1 dark:bg-amber-800/50">npm run start:dev</code> dans <code className="rounded bg-amber-200/50 px-1 dark:bg-amber-800/50">server/</code>). Vous pouvez tout de même enregistrer ci-dessous.
        </div>
      )}

      <form onSubmit={submit} className="mt-8 space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            Liens sociaux
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Affichés sur la page <a href="/contact" className="text-accent-green underline dark:text-accent-green-light" target="_blank" rel="noopener noreferrer">Contact</a>.
          </p>
          <div className="mt-4 space-y-3">
            {settings.socialLinks.map((link, index) => (
              <div key={index} className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="Label (ex: GitHub)"
                  value={link.label}
                  onChange={(e) => updateLink(index, 'label', e.target.value)}
                  className="w-32 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
                <input
                  type="url"
                  placeholder="https://..."
                  value={link.href}
                  onChange={(e) => updateLink(index, 'href', e.target.value)}
                  className="min-w-[200px] flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 dark:border-red-800 dark:text-red-400"
                >
                  Supprimer
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLink}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-600 dark:text-slate-200"
            >
              + Ajouter un lien
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            Page Contact
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                Sous-titre (optionnel)
              </label>
              <input
                type="text"
                value={settings.contactSubtitle ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, contactSubtitle: e.target.value }))}
                placeholder="Send a message or connect on social."
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                Email de contact affiché (optionnel)
              </label>
              <input
                type="email"
                value={settings.contactEmail ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, contactEmail: e.target.value }))}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-accent-green px-6 py-2 font-medium text-white disabled:opacity-50 dark:bg-accent-green-light"
        >
          {submitting ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </form>
    </div>
  );
}
