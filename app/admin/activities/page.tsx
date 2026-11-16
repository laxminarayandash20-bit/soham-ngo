'use client';

import React, { useState, useEffect } from 'react';
import { Activity } from '@/lib/types';
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  Sparkles
} from 'lucide-react';
import NextLink from 'next/link';

export default function AdminActivitiesManager() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingActivity, setEditingActivity] = useState<Partial<Activity> | null>(null);
  const [search, setSearch] = useState('');

  const fetchActivities = () => {
    fetch('/api/admin/activities')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setActivities(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingActivity?.title || !editingActivity?.category || !editingActivity?.summary) return;

    try {
      await fetch('/api/admin/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingActivity)
      });
      setEditingActivity(null);
      fetchActivities();
    } catch (e) {
      alert('Failed to save activity');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await fetch(`/api/admin/activities?id=${id}`, { method: 'DELETE' });
      fetchActivities();
    } catch (e) {
      alert('Failed to delete activity');
    }
  };

  const filtered = activities.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Activities & Programs Manager</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage NGO core initiatives across education, healthcare, livelihood, clean water, and community relief.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setEditingActivity({
            title: '',
            category: 'Education',
            summary: '',
            description: '',
            featured_image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
            impact_number: '1,000+',
            impact_label: 'Beneficiaries',
            is_published: true,
            is_featured: true,
            sort_order: activities.length + 1
          })}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Program</span>
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search programs..."
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Grid of Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-2xl" />
          ))
        ) : filtered.map((act) => (
          <div
            key={act.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                <img src={act.featured_image} alt={act.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-800">
                  {act.category}
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    act.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {act.is_published ? 'Live' : 'Draft'}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold text-slate-900 mb-1">{act.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">{act.summary}</p>
                {act.impact_number && (
                  <div className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg inline-block">
                    {act.impact_number} {act.impact_label}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <NextLink
                href={`/activities/${act.slug}`}
                target="_blank"
                className="text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-semibold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View</span>
              </NextLink>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingActivity(act)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(act.id, act.title)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Activity Modal */}
      {editingActivity && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                {editingActivity.id ? 'Edit Program' : 'Create New Program'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingActivity(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Program Title *</label>
                  <input
                    type="text"
                    required
                    value={editingActivity.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = editingActivity.id ? editingActivity.slug : title.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
                      setEditingActivity({ ...editingActivity, title, slug });
                    }}
                    placeholder="e.g. Rural Child Literacy Mission"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={editingActivity.category || ''}
                    onChange={(e) => setEditingActivity({ ...editingActivity, category: e.target.value })}
                    placeholder="Education, Healthcare, Livelihood..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Summary (1-2 sentences for cards) *</label>
                <input
                  type="text"
                  required
                  value={editingActivity.summary || ''}
                  onChange={(e) => setEditingActivity({ ...editingActivity, summary: e.target.value })}
                  placeholder="Enabling quality schooling, digital tablets, and STEM labs for slum and rural students."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Description *</label>
                <textarea
                  required
                  rows={6}
                  value={editingActivity.description || ''}
                  onChange={(e) => setEditingActivity({ ...editingActivity, description: e.target.value })}
                  placeholder="Write full details about this initiative, challenges faced, execution methodology, and long-term sustainability..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Featured Image URL *</label>
                <input
                  type="text"
                  required
                  value={editingActivity.featured_image || ''}
                  onChange={(e) => setEditingActivity({ ...editingActivity, featured_image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Impact Number</label>
                  <input
                    type="text"
                    value={editingActivity.impact_number || ''}
                    onChange={(e) => setEditingActivity({ ...editingActivity, impact_number: e.target.value })}
                    placeholder="e.g. 18,500+"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Impact Label</label>
                  <input
                    type="text"
                    value={editingActivity.impact_label || ''}
                    onChange={(e) => setEditingActivity({ ...editingActivity, impact_label: e.target.value })}
                    placeholder="e.g. Children Educated"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingActivity.is_published ?? true}
                    onChange={(e) => setEditingActivity({ ...editingActivity, is_published: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Publish (Visible on Website)</span>
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingActivity(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Save Program
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
