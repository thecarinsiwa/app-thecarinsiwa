import type { Metadata } from 'next';
import { fetchWildlifePhotos, fetchWildlifeVideos } from '@/lib/api';
import { WildlifeGallery } from '@/components/wildlife/WildlifeGallery';

export const metadata: Metadata = {
  title: 'Wildlife | Carin Siwa',
  description: 'Wildlife photography and videography by Carin Siwa.',
};

export default async function WildlifePage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  let photos: Awaited<ReturnType<typeof fetchWildlifePhotos>> = [];
  let videos: Awaited<ReturnType<typeof fetchWildlifeVideos>> = [];

  try {
    const [photosRes, videosRes] = await Promise.all([
      fetch(`${baseUrl}/wildlife/photos`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/wildlife/videos`, { next: { revalidate: 60 } }),
    ]);
    if (photosRes.ok) photos = await photosRes.json();
    if (videosRes.ok) videos = await videosRes.json();
  } catch {
    // API indisponible : affichage vide
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
        Wildlife
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Photography and videography from the field.
      </p>
      <WildlifeGallery photos={photos} videos={videos} />
    </div>
  );
}
