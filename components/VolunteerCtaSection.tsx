import React from 'react';
import NextLink from 'next/link';
import { HomepageSection } from '@/lib/types';
import { UserPlus, ArrowRight, HeartHandshake } from 'lucide-react';

interface VolunteerCtaSectionProps {
  section?: HomepageSection;
}

export default function VolunteerCtaSection({ section }: VolunteerCtaSectionProps) {
  if (section && !section.is_enabled) return null;

  const title = section?.title || 'Be the Change You Wish to See in the World';
  const subtitle = section?.subtitle || 'Your passion, time, and skills can bring smiles to hundreds of underprivileged children and families. Join our family of over 1,400 change-makers.';
  const bg = section?.background_image || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1600&auto=format&fit=crop';
  const ctaText = section?.cta_text || 'Register as Volunteer';
  const ctaLink = section?.cta_link || '/volunteer';

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden bg-emerald-950 text-white">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src={bg}
          alt="Volunteer Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-950/80 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/60 text-emerald-200 text-xs font-semibold tracking-wider uppercase">
          <HeartHandshake className="w-4 h-4 text-emerald-300" />
          <span>Join Hands With Us</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {title}
        </h2>

        <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <NextLink
            href={ctaLink}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-950 hover:bg-emerald-50 active:bg-emerald-100 rounded-xl font-bold text-sm shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <UserPlus className="w-5 h-5 text-emerald-700" />
            <span>{ctaText}</span>
          </NextLink>
          <NextLink
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 bg-emerald-900/60 hover:bg-emerald-800/60 text-white rounded-xl font-semibold text-sm border border-emerald-700/60 backdrop-blur-md transition-all"
          >
            <span>Have Questions? Contact Us</span>
          </NextLink>
        </div>
      </div>
    </section>
  );
}
