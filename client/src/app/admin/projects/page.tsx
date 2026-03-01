'use client';

import { useState, useEffect, useRef } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
}

const emptyForm = {
  title: '',
  description: '',
  imageUrl: '',
  techStack: '',
  githubUrl: '',
  liveUrl: '',
  featured: false,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
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
    fetch(`${API}/projects`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : []))
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const loadIntoForm = (p: Project) => {
    setForm({
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl,
      techStack: Array.isArray(p.techStack) ? p.techStack.join(', ') : '',
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || '',
      featured: p.featured,
    });
    setEditingId(p.id);
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
      const res = await fetch(`${API}/projects/upload`, {
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
        showMessage('success', 'Image envoyée. Vous pouvez enregistrer le projet.');
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
      const body = {
        title: form.title.trim(),
        description: form.description.trim(),
        imageUrl: form.imageUrl.trim(),
        techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean),
        githubUrl: form.githubUrl.trim() || undefined,
        liveUrl: form.liveUrl.trim() || undefined,
        featured: form.featured,
      };
      const url = editingId ? `${API}/projects/${editingId}` : `${API}/projects`;
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        showMessage('error', 'Erreur lors de l’enregistrement.');
        return;
      }
      const project = await res.json();
      if (editingId) {
        setProjects((prev) => prev.map((p) => (p.id === project.id ? project : p)));
        showMessage('success', 'Projet mis à jour.');
      } else {
        setProjects((prev) => [project, ...prev]);
        showMessage('success', 'Projet ajouté.');
      }
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Supprimer ce projet ?')) return;
    const res = await fetch(`${API}/projects/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (editingId === id) resetForm();
      showMessage('success', 'Projet supprimé.');
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
        Projets développement
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-300">
        Ajouter, modifier ou supprimer les projets affichés sur la page Development.
      </p>

      {message && (
        <div
          className={message.type === 'success'
            ? 'mt-4 rounded-lg bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200'
            : 'mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-200'}
        >
          {message.text}
        </div>
      )}

      {/* Formulaire */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
          {editingId ? 'Modifier le projet' : 'Nouveau projet'}
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
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Description *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
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
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Tech stack (séparer par des virgules)</label>
            <input
              value={form.techStack}
              onChange={(e) => setForm((f) => ({ ...f, techStack: e.target.value }))}
              placeholder="Next.js, NestJS, MySQL"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">GitHub (URL)</label>
              <input
                type="url"
                value={form.githubUrl}
                onChange={(e) => setForm((f) => ({ ...f, githubUrl: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Live demo (URL)</label>
              <input
                type="url"
                value={form.liveUrl}
                onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              className="h-4 w-4 rounded border-slate-300 text-accent-green focus:ring-accent-green dark:border-slate-600"
            />
            <label htmlFor="featured" className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Afficher en « Featured » sur l’accueil
            </label>
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

      {/* Liste */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
          Projets ({projects.length})
        </h2>
        {projects.length === 0 ? (
          <p className="mt-3 text-slate-500 dark:text-slate-400">Aucun projet. Ajoutez-en un ci-dessus.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {projects.map((p) => (
              <li
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-slate-900 dark:text-white">{p.title}</span>
                  {p.featured && (
                    <span className="ml-2 rounded bg-accent-green/20 px-1.5 py-0.5 text-xs text-accent-green dark:bg-accent-green-light/20 dark:text-accent-green-light">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => loadIntoForm(p)}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-600 dark:text-slate-200"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProject(p.id)}
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
