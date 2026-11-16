export type AdminRole = 'super_admin' | 'content_editor';

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: AdminRole;
  avatar_url?: string;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface WebsiteSettings {
  id: string;
  org_name: string;
  tagline: string;
  logo_url: string;
  favicon_url: string;
  phone: string;
  email: string;
  address: string;
  working_hours: string;
  google_maps_url: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  linkedin_url: string;
  youtube_url: string;
  copyright_text: string;
  maintenance_mode: boolean;
  meta_title: string;
  meta_description: string;
  keywords: string;
  og_image: string;
  formspree_contact_id: string;
  formspree_volunteer_id: string;
  updated_at: string;
}

export interface HomepageSection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  background_image?: string;
  cta_text?: string;
  cta_link?: string;
  secondary_cta_text?: string;
  secondary_cta_link?: string;
  is_enabled: boolean;
  sort_order: number;
  meta?: Record<string, any>;
  updated_at: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  banner_image?: string;
  is_published: boolean;
  meta_title?: string;
  meta_description?: string;
  sort_order?: number;
  created_at: string;
  updated_at: string;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  parent_id?: string | null;
  sort_order: number;
  is_header: boolean;
  is_footer: boolean;
  is_active: boolean;
  is_external?: boolean;
}

export interface Activity {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  featured_image: string;
  gallery?: string[];
  impact_number?: string;
  impact_label?: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type ProjectStatus = 'planned' | 'active' | 'completed';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  full_content: string;
  featured_image: string;
  gallery?: string[];
  location: string;
  start_date?: string;
  end_date?: string | null;
  status: ProjectStatus;
  objectives: string[];
  outcomes: string[];
  documents?: { title: string; url: string }[];
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  category: string;
  tags?: string[];
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image_url: string;
  caption?: string;
  album_name?: string;
  sort_order: number;
  created_at: string;
}

export type TeamCategory = 'leadership' | 'advisory' | 'operations' | 'volunteer_lead';

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  category: TeamCategory;
  photo_url: string;
  bio?: string;
  email?: string;
  linkedin_url?: string;
  twitter_url?: string;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization?: string;
  quote: string;
  photo_url?: string;
  rating: number;
  is_featured: boolean;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
}

export type SubmissionStatus = 'new' | 'contacted' | 'in_progress' | 'resolved';

export interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: SubmissionStatus;
  internal_notes?: string;
  consent_given: boolean;
  created_at: string;
  updated_at: string;
}

export type VolunteerStatus = 'new' | 'interviewed' | 'accepted' | 'rejected';

export interface VolunteerSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address?: string;
  age?: number;
  occupation?: string;
  area_of_interest: string;
  skills?: string;
  availability?: string;
  motivation: string;
  status: VolunteerStatus;
  internal_notes?: string;
  consent_given: boolean;
  created_at: string;
  updated_at: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  url: string;
  alt_text?: string;
  category?: string;
  created_at: string;
}

export interface DashboardStats {
  totalPages: number;
  totalProjects: number;
  totalActivities: number;
  totalGalleryImages: number;
  totalBlogPosts: number;
  totalVolunteerRegistrations: number;
  totalContactSubmissions: number;
  pendingContacts: number;
  pendingVolunteers: number;
  recentContacts: ContactSubmission[];
  recentVolunteers: VolunteerSubmission[];
}
