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
  AdminUser
} from './types';

export const initialSettings: WebsiteSettings = {
  id: 'general_settings',
  org_name: 'Soham NGO',
  tagline: 'Empowering Communities, Transforming Lives with Compassion & Dignity',
  logo_url: '/images/soham-logo.svg',
  favicon_url: '/favicon.ico',
  phone: '+91 (011) 2876-5432 / +91 98765 43210',
  email: 'contact@sohamngo.com',
  address: '124 Humanity Lane, Sector 14, Institutional Area, New Delhi, India 110001',
  working_hours: 'Monday – Saturday: 9:00 AM – 6:00 PM',
  google_maps_url: 'https://maps.google.com/?q=New+Delhi',
  facebook_url: 'https://facebook.com/sohamngo',
  instagram_url: 'https://instagram.com/sohamngo',
  twitter_url: 'https://twitter.com/sohamngo',
  linkedin_url: 'https://linkedin.com/company/sohamngo',
  youtube_url: 'https://youtube.com/@sohamngo',
  copyright_text: '© 2026 Soham NGO. All Rights Reserved. Registered Social Welfare Organization.',
  maintenance_mode: false,
  meta_title: 'Soham NGO | Dedicated to Community Welfare, Child Education & Healthcare',
  meta_description: 'Soham NGO is a non-governmental organization working towards inclusive grassroots development, quality education for underprivileged children, accessible rural healthcare, and women empowerment.',
  keywords: 'soham ngo, ngo website, charity, child education, rural healthcare, women empowerment, volunteer, donate india',
  og_image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
  formspree_contact_id: '',
  formspree_volunteer_id: '',
  updated_at: new Date().toISOString()
};

export const initialHomepageSections: HomepageSection[] = [
  {
    id: 'hero',
    title: 'Bringing Hope, Dignity and Opportunity to Every Soul in Need',
    subtitle: 'Join hands with Soham NGO to provide quality education, life-saving healthcare, and sustainable livelihood to underserved communities across India.',
    content: '',
    background_image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop',
    cta_text: 'Join as Volunteer',
    cta_link: '/volunteer',
    secondary_cta_text: 'Explore Projects',
    secondary_cta_link: '/projects',
    is_enabled: true,
    sort_order: 1,
    meta: { badge: 'Serving Humanity Since 2012' },
    updated_at: new Date().toISOString()
  },
  {
    id: 'about_intro',
    title: 'Who We Are',
    subtitle: 'A catalyst for sustainable grassroots transformation across vulnerable communities',
    content: 'Soham NGO is a non-profit humanitarian organization founded with one unwavering mission: to ensure that no child is deprived of education due to poverty, no mother lacks basic healthcare, and no rural youth remains without dignified vocational skills. Through sustainable grassroots initiatives, community-led health camps, and modern learning infrastructure, we bridge critical divides and restore self-worth.',
    background_image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
    cta_text: 'Read Our Full Story',
    cta_link: '/about',
    is_enabled: true,
    sort_order: 2,
    meta: { years_active: '14+', communities_served: '85+' },
    updated_at: new Date().toISOString()
  },
  {
    id: 'mission_vision',
    title: 'Our Guiding Principles',
    subtitle: 'The foundational pillars guiding every project and partnership',
    content: '',
    is_enabled: true,
    sort_order: 3,
    meta: {
      mission: 'To empower underprivileged communities through equitable access to holistic schooling, preventive healthcare, vocational training, and sustainable community infrastructure.',
      vision: 'A compassionate, self-reliant society where every individual lives with dignity, equal opportunities, and the power to shape their own destiny.',
      values: [
        'Uncompromising Transparency',
        'Grassroots Inclusivity',
        'Long-term Sustainability',
        'Compassionate Action'
      ]
    },
    updated_at: new Date().toISOString()
  },
  {
    id: 'impact_stats',
    title: 'Our Collective Impact Over the Years',
    subtitle: 'Measurable, transparent outcomes achieved hand-in-hand with our donors and volunteers',
    content: '',
    cta_text: 'Support Our Work',
    cta_link: '/pages/donate',
    is_enabled: true,
    sort_order: 4,
    meta: {
      stats: [
        { label: 'Children Educated', value: '18,500+', icon: 'GraduationCap' },
        { label: 'Health Checkups', value: '45,000+', icon: 'HeartPulse' },
        { label: 'Women Empowered', value: '6,200+', icon: 'Users' },
        { label: 'Villages Adopted', value: '38', icon: 'Home' },
        { label: 'Clean Water Units', value: '65+', icon: 'Droplet' },
        { label: 'Active Volunteers', value: '1,400+', icon: 'Smile' }
      ]
    },
    updated_at: new Date().toISOString()
  },
  {
    id: 'volunteer_cta',
    title: 'Be the Change You Wish to See in the World',
    subtitle: 'Your passion, time, and skills can bring smiles to hundreds of underprivileged children and families. Join our family of over 1,400 change-makers.',
    content: '',
    background_image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1600&auto=format&fit=crop',
    cta_text: 'Register as Volunteer',
    cta_link: '/volunteer',
    secondary_cta_text: 'Contact Us',
    secondary_cta_link: '/contact',
    is_enabled: true,
    sort_order: 5,
    meta: {},
    updated_at: new Date().toISOString()
  },
  {
    id: 'donation_cta',
    title: 'Your Generosity Transforms Vulnerable Lives',
    subtitle: 'Every single contribution directly sponsors school kits, mobile doctor visits, clean water filtration, and women livelihood centers with 100% financial transparency.',
    content: '',
    cta_text: 'Donate Online',
    cta_link: '/pages/donate',
    secondary_cta_text: 'View Annual Reports',
    secondary_cta_link: '/about#reports',
    is_enabled: true,
    sort_order: 6,
    meta: {},
    updated_at: new Date().toISOString()
  }
];

export const initialNavItems: NavItem[] = [
  { id: 'nav-1', label: 'Home', path: '/', sort_order: 1, is_header: true, is_footer: true, is_active: true },
  { id: 'nav-2', label: 'About Us', path: '/about', sort_order: 2, is_header: true, is_footer: true, is_active: true },
  { id: 'nav-3', label: 'Activities', path: '/activities', sort_order: 3, is_header: true, is_footer: true, is_active: true },
  { id: 'nav-4', label: 'Projects', path: '/projects', sort_order: 4, is_header: true, is_footer: true, is_active: true },
  { id: 'nav-5', label: 'Gallery', path: '/gallery', sort_order: 5, is_header: true, is_footer: true, is_active: true },
  { id: 'nav-6', label: 'News & Updates', path: '/news', sort_order: 6, is_header: true, is_footer: true, is_active: true },
  { id: 'nav-7', label: 'Volunteer', path: '/volunteer', sort_order: 7, is_header: true, is_footer: true, is_active: true },
  { id: 'nav-8', label: 'Contact Us', path: '/contact', sort_order: 8, is_header: true, is_footer: true, is_active: true },
  { id: 'nav-9', label: 'Donate', path: '/pages/donate', sort_order: 9, is_header: true, is_footer: true, is_active: true },
  { id: 'nav-10', label: 'Privacy Policy', path: '/pages/privacy-policy', sort_order: 10, is_header: false, is_footer: true, is_active: true },
  { id: 'nav-11', label: 'Terms & Conditions', path: '/pages/terms-and-conditions', sort_order: 11, is_header: false, is_footer: true, is_active: true }
];

export const initialActivities: Activity[] = [
  {
    id: 'act-1',
    title: 'Child Education & Digital Literacy',
    slug: 'education-and-child-development',
    category: 'Education',
    summary: 'Enabling quality schooling, digital tablets, after-school remediation, and STEM labs for slum and rural students.',
    description: 'Education is the most powerful weapon against generational poverty. Soham NGO operates informal learning centers, provides school kits, equips rural government schools with digital learning boards, and offers foundational literacy to over 5,000 children annually.\n\nOur curriculum integrates life skills, computer familiarity, and extracurricular arts, fostering curiosity and self-belief in young minds.',
    featured_image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    impact_number: '18,500+',
    impact_label: 'Children Educated',
    is_featured: true,
    is_published: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'act-2',
    title: 'Rural Health & Mobile Clinics',
    slug: 'healthcare-and-medical-support',
    category: 'Healthcare',
    summary: 'Conducting weekly medical camps, free medicine distribution, maternal health tracking, and pediatric checkups.',
    description: 'Lack of basic diagnostic facilities often leads to preventable complications in remote areas. Our Mobile Healthcare Units travel through 40+ villages monthly with qualified doctors, nurses, diagnostic kits, and free essential medicines.\n\nWe specialize in non-communicable disease monitoring, maternal and infant nutrition counseling, and emergency hospital referrals.',
    featured_image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop',
    impact_number: '45,000+',
    impact_label: 'Patients Treated',
    is_featured: true,
    is_published: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'act-3',
    title: 'Women Empowerment & Livelihood Skills',
    slug: 'women-empowerment',
    category: 'Livelihood',
    summary: 'Vocational training in tailoring, organic farming, handicraft marketing, and self-help group microfinance.',
    description: 'When a woman becomes financially independent, her whole household thrives. We train rural and urban slum women in market-aligned vocations, connect self-help groups with e-commerce platforms, and facilitate micro-grants for micro-enterprises.\n\nGraduates become breadwinners, increasing household savings and improving female literacy and nutrition.',
    featured_image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    impact_number: '6,200+',
    impact_label: 'Women Self-Reliant',
    is_featured: true,
    is_published: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'act-4',
    title: 'Clean Water & Rural Sanitation',
    slug: 'rural-development',
    category: 'Rural Development',
    summary: 'Installing solar-powered reverse osmosis water plants and building hygienic community sanitation blocks in remote hamlets.',
    description: 'Waterborne ailments affect millions of children. Soham NGO constructs low-maintenance solar water purification units and household toilets in water-stressed villages, reducing illness rates by over 60%.\n\nWe also establish village water monitoring committees to ensure community ownership and sustainable longevity.',
    featured_image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=800&auto=format&fit=crop',
    impact_number: '35+',
    impact_label: 'Villages Provided Clean Water',
    is_featured: true,
    is_published: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'act-5',
    title: 'Environmental Conservation & Tree Drives',
    slug: 'environmental-protection',
    category: 'Environment',
    summary: 'Planting indigenous trees, youth eco-clubs, plastic waste management drives, and rainwater harvesting ponds.',
    description: 'Restoring ecological balance is vital for climate resilience. Our youth green volunteers have planted over 50,000 indigenous trees, rejuvenated 12 village community ponds, and conducted anti-plastic awareness programs in 50+ schools.',
    featured_image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    impact_number: '50,000+',
    impact_label: 'Trees Planted',
    is_featured: false,
    is_published: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'act-6',
    title: 'Emergency Relief & Community Welfare',
    slug: 'community-welfare',
    category: 'Community Welfare',
    summary: 'Rapid response during floods, winter cold waves, and distribution of dry ration and hygiene kits to vulnerable families.',
    description: 'Whenever natural calamities or severe economic distress strike, Soham rapid response teams mobilize hot meals, emergency shelters, hygiene packs, and rebuilding support for the most vulnerable.',
    featured_image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop',
    impact_number: '12,000+',
    impact_label: 'Relief Kits Distributed',
    is_featured: false,
    is_published: true,
    sort_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Project Gyan: Smart Classrooms for 25 Village Schools',
    slug: 'project-gyan-smart-classrooms',
    category: 'Education',
    description: 'Equipping 25 remote rural schools with solar-powered smart TVs, offline educational software, and teacher training.',
    full_content: 'Project Gyan is Soham NGO flagship education initiative targeting the digital divide in rural schools. By installing solar-powered smart classrooms with bilingual digital curriculums, children gain interactive visual learning in mathematics, science, and languages.\n\nEach center includes a dedicated teacher coach, interactive learning software, and continuous monitoring to assess student progress.',
    featured_image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop',
    location: 'District Palwal & Nuh, Haryana',
    start_date: '2025-04-01',
    end_date: '2026-03-31',
    status: 'active',
    objectives: [
      'Set up 25 solar-powered digital learning classrooms',
      'Train 100 rural school teachers in digital pedagogies',
      'Improve STEM comprehension rates by 40% among rural students'
    ],
    outcomes: [
      '18 classrooms fully operational and electrified with solar backup',
      '4,200 students attending daily interactive sessions',
      'Teacher attendance and student engagement up 35%'
    ],
    is_featured: true,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-2',
    title: 'Project Arogya: Mobile Medical Care on Wheels',
    slug: 'project-arogya-mobile-clinic',
    category: 'Healthcare',
    description: 'Dedicated mobile healthcare van equipped with diagnostic lab, ultrasound, ECG, and telemedicine connectivity.',
    full_content: 'Serving 42 isolated hamlets without primary health centers, Project Arogya delivers primary medical examinations, chronic disease management (diabetes and hypertension), prenatal checkups, and free medicines right at the villagers doorsteps.\n\nStaffed by medical doctors, certified nurses, and a laboratory technician, the van visits each hamlet on a fixed weekly schedule.',
    featured_image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop',
    location: 'Bundelkhand Region, Uttar Pradesh',
    start_date: '2024-01-15',
    end_date: null,
    status: 'active',
    objectives: [
      'Reach 40,000 unreached rural citizens every year',
      'Early detection of maternal complications and pediatric malnutrition',
      'Free prescription medicine distribution to below-poverty-line families'
    ],
    outcomes: [
      'Over 34,000 consultations completed in the past 12 months',
      '310 high-risk pregnancies safely referred to district hospitals'
    ],
    is_featured: true,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-3',
    title: 'Project Shakti: Vocational Centers for Rural Women',
    slug: 'project-shakti-women-skills',
    category: 'Women Empowerment',
    description: 'Setting up community tailoring, food processing, and handicrafts centers managed entirely by women cooperatives.',
    full_content: 'Project Shakti establishes sustainable livelihood hubs where rural women learn high-demand trades, obtain micro-loans, and collectively supply eco-friendly cotton bags and processed organic foods to urban markets.',
    featured_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    location: 'Jaipur & Alwar Districts, Rajasthan',
    start_date: '2024-06-01',
    end_date: '2026-12-31',
    status: 'active',
    objectives: [
      'Train 1,000 women in tailoring, handloom, and food packaging',
      'Establish 15 self-help producer collectives',
      'Guarantee monthly supplementary income of at least ₹8,000'
    ],
    outcomes: [
      '680 women graduated and certified',
      '12 active micro-enterprises earning recurring income'
    ],
    is_featured: true,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-4',
    title: 'Project Jal: Solar Drinking Water Plants',
    slug: 'project-jal-clean-water',
    category: 'Rural Infrastructure',
    description: 'Commissioned 15 community water purification kiosks powered by solar energy in fluoride-affected villages.',
    full_content: 'Fluoride and heavy metal contamination was causing widespread bone deformities and kidney ailments. Project Jal installed 15 reverse osmosis filtration plants with 24/7 ATM-card style access delivering clean drinking water at zero cost.',
    featured_image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=800&auto=format&fit=crop',
    location: 'Mahoba District, Uttar Pradesh',
    start_date: '2023-03-01',
    end_date: '2025-08-30',
    status: 'completed',
    objectives: [
      'Eradicate waterborne illnesses in 15 target villages',
      '100% solar self-reliant purification system',
      'Form village water committees for sustainable maintenance'
    ],
    outcomes: [
      '15 plants fully operational and handed over to village panchayats',
      'Zero fluoride-related pediatric cases reported in target areas'
    ],
    is_featured: false,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Transforming Rural Classrooms: The Story of 12-Year-Old Priya',
    slug: 'transforming-rural-classrooms-priya-story',
    excerpt: 'Discover how solar digital classrooms opened new horizons of science and mathematics for girl students in Haryana.',
    content: 'In the quiet hamlet of Chandpur, 12-year-old Priya used to walk 4 kilometers just to find an open school with textbooks. Today, her school boasts a modern interactive smart board powered by clean solar energy.\n\nHer teacher shares how Priya now leads the class science quiz and dreams of becoming an aerospace engineer. With your support, Project Gyan has brought this transformation to over 25 rural schools.',
    featured_image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    author_name: 'Dr. Arvind Sharma',
    category: 'Education',
    tags: ['Education', 'Rural Schools', 'Smart Classrooms'],
    is_published: true,
    published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'post-2',
    title: 'Annual Mega Health Camp: Over 1,800 Patients Screened in 2 Days',
    slug: 'annual-mega-health-camp-1800-patients',
    excerpt: 'Volunteer doctors, pediatricians, and optometrists delivered free diagnoses, eyeglasses, and medicines in our recent outreach.',
    content: 'Last weekend, Soham NGO organized its 14th Annual Mega Health Outreach Camp in partnership with premier medical institutes. A team of 24 specialist doctors volunteered their expertise, providing cardiovascular screenings, maternal checks, pediatric immunization, and 650 free prescription eyeglasses.\n\nCommunity health is the cornerstone of economic resilience. We extend heartfelt gratitude to our volunteer medical fraternity.',
    featured_image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop',
    author_name: 'Dr. Sunita Patel',
    category: 'Healthcare',
    tags: ['Healthcare', 'Medical Camp', 'Volunteers'],
    is_published: true,
    published_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'post-3',
    title: 'From Homemakers to Entrepreneurs: How Project Shakti Changed Lives',
    slug: 'project-shakti-women-entrepreneurs',
    excerpt: 'How 45 rural women in Alwar established a successful handicraft cooperative generating financial independence.',
    content: 'When Sunita Devi first stepped into Soham Vocational Center, she was hesitant. Today, she is the elected president of the Maitri Women Cooperative, managing supply contracts for cloth bags with three major retail chains. Her income has helped send both her daughters to college.\n\nEconomic independence transforms family dynamics and elevates female participation in community governance.',
    featured_image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    author_name: 'Meera Deshmukh',
    category: 'Women Empowerment',
    tags: ['Women Empowerment', 'Livelihood', 'Self-Reliance'],
    is_published: true,
    published_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialGalleryImages: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'Digital Classrooms in Session',
    category: 'Education',
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    caption: 'Students participating in an interactive mathematics session',
    album_name: 'School Initiatives 2026',
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-2',
    title: 'Rural Health Checkup Camp',
    category: 'Healthcare',
    image_url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop',
    caption: 'Volunteer doctors administering preventive pediatric checkups',
    album_name: 'Health Outreach',
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-3',
    title: 'Women Cooperative Handloom Center',
    category: 'Empowerment',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    caption: 'Trainees producing eco-friendly cotton bags for fair trade markets',
    album_name: 'Skill Development',
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-4',
    title: 'Clean Drinking Water Kiosk',
    category: 'Rural Development',
    image_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=800&auto=format&fit=crop',
    caption: 'Villagers accessing pure filtered drinking water in Bundelkhand',
    album_name: 'Clean Water',
    sort_order: 4,
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-5',
    title: 'Tree Plantation Drive',
    category: 'Environment',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    caption: 'Over 1,000 indigenous saplings planted by volunteer youth teams',
    album_name: 'Green Earth',
    sort_order: 5,
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-6',
    title: 'Distribution of Relief Kits',
    category: 'Community',
    image_url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop',
    caption: 'Emergency winter warmth distributed to elderly and slum families',
    album_name: 'Winter Relief',
    sort_order: 6,
    created_at: new Date().toISOString()
  }
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Dr. Arvind Sharma',
    designation: 'Founder & President',
    category: 'leadership',
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop',
    bio: 'Social development specialist with 22+ years of grassroots humanitarian leadership across rural India. Passionate about child education and ethical governance.',
    email: 'arvind@sohamngo.com',
    sort_order: 1,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'team-2',
    name: 'Meera Deshmukh',
    designation: 'Executive Director',
    category: 'leadership',
    photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop',
    bio: 'Former UN consultant specializing in women empowerment, self-help microfinance cooperatives, and institutional policy advocacy.',
    email: 'meera@sohamngo.com',
    sort_order: 2,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'team-3',
    name: 'Rajesh Verma',
    designation: 'Director of Field Operations',
    category: 'operations',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop',
    bio: 'Veteran disaster relief coordinator with extensive logistical experience in rapid flood response, clean water infrastructure, and community mobilization.',
    email: 'rajesh@sohamngo.com',
    sort_order: 3,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'team-4',
    name: 'Dr. Sunita Patel',
    designation: 'Head of Healthcare Initiatives',
    category: 'leadership',
    photo_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format&fit=crop',
    bio: 'Public health physician dedicated to eradicating preventable rural diseases and reducing maternal mortality in underprivileged regions.',
    email: 'sunita@sohamngo.com',
    sort_order: 4,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'team-5',
    name: 'Ankit Saxena',
    designation: 'Youth & Volunteer Coordinator',
    category: 'volunteer_lead',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop',
    bio: 'Leads our 1,400+ strong volunteer network across universities and corporate social responsibility partnerships.',
    email: 'ankit@sohamngo.com',
    sort_order: 5,
    is_visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Rameshwar Singh',
    role: 'Village Sarpanch',
    organization: 'Palwal Gram Panchayat',
    quote: 'Before Soham NGO intervened, our primary school lacked teachers and electricity. Their solar smart classroom has renewed our children enthusiasm for learning. We are deeply grateful.',
    photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    is_featured: true,
    is_visible: true,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'test-2',
    name: 'Kavita Yadav',
    role: 'Self-Help Group Leader',
    organization: 'Alwar Craft Guild',
    quote: 'The tailoring training and seed funding from Soham gave 35 women in our village self-respect and steady income. We are no longer dependent on anyone.',
    photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    is_featured: true,
    is_visible: true,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'test-3',
    name: 'Dr. Alok Nath',
    role: 'Volunteer Pediatrician',
    organization: 'Fortis Healthcare',
    quote: 'Volunteering with Soham Mobile Health Unit was one of the most fulfilling experiences of my medical career. The transparency and ground execution are extraordinary.',
    photo_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    is_featured: true,
    is_visible: true,
    sort_order: 3,
    created_at: new Date().toISOString()
  }
];

export const initialPages: Page[] = [
  {
    id: 'page-1',
    title: 'Support Our Cause - Donate',
    slug: 'donate',
    description: 'Make a tax-deductible contribution to sponsor child education, health camps, and women empowerment.',
    content: `## Your Contribution Makes a Tangible Difference

At Soham NGO, every donation is accounted for with utmost transparency. When you donate, you help us bring quality education, life-saving medicines, and sustainable livelihood tools to the most marginalized sections of society.

### How Your Donation Helps:
- **₹1,500 ($18):** Sponsors school supplies, uniform, and textbooks for one child for an entire academic year.
- **₹3,500 ($42):** Funds diagnostic tests and free medication for 15 elderly rural patients.
- **₹7,500 ($90):** Provides a sewing machine and comprehensive vocational kit to an aspiring woman entrepreneur.
- **₹25,000 ($300):** Helps install a solar-powered water filtration unit for an entire village hamlet.

---

### Direct Bank Transfer Details
- **Account Name:** Soham Social Welfare NGO
- **Bank Name:** State Bank of India
- **Account Number:** 38947291048
- **IFSC Code:** SBIN0001234
- **Branch:** New Delhi Main Branch
- **Tax Exemption:** 80G Certified Non-Profit Organization (Receipt issued within 48 hours).

For corporate CSR partnerships or wire transfer queries, write directly to donate@sohamngo.com.`,
    is_published: true,
    meta_title: 'Donate to Soham NGO | Tax Exempt Charitable Contribution',
    meta_description: 'Donate to Soham NGO to sponsor child education, healthcare camps, and women vocational centers.',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-2',
    title: 'Terms and Conditions',
    slug: 'terms-and-conditions',
    description: 'Official terms and conditions governing the use of Soham NGO website and services.',
    content: `## 1. Acceptance of Terms
By accessing and using this website (https://sohamngo.com), you agree to comply with and be bound by these terms.

## 2. Charitable Purpose
Soham NGO is a non-profit organization dedicated solely to public welfare, educational development, and humanitarian relief.

## 3. Donations & Refunds
All donations made to Soham NGO are non-refundable charitable contributions. Donations are eligible for tax deduction under applicable non-profit statutes.

## 4. Intellectual Property
All content, photographs, reports, and brand logos displayed on this site are the property of Soham NGO or used with permission. Unauthorized reproduction for commercial gain is prohibited.`,
    is_published: true,
    meta_title: 'Terms and Conditions | Soham NGO',
    meta_description: 'Terms and conditions for using the Soham NGO official portal and donation services.',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'page-3',
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    description: 'How Soham NGO collects, protects, and respects your personal information.',
    content: `## Privacy & Confidentiality Commitment

Soham NGO values the trust of its donors, volunteers, and visitors. We are committed to protecting your personal information.

### 1. Information Collected
We collect details you voluntarily provide through contact inquiries, volunteer applications, and donation receipts (such as name, email, phone number, address).

### 2. How We Use Information
Your details are used strictly to communicate organizational updates, process volunteer deployments, and deliver donation receipts.

### 3. No Third-Party Sharing
We NEVER sell, trade, or rent personal information to third-party commercial marketing entities.

### 4. Contact Us
For privacy inquiries, contact us at privacy@sohamngo.com.`,
    is_published: true,
    meta_title: 'Privacy Policy | Soham NGO',
    meta_description: 'Privacy policy explaining how Soham NGO protects donor and volunteer data.',
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialAdminUsers: AdminUser[] = [
  {
    id: 'admin-1',
    email: 'admin@sohamngo.com',
    password_hash: 'Admin@Soham2026!',
    full_name: 'Soham Super Admin',
    role: 'super_admin',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'admin-2',
    email: 'editor@sohamngo.com',
    password_hash: 'Editor@Soham2026!',
    full_name: 'Content Editor',
    role: 'content_editor',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialContactSubmissions: ContactSubmission[] = [
  {
    id: 'contact-demo-1',
    full_name: 'Ananya Sen',
    email: 'ananya.sen@example.com',
    phone: '+91 98112 34567',
    subject: 'CSR Collaboration for School Classrooms',
    message: 'Hello Soham Team, our foundation is interested in supporting 5 smart classrooms under Project Gyan. Kindly connect with our CSR committee.',
    status: 'new',
    internal_notes: 'Promising lead from Tech Foundation. Scheduled call for Friday.',
    consent_given: true,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'contact-demo-2',
    full_name: 'Vikram Joshi',
    email: 'vikram.joshi@example.com',
    phone: '+91 97234 56789',
    subject: 'Medical Camp in Village Rampur',
    message: 'We request your mobile healthcare clinic van to visit Rampur village in Palwal district. We have 150 elderly patients requiring checkups.',
    status: 'contacted',
    internal_notes: 'Spoke with village head. Mobile van routed for next Tuesday.',
    consent_given: true,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const initialVolunteerSubmissions: VolunteerSubmission[] = [
  {
    id: 'vol-demo-1',
    full_name: 'Rohan Mehra',
    email: 'rohan.mehra@example.com',
    phone: '+91 99887 76655',
    address: 'Saket, New Delhi',
    age: 24,
    occupation: 'Software Engineer',
    area_of_interest: 'Education & Child Development',
    skills: 'Computer Literacy, Coding Basics, Mathematics',
    availability: 'Weekends (Saturday & Sunday)',
    motivation: 'I want to give back to society by teaching underprivileged children foundational computer skills and science.',
    status: 'interviewed',
    internal_notes: 'Excellent candidate for weekend computer classes in Palwal center.',
    consent_given: true,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'vol-demo-2',
    full_name: 'Pooja Nair',
    email: 'pooja.nair@example.com',
    phone: '+91 98450 12345',
    address: 'Gurgaon, Haryana',
    age: 29,
    occupation: 'Content Strategist',
    area_of_interest: 'Women Empowerment',
    skills: 'Social Media, Storytelling, Photography',
    availability: 'Flexible (4-6 hours weekly)',
    motivation: 'Passionate about documenting grassroot stories of women entrepreneurs and raising awareness.',
    status: 'new',
    internal_notes: '',
    consent_given: true,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  }
];
