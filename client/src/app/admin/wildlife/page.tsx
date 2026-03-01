'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
  const [submitting, setSubmitting] = useState<'photo' | 'video' | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/wildlife/photos`).then((r) => (r.ok ? r.json() : [])),
      fetch(`${API}/wildlife/videos`).then((r) => (r.ok ? r.json() : [])),
    ]).then(([p, v]) => {
      setPhotos(p);
      setVideos(v);
      setLoading(false);
    });
  }, []);

  const addPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting('photo');
    try {
      const res = await fetch(`${API}/wildlife/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: photoForm.title,
          imageUrl: photoForm.imageUrl,
          caption: photoForm.caption || null,
        }),
      });
      if (res.ok) {
        const photo = await res.json();
        setPhotos((prev) => [photo, ...prev]);
        setPhotoForm({ title: '', imageUrl: '', caption: '' });
      }
    } finally {
      setSubmitting(null);
    }
  };

  const addVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting('video');
    try {
      const res = await fetch(`${API}/wildlife/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: videoForm.title,
          embedUrl: videoForm.embedUrl,
        }),
      });
      if (res.ok) {
        const video = await res.json();
        setVideos((prev) => [video, ...prev]);
        setVideoForm({ title: '', embedUrl: '' });
      }
    } finally {
      setSubmitting(null);
    }
  };

  const deletePhoto = async (id: string) => {
    if (!confirm('Supprimer cette photo ?')) return;
    const res = await fetch(`${API}/wildlife/photos/${id}`, { method: 'DELETE' });
    if (res.ok) setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const deleteVideo = async (id: string) => {
    if (!confirm('Supprimer cette vidéo ?')) return;
    const res = await fetch(`${API}/wildlife/videos/${id}`, { method: 'DELETE' });
    if (res.ok) setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-slate-600 dark:text-slate-300">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <Link href="/admin" className="text-slate-600 hover:text-accent-green dark:text-slate-300 dark:hover:text-accent-green-light">← Admin</Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white">Wildlife (admin)</h1>
      <p className="mt-1 text-slate-600 dark:text-slate-300">Ajouter ou supprimer des photos et vidéos. La page <a href="/wildlife" className="text-accent-green dark:text-accent-green-light underline">/wildlife</a> affiche ces données dynamiquement.</p>

      {/* Add photo */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Ajouter une photo</h2>
        <form onSubmit={addPhoto} className="mt-4 space-y-3">
          <input
            required
            placeholder="Titre"
            value={photoForm.title}
            onChange={(e) => setPhotoForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
          <input
            required
            type="url"
            placeholder="URL de l’image"
            value={photoForm.imageUrl}
            onChange={(e) => setPhotoForm((f) => ({ ...f, imageUrl: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
          <input
            placeholder="Légende (optionnel)"
            value={photoForm.caption}
            onChange={(e) => setPhotoForm((f) => ({ ...f, caption: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
          <button type="submit" disabled={!!submitting} className="rounded-lg bg-accent-green px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-accent-green-light">Ajouter</button>
        </form>
      </section>

      {/* Add video */}
      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Ajouter une vidéo</h2>
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
          <button type="submit" disabled={!!submitting} className="rounded-lg bg-accent-green px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-accent-green-light">Ajouter</button>
        </form>
      </section>

      {/* List photos */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Photos ({photos.length})</h2>
        <ul className="mt-3 space-y-2">
          {photos.map((p) => (
            <li key={p.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
              <span className="font-medium text-slate-900 dark:text-white">{p.title}</span>
              <button type="button" onClick={() => deletePhoto(p.id)} className="text-sm text-red-600 hover:underline dark:text-red-400">Supprimer</button>
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
              <button type="button" onClick={() => deleteVideo(v.id)} className="text-sm text-red-600 hover:underline dark:text-red-400">Supprimer</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
