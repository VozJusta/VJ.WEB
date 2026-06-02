import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://vozjusta.com.br';
  const now = new Date();

  return [
    { url: base,                        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/nosso-time`,        lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contato`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/login`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${base}/privacidade`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${base}/termos`,            lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
  ];
}
