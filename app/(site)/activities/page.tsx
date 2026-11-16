import React from 'react';
import NextLink from 'next/link';
import { getActivities } from '@/lib/db';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function ActivitiesPage() {
  const activities = await getActivities(true);

  // Group by category
  const categories = Array.from(new Set(activities.map(a => a.category)));

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-slate-950 text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-3.5 py-1.5 rounded-full inline-block">
            Grassroots Initiatives
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our Activities & Programs
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Targeted social welfare interventions designed for scalable, measurable, and sustainable grassroots impact.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <span className="px-4 py-2 rounded-full bg-emerald-700 text-white text-xs font-bold shadow-sm">
            All Programs ({activities.length})
          </span>
          {categories.map((cat, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-full bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
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
                    <span>Program Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </NextLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
