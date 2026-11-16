import React from 'react';
import NextLink from 'next/link';
import { HomepageSection } from '@/lib/types';
import {
  GraduationCap,
  HeartPulse,
  Users,
  Home,
  Droplet,
  Smile,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface ImpactStatsSectionProps {
  section?: HomepageSection;
}

export default function ImpactStatsSection({ section }: ImpactStatsSectionProps) {
  if (section && !section.is_enabled) return null;

  const title = section?.title || 'Our Collective Impact Over the Years';
  const subtitle = section?.subtitle || 'Transparent metrics reflecting lives touched and transformed hand-in-hand with our donors and volunteers';

  const defaultStats = [
    { label: 'Children Educated', value: '18,500+', icon: 'GraduationCap' },
    { label: 'Free Health Checkups', value: '45,000+', icon: 'HeartPulse' },
    { label: 'Women Empowered', value: '6,200+', icon: 'Users' },
    { label: 'Villages Adopted', value: '38', icon: 'Home' },
    { label: 'Clean Water Units', value: '65+', icon: 'Droplet' },
    { label: 'Active Volunteers', value: '1,400+', icon: 'Smile' }
  ];

  const stats = section?.meta?.stats || defaultStats;

  const renderIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap': return <GraduationCap className="w-7 h-7 text-emerald-300" />;
      case 'HeartPulse': return <HeartPulse className="w-7 h-7 text-rose-300" />;
      case 'Users': return <Users className="w-7 h-7 text-amber-300" />;
      case 'Home': return <Home className="w-7 h-7 text-blue-300" />;
      case 'Droplet': return <Droplet className="w-7 h-7 text-cyan-300" />;
      case 'Smile': return <Smile className="w-7 h-7 text-emerald-300" />;
      default: return <CheckCircle className="w-7 h-7 text-emerald-300" />;
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white relative overflow-hidden">
      {/* Background Subtle Shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-900/60 border border-emerald-700/60 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Verified Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-slate-300 mt-4 text-base sm:text-lg">
            {subtitle}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {stats.map((stat: any, idx: number) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all text-center flex flex-col items-center justify-center group"
            >
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {renderIcon(stat.icon)}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <NextLink
            href="/pages/donate"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <span>Partner in Our Impact</span>
            <ArrowRight className="w-4 h-4" />
          </NextLink>
        </div>
      </div>
    </section>
  );
}
