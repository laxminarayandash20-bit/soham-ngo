import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import {
  WebsiteSettings,
  HomepageSection,
  Page,
  NavItem,
  Activity,
  Project,
  BlogPost,
  GalleryImage,
  TeamMember,
  Testimonial,
  ContactSubmission,
  VolunteerSubmission,
  MediaItem,
  AdminUser,
  DashboardStats
} from './types';
import {
  initialSettings,
  initialHomepageSections,
  initialNavItems,
  initialActivities,
  initialProjects,
  initialBlogPosts,
  initialGalleryImages,
  initialTeamMembers,
  initialTestimonials,
  initialPages,
  initialAdminUsers,
  initialContactSubmissions,
  initialVolunteerSubmissions
} from './seedData';

// Supabase Client initialization (if credentials exist)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project-id'))
  ? createClient(supabaseUrl, supabaseKey)
  : null;

interface DatabaseSchema {
  settings: WebsiteSettings;
  homepageSections: HomepageSection[];
  pages: Page[];
  navItems: NavItem[];
  activities: Activity[];
  projects: Project[];
  blogPosts: BlogPost[];
  galleryImages: GalleryImage[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  contactSubmissions: ContactSubmission[];
  volunteerSubmissions: VolunteerSubmission[];
  mediaLibrary: MediaItem[];
  adminUsers: AdminUser[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'soham_ngo_db.json');

function ensureLocalDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initialDb: DatabaseSchema = {
        settings: initialSettings,
        homepageSections: initialHomepageSections,
        pages: initialPages,
        navItems: initialNavItems,
        activities: initialActivities,
        projects: initialProjects,
        blogPosts: initialBlogPosts,
        galleryImages: initialGalleryImages,
        teamMembers: initialTeamMembers,
        testimonials: initialTestimonials,
        contactSubmissions: initialContactSubmissions,
        volunteerSubmissions: initialVolunteerSubmissions,
        mediaLibrary: [],
        adminUsers: initialAdminUsers
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    return parsed;
  } catch (err) {
    console.error('Error reading local DB, initializing fallback:', err);
    return {
      settings: initialSettings,
      homepageSections: initialHomepageSections,
      pages: initialPages,
      navItems: initialNavItems,
      activities: initialActivities,
      projects: initialProjects,
      blogPosts: initialBlogPosts,
      galleryImages: initialGalleryImages,
      teamMembers: initialTeamMembers,
      testimonials: initialTestimonials,
      contactSubmissions: initialContactSubmissions,
      volunteerSubmissions: initialVolunteerSubmissions,
      mediaLibrary: [],
      adminUsers: initialAdminUsers
    };
  }
}

function writeLocalDb(db: DatabaseSchema) {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local DB:', err);
  }
}

// ============================================================================
// REPOSITORY METHODS
// ============================================================================

// --- Website Settings ---
export async function getSettings(): Promise<WebsiteSettings> {
  if (supabase) {
    const { data, error } = await supabase.from('website_settings').select('*').single();
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  return db.settings;
}

export async function updateSettings(updates: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
  const db = ensureLocalDb();
  const updated: WebsiteSettings = {
    ...db.settings,
    ...updates,
    updated_at: new Date().toISOString()
  };
  db.settings = updated;
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('website_settings').upsert({ ...updated, id: 'general_settings' });
    } catch (e) {
      console.warn('Supabase sync warning:', e);
    }
  }
  return updated;
}

// --- Homepage Sections ---
export async function getHomepageSections(): Promise<HomepageSection[]> {
  if (supabase) {
    const { data, error } = await supabase.from('homepage_sections').select('*').order('sort_order', { ascending: true });
    if (!error && data && data.length > 0) return data;
  }
  const db = ensureLocalDb();
  return (db.homepageSections || []).sort((a, b) => a.sort_order - b.sort_order);
}

export async function updateHomepageSection(id: string, updates: Partial<HomepageSection>): Promise<HomepageSection> {
  const db = ensureLocalDb();
  const index = db.homepageSections.findIndex(s => s.id === id);
  if (index === -1) {
    const newSection: HomepageSection = {
      id,
      title: updates.title || '',
      subtitle: updates.subtitle || '',
      content: updates.content || '',
      background_image: updates.background_image,
      cta_text: updates.cta_text,
      cta_link: updates.cta_link,
      secondary_cta_text: updates.secondary_cta_text,
      secondary_cta_link: updates.secondary_cta_link,
      is_enabled: updates.is_enabled ?? true,
      sort_order: updates.sort_order ?? db.homepageSections.length + 1,
      meta: updates.meta || {},
      updated_at: new Date().toISOString()
    };
    db.homepageSections.push(newSection);
    writeLocalDb(db);
    return newSection;
  }
  db.homepageSections[index] = {
    ...db.homepageSections[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('homepage_sections').upsert(db.homepageSections[index]);
    } catch (e) {
      console.warn('Supabase sync warning:', e);
    }
  }
  return db.homepageSections[index];
}

// --- Navigation Items ---
export async function getNavItems(): Promise<NavItem[]> {
  if (supabase) {
    const { data, error } = await supabase.from('nav_items').select('*').order('sort_order', { ascending: true });
    if (!error && data && data.length > 0) return data;
  }
  const db = ensureLocalDb();
  return (db.navItems || []).sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveNavItem(item: Partial<NavItem> & { label: string; path: string }): Promise<NavItem> {
  const db = ensureLocalDb();
  const id = item.id || `nav-${Date.now()}`;
  const existingIndex = db.navItems.findIndex(n => n.id === id);
  const updatedItem: NavItem = {
    id,
    label: item.label,
    path: item.path,
    parent_id: item.parent_id || null,
    sort_order: item.sort_order ?? (db.navItems.length + 1),
    is_header: item.is_header ?? true,
    is_footer: item.is_footer ?? false,
    is_active: item.is_active ?? true,
    is_external: item.is_external ?? false
  };

  if (existingIndex >= 0) {
    db.navItems[existingIndex] = updatedItem;
  } else {
    db.navItems.push(updatedItem);
  }
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('nav_items').upsert(updatedItem);
    } catch (e) {
      console.warn('Supabase sync warning:', e);
    }
  }
  return updatedItem;
}

export async function deleteNavItem(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  db.navItems = db.navItems.filter(n => n.id !== id);
  writeLocalDb(db);
  if (supabase) {
    try {
      await supabase.from('nav_items').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  return true;
}

// --- Dynamic Pages ---
export async function getPages(): Promise<Page[]> {
  if (supabase) {
    const { data, error } = await supabase.from('pages').select('*').order('sort_order', { ascending: true });
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  return db.pages || [];
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (supabase) {
    const { data, error } = await supabase.from('pages').select('*').eq('slug', slug).single();
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  return db.pages.find(p => p.slug === slug) || null;
}

export async function savePage(pageData: Partial<Page> & { title: string; slug: string; content: string }): Promise<Page> {
  const db = ensureLocalDb();
  const id = pageData.id || `page-${Date.now()}`;
  const now = new Date().toISOString();
  const existingIndex = db.pages.findIndex(p => p.id === id || p.slug === pageData.slug);

  const newPage: Page = {
    id: existingIndex >= 0 ? db.pages[existingIndex].id : id,
    title: pageData.title,
    slug: pageData.slug.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, ''),
    description: pageData.description || '',
    content: pageData.content,
    banner_image: pageData.banner_image || '',
    is_published: pageData.is_published ?? true,
    meta_title: pageData.meta_title || pageData.title,
    meta_description: pageData.meta_description || pageData.description,
    sort_order: pageData.sort_order ?? (db.pages.length + 1),
    created_at: existingIndex >= 0 ? db.pages[existingIndex].created_at : now,
    updated_at: now
  };

  if (existingIndex >= 0) {
    db.pages[existingIndex] = newPage;
  } else {
    db.pages.push(newPage);
  }
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('pages').upsert(newPage);
    } catch (e) {
      console.warn('Supabase sync warning:', e);
    }
  }
  return newPage;
}

export async function deletePage(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  db.pages = db.pages.filter(p => p.id !== id);
  writeLocalDb(db);
  if (supabase) {
    try {
      await supabase.from('pages').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  return true;
}

// --- Activities ---
export async function getActivities(onlyPublished = false): Promise<Activity[]> {
  if (supabase) {
    let query = supabase.from('activities').select('*').order('sort_order', { ascending: true });
    if (onlyPublished) query = query.eq('is_published', true);
    const { data, error } = await query;
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  let list = db.activities || [];
  if (onlyPublished) {
    list = list.filter(a => a.is_published);
  }
  return list.sort((a, b) => a.sort_order - b.sort_order);
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  if (supabase) {
    const { data, error } = await supabase.from('activities').select('*').eq('slug', slug).single();
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  return db.activities.find(a => a.slug === slug) || null;
}

export async function saveActivity(act: Partial<Activity> & { title: string; category: string; summary: string; description: string; featured_image: string }): Promise<Activity> {
  const db = ensureLocalDb();
  const id = act.id || `act-${Date.now()}`;
  const now = new Date().toISOString();
  const existingIndex = db.activities.findIndex(a => a.id === id);
  const slug = act.slug || act.title.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');

  const activity: Activity = {
    id,
    title: act.title,
    slug,
    category: act.category,
    summary: act.summary,
    description: act.description,
    featured_image: act.featured_image,
    gallery: act.gallery || [],
    impact_number: act.impact_number || '',
    impact_label: act.impact_label || '',
    is_featured: act.is_featured ?? false,
    is_published: act.is_published ?? true,
    sort_order: act.sort_order ?? (db.activities.length + 1),
    created_at: existingIndex >= 0 ? db.activities[existingIndex].created_at : now,
    updated_at: now
  };

  if (existingIndex >= 0) {
    db.activities[existingIndex] = activity;
  } else {
    db.activities.push(activity);
  }
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('activities').upsert(activity);
    } catch (e) {
      console.warn('Supabase sync warning:', e);
    }
  }
  return activity;
}

export async function deleteActivity(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  db.activities = db.activities.filter(a => a.id !== id);
  writeLocalDb(db);
  if (supabase) {
    try {
      await supabase.from('activities').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  return true;
}

// --- Projects ---
export async function getProjects(onlyPublished = false): Promise<Project[]> {
  if (supabase) {
    let query = supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (onlyPublished) query = query.eq('is_published', true);
    const { data, error } = await query;
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  let list = db.projects || [];
  if (onlyPublished) list = list.filter(p => p.is_published);
  return list;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (supabase) {
    const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  return db.projects.find(p => p.slug === slug) || null;
}

export async function saveProject(proj: Partial<Project> & { title: string; category: string; description: string; full_content: string; featured_image: string; location: string }): Promise<Project> {
  const db = ensureLocalDb();
  const id = proj.id || `proj-${Date.now()}`;
  const now = new Date().toISOString();
  const existingIndex = db.projects.findIndex(p => p.id === id);
  const slug = proj.slug || proj.title.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');

  const project: Project = {
    id,
    title: proj.title,
    slug,
    category: proj.category,
    description: proj.description,
    full_content: proj.full_content,
    featured_image: proj.featured_image,
    gallery: proj.gallery || [],
    location: proj.location,
    start_date: proj.start_date,
    end_date: proj.end_date ?? null,
    status: proj.status || 'active',
    objectives: proj.objectives || [],
    outcomes: proj.outcomes || [],
    documents: proj.documents || [],
    is_featured: proj.is_featured ?? false,
    is_published: proj.is_published ?? true,
    created_at: existingIndex >= 0 ? db.projects[existingIndex].created_at : now,
    updated_at: now
  };

  if (existingIndex >= 0) {
    db.projects[existingIndex] = project;
  } else {
    db.projects.push(project);
  }
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('projects').upsert(project);
    } catch (e) {
      console.warn('Supabase sync warning:', e);
    }
  }
  return project;
}

export async function deleteProject(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  db.projects = db.projects.filter(p => p.id !== id);
  writeLocalDb(db);
  if (supabase) {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  return true;
}

// --- Blog Posts ---
export async function getBlogPosts(onlyPublished = false): Promise<BlogPost[]> {
  if (supabase) {
    let query = supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
    if (onlyPublished) query = query.eq('is_published', true);
    const { data, error } = await query;
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  let list = db.blogPosts || [];
  if (onlyPublished) list = list.filter(b => b.is_published);
  return list.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (supabase) {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  return db.blogPosts.find(b => b.slug === slug) || null;
}

export async function saveBlogPost(post: Partial<BlogPost> & { title: string; excerpt: string; content: string; featured_image: string; category: string }): Promise<BlogPost> {
  const db = ensureLocalDb();
  const id = post.id || `post-${Date.now()}`;
  const now = new Date().toISOString();
  const existingIndex = db.blogPosts.findIndex(b => b.id === id);
  const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');

  const blogPost: BlogPost = {
    id,
    title: post.title,
    slug,
    excerpt: post.excerpt,
    content: post.content,
    featured_image: post.featured_image,
    author_name: post.author_name || 'Soham NGO Team',
    category: post.category,
    tags: post.tags || [],
    is_published: post.is_published ?? true,
    published_at: post.published_at || now,
    created_at: existingIndex >= 0 ? db.blogPosts[existingIndex].created_at : now,
    updated_at: now
  };

  if (existingIndex >= 0) {
    db.blogPosts[existingIndex] = blogPost;
  } else {
    db.blogPosts.push(blogPost);
  }
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('blog_posts').upsert(blogPost);
    } catch (e) {
      console.warn('Supabase sync warning:', e);
    }
  }
  return blogPost;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  db.blogPosts = db.blogPosts.filter(b => b.id !== id);
  writeLocalDb(db);
  if (supabase) {
    try {
      await supabase.from('blog_posts').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  return true;
}

// --- Gallery ---
export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  if (supabase) {
    let query = supabase.from('gallery_images').select('*').order('sort_order', { ascending: true });
    if (category && category !== 'All') query = query.eq('category', category);
    const { data, error } = await query;
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  let list = db.galleryImages || [];
  if (category && category !== 'All') {
    list = list.filter(g => g.category.toLowerCase() === category.toLowerCase());
  }
  return list.sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveGalleryImage(img: Partial<GalleryImage> & { title: string; category: string; image_url: string }): Promise<GalleryImage> {
  const db = ensureLocalDb();
  const id = img.id || `gal-${Date.now()}`;
  const existingIndex = db.galleryImages.findIndex(g => g.id === id);

  const image: GalleryImage = {
    id,
    title: img.title,
    category: img.category,
    image_url: img.image_url,
    caption: img.caption || '',
    album_name: img.album_name || 'General',
    sort_order: img.sort_order ?? (db.galleryImages.length + 1),
    created_at: existingIndex >= 0 ? db.galleryImages[existingIndex].created_at : new Date().toISOString()
  };

  if (existingIndex >= 0) {
    db.galleryImages[existingIndex] = image;
  } else {
    db.galleryImages.push(image);
  }
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('gallery_images').upsert(image);
    } catch (e) {
      console.warn('Supabase sync warning:', e);
    }
  }
  return image;
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  db.galleryImages = db.galleryImages.filter(g => g.id !== id);
  writeLocalDb(db);
  if (supabase) {
    try {
      await supabase.from('gallery_images').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  return true;
}

// --- Team Members ---
export async function getTeamMembers(onlyVisible = false): Promise<TeamMember[]> {
  if (supabase) {
    let query = supabase.from('team_members').select('*').order('sort_order', { ascending: true });
    if (onlyVisible) query = query.eq('is_visible', true);
    const { data, error } = await query;
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  let list = db.teamMembers || [];
  if (onlyVisible) list = list.filter(t => t.is_visible);
  return list.sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveTeamMember(member: Partial<TeamMember> & { name: string; designation: string; category: any; photo_url: string }): Promise<TeamMember> {
  const db = ensureLocalDb();
  const id = member.id || `team-${Date.now()}`;
  const now = new Date().toISOString();
  const existingIndex = db.teamMembers.findIndex(t => t.id === id);

  const teamMember: TeamMember = {
    id,
    name: member.name,
    designation: member.designation,
    category: member.category || 'leadership',
    photo_url: member.photo_url,
    bio: member.bio || '',
    email: member.email || '',
    linkedin_url: member.linkedin_url || '',
    twitter_url: member.twitter_url || '',
    sort_order: member.sort_order ?? (db.teamMembers.length + 1),
    is_visible: member.is_visible ?? true,
    created_at: existingIndex >= 0 ? db.teamMembers[existingIndex].created_at : now,
    updated_at: now
  };

  if (existingIndex >= 0) {
    db.teamMembers[existingIndex] = teamMember;
  } else {
    db.teamMembers.push(teamMember);
  }
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('team_members').upsert(teamMember);
    } catch (e) {
      console.warn('Supabase sync warning:', e);
    }
  }
  return teamMember;
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  db.teamMembers = db.teamMembers.filter(t => t.id !== id);
  writeLocalDb(db);
  if (supabase) {
    try {
      await supabase.from('team_members').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  return true;
}

// --- Testimonials ---
export async function getTestimonials(onlyVisible = false): Promise<Testimonial[]> {
  if (supabase) {
    let query = supabase.from('testimonials').select('*').order('sort_order', { ascending: true });
    if (onlyVisible) query = query.eq('is_visible', true);
    const { data, error } = await query;
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  let list = db.testimonials || [];
  if (onlyVisible) list = list.filter(t => t.is_visible);
  return list.sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveTestimonial(test: Partial<Testimonial> & { name: string; role: string; quote: string }): Promise<Testimonial> {
  const db = ensureLocalDb();
  const id = test.id || `test-${Date.now()}`;
  const existingIndex = db.testimonials.findIndex(t => t.id === id);

  const testimonial: Testimonial = {
    id,
    name: test.name,
    role: test.role,
    organization: test.organization || '',
    quote: test.quote,
    photo_url: test.photo_url || '',
    rating: test.rating ?? 5,
    is_featured: test.is_featured ?? true,
    is_visible: test.is_visible ?? true,
    sort_order: test.sort_order ?? (db.testimonials.length + 1),
    created_at: existingIndex >= 0 ? db.testimonials[existingIndex].created_at : new Date().toISOString()
  };

  if (existingIndex >= 0) {
    db.testimonials[existingIndex] = testimonial;
  } else {
    db.testimonials.push(testimonial);
  }
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('testimonials').upsert(testimonial);
    } catch (e) {
      console.warn('Supabase sync warning:', e);
    }
  }
  return testimonial;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  db.testimonials = db.testimonials.filter(t => t.id !== id);
  writeLocalDb(db);
  if (supabase) {
    try {
      await supabase.from('testimonials').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  return true;
}

// --- Contact Submissions ---
export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  if (supabase) {
    const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  return (db.contactSubmissions || []).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function createContactSubmission(sub: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at' | 'status'> & { status?: any }): Promise<ContactSubmission> {
  const db = ensureLocalDb();
  const now = new Date().toISOString();
  const submission: ContactSubmission = {
    id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    full_name: sub.full_name,
    email: sub.email,
    phone: sub.phone || '',
    subject: sub.subject,
    message: sub.message,
    status: sub.status || 'new',
    internal_notes: sub.internal_notes || '',
    consent_given: sub.consent_given ?? true,
    created_at: now,
    updated_at: now
  };
  db.contactSubmissions.unshift(submission);
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('contact_submissions').insert(submission);
    } catch (e) {
      console.warn('Supabase sync warning:', e);
    }
  }
  return submission;
}

export async function updateContactStatus(id: string, status: ContactSubmission['status'], internal_notes?: string): Promise<ContactSubmission | null> {
  const db = ensureLocalDb();
  const item = db.contactSubmissions.find(c => c.id === id);
  if (!item) return null;
  item.status = status;
  if (internal_notes !== undefined) item.internal_notes = internal_notes;
  item.updated_at = new Date().toISOString();
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('contact_submissions').update({ status, internal_notes: item.internal_notes, updated_at: item.updated_at }).eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  return item;
}

export async function deleteContactSubmission(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  db.contactSubmissions = db.contactSubmissions.filter(c => c.id !== id);
  writeLocalDb(db);
  if (supabase) {
    try {
      await supabase.from('contact_submissions').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  return true;
}

// --- Volunteer Applications ---
export async function getVolunteerApplications(): Promise<VolunteerSubmission[]> {
  if (supabase) {
    const { data, error } = await supabase.from('volunteer_submissions').select('*').order('created_at', { ascending: false });
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  return (db.volunteerSubmissions || []).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function createVolunteerApplication(vol: Omit<VolunteerSubmission, 'id' | 'created_at' | 'updated_at' | 'status'> & { status?: any }): Promise<VolunteerSubmission> {
  const db = ensureLocalDb();
  const now = new Date().toISOString();
  const submission: VolunteerSubmission = {
    id: `vol-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    full_name: vol.full_name,
    email: vol.email,
    phone: vol.phone,
    address: vol.address || '',
    age: vol.age,
    occupation: vol.occupation || '',
    area_of_interest: vol.area_of_interest,
    skills: vol.skills || '',
    availability: vol.availability || '',
    motivation: vol.motivation,
    status: vol.status || 'new',
    internal_notes: vol.internal_notes || '',
    consent_given: vol.consent_given ?? true,
    created_at: now,
    updated_at: now
  };
  db.volunteerSubmissions.unshift(submission);
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('volunteer_submissions').insert(submission);
    } catch (e) {
      console.warn('Supabase sync warning:', e);
    }
  }
  return submission;
}

export async function updateVolunteerStatus(id: string, status: VolunteerSubmission['status'], internal_notes?: string): Promise<VolunteerSubmission | null> {
  const db = ensureLocalDb();
  const item = db.volunteerSubmissions.find(v => v.id === id);
  if (!item) return null;
  item.status = status;
  if (internal_notes !== undefined) item.internal_notes = internal_notes;
  item.updated_at = new Date().toISOString();
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('volunteer_submissions').update({ status, internal_notes: item.internal_notes, updated_at: item.updated_at }).eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  return item;
}

export async function deleteVolunteerApplication(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  db.volunteerSubmissions = db.volunteerSubmissions.filter(v => v.id !== id);
  writeLocalDb(db);
  if (supabase) {
    try {
      await supabase.from('volunteer_submissions').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  return true;
}

// --- Media Library ---
export async function getMediaItems(): Promise<MediaItem[]> {
  if (supabase) {
    const { data, error } = await supabase.from('media_library').select('*').order('created_at', { ascending: false });
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  return db.mediaLibrary || [];
}

export async function saveMediaItem(item: Omit<MediaItem, 'id' | 'created_at'>): Promise<MediaItem> {
  const db = ensureLocalDb();
  const newItem: MediaItem = {
    ...item,
    id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    created_at: new Date().toISOString()
  };
  db.mediaLibrary.unshift(newItem);
  writeLocalDb(db);

  if (supabase) {
    try {
      await supabase.from('media_library').insert(newItem);
    } catch (e) {
      console.warn('Supabase sync warning:', e);
    }
  }
  return newItem;
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  db.mediaLibrary = db.mediaLibrary.filter(m => m.id !== id);
  writeLocalDb(db);
  if (supabase) {
    try {
      await supabase.from('media_library').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
  }
  return true;
}

// --- Admin Users & Auth ---
export async function getAdminUsers(): Promise<Omit<AdminUser, 'password_hash'>[]> {
  if (supabase) {
    const { data, error } = await supabase.from('admin_users').select('id, email, full_name, role, avatar_url, is_active, last_login_at, created_at, updated_at');
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  return db.adminUsers.map(({ password_hash, ...rest }) => rest);
}

export async function findAdminByEmail(email: string): Promise<AdminUser | null> {
  if (supabase) {
    const { data, error } = await supabase.from('admin_users').select('*').eq('email', email.toLowerCase()).single();
    if (!error && data) return data;
  }
  const db = ensureLocalDb();
  return db.adminUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function verifyAdminCredentials(email: string, passwordAttempt: string): Promise<Omit<AdminUser, 'password_hash'> | null> {
  const user = await findAdminByEmail(email);
  if (!user || !user.is_active) return null;
  // In development/production seed check
  if (user.password_hash === passwordAttempt || user.password_hash === `scrypt:${passwordAttempt}`) {
    // update last login
    const db = ensureLocalDb();
    const idx = db.adminUsers.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      db.adminUsers[idx].last_login_at = new Date().toISOString();
      writeLocalDb(db);
    }
    const { password_hash, ...safeUser } = user;
    return safeUser;
  }
  return null;
}

export async function saveAdminUser(userData: { email: string; password?: string; full_name: string; role: 'super_admin' | 'content_editor'; is_active?: boolean; id?: string }): Promise<Omit<AdminUser, 'password_hash'>> {
  const db = ensureLocalDb();
  const id = userData.id || `admin-${Date.now()}`;
  const now = new Date().toISOString();
  const existingIdx = db.adminUsers.findIndex(u => u.id === id || u.email.toLowerCase() === userData.email.toLowerCase());

  let password_hash = 'Admin@Soham2026!';
  if (userData.password) {
    password_hash = userData.password;
  } else if (existingIdx >= 0) {
    password_hash = db.adminUsers[existingIdx].password_hash;
  }

  const user: AdminUser = {
    id: existingIdx >= 0 ? db.adminUsers[existingIdx].id : id,
    email: userData.email.toLowerCase(),
    password_hash,
    full_name: userData.full_name,
    role: userData.role,
    is_active: userData.is_active ?? true,
    created_at: existingIdx >= 0 ? db.adminUsers[existingIdx].created_at : now,
    updated_at: now
  };

  if (existingIdx >= 0) {
    db.adminUsers[existingIdx] = user;
  } else {
    db.adminUsers.push(user);
  }
  writeLocalDb(db);

  const { password_hash: _, ...safeUser } = user;
  return safeUser;
}

export async function deleteAdminUser(id: string): Promise<boolean> {
  const db = ensureLocalDb();
  db.adminUsers = db.adminUsers.filter(u => u.id !== id);
  writeLocalDb(db);
  return true;
}

// --- Dashboard Statistics ---
export async function getDashboardStats(): Promise<DashboardStats> {
  const [pages, projects, activities, gallery, blog, contacts, volunteers] = await Promise.all([
    getPages(),
    getProjects(),
    getActivities(),
    getGalleryImages(),
    getBlogPosts(),
    getContactSubmissions(),
    getVolunteerApplications()
  ]);

  const pendingContacts = contacts.filter(c => c.status === 'new').length;
  const pendingVolunteers = volunteers.filter(v => v.status === 'new').length;

  return {
    totalPages: pages.length,
    totalProjects: projects.length,
    totalActivities: activities.length,
    totalGalleryImages: gallery.length,
    totalBlogPosts: blog.length,
    totalContactSubmissions: contacts.length,
    totalVolunteerRegistrations: volunteers.length,
    pendingContacts,
    pendingVolunteers,
    recentContacts: contacts.slice(0, 5),
    recentVolunteers: volunteers.slice(0, 5)
  };
}
