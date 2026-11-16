import React from 'react';
import NextLink from 'next/link';
import { HomepageSection } from '@/lib/types';
import { ArrowRight, Heart, Users, Sparkles, CheckCircle } from 'lucide-react';

interface HeroProps {
  section?: HomepageSection;
}

export default function Hero({ section }: HeroProps) {
  if (section && !section.is_enabled) return null;

  const title = section?.title || 'Bringing Hope, Dignity and Opportunity to Every Soul in Need';
  const subtitle = section?.subtitle || 'Join hands with Soham NGO to provide quality education, life-saving healthcare, and sustainable livelihood to underserved communities across India.';
  const bgImage = section?.background_image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop';
  const ctaText = section?.cta_text || 'Join as Volunteer';
  const ctaLink = section?.cta_link || '/volunteer';
  const secondaryCtaText = section?.secondary_cta_text || 'Explore Projects';
  const secondaryCtaLink = section?.secondary_cta_link || '/projects';
  const badge = section?.meta?.badge || 'Serving Humanity Since 2012';

  return (
    <div className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image with Dark Vignette Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Soham NGO Grassroots Humanitarian Outreach"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-white">
        <div className="max-w-3xl space-y-6">
          {/* Trust Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md animate-in fade-in duration-500">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{badge}</span>
            </div>
          )}

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
            {subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <NextLink
              href={ctaLink}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-5 h-5" />
            </NextLink>

            {secondaryCtaText && secondaryCtaLink && (
              <NextLink
                href={secondaryCtaLink}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-white/10 hover:bg-white/20 active:bg-white/25 rounded-xl border border-white/20 backdrop-blur-md transition-all"
              >
                <Heart className="w-4 h-4 text-rose-400" />
                <span>{secondaryCtaText}</span>
              </NextLink>
            )}
          </div>

          {/* Quick Highlight Metrics in Hero */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 text-slate-300 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>100% Tax Deductible (80G)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Direct Grassroots Reach</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Audited Annual Financials</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
