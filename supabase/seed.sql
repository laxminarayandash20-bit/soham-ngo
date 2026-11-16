-- ==============================================================================
-- SOHAM NGO - SEED DATA FOR SUPABASE POSTGRESQL
-- Organization: Soham NGO (https://sohamngo.com)
-- ==============================================================================

-- 1. Insert Initial Admin Users
-- Default Passwords:
-- admin@sohamngo.com : Admin@Soham2026!
-- editor@sohamngo.com : Editor@Soham2026!
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES 
('admin@sohamngo.com', 'scrypt:admin_soham_2026_hash', 'Soham Super Admin', 'super_admin', TRUE),
('editor@sohamngo.com', 'scrypt:editor_soham_2026_hash', 'Editorial Staff', 'content_editor', TRUE)
ON CONFLICT (email) DO NOTHING;

-- 2. Insert Website Settings
INSERT INTO website_settings (
    id, org_name, tagline, logo_url, favicon_url, phone, email, address, working_hours, 
    google_maps_url, facebook_url, instagram_url, twitter_url, linkedin_url, youtube_url, 
    copyright_text, maintenance_mode, meta_title, meta_description, keywords, og_image
) VALUES (
    'general_settings',
    'Soham NGO',
    'Empowering Communities, Transforming Lives with Compassion & Dignity',
    '/images/soham-logo.svg',
    '/favicon.ico',
    '+91 (011) 2876-5432 / +91 98765 43210',
    'contact@sohamngo.com',
    '124 Humanity Lane, Sector 14, Institutional Area, New Delhi, India 110001',
    'Monday – Saturday: 9:00 AM – 6:00 PM',
    'https://maps.google.com/?q=New+Delhi',
    'https://facebook.com/sohamngo',
    'https://instagram.com/sohamngo',
    'https://twitter.com/sohamngo',
    'https://linkedin.com/company/sohamngo',
    'https://youtube.com/@sohamngo',
    '© 2026 Soham NGO. All Rights Reserved. Registered Social Welfare Organization.',
    FALSE,
    'Soham NGO | Dedicated to Community Welfare, Child Education & Healthcare',
    'Soham NGO is a non-governmental organization working towards inclusive grassroots development, quality education for underprivileged children, accessible rural healthcare, and women empowerment.',
    'soham ngo, ngo website, charity, child education, rural healthcare, women empowerment, volunteer, donate india',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop'
) ON CONFLICT (id) DO UPDATE SET
    org_name = EXCLUDED.org_name,
    tagline = EXCLUDED.tagline;

-- 3. Insert Homepage Sections
INSERT INTO homepage_sections (id, title, subtitle, content, background_image, cta_text, cta_link, secondary_cta_text, secondary_cta_link, is_enabled, sort_order, meta)
VALUES
('hero', 'Bringing Hope, Dignity and Opportunity to Every Soul in Need', 'Join hands with Soham NGO to provide quality education, life-saving healthcare, and sustainable livelihood to underserved communities.', '', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop', 'Join as Volunteer', '/volunteer', 'Explore Projects', '/projects', TRUE, 1, '{"badge": "Serving Humanity Since 2012"}'::jsonb),
('about_intro', 'Who We Are', 'A catalyst for sustainable grassroots transformation across vulnerable communities', 'Soham NGO is a non-profit, humanitarian institution established with a core commitment: no child should drop out due to poverty, no mother should lack essential healthcare, and no youth should remain without dignified livelihood skills. Through community-led programs, we bridge gaps in education, healthcare, nutrition, and environmental stewardship.', 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop', 'Read Our Full Story', '/about', '', '', TRUE, 2, '{"years_active": "14+", "communities_served": "85+"}'::jsonb),
('mission_vision', 'Our Guiding Principles', 'The foundation of everything we undertake', '', '', '', '', '', '', TRUE, 3, '{"mission": "To empower underserved communities through equitable access to holistic education, essential preventive healthcare, vocational training, and sustainable community infrastructure.", "vision": "A compassionate, self-reliant society where every individual lives with dignity, equal opportunities, and the power to shape their own destiny.", "values": ["Uncompromising Integrity", "Grassroots Inclusivity", "Sustainable Impact", "Compassionate Action"]}'::jsonb),
('impact_stats', 'Our Collective Impact Over the Years', 'Transparent metrics reflecting lives touched and transformed', '', '', 'Support Our Work', '/pages/donate', '', '', TRUE, 4, '{"stats": [{"label": "Children Educated", "value": "18,500+", "icon": "GraduationCap"}, {"label": "Free Health Checkups", "value": "45,000+", "icon": "HeartPulse"}, {"label": "Women Empowered", "value": "6,200+", "icon": "Users"}, {"label": "Villages Adopted", "value": "38", "icon": "Home"}, {"label": "Clean Water Units", "value": "65+", "icon": "Droplet"}, {"label": "Active Volunteers", "value": "1,400+", "icon": "Smile"}]}'::jsonb),
('volunteer_cta', 'Be the Change You Wish to See in the World', 'Your time and skills can bring smiles to hundreds of underprivileged children and families. Whether on the ground or virtually, your contribution creates lasting change.', '', 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1600&auto=format&fit=crop', 'Register as Volunteer', '/volunteer', 'Contact Us', '/contact', TRUE, 5, '{}'::jsonb),
('donation_cta', 'Your Generosity Transforms Lives', 'Every single rupee donated directly funds school kits, health camps, warm meals, and women skill centers with 100% financial transparency.', '', '', 'Donate Now', '/pages/donate', 'Download Annual Report', '/about#reports', TRUE, 6, '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Navigation Items
INSERT INTO nav_items (label, path, sort_order, is_header, is_footer, is_active)
VALUES
('Home', '/', 1, TRUE, TRUE, TRUE),
('About Us', '/about', 2, TRUE, TRUE, TRUE),
('Activities', '/activities', 3, TRUE, TRUE, TRUE),
('Projects', '/projects', 4, TRUE, TRUE, TRUE),
('Gallery', '/gallery', 5, TRUE, TRUE, TRUE),
('News & Updates', '/news', 6, TRUE, TRUE, TRUE),
('Volunteer', '/volunteer', 7, TRUE, TRUE, TRUE),
('Contact Us', '/contact', 8, TRUE, TRUE, TRUE),
('Donate', '/pages/donate', 9, TRUE, TRUE, TRUE),
('Privacy Policy', '/pages/privacy-policy', 10, FALSE, TRUE, TRUE),
('Terms of Service', '/pages/terms-and-conditions', 11, FALSE, TRUE, TRUE);

-- 5. Insert Activities
INSERT INTO activities (title, slug, category, summary, description, featured_image, impact_number, impact_label, is_featured, is_published, sort_order)
VALUES
('Child Education & Digital Literacy', 'education-and-child-development', 'Education', 'Enabling quality schooling, digital tablets, after-school remediation, and STEM labs for slum and rural students.', 'Education is the most powerful weapon against intergenerational poverty. Soham NGO operates informal learning centers, provides school kits, equips rural government schools with digital learning boards, and offers foundational literacy to over 5,000 children annually.', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', '18,500+', 'Children Educated', TRUE, TRUE, 1),
('Rural Health & Mobile Clinics', 'healthcare-and-medical-support', 'Healthcare', 'Conducting weekly medical camps, free medicine distribution, maternal health tracking, and pediatric checkups.', 'Lack of basic diagnostic facilities often leads to preventable complications in remote areas. Our Mobile Healthcare Units travel through 40+ villages monthly with qualified doctors, nurses, diagnostic kits, and free essential medicines.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop', '45,000+', 'Patients Treated', TRUE, TRUE, 2),
('Women Empowerment & Livelihood Skills', 'women-empowerment', 'Livelihood', 'Vocational training in tailoring, organic farming, handicraft marketing, and self-help group microfinance.', 'When a woman becomes financially independent, her whole household thrives. We train rural and slum women in market-aligned vocations, connect self-help groups with e-commerce platforms, and facilitate micro-grants for micro-enterprises.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop', '6,200+', 'Women Self-Reliant', TRUE, TRUE, 3),
('Clean Water & Rural Sanitation', 'rural-development', 'Rural Infrastructure', 'Installing solar-powered reverse osmosis water plants and building hygienic community sanitation blocks in remote hamlets.', 'Waterborne ailments affect millions of children. Soham NGO constructs low-maintenance solar water purification units and household toilets in water-stressed villages, reducing illness rates by over 60%.', 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=800&auto=format&fit=crop', '35+', 'Villages Provided Clean Water', TRUE, TRUE, 4),
('Environmental Conservation & Green Drives', 'environmental-protection', 'Environment', 'Planting indigenous trees, youth eco-clubs, plastic waste management drives, and rainwater harvesting ponds.', 'Restoring ecological balance is vital for climate resilience. Our youth green volunteers have planted over 50,000 indigenous trees, rejuvenated 12 village community ponds, and conducted anti-plastic awareness programs in 50+ schools.', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop', '50,000+', 'Trees Planted', FALSE, TRUE, 5),
('Emergency Relief & Community Welfare', 'community-welfare', 'Welfare', 'Rapid response during floods, winter cold waves, and distribution of dry ration and hygiene kits to vulnerable families.', 'Whenever natural calamities or severe economic distress strike, Soham rapid response teams mobilize hot meals, emergency shelters, hygiene packs, and rebuilding support for the most vulnerable.', 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop', '12,000+', 'Relief Kits Distributed', FALSE, TRUE, 6)
ON CONFLICT (slug) DO NOTHING;

-- 6. Insert Projects
INSERT INTO projects (title, slug, category, description, full_content, featured_image, location, start_date, end_date, status, objectives, outcomes, is_featured, is_published)
VALUES
('Project Gyan: Smart Classrooms for 25 Village Schools', 'project-gyan-smart-classrooms', 'Education', 'Equipping 25 remote rural schools with solar-powered smart TVs, offline educational software, and teacher training.', 'Project Gyan is Soham NGO flagship education initiative targeting the digital divide in rural schools. By installing solar-powered smart classrooms with bilingual digital curriculums, children gain interactive visual learning in mathematics, science, and languages.', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop', 'District Palwal & Nuh, Haryana', '2025-04-01', '2026-03-31', 'active', '["Set up 25 solar-powered digital learning classrooms", "Train 100 rural school teachers in digital pedagogies", "Improve STEM comprehension rates by 40%"]'::jsonb, '["18 classrooms fully operational and electrified", "4,200 students attending daily interactive sessions", "Teacher attendance and student engagement up 35%"]'::jsonb, TRUE, TRUE),
('Project Arogya: Mobile Medical Care on Wheels', 'project-arogya-mobile-clinic', 'Healthcare', 'Dedicated mobile healthcare van equipped with diagnostic lab, ultrasound, ECG, and telemedicine connectivity.', 'Serving 42 isolated hamlets without primary health centers, Project Arogya delivers primary medical examinations, chronic disease management (diabetes and hypertension), prenatal checkups, and free medicines right at the villagers doorsteps.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop', 'Bundelkhand Region, Uttar Pradesh', '2024-01-15', NULL, 'active', '["Reach 40,000 unreached rural citizens every year", "Early detection of maternal complications and malnutrition", "Free prescription medicine distribution"]'::jsonb, '["Over 34,000 consultations completed in the past 12 months", "310 high-risk pregnancies safely referred to district hospitals"]'::jsonb, TRUE, TRUE),
('Project Shakti: Vocational Centers for Rural Women', 'project-shakti-women-skills', 'Women Empowerment', 'Setting up community tailoring, food processing, and handicrafts centers managed entirely by women cooperatives.', 'Project Shakti establishes sustainable livelihood hubs where rural women learn high-demand trades, obtain micro-loans, and collectively supply eco-friendly cotton bags and processed organic foods to urban markets.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop', 'Jaipur & Alwar Districts, Rajasthan', '2024-06-01', '2026-12-31', 'active', '["Train 1,000 women in tailoring, handloom, and food packaging", "Establish 15 self-help producer collectives", "Guarantee monthly supplementary income of at least ₹8,000"]'::jsonb, '["680 women graduated and certified", "12 active micro-enterprises earning recurring income"]'::jsonb, TRUE, TRUE),
('Project Jal: Solar Drinking Water Plants', 'project-jal-clean-water', 'Rural Infrastructure', 'Commissioned 15 community water purification kiosks powered by solar energy in fluoride-affected villages.', 'Fluoride and heavy metal contamination was causing widespread bone deformities and kidney ailments. Project Jal installed 15 reverse osmosis filtration plants with 24/7 ATM-card style access delivering clean drinking water at zero cost.', 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=800&auto=format&fit=crop', 'Mahoba District, Uttar Pradesh', '2023-03-01', '2025-08-30', 'completed', '["Eradicate waterborne illnesses in 15 target villages", "100% solar self-reliant purification system", "Form village water committees for sustainable maintenance"]'::jsonb, '["15 plants fully operational and handed over to village panchayats", "Zero fluoride-related pediatric cases reported in target areas"]'::jsonb, FALSE, TRUE)
ON CONFLICT (slug) DO NOTHING;

-- 7. Insert Blog Posts
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, author_name, category, is_published, published_at)
VALUES
('Transforming Rural Classrooms: The Story of 12-Year-Old Priya', 'transforming-rural-classrooms-priya-story', 'Discover how solar digital classrooms opened new horizons of science and mathematics for girl students in Haryana.', 'In the quiet hamlet of Chandpur, 12-year-old Priya used to walk 4 kilometers just to find an open school with textbooks. Today, her school boasts a modern interactive smart board powered by clean solar energy. Her teacher shares how Priya now leads the class science quiz and dreams of becoming an aerospace engineer.\n\nProject Gyan has brought this transformation to over 25 rural schools. Read more about our ongoing efforts to bridge the educational divide.', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', 'Dr. Arvind Sharma', 'Education', TRUE, NOW() - INTERVAL '3 days'),
('Annual Mega Health Camp: Over 1,800 Patients Screened in 2 Days', 'annual-mega-health-camp-1800-patients', 'Volunteer doctors, pediatricians, and optometrists delivered free diagnoses, eyeglasses, and medicines in our recent outreach.', 'Last weekend, Soham NGO organized its 14th Annual Mega Health Outreach Camp in partnership with premier medical institutes. A team of 24 specialist doctors volunteered their expertise, providing cardiovascular screenings, maternal checks, pediatric immunization, and 650 free prescription eyeglasses.\n\nCommunity health is the cornerstone of economic resilience. We extend heartfelt gratitude to our volunteer medical fraternity.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop', 'Dr. Sunita Patel', 'Healthcare', TRUE, NOW() - INTERVAL '10 days'),
('From Homemakers to Entrepreneurs: How Project Shakti Changed Lives', 'project-shakti-women-entrepreneurs', 'How 45 rural women in Alwar established a successful handicraft cooperative generating financial independence.', 'When Sunita Devi first stepped into Soham Vocational Center, she was hesitant. Today, she is the elected president of the Maitri Women Cooperative, managing supply contracts for cloth bags with three major retail chains. Her income has helped send both her daughters to college.\n\nEconomic independence transforms family dynamics and elevates female participation in community governance.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop', 'Meera Deshmukh', 'Empowerment', TRUE, NOW() - INTERVAL '20 days')
ON CONFLICT (slug) DO NOTHING;

-- 8. Insert Team Members
INSERT INTO team_members (name, designation, category, photo_url, bio, email, sort_order, is_visible)
VALUES
('Dr. Arvind Sharma', 'Founder & President', 'leadership', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop', 'Social development specialist with 22+ years of grassroots humanitarian leadership across rural India. Passionate about child education and ethical governance.', 'arvind@sohamngo.com', 1, TRUE),
('Meera Deshmukh', 'Executive Director', 'leadership', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop', 'Former UN consultant specializing in women empowerment, self-help microfinance cooperatives, and institutional policy advocacy.', 'meera@sohamngo.com', 2, TRUE),
('Rajesh Verma', 'Director of Field Operations', 'operations', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop', 'Veteran disaster relief coordinator with extensive logistical experience in rapid flood response, clean water infrastructure, and community mobilization.', 'rajesh@sohamngo.com', 3, TRUE),
('Dr. Sunita Patel', 'Head of Healthcare Initiatives', 'leadership', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format&fit=crop', 'Public health physician dedicated to eradicating preventable rural diseases and reducing maternal mortality in underprivileged regions.', 'sunita@sohamngo.com', 4, TRUE),
('Ankit Saxena', 'Youth & Volunteer Coordinator', 'volunteer_lead', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop', 'Leads our 1,400+ strong volunteer network across universities and corporate social responsibility partnerships.', 'ankit@sohamngo.com', 5, TRUE);

-- 9. Insert Testimonials
INSERT INTO testimonials (name, role, organization, quote, photo_url, rating, is_featured, is_visible, sort_order)
VALUES
('Rameshwar Singh', 'Village Sarpanch', 'Palwal Gram Panchayat', 'Before Soham NGO intervened, our primary school lacked teachers and electricity. Their solar smart classroom has renewed our children enthusiasm for learning. We are deeply grateful.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop', 5, TRUE, TRUE, 1),
('Kavita Yadav', 'Self-Help Group Leader', 'Alwar Craft Guild', 'The tailoring training and seed funding from Soham gave 35 women in our village self-respect and steady income. We are no longer dependent on anyone.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop', 5, TRUE, TRUE, 2),
('Dr. Alok Nath', 'Volunteer Pediatrician', 'Fortis Healthcare', 'Volunteering with Soham Mobile Health Unit was one of the most fulfilling experiences of my medical career. The transparency and ground execution are extraordinary.', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop', 5, TRUE, TRUE, 3);

-- 10. Insert Gallery Images
INSERT INTO gallery_images (title, category, image_url, caption, album_name, sort_order)
VALUES
('Digital Classrooms in Session', 'Education', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', 'Students participating in an interactive mathematics session', 'School Initiatives 2026', 1),
('Rural Health Checkup Camp', 'Healthcare', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop', 'Volunteer doctors administering preventive pediatric checkups', 'Health Outreach', 2),
('Women Cooperative Handloom Center', 'Empowerment', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop', 'Trainees producing eco-friendly cotton bags for fair trade markets', 'Skill Development', 3),
('Clean Drinking Water Kiosk', 'Rural Development', 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=800&auto=format&fit=crop', 'Villagers accessing pure filtered drinking water in Bundelkhand', 'Clean Water', 4),
('Tree Plantation Drive', 'Environment', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop', 'Over 1,000 indigenous saplings planted by volunteer youth teams', 'Green Earth', 5),
('Distribution of Winter Blankets & Relief Kits', 'Community', 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop', 'Emergency winter warmth distributed to elderly and slum families', 'Winter Relief', 6);

-- 11. Insert Dynamic Pages
INSERT INTO pages (title, slug, description, content, is_published, meta_title, meta_description)
VALUES
('Support Our Cause - Donate', 'donate', 'Make a tax-deductible contribution to sponsor child education, health camps, and women empowerment.', '### Your Contribution Makes a Tangible Difference\n\nAt Soham NGO, every donation is accounted for with utmost transparency. When you donate, you help us bring quality education, life-saving medicines, and sustainable livelihood tools to the most marginalized sections of society.\n\n#### How Your Donation Helps:\n- **₹1,500 ($18):** Sponsors school supplies, uniform, and books for one child for an entire academic year.\n- **₹3,500 ($42):** Funds diagnostic tests and free medication for 15 elderly rural patients.\n- **₹7,500 ($90):** Provides a sewing machine and comprehensive vocational kit to an aspiring woman entrepreneur.\n- **₹25,000 ($300):** Helps install a solar-powered water filtration unit for an entire village hamlet.\n\n#### Direct Bank Transfer Details\n- **Account Name:** Soham Social Welfare NGO\n- **Bank Name:** State Bank of India\n- **Account Number:** 38947291048\n- **IFSC Code:** SBIN0001234\n- **Branch:** New Delhi Main Branch\n- **Tax Exemption:** 80G Certified Non-Profit Organization (Receipt issued within 48 hours).', TRUE, 'Donate to Soham NGO | Tax Exempt Charitable Contribution', 'Donate to Soham NGO to sponsor child education, healthcare camps, and women vocational centers.'),
('Terms and Conditions', 'terms-and-conditions', 'Official terms and conditions governing the use of Soham NGO website and services.', '### 1. Acceptance of Terms\nBy accessing and using this website (https://sohamngo.com), you agree to comply with and be bound by these terms.\n\n### 2. Charitable Purpose\nSoham NGO is a non-profit organization dedicated solely to public welfare, educational development, and humanitarian relief.\n\n### 3. Donations & Refunds\nAll donations made to Soham NGO are non-refundable charitable contributions. Donations are eligible for tax deduction under applicable non-profit statutes.\n\n### 4. Intellectual Property\nAll content, photographs, reports, and brand logos displayed on this site are the property of Soham NGO or used with permission. Unauthorized reproduction for commercial gain is prohibited.', TRUE, 'Terms and Conditions | Soham NGO', 'Terms and conditions for using the Soham NGO official portal and donation services.'),
('Privacy Policy', 'privacy-policy', 'How Soham NGO collects, protects, and respects your personal information.', '### Privacy & Confidentiality Commitment\n\nSoham NGO values the trust of its donors, volunteers, and visitors. We are committed to protecting your personal information.\n\n#### 1. Information Collected\nWe collect details you voluntarily provide through contact inquiries, volunteer applications, and donation receipts (such as name, email, phone number, address).\n\n#### 2. How We Use Information\nYour details are used strictly to communicate organizational updates, process volunteer deployments, and deliver donation receipts.\n\n#### 3. No Third-Party Sharing\nWe NEVER sell, trade, or rent personal information to third-party commercial marketing entities.\n\n#### 4. Contact Us\nFor privacy inquiries, contact us at privacy@sohamngo.com.', TRUE, 'Privacy Policy | Soham NGO', 'Privacy policy explaining how Soham NGO protects donor and volunteer data.');
