'use client';

import { useState, useEffect, useRef } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Photo {
  id: string;
  title: string;
  imageUrl: string;
  caption: string | null;
}
interface Video {
  id: string;
  title: string;
  embedUrl: string;
  thumbnailUrl: string | null;
}

export default function AdminWildlifePage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [photoForm, setPhotoForm] = useState({ title: '', imageUrl: '', caption: '' });
  const [videoForm, setVideoForm] = useState({ title: '', embedUrl: '' });
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<'photo' | 'video' | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const photoFileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/wildlife/photos`, { credentials: 'include' }).then((r) => (r.ok ? r.json() : [])),
      fetch(`${API}/wildlife/videos`, { credentials: 'include' }).then((r) => (r.ok ? r.json() : [])),
    ]).then(([p, v]) => {
      setPhotos(p);
      setVideos(v);
      setLoading(false);
    });
  }, []);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      showMessage('error', 'Veuillez choisir une image (JPG, PNG, GIF, WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showMessage('error', "L'image ne doit pas dépasser 5 Mo.");
      return;
    }
    setUploadingImage(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API}/wildlife/photos/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showMessage('error', data.message || "Échec de l'upload.");
        return;
      }
      if (data.url) {
        setPhotoForm((f) => ({ ...f, imageUrl: data.url }));
        showMessage('success', 'Image envoyée. Vous pouvez enregistrer la photo.');
      }
    } catch {
      showMessage('error', "Erreur lors de l'envoi du fichier.");
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const addPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting('photo');
    try {
      const body = {
        title: photoForm.title,
        imageUrl: photoForm.imageUrl,
        caption: photoForm.caption || null,
      };
      const url = editingPhotoId ? `${API}/wildlife/photos/${editingPhotoId}` : `${API}/wildlife/photos`;
      const method = editingPhotoId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const photo = await res.json();
        if (editingPhotoId) {
          setPhotos((prev) => prev.map((p) => (p.id === photo.id ? photo : p)));
        } else {
          setPhotos((prev) => [photo, ...prev]);
        }
        setPhotoForm({ title: '', imageUrl: '', caption: '' });
        setEditingPhotoId(null);
      }
    } finally {
      setSubmitting(null);
    }
  };

  const addVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting('video');
    try {
      const body = { title: videoForm.title, embedUrl: videoForm.embedUrl };
      const url = editingVideoId ? `${API}/wildlife/videos/${editingVideoId}` : `${API}/wildlife/videos`;
      const method = editingVideoId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const video = await res.json();
        if (editingVideoId) {
          setVideos((prev) => prev.map((v) => (v.id === video.id ? video : v)));
        } else {
          setVideos((prev) => [video, ...prev]);
        }
        setVideoForm({ title: '', embedUrl: '' });
        setEditingVideoId(null);
      }
    } finally {
      setSubmitting(null);
    }
  };

  const deletePhoto = async (id: string) => {
    if (!confirm('Supprimer cette photo ?')) return;
    const res = await fetch(`${API}/wildlife/photos/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) {
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      if (editingPhotoId === id) {
        setPhotoForm({ title: '', imageUrl: '', caption: '' });
        setEditingPhotoId(null);
      }
    }
  };

  const deleteVideo = async (id: string) => {
    if (!confirm('Supprimer cette vidéo ?')) return;
    const res = await fetch(`${API}/wildlife/videos/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) {
      setVideos((prev) => prev.filter((v) => v.id !== id));
      if (editingVideoId === id) {
        setVideoForm({ title: '', embedUrl: '' });
        setEditingVideoId(null);
      }
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
        Wildlife
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-300">
        Ajouter ou supprimer des photos et vidéos. La page <a href="/wildlife" className="text-accent-green dark:text-accent-green-light underline" target="_blank" rel="noopener noreferrer">/wildlife</a> affiche ces données dynamiquement.
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

      {/* Add photo */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
          {editingPhotoId ? 'Modifier la photo' : 'Ajouter une photo'}
        </h2>
        <form onSubmit={addPhoto} className="mt-4 space-y-3">
          <input
            required
            placeholder="Titre"
            value={photoForm.title}
            onChange={(e) => setPhotoForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Image *</label>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <input
                ref={photoFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
                disabled={uploadingImage}
              />
              <button
                type="button"
                onClick={() => photoFileInputRef.current?.click()}
                disabled={uploadingImage}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              >
                {uploadingImage ? 'Envoi en cours...' : 'Choisir un fichier'}
              </button>
              <span className="text-sm text-slate-500 dark:text-slate-400">ou coller une URL ci-dessous</span>
            </div>
            <input
              required
              type="url"
              placeholder="https://... ou uploadez un fichier ci-dessus"
              value={photoForm.imageUrl}
              onChange={(e) => setPhotoForm((f) => ({ ...f, imageUrl: e.target.value }))}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
            {photoForm.imageUrl && (
              <div className="mt-2">
                <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">Aperçu</p>
                <img
                  src={photoForm.imageUrl}
                  alt=""
                  className="h-24 w-auto max-w-full rounded-lg border border-slate-200 object-contain dark:border-slate-600"
                  onError={() => setPhotoForm((f) => ({ ...f, imageUrl: '' }))}
                />
              </div>
            )}
          </div>
          <input
            placeholder="Légende (optionnel)"
            value={photoForm.caption}
            onChange={(e) => setPhotoForm((f) => ({ ...f, caption: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
          <div className="flex gap-2">
            <button type="submit" disabled={!!submitting} className="rounded-lg bg-accent-green px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-accent-green-light">
              {editingPhotoId ? 'Mettre à jour' : 'Ajouter'}
            </button>
            {editingPhotoId && (
              <button type="button" onClick={() => { setPhotoForm({ title: '', imageUrl: '', caption: '' }); setEditingPhotoId(null); }} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-600 dark:text-slate-200">
                Annuler
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Add video */}
      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
          {editingVideoId ? 'Modifier la vidéo' : 'Ajouter une vidéo'}
        </h2>
        <form onSubmit={addVideo} className="mt-4 space-y-3">
          <input
            required
            placeholder="Titre"
            value={videoForm.title}
            onChange={(e) => setVideoForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
          <input
            required
            type="url"
            placeholder="URL d’embed (ex: https://www.youtube.com/embed/...)"
            value={videoForm.embedUrl}
            onChange={(e) => setVideoForm((f) => ({ ...f, embedUrl: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
          <div className="flex gap-2">
            <button type="submit" disabled={!!submitting} className="rounded-lg bg-accent-green px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-accent-green-light">
              {editingVideoId ? 'Mettre à jour' : 'Ajouter'}
            </button>
            {editingVideoId && (
              <button type="button" onClick={() => { setVideoForm({ title: '', embedUrl: '' }); setEditingVideoId(null); }} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-600 dark:text-slate-200">
                Annuler
              </button>
            )}
          </div>
        </form>
      </section>

      {/* List photos */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Photos ({photos.length})</h2>
        <ul className="mt-3 space-y-2">
          {photos.map((p) => (
            <li key={p.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
              <span className="font-medium text-slate-900 dark:text-white">{p.title}</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => { setPhotoForm({ title: p.title, imageUrl: p.imageUrl, caption: p.caption || '' }); setEditingPhotoId(p.id); }} className="text-sm text-accent-green hover:underline dark:text-accent-green-light">Modifier</button>
                <button type="button" onClick={() => deletePhoto(p.id)} className="text-sm text-red-600 hover:underline dark:text-red-400">Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* List videos */}
      <section className="mt-6">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Vidéos ({videos.length})</h2>
        <ul className="mt-3 space-y-2">
          {videos.map((v) => (
            <li key={v.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
              <span className="font-medium text-slate-900 dark:text-white">{v.title}</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => { setVideoForm({ title: v.title, embedUrl: v.embedUrl }); setEditingVideoId(v.id); }} className="text-sm text-accent-green hover:underline dark:text-accent-green-light">Modifier</button>
                <button type="button" onClick={() => deleteVideo(v.id)} className="text-sm text-red-600 hover:underline dark:text-red-400">Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}