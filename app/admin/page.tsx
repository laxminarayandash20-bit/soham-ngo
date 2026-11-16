'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { DashboardStats } from '@/lib/types';
import {
  FileText,
  Briefcase,
  Activity,
  Image as ImageIcon,
  Newspaper,
  UserCheck,
  Mail,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-200 animate-pulse rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Pages', count: stats?.totalPages || 0, icon: FileText, href: '/admin/pages', color: 'text-blue-600 bg-blue-50' },
    { label: 'Projects & Outposts', count: stats?.totalProjects || 0, icon: Briefcase, href: '/admin/projects', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Core Programs', count: stats?.totalActivities || 0, icon: Activity, href: '/admin/activities', color: 'text-purple-600 bg-purple-50' },
    { label: 'Blog & Field News', count: stats?.totalBlogPosts || 0, icon: Newspaper, href: '/admin/news', color: 'text-amber-600 bg-amber-50' },
    { label: 'Gallery Photos', count: stats?.totalGalleryImages || 0, icon: ImageIcon, href: '/admin/gallery', color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Volunteer Signups', count: stats?.totalVolunteerRegistrations || 0, icon: UserCheck, href: '/admin/volunteers', color: 'text-rose-600 bg-rose-50' },
    { label: 'Contact Inquiries', count: stats?.totalContactSubmissions || 0, icon: Mail, href: '/admin/contacts', color: 'text-teal-600 bg-teal-50' },
    { label: 'Pending Action', count: (stats?.pendingContacts || 0) + (stats?.pendingVolunteers || 0), icon: Clock, href: '/admin/contacts', color: 'text-orange-600 bg-orange-50' },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-full">
            CMS Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Soham NGO Content & Operations Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Manage public website pages, field projects, articles, media uploads, and review citizen inquiries in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <NextLink
            href="/admin/homepage"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
          >
            <span>Edit Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </NextLink>
          <NextLink
            href="/"
            target="_blank"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-4 h-4 text-emerald-400" />
            <span>Open Website</span>
          </NextLink>
        </div>
      </div>

      {/* Real Statistics Grid */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-4">Real-Time Database Statistics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <NextLink
                key={idx}
                href={card.href}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-semibold text-slate-500 block mb-1">
                    {card.label}
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {card.count}
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </NextLink>
            );
          })}
        </div>
      </div>

      {/* Submissions Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Contact Enquiries */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Recent Contact Enquiries</h3>
              </div>
              <NextLink href="/admin/contacts" className="text-xs font-bold text-emerald-700 hover:underline">
                View All ({stats?.totalContactSubmissions})
              </NextLink>
            </div>

            {(!stats?.recentContacts || stats.recentContacts.length === 0) ? (
              <p className="text-xs text-slate-500 py-6 text-center">No contact inquiries yet.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {stats.recentContacts.map((c) => (
                  <div key={c.id} className="py-3 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">{c.full_name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          c.status === 'new' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {c.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 truncate mt-0.5 font-medium">{c.subject}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{new Date(c.created_at).toLocaleDateString()}</p>
                    </div>
                    <NextLink
                      href="/admin/contacts"
                      className="text-xs font-semibold text-emerald-700 hover:underline flex-shrink-0"
                    >
                      Manage
                    </NextLink>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Volunteer Applications */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Recent Volunteer Signups</h3>
              </div>
              <NextLink href="/admin/volunteers" className="text-xs font-bold text-emerald-700 hover:underline">
                View All ({stats?.totalVolunteerRegistrations})
              </NextLink>
            </div>

            {(!stats?.recentVolunteers || stats.recentVolunteers.length === 0) ? (
              <p className="text-xs text-slate-500 py-6 text-center">No volunteer applications yet.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {stats.recentVolunteers.map((v) => (
                  <div key={v.id} className="py-3 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">{v.full_name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          v.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {v.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 truncate mt-0.5 font-medium">{v.area_of_interest}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{v.phone} • {new Date(v.created_at).toLocaleDateString()}</p>
                    </div>
                    <NextLink
                      href="/admin/volunteers"
                      className="text-xs font-semibold text-emerald-700 hover:underline flex-shrink-0"
                    >
                      Review
                    </NextLink>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
