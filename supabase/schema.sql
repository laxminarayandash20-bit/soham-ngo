-- ==============================================================================
-- SOHAM NGO - COMPLETE PRODUCTION SUPABASE DATABASE SCHEMA
-- Includes Row Level Security (RLS), Policies, Constraints & Indexes
-- Primary Domain: https://sohamngo.com
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'content_editor')),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. WEBSITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS website_settings (
    id TEXT PRIMARY KEY DEFAULT 'general_settings',
    org_name TEXT NOT NULL DEFAULT 'Soham NGO',
    tagline TEXT DEFAULT 'Empowering Communities, Transforming Lives',
    logo_url TEXT DEFAULT '/images/soham-logo.svg',
    favicon_url TEXT DEFAULT '/favicon.ico',
    phone TEXT DEFAULT '+91 98765 43210',
    email TEXT DEFAULT 'contact@sohamngo.com',
    address TEXT DEFAULT '124 Humanity Lane, Sector 14, Social Welfare Enclave, New Delhi, India 110001',
    working_hours TEXT DEFAULT 'Mon - Sat: 9:00 AM - 6:00 PM',
    google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=New+Delhi',
    facebook_url TEXT DEFAULT 'https://facebook.com/sohamngo',
    instagram_url TEXT DEFAULT 'https://instagram.com/sohamngo',
    twitter_url TEXT DEFAULT 'https://twitter.com/sohamngo',
    linkedin_url TEXT DEFAULT 'https://linkedin.com/company/sohamngo',
    youtube_url TEXT DEFAULT 'https://youtube.com/@sohamngo',
    copyright_text TEXT DEFAULT '© 2026 Soham NGO. All Rights Reserved. Registered Non-Profit Organization.',
    maintenance_mode BOOLEAN DEFAULT FALSE,
    meta_title TEXT DEFAULT 'Soham NGO | Empowering Communities & Transforming Lives',
    meta_description TEXT DEFAULT 'Soham NGO is dedicated to sustainable community development, child education, healthcare accessibility, women empowerment, and disaster relief.',
    keywords TEXT DEFAULT 'ngo, social welfare, child education, free healthcare, women empowerment, charity, volunteer, donate',
    og_image TEXT DEFAULT 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
    formspree_contact_id TEXT DEFAULT '',
    formspree_volunteer_id TEXT DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HOMEPAGE SECTIONS
CREATE TABLE IF NOT EXISTS homepage_sections (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    content TEXT,
    background_image TEXT,
    cta_text TEXT,
    cta_link TEXT,
    secondary_cta_text TEXT,
    secondary_cta_link TEXT,
    is_enabled BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    meta JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DYNAMIC PAGES TABLE
CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    banner_image TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    meta_title TEXT,
    meta_description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. NAVIGATION MENUS TABLE
CREATE TABLE IF NOT EXISTS nav_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    path TEXT NOT NULL,
    parent_id UUID REFERENCES nav_items(id) ON DELETE CASCADE,
    sort_order INT DEFAULT 0,
    is_header BOOLEAN DEFAULT TRUE,
    is_footer BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_external BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    featured_image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    impact_number TEXT,
    impact_label TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    full_content TEXT NOT NULL,
    featured_image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    location TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    status TEXT NOT NULL CHECK (status IN ('planned', 'active', 'completed')),
    objectives JSONB DEFAULT '[]'::jsonb,
    outcomes JSONB DEFAULT '[]'::jsonb,
    documents JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. BLOG / NEWS TABLE
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT NOT NULL,
    author_name TEXT NOT NULL DEFAULT 'Soham NGO Team',
    category TEXT NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    album_name TEXT DEFAULT 'General',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'leadership' CHECK (category IN ('leadership', 'advisory', 'operations', 'volunteer_lead')),
    photo_url TEXT NOT NULL,
    bio TEXT,
    email TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    sort_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    organization TEXT,
    quote TEXT NOT NULL,
    photo_url TEXT,
    rating INT DEFAULT 5,
    is_featured BOOLEAN DEFAULT TRUE,
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'resolved')),
    internal_notes TEXT,
    consent_given BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. VOLUNTEER SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS volunteer_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    age INT,
    occupation TEXT,
    area_of_interest TEXT NOT NULL,
    skills TEXT,
    availability TEXT,
    motivation TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'interviewed', 'accepted', 'rejected')),
    internal_notes TEXT,
    consent_given BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. MEDIA LIBRARY TABLE
CREATE TABLE IF NOT EXISTS media_library (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    category TEXT DEFAULT 'general',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_activities_slug ON activities(slug);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_volunteer_status ON volunteer_submissions(status);
CREATE INDEX IF NOT EXISTS idx_nav_order ON nav_items(sort_order);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Anonymous and Authenticated can read published website content)
CREATE POLICY "Public read settings" ON website_settings FOR SELECT USING (true);
CREATE POLICY "Public read homepage" ON homepage_sections FOR SELECT USING (is_enabled = true);
CREATE POLICY "Public read pages" ON pages FOR SELECT USING (is_published = true);
CREATE POLICY "Public read nav" ON nav_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public read activities" ON activities FOR SELECT USING (is_published = true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public read blog" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read gallery" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public read team" ON team_members FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (is_visible = true);

-- PUBLIC INSERT POLICIES (Users can submit contact and volunteer forms)
CREATE POLICY "Public insert contact" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert volunteer" ON volunteer_submissions FOR INSERT WITH CHECK (true);

-- ADMIN FULL ACCESS POLICIES (Authenticated service role or admin users)
-- In production with Next.js API server routes, the server uses the SUPABASE_SERVICE_ROLE_KEY
-- which automatically bypasses RLS securely on server-side requests.
