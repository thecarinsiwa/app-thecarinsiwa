'use client';

import { useState, useEffect } from 'react';
import { Gallery, type GalleryItem } from '@/components/gallery/Gallery';
import { API_BASE_URL as API } from '@/lib/api';

const categories = ['All', 'Branding', 'Social Media', 'Print', 'UI'] as const;

export default function DesignPage() {
  const [filter, setFilter] = useState<string>('All');
  const [items, setItems] = useState<(GalleryItem & { category: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const category = filter === 'All' ? undefined : filter;
    const url = category ? `${API}/designs?category=${encodeURIComponent(category)}` : `${API}/designs`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setItems(data.map((d: { id: string; title: string; imageUrl: string; category: string }) => ({ id: d.id, title: d.title, imageUrl: d.imageUrl, category: d.category }))))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
        Design
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Graphic design and visual identity work.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              filter === cat
                ? 'bg-accent-green text-white dark:bg-accent-green-light'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {loading ? (
        <p className="mt-10 text-slate-500 dark:text-slate-400">Chargement...</p>
      ) : items.length === 0 ? (
        <p className="mt-10 text-slate-500 dark:text-slate-400">Aucun design dans cette catégorie.</p>
      ) : (
        <div className="mt-10">
          <Gallery items={items} columns={3} />
        </div>
      )}
    </div>
  );
}
