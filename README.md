# Soham NGO — Official Website & Full Admin CMS

> **Organization:** Soham NGO  
> **Primary Domain:** [https://sohamngo.com](https://sohamngo.com)  
> **Website Type:** Non-Governmental Organization / Humanitarian Welfare  
> **Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Supabase (PostgreSQL, Auth, Storage) + Resilient Zero-Config Local DB Fallback.

---

## 🌟 Overview

Soham NGO is a modern, responsive, database-driven NGO web platform and comprehensive Content Management System (CMS). Built with a humanitarian design system, it empowers the organization to manage every section, page, menu, blog article, flagship project, gallery photo, team member, testimonial, contact enquiry, and volunteer registration without modifying source code.

---

## 🚀 Key Highlights & Capabilities

### 1. Public-Facing Website
- **Homepage:** Complete with customizable Hero section, About introduction, Mission & Vision, Core Objectives, Program initiatives, Featured projects, Impact statistics counters, Photo gallery, Latest news, Testimonials, Institutional partners, Volunteer registration banner, Donation callout, and Quick contact form.
- **About Us (`/about`):** Detailed organization history, mission, vision, core values, objectives, leadership & operations team directory, registration/tax-exemption details (80G certified), and downloadable audited financial reports.
- **Activities & Programs (`/activities` & `/activities/[slug]`):** Filterable categories for Education, Healthcare, Women Empowerment, Clean Water, and Environmental Protection.
- **Projects & Outposts (`/projects` & `/projects/[slug]`):** Project tracking system with status badges (Active, Completed, Planned), geographic locations, objectives, outcomes, and timelines.
- **Photo Gallery (`/gallery`):** Interactive photo albums with instant category filtering and full-screen lightbox preview.
- **Blog & Field News (`/news` & `/news/[slug]`):** Complete publication system with author attribution, tags, reading time, and related articles.
- **Volunteer Registration (`/volunteer`):** Working application form collecting age, skills, area of interest, availability, and personal motivation. Submissions are stored in the database and dispatched via Formspree.
- **Contact Us (`/contact`):** Working contact form, headquarters address, phone numbers, direct email, operational hours, and responsive Google Maps embed.
- **Dynamic Page Engine (`/pages/[slug]`):** Allows the administrator to create unlimited custom pages (e.g., `/pages/donate`, `/pages/terms-and-conditions`, `/pages/privacy-policy`) from the CMS.

### 2. Full Admin CMS Panel (`/admin`)
- **Dashboard:** Real-time statistics aggregated from database tables (total pages, projects, activities, blog posts, gallery images, volunteer registrations, contact inquiries).
- **Homepage Editor (`/admin/homepage`):** Direct editing of hero headlines, subtitles, background images, CTA buttons, mission/vision texts, and section visibility.
- **Page Builder (`/admin/pages`):** Create, edit, delete, draft, and publish dynamic pages with custom slugs and SEO metadata.
- **Navigation Menu Manager (`/admin/navigation`):** Reorder, add, edit, and toggle header and footer menu items.
- **Activities Manager (`/admin/activities`):** Full CRUD for core humanitarian programs.
- **Projects Manager (`/admin/projects`):** Full CRUD for field projects with status, location, objectives, and outcomes.
- **Blog Manager (`/admin/news`):** Full CRUD for news and updates with category selection and publish toggles.
- **Gallery Manager (`/admin/gallery`):** Upload photos, organize by album/category, and set captions.
- **Team Manager (`/admin/team`):** Manage trustees, directors, medical staff, and volunteer leads.
- **Testimonials Manager (`/admin/testimonials`):** Approve, edit, and feature beneficiary feedback.
- **Contact Submissions CRM (`/admin/contacts`):** View inquiries, filter by status (New, Contacted, In Progress, Resolved), record internal follow-up notes, and export to CSV.
- **Volunteer Applications CRM (`/admin/volunteers`):** Review applications, filter by status (New, Interviewed, Accepted, Rejected), view volunteer profiles, add internal notes, and export to CSV.
- **Media Library (`/admin/media`):** Upload images and PDFs, preview files, and copy URLs.
- **Website Settings (`/admin/settings`):** Manage NGO name, logo, favicon, address, phone, email, working hours, social media URLs, Google Maps embed, SEO defaults, Formspree keys, and maintenance mode.
- **Admin Users & Roles (`/admin/users`):** Role-based access control (Super Admin vs. Content Editor).

---

## 🔐 Default Admin Credentials

Access the CMS at: `https://sohamngo.com/admin` (or `http://localhost:3000/admin`)

| Role | Email | Password |
|---|---|---|
| **Super Admin** | `admin@sohamngo.com` | `Admin@Soham2026!` |
| **Content Editor** | `editor@sohamngo.com` | `Editor@Soham2026!` |

*(You can also click the quick login helper buttons on the login screen during local testing).*

---

## 🛠️ Technology Stack & Dual-Driver Architecture

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS with custom humanitarian color palettes
- **Icons:** Lucide React
- **Database Architecture:**
  - **Supabase (PostgreSQL):** Production database with Row Level Security (RLS) policies, indexes, and full relational constraints. Complete schema and seeds are provided in `supabase/schema.sql` and `supabase/seed.sql`.
  - **Embedded Zero-Config Fallback:** If Supabase environment variables are omitted or pending configuration, the application automatically uses a resilient, high-performance file-backed database (`data/soham_ngo_db.json`) pre-seeded with authentic NGO content. All admin edits, form submissions, and CSV exports work seamlessly in both modes!

---

## 💻 Local Development Setup

1. **Clone or open the project folder:**
   ```bash
   cd soham-ngo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Public Website: [http://localhost:3000](http://localhost:3000)
   - Admin CMS Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🗄️ Setting Up Supabase (Production Database)

1. Create a free account at [https://supabase.com](https://supabase.com) and create a new project.
2. In the Supabase Dashboard, open the **SQL Editor**.
3. Copy and run the contents of `supabase/schema.sql`.
4. Copy and run the contents of `supabase/seed.sql`.
5. Go to **Project Settings -> API** and copy:
   - Project URL
   - `anon` `public` API key
   - `service_role` `secret` API key
6. Set the values in `.env.local` (or in Vercel Environment Variables):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

---

## 📧 Setting Up Formspree (Free Email Notifications)

1. Create a free account on [https://formspree.io](https://formspree.io).
2. Create two forms:
   - One for **Contact Inquiries** (target email: `contact@sohamngo.com`)
   - One for **Volunteer Applications** (target email: `volunteer@sohamngo.com`)
3. Copy the Form IDs (e.g. `xpwzylka`).
4. Enter them directly in the CMS under **Admin -> Website Settings -> Form Notification Service**, or add to `.env.local`:
   ```env
   NEXT_PUBLIC_FORMSPREE_CONTACT_ID=your-contact-form-id
   NEXT_PUBLIC_FORMSPREE_VOLUNTEER_ID=your-volunteer-form-id
   ```

---

## ☁️ Deployment on Vercel

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Go to [https://vercel.com](https://vercel.com) and click **Add New -> Project**.
3. Import the repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SITE_URL` = `https://sohamngo.com`
   - `NEXT_PUBLIC_SITE_NAME` = `Soham NGO`
   - `NEXT_PUBLIC_SUPABASE_URL` = (Your Supabase URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (Your Supabase Anon Key)
   - `SUPABASE_SERVICE_ROLE_KEY` = (Your Supabase Service Key)
   - `ADMIN_JWT_SECRET` = (A secure random secret)
5. Click **Deploy**.
6. Once deployed, navigate to **Settings -> Domains** in Vercel and add `sohamngo.com` and `www.sohamngo.com`. Follow the DNS instructions to set the A record and CNAME.
