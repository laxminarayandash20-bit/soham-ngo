import React from 'react';
import { HomepageSection } from '@/lib/types';
import { Target, Eye, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

interface MissionVisionSectionProps {
  section?: HomepageSection;
}

export default function MissionVisionSection({ section }: MissionVisionSectionProps) {
  if (section && !section.is_enabled) return null;

  const title = section?.title || 'Our Guiding Principles';
  const subtitle = section?.subtitle || 'The foundational pillars guiding every project and partnership';

  const mission = section?.meta?.mission || 'To empower underprivileged communities through equitable access to holistic schooling, preventive healthcare, vocational training, and sustainable community infrastructure.';
  const vision = section?.meta?.vision || 'A compassionate, self-reliant society where every individual lives with dignity, equal opportunities, and the power to shape their own destiny.';
  const values: string[] = section?.meta?.values || [
    'Uncompromising Transparency',
    'Grassroots Inclusivity',
    'Long-term Sustainability',
    'Compassionate Action'
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {mission}
            </p>
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-8 -mt-8" />
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {vision}
            </p>
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-8 -mt-8" />
          </div>

          {/* Core Values Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Core Values</h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              {values.map((val, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{val}</span>
                </li>
              ))}
            </ul>
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-8 -mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
