import React from 'react';
import NextLink from 'next/link';
import { HomepageSection } from '@/lib/types';
import { CheckCircle2, ArrowRight, Award, Compass, Shield } from 'lucide-react';

interface AboutSectionProps {
  section?: HomepageSection;
}

export default function AboutSection({ section }: AboutSectionProps) {
  if (section && !section.is_enabled) return null;

  const title = section?.title || 'Who We Are';
  const subtitle = section?.subtitle || 'A catalyst for sustainable grassroots transformation across vulnerable communities';
  const content = section?.content || 'Soham NGO is a non-profit humanitarian organization founded with one unwavering mission: to ensure that no child is deprived of education due to poverty, no mother lacks basic healthcare, and no rural youth remains without dignified vocational skills. Through sustainable grassroots initiatives, community-led health camps, and modern learning infrastructure, we bridge critical divides and restore self-worth.';
  const image = section?.background_image || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop';
  const years = section?.meta?.years_active || '14+';
  const communities = section?.meta?.communities_served || '85+';

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual with Overlapping Stat Card */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-100">
              <img
                src={image}
                alt="Soham NGO Volunteers and Beneficiaries"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating Stat Badge 1 */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 bg-emerald-700 text-white p-6 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs border border-emerald-600">
              <div className="p-3 bg-white/10 rounded-xl">
                <Award className="w-8 h-8 text-amber-300" />
              </div>
              <div>
                <div className="text-3xl font-extrabold">{years}</div>
                <div className="text-xs text-emerald-100 font-medium">Years of Dedicated Grassroots Service</div>
              </div>
            </div>

            {/* Floating Stat Badge 2 */}
            <div className="hidden sm:flex absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100 items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Compass className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <span className="block text-lg font-bold text-slate-900">{communities}</span>
                <span className="text-xs text-slate-500">Villages & Slums Supported</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              {title}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {subtitle}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {content}
            </p>

            {/* Core Values checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Direct Field Implementation</h4>
                  <p className="text-xs sm:text-sm text-slate-500">We work directly with village sarpanchs, government schools, and women self-help groups.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">100% Financial Transparency</h4>
                  <p className="text-xs sm:text-sm text-slate-500">Independent audits and public annual balance sheets guarantee your donations reach beneficiaries.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Holistic Sustainable Models</h4>
                  <p className="text-xs sm:text-sm text-slate-500">From solar water plants to digital classrooms, our solutions are built to be self-sustaining.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <NextLink
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-md"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </NextLink>
              <NextLink
                href="/about#team"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-xl transition-all"
              >
                <span>Meet Our Team</span>
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
