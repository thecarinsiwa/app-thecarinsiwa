const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/** URL de base de l'API (définie dans .env.local : NEXT_PUBLIC_API_URL). */
export const API_BASE_URL = getBaseUrl();

export interface WildlifePhoto {
  id: string;
  title: string;
  imageUrl: string;
  caption: string | null;
  createdAt: string;
}

export interface WildlifeVideo {
  id: string;
  title: string;
  embedUrl: string;
  thumbnailUrl: string | null;
  createdAt: string;
}

export async function fetchWildlifePhotos(): Promise<WildlifePhoto[]> {
  const res = await fetch(`${getBaseUrl()}/wildlife/photos`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch photos');
  return res.json();
}

export async function fetchWildlifeVideos(): Promise<WildlifeVideo[]> {
  const res = await fetch(`${getBaseUrl()}/wildlife/videos`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch videos');
  return res.json();
}
