import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://github.com/viralpatni';
  return [{ url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
