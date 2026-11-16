'use client';

import React, { useState, useEffect } from 'react';
import { VolunteerSubmission, VolunteerStatus } from '@/lib/types';
import {
  UserCheck,
  Download,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  X,
  Phone,
  Mail,
  Briefcase,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function AdminVolunteersManager() {
  const [volunteers, setVolunteers] = useState<VolunteerSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerSubmission | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [status, setStatus] = useState<VolunteerStatus>('new');
  const [internalNotes, setInternalNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchVolunteers = () => {
    fetch('/api/admin/volunteers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setVolunteers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const openModal = (vol: VolunteerSubmission) => {
    setSelectedVolunteer(vol);
    setStatus(vol.status);
    setInternalNotes(vol.internal_notes || '');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVolunteer) return;
    setSaving(true);

    try {
      await fetch('/api/admin/volunteers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedVolunteer.id,
          status,
          internal_notes: internalNotes
        })
      });
      setSelectedVolunteer(null);
      fetchVolunteers();
    } catch (e) {
      alert('Failed to update volunteer record');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete volunteer record for "${name}"?`)) return;
    try {
      await fetch(`/api/admin/volunteers?id=${id}`, { method: 'DELETE' });
      fetchVolunteers();
    } catch (e) {
      alert('Failed to delete volunteer application');
    }
  };

  const handleExportCsv = () => {
    window.open('/api/admin/volunteers?format=csv', '_blank');
  };

  const filtered = volunteers.filter(v => {
    const matchesSearch =
      v.full_name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      v.phone.toLowerCase().includes(search.toLowerCase()) ||
      v.area_of_interest.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Volunteer Applications Portal</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review changemakers, deploy to field projects, and track interview status.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCsv}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export All to CSV</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search volunteers by name, phone, area..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          {['all', 'new', 'interviewed', 'accepted', 'rejected'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                statusFilter === st
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Volunteers Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Applicant</th>
              <th className="px-6 py-4">Area of Interest</th>
              <th className="px-6 py-4">Availability</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading volunteer applications...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No applications match criteria.</td></tr>
            ) : filtered.map((vol) => (
              <tr key={vol.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-900 block">{vol.full_name}</span>
                  <span className="text-[11px] text-slate-500 block">{vol.email} • {vol.phone}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-800 block">{vol.area_of_interest}</span>
                  <span className="text-[10px] text-slate-500 block">{vol.occupation || 'N/A'}</span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {vol.availability}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    vol.status === 'new'
                      ? 'bg-amber-100 text-amber-800'
                      : vol.status === 'interviewed'
                      ? 'bg-blue-100 text-blue-800'
                      : vol.status === 'accepted'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {vol.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openModal(vol)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs"
                    >
                      View Dossier
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(vol.id, vol.full_name)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Volunteer Dossier Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Volunteer Profile</span>
                <h3 className="text-base font-bold text-slate-900">{selectedVolunteer.full_name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVolunteer(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Email:</span>
                  <a href={`mailto:${selectedVolunteer.email}`} className="font-semibold text-emerald-700">
                    {selectedVolunteer.email}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Phone:</span>
                  <a href={`tel:${selectedVolunteer.phone}`} className="font-semibold text-emerald-700">
                    {selectedVolunteer.phone}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Occupation & Age:</span>
                  <span className="font-bold text-slate-800">
                    {selectedVolunteer.occupation || 'N/A'} {selectedVolunteer.age ? `(${selectedVolunteer.age} yrs)` : ''}
                  </span>
                </div>
                {selectedVolunteer.address && (
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Address:</span>
                    <span className="text-slate-800">{selectedVolunteer.address}</span>
                  </div>
                )}
              </div>

              <div>
                <span className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Area & Availability</span>
                <p className="font-semibold text-slate-800">{selectedVolunteer.area_of_interest}</p>
                <p className="text-slate-600 mt-0.5">{selectedVolunteer.availability}</p>
              </div>

              {selectedVolunteer.skills && (
                <div>
                  <span className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Key Skills & Experience</span>
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-800 font-medium">
                    {selectedVolunteer.skills}
                  </div>
                </div>
              )}

              <div>
                <span className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Motivation / Personal Statement</span>
                <div className="p-3 bg-slate-50 rounded-xl text-slate-700 leading-relaxed max-h-36 overflow-y-auto">
                  {selectedVolunteer.motivation}
                </div>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4 pt-3 border-t border-slate-100">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Update Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as VolunteerStatus)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="new">New (Needs initial outreach)</option>
                    <option value="interviewed">Interviewed (Phone / Virtual orientation done)</option>
                    <option value="accepted">Accepted (Assigned to field project)</option>
                    <option value="rejected">Rejected / Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Internal Team Notes</label>
                  <textarea
                    rows={3}
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="Notes regarding skills assessment, assigned village camp, or background check..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedVolunteer(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    {saving ? 'Updating...' : 'Save Volunteer Status'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
