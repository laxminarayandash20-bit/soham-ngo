'use client';

import React, { useState, useEffect } from 'react';
import { TeamMember, TeamCategory } from '@/lib/types';
import { Plus, Edit2, Trash2, X, Users, Mail } from 'lucide-react';

export default function AdminTeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);

  const fetchTeam = () => {
    fetch('/api/admin/team')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMembers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember?.name || !editingMember?.designation || !editingMember?.photo_url) return;

    try {
      await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMember)
      });
      setEditingMember(null);
      fetchTeam();
    } catch (e) {
      alert('Failed to save team member');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete team member "${name}"?`)) return;
    try {
      await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' });
      fetchTeam();
    } catch (e) {
      alert('Failed to delete team member');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leadership & Team Manager</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage organization trustees, medical directors, field leads, and volunteer coordinators.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setEditingMember({
            name: '',
            designation: '',
            category: 'leadership',
            photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop',
            bio: '',
            email: '',
            sort_order: members.length + 1,
            is_visible: true
          })}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-2xl" />
          ))
        ) : members.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-square bg-slate-100 overflow-hidden">
                <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" />
                <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize">
                  {m.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-900">{m.name}</h3>
                <p className="text-xs font-semibold text-emerald-700 mt-0.5">{m.designation}</p>
                {m.bio && <p className="text-xs text-slate-500 line-clamp-2 mt-2">{m.bio}</p>}
              </div>
            </div>

            <div className="p-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="truncate max-w-[150px]">{m.email || 'No email'}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditingMember(m)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(m.id, m.name)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingMember && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {editingMember.id ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingMember.name || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  placeholder="e.g. Dr. Arvind Sharma"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Designation *</label>
                <input
                  type="text"
                  required
                  value={editingMember.designation || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, designation: e.target.value })}
                  placeholder="e.g. Founder & President"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={editingMember.category || 'leadership'}
                  onChange={(e) => setEditingMember({ ...editingMember, category: e.target.value as TeamCategory })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                >
                  <option value="leadership">Leadership & Trustees</option>
                  <option value="advisory">Advisory Board</option>
                  <option value="operations">Field Operations</option>
                  <option value="volunteer_lead">Volunteer Coordinator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Photo URL *</label>
                <input
                  type="text"
                  required
                  value={editingMember.photo_url || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, photo_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Biography</label>
                <textarea
                  rows={3}
                  value={editingMember.bio || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  placeholder="Brief background and expertise..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={editingMember.email || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                  placeholder="name@sohamngo.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
