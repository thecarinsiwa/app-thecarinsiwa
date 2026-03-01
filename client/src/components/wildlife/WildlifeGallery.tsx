'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { WildlifePhoto, WildlifeVideo } from '@/lib/api';

interface WildlifeGalleryProps {
  photos: WildlifePhoto[];
  videos: WildlifeVideo[];
}

export function WildlifeGallery({ photos, videos }: WildlifeGalleryProps) {
  const [lightbox, setLightbox] = useState<WildlifePhoto | null>(null);

  return (
    <>
      {/* Masonry-style photo gallery */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
          Photography
        </h2>
        {photos.length === 0 ? (
          <p className="mt-6 text-slate-500 dark:text-slate-400">Aucune photo pour le moment.</p>
        ) : (
          <div className="mt-6 columns-2 gap-4 md:columns-3">
            {photos.map((photo) => (
              <motion.button
                key={photo.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setLightbox(photo)}
                className="group relative mb-4 block w-full overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {photo.title}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </section>

      {/* Video section */}
      <section className="mt-16">
        <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
          Video
        </h2>
        {videos.length === 0 ? (
          <p className="mt-6 text-slate-500 dark:text-slate-400">Aucune vidéo pour le moment.</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {videos.map((video) => (
              <div
                key={video.id}
                className="overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-700"
              >
                <div className="aspect-video">
                  <iframe
                    title={video.title}
                    src={video.embedUrl}
                    className="h-full w-full"
                    allowFullScreen
                  />
                </div>
                <p className="p-4 font-medium text-slate-900 dark:text-white">{video.title}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-4xl"
            >
              <div className="relative aspect-[3/4] max-h-[85vh] w-full overflow-hidden rounded-2xl">
                <Image
                  src={lightbox.imageUrl}
                  alt={lightbox.title}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-2 text-center text-white">{lightbox.title}</p>
              <button
                type="button"
                onClick={() => setLightbox(null)}
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
