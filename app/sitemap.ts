import { MetadataRoute } from 'next';
import { getPages, getActivities, getProjects, getBlogPosts } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sohamngo.com';

  const [pages, activities, projects, blogPosts] = await Promise.all([
    getPages(),
    getActivities(true),
    getProjects(true),
    getBlogPosts(true)
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/activities`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/volunteer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const dynamicPageRoutes: MetadataRoute.Sitemap = pages
    .filter(p => p.is_published)
    .map(p => ({
      url: `${baseUrl}/pages/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'monthly',
      priority: 0.7
    }));

  const activityRoutes: MetadataRoute.Sitemap = activities.map(a => ({
    url: `${baseUrl}/activities/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(b => ({
    url: `${baseUrl}/news/${b.slug}`,
    lastModified: new Date(b.updated_at),
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  return [
    ...staticRoutes,
    ...dynamicPageRoutes,
    ...activityRoutes,
    ...projectRoutes,
    ...blogRoutes
  ];
}
