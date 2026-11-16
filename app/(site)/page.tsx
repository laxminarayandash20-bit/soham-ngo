import React from 'react';
import {
  getSettings,
  getHomepageSections,
  getActivities,
  getProjects,
  getBlogPosts,
  getGalleryImages,
  getTestimonials
} from '@/lib/db';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import MissionVisionSection from '@/components/MissionVisionSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import ProjectsSection from '@/components/ProjectsSection';
import ImpactStatsSection from '@/components/ImpactStatsSection';
import GalleryPreviewSection from '@/components/GalleryPreviewSection';
import LatestNewsSection from '@/components/LatestNewsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PartnersSection from '@/components/PartnersSection';
import VolunteerCtaSection from '@/components/VolunteerCtaSection';
import DonationCtaSection from '@/components/DonationCtaSection';
import ContactSection from '@/components/ContactSection';

export const revalidate = 0;

export default async function HomePage() {
  const [
    settings,
    sections,
    activities,
    projects,
    blogPosts,
    galleryImages,
    testimonials
  ] = await Promise.all([
    getSettings(),
    getHomepageSections(),
    getActivities(true),
    getProjects(true),
    getBlogPosts(true),
    getGalleryImages(),
    getTestimonials(true)
  ]);

  const heroSec = sections.find(s => s.id === 'hero');
  const aboutSec = sections.find(s => s.id === 'about_intro');
  const missionSec = sections.find(s => s.id === 'mission_vision');
  const impactSec = sections.find(s => s.id === 'impact_stats');
  const volunteerSec = sections.find(s => s.id === 'volunteer_cta');
  const donationSec = sections.find(s => s.id === 'donation_cta');

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero section={heroSec} />

      {/* 2. About Soham NGO Introduction */}
      <AboutSection section={aboutSec} />

      {/* 3. Mission, Vision & Core Values */}
      <MissionVisionSection section={missionSec} />

      {/* 4. Activities and Initiatives */}
      <ActivitiesSection activities={activities} />

      {/* 5. Featured Projects */}
      <ProjectsSection projects={projects} />

      {/* 6. Impact Statistics */}
      <ImpactStatsSection section={impactSec} />

      {/* 7. Photo Gallery Preview */}
      <GalleryPreviewSection images={galleryImages} />

      {/* 8. Latest News & Updates */}
      <LatestNewsSection posts={blogPosts} />

      {/* 9. Volunteer Registration CTA */}
      <VolunteerCtaSection section={volunteerSec} />

      {/* 10. Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 11. Partners & Supporters */}
      <PartnersSection />

      {/* 12. Donation / Support CTA */}
      <DonationCtaSection section={donationSec} />

      {/* 13. Contact Section */}
      <ContactSection settings={settings} />
    </div>
  );
}
