'use client';

import React, { useState, useEffect } from 'react';
import { ContactSubmission, SubmissionStatus } from '@/lib/types';
import {
  Mail,
  Download,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MessageSquare,
  X,
  Phone,
  Calendar
} from 'lucide-react';

export default function AdminContactsManager() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [internalNotes, setInternalNotes] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('new');
  const [saving, setSaving] = useState(false);

  const fetchContacts = () => {
    fetch('/api/admin/contacts')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setContacts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openModal = (sub: ContactSubmission) => {
    setSelectedSubmission(sub);
    setStatus(sub.status);
    setInternalNotes(sub.internal_notes || '');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;
    setSaving(true);

    try {
      await fetch('/api/admin/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedSubmission.id,
          status,
          internal_notes: internalNotes
        })
      });
      setSelectedSubmission(null);
      fetchContacts();
    } catch (e) {
      alert('Failed to update submission');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete submission from "${name}"?`)) return;
    try {
      await fetch(`/api/admin/contacts?id=${id}`, { method: 'DELETE' });
      fetchContacts();
    } catch (e) {
      alert('Failed to delete submission');
    }
  };

  const handleExportCsv = () => {
    window.open('/api/admin/contacts?format=csv', '_blank');
  };

  const filtered = contacts.filter(c => {
    const matchesSearch =
      c.full_name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contact Submissions CRM</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review inquiries from donors, CSR committees, volunteers, and rural village authorities.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCsv}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or subject..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          {['all', 'new', 'contacted', 'in_progress', 'resolved'].map((st) => (
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
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Sender</th>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Submitted Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading inquiries...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No submissions matching criteria.</td></tr>
            ) : filtered.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-900 block">{sub.full_name}</span>
                  <span className="text-[11px] text-slate-500 block">{sub.email} {sub.phone ? `• ${sub.phone}` : ''}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-800 line-clamp-1 block">{sub.subject}</span>
                  <span className="text-[11px] text-slate-500 line-clamp-1 block">{sub.message}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    sub.status === 'new'
                      ? 'bg-rose-100 text-rose-800'
                      : sub.status === 'contacted'
                      ? 'bg-blue-100 text-blue-800'
                      : sub.status === 'in_progress'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {sub.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {new Date(sub.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openModal(sub)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs"
                    >
                      Review & Reply
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(sub.id, sub.full_name)}
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

      {/* Review Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inquiry Record</span>
                <h3 className="text-base font-bold text-slate-900">{selectedSubmission.subject}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">From:</span>
                  <span className="font-bold text-slate-900">{selectedSubmission.full_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Email:</span>
                  <a href={`mailto:${selectedSubmission.email}`} className="font-semibold text-emerald-700 hover:underline">
                    {selectedSubmission.email}
                  </a>
                </div>
                {selectedSubmission.phone && (
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Phone:</span>
                    <a href={`tel:${selectedSubmission.phone}`} className="font-semibold text-emerald-700">
                      {selectedSubmission.phone}
                    </a>
                  </div>
                )}
              </div>

              <div>
                <span className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Message Content</span>
                <div className="p-3 bg-slate-50 rounded-xl text-slate-700 leading-relaxed max-h-40 overflow-y-auto">
                  {selectedSubmission.message}
                </div>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Update Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as SubmissionStatus)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="new">New (Unread / Needs review)</option>
                    <option value="contacted">Contacted (Called / Emailed)</option>
                    <option value="in_progress">In Progress (Active coordination)</option>
                    <option value="resolved">Resolved (Completed)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Internal Team Notes</label>
                  <textarea
                    rows={3}
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="Add operational notes about phone calls, follow-ups, or meeting dates..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSubmission(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    {saving ? 'Updating...' : 'Save Status & Notes'}
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
