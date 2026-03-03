'use client';

import { useState, useEffect, useRef } from 'react';
import { API_BASE_URL as API } from '@/lib/api';
const CATEGORIES = ['Branding', 'Social Media', 'Print', 'UI'] as const;
type DesignCategory = (typeof CATEGORIES)[number];

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  category: DesignCategory;
}

const emptyForm: { title: string; imageUrl: string; category: DesignCategory } = {
  title: '',
  imageUrl: '',
  category: 'Branding',
};

export default function AdminDesignsPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  useEffect(() => {
    fetch(`${API}/designs`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : []))
      .then(setDesigns)
      .finally(() => setLoading(false));
  }, []);

  const loadIntoForm = (d: Design) => {
    setForm({ title: d.title, imageUrl: d.imageUrl, category: d.category });
    setEditingId(d.id);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      showMessage('error', 'Veuillez choisir une image (JPG, PNG, GIF, WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showMessage('error', 'L’image ne doit pas dépasser 5 Mo.');
      return;
    }
    setUploadingImage(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API}/designs/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showMessage('error', data.message || 'Échec de l’upload.');
        return;
      }
      if (data.url) {
        setForm((f) => ({ ...f, imageUrl: data.url }));
        showMessage('success', 'Image envoyée. Vous pouvez enregistrer le design.');
      }
    } catch {
      showMessage('error', 'Erreur lors de l’envoi du fichier.');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const body = { title: form.title.trim(), imageUrl: form.imageUrl.trim(), category: form.category };
      const url = editingId ? `${API}/designs/${editingId}` : `${API}/designs`;
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = Array.isArray(data.message) ? data.message.join(', ') : (data.message || 'Erreur lors de l’enregistrement.');
        showMessage('error', msg);
        return;
      }
      const design = await res.json();
      if (editingId) {
        setDesigns((prev) => prev.map((x) => (x.id === design.id ? design : x)));
        showMessage('success', 'Design mis à jour.');
      } else {
        setDesigns((prev) => [design, ...prev]);
        showMessage('success', 'Design ajouté.');
      }
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  const deleteDesign = async (id: string) => {
    if (!confirm('Supprimer ce design ?')) return;
    const res = await fetch(`${API}/designs/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) {
      setDesigns((prev) => prev.filter((d) => d.id !== id));
      if (editingId === id) resetForm();
      showMessage('success', 'Design supprimé.');
    } else {
      showMessage('error', 'Impossible de supprimer.');
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
        Design
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-300">
        Ajouter, modifier ou supprimer les créations affichées sur la page Design.
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

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
          {editingId ? 'Modifier le design' : 'Nouveau design'}
        </h2>
        <form onSubmit={submit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Titre *</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Image *</label>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploadingImage}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              >
                {uploadingImage ? 'Envoi en cours...' : 'Choisir un fichier'}
              </button>
              <span className="text-sm text-slate-500 dark:text-slate-400">ou coller une URL ci-dessous</span>
            </div>
            <input
              type="url"
              required
              value={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
              placeholder="https://... ou uploadez un fichier ci-dessus"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
            {form.imageUrl && (
              <div className="mt-2">
                <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">Aperçu</p>
                <img
                  src={form.imageUrl}
                  alt=""
                  className="h-24 w-auto max-w-full rounded-lg border border-slate-200 object-contain dark:border-slate-600"
                  onError={() => setForm((f) => ({ ...f, imageUrl: '' }))}
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Catégorie *</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as typeof form.category }))}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-accent-green px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-accent-green-light"
            >
              {submitting ? 'Envoi...' : editingId ? 'Mettre à jour' : 'Ajouter'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-600 dark:text-slate-200"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
          Designs ({designs.length})
        </h2>
        {designs.length === 0 ? (
          <p className="mt-3 text-slate-500 dark:text-slate-400">Aucun design. Ajoutez-en un ci-dessus.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {designs.map((d) => (
              <li
                key={d.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-slate-900 dark:text-white">{d.title}</span>
                  <span className="ml-2 rounded bg-slate-200 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-slate-600 dark:text-slate-200">
                    {d.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => loadIntoForm(d)}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-600 dark:text-slate-200"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteDesign(d.id)}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 dark:border-red-800 dark:text-red-400"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
