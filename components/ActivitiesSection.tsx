import React from 'react';
import NextLink from 'next/link';
import { Activity } from '@/lib/types';
import { ArrowRight, BookOpen, Stethoscope, Briefcase, Droplets, Sprout, Heart } from 'lucide-react';

interface ActivitiesSectionProps {
  activities: Activity[];
}

export default function ActivitiesSection({ activities }: ActivitiesSectionProps) {
  if (!activities || activities.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Our Core Activities & Grassroots Programs
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              Through strategic, community-centered initiatives, Soham NGO addresses fundamental challenges across education, healthcare, and rural self-reliance.
            </p>
          </div>
          <NextLink
            href="/activities"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors self-start md:self-auto"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-4 h-4" />
          </NextLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.slice(0, 6).map((activity) => (
            <div
              key={activity.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={activity.featured_image}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm">
                  {activity.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {activity.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  {activity.impact_number && (
                    <div>
                      <span className="block text-base font-extrabold text-emerald-700">
                        {activity.impact_number}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {activity.impact_label || 'Beneficiaries'}
                      </span>
                    </div>
                  )}
                  <NextLink
                    href={`/activities/${activity.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-emerald-700 group-hover:translate-x-1 transition-all ml-auto"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </NextLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
