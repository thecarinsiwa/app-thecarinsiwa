'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL as API } from '@/lib/api';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/contact`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : []))
      .then(setMessages)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (s: string) => {
    try {
      return new Date(s).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return s;
    }
  };

  const selected = messages.find((m) => m.id === selectedId);

  const deleteMessage = async (id: string) => {
    if (!confirm('Supprimer ce message ?')) return;
    const res = await fetch(`${API}/contact/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedId === id) setSelectedId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl">
        <p className="text-slate-600 dark:text-slate-300">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
        Messages
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-300">
        Messages reçus via le formulaire de contact.
      </p>

      {messages.length === 0 ? (
        <p className="mt-8 text-slate-500 dark:text-slate-400">Aucun message pour le moment.</p>
      ) : (
        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          <ul className="min-w-0 flex-1 space-y-2 lg:max-w-sm">
            {messages.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(selectedId === m.id ? null : m.id)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    selectedId === m.id
                      ? 'border-accent-green bg-accent-green/10 dark:border-accent-green-light dark:bg-accent-green-light/10'
                      : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600'
                  }`}
                >
                  <span className="block font-medium text-slate-900 dark:text-white">{m.name}</span>
                  <span className="block truncate text-sm text-slate-600 dark:text-slate-300">{m.email}</span>
                  <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(m.createdAt)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800 lg:min-h-[200px]">
            {selected ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4 dark:border-slate-600">
                  <h2 className="font-display font-semibold text-slate-900 dark:text-white">
                    {selected.name}
                  </h2>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {formatDate(selected.createdAt)}
                  </span>
                </div>
                <a
                  href={`mailto:${selected.email}`}
                  className="mt-2 inline-block text-sm text-accent-green hover:underline dark:text-accent-green-light"
                >
                  {selected.email}
                </a>
                <p className="mt-4 whitespace-pre-wrap text-slate-700 dark:text-slate-200">
                  {selected.message}
                </p>
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-600">
                  <button
                    type="button"
                    onClick={() => deleteMessage(selected.id)}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 dark:border-red-800 dark:text-red-400"
                  >
                    Supprimer le message
                  </button>
                </div>
              </>
            ) : (
              <p className="text-slate-500 dark:text-slate-400">
                Cliquez sur un message pour afficher le détail.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
