'use client';

import { useState } from 'react';
import { Gallery, type GalleryItem } from '@/components/gallery/Gallery';

const categories = ['All', 'Branding', 'Social Media', 'Print', 'UI'] as const;

// Example data – replace with API later
const designItems: (GalleryItem & { category: string })[] = [
  { id: '1', title: 'Brand Identity', imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop', category: 'Branding' },
  { id: '2', title: 'Social Campaign', imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop', category: 'Social Media' },
  { id: '3', title: 'Print Poster', imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=400&fit=crop', category: 'Print' },
  { id: '4', title: 'App UI', imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop', category: 'UI' },
  { id: '5', title: 'Logo Set', imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&h=400&fit=crop', category: 'Branding' },
  { id: '6', title: 'Instagram Stories', imageUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop', category: 'Social Media' },
];

export default function DesignPage() {
  const [filter, setFilter] = useState<string>('All');
  const filtered = filter === 'All'
    ? designItems
    : designItems.filter((i) => i.category === filter);

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
      <div className="mt-10">
        <Gallery items={filtered} columns={3} />
      </div>
    </div>
  );
}
