import React from 'react';
import { notFound } from 'next/navigation';
import NextLink from 'next/link';
import { getActivityBySlug, getActivities } from '@/lib/db';
import { ArrowLeft, CheckCircle2, Heart, UserPlus, Sparkles, Share2 } from 'lucide-react';

export const revalidate = 0;

interface ActivityDetailPageProps {
  params: { slug: string };
}

export default async function ActivityDetailPage({ params }: ActivityDetailPageProps) {
  const activity = await getActivityBySlug(params.slug);

  if (!activity || !activity.is_published) {
    notFound();
  }

  const related = (await getActivities(true))
    .filter(a => a.id !== activity.id && a.category === activity.category)
    .slice(0, 2);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Banner */}
      <div className="relative h-80 sm:h-96 lg:h-[450px] bg-slate-950 overflow-hidden">
        <img
          src={activity.featured_image}
          alt={activity.title}
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
          <NextLink
            href="/activities"
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Activities</span>
          </NextLink>

          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              {activity.category}
            </span>
            {activity.impact_number && (
              <span className="text-xs text-white/90 font-medium">
                Impact: <strong className="text-emerald-400">{activity.impact_number}</strong> {activity.impact_label}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-4xl">
            {activity.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Description Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-6 bg-emerald-50/70 border-l-4 border-emerald-600 rounded-r-2xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900 mb-1">
                Executive Overview
              </h3>
              <p className="text-base sm:text-lg text-emerald-950 font-medium leading-relaxed">
                {activity.summary}
              </p>
            </div>

            <div className="prose max-w-none text-slate-700 leading-relaxed text-base sm:text-lg space-y-6">
              {activity.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Gallery if present */}
            {activity.gallery && activity.gallery.length > 0 && (
              <div className="pt-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Program Field Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {activity.gallery.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100">
                      <img src={img} alt={`${activity.title} gallery ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA Card */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-6 sticky top-28">
              <h3 className="text-lg font-bold text-slate-900">Support This Program</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your direct contribution enables us to expand this initiative to more villages and provide essential equipment, teachers, and medical staff.
              </p>

              <div className="space-y-3 pt-2">
                <NextLink
                  href="/pages/donate"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate to This Cause</span>
                </NextLink>

                <NextLink
                  href="/volunteer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm rounded-xl border border-slate-300 transition-all"
                >
                  <UserPlus className="w-4 h-4 text-emerald-600" />
                  <span>Volunteer for This Project</span>
                </NextLink>
              </div>

              {activity.impact_number && (
                <div className="pt-4 border-t border-slate-200 text-center">
                  <span className="block text-2xl font-black text-emerald-700">{activity.impact_number}</span>
                  <span className="text-xs text-slate-500 font-medium">{activity.impact_label || 'Beneficiaries Served'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
