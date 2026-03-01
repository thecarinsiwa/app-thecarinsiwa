'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category?: string;
  width?: number;
  height?: number;
}

interface GalleryProps {
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
}

export function Gallery({ items, columns = 3 }: GalleryProps) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <>
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            onClick={() => setSelected(item)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-700"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute bottom-0 left-0 right-0 p-4 text-left text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {item.title}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-4xl"
            >
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image
                  src={selected.imageUrl}
                  alt={selected.title}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-2 text-center text-white">{selected.title}</p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 rounded-lg bg-white/20 px-3 py-1 text-white hover:bg-white/30"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
