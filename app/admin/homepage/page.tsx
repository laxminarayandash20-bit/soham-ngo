'use client';

import React, { useState, useEffect } from 'react';
import { HomepageSection } from '@/lib/types';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Link as LinkIcon,
  Sparkles,
  MoveUp,
  MoveDown
} from 'lucide-react';

export default function AdminHomepageEditor() {
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState('hero');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/admin/homepage')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSections(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const activeSection = sections.find(s => s.id === activeSectionId) || sections[0];

  const handleFieldChange = (field: keyof HomepageSection, value: any) => {
    if (!activeSection) return;
    setSections(prev =>
      prev.map(s => (s.id === activeSection.id ? { ...s, [field]: value } : s))
    );
  };

  const handleMetaFieldChange = (key: string, value: any) => {
    if (!activeSection) return;
    const currentMeta = activeSection.meta || {};
    setSections(prev =>
      prev.map(s => (s.id === activeSection.id ? { ...s, meta: { ...currentMeta, [key]: value } } : s))
    );
  };

  const handleSave = async () => {
    if (!activeSection) return;
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeSection)
      });
      if (!res.ok) throw new Error('Failed to update section');
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (e) {
      setSaveStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-slate-200 animate-pulse rounded-lg" />
        <div className="h-96 bg-slate-200 animate-pulse rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Homepage Content Manager</h1>
          <p className="text-xs text-slate-500 mt-1">
            Individually control headlines, imagery, CTA buttons, and impact metrics across each homepage block.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saveStatus === 'saving' ? 'Saving Changes...' : 'Save Section'}</span>
        </button>
      </div>

      {saveStatus === 'saved' && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Homepage section saved successfully! Changes are live on the website.</span>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-800 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>Failed to save section. Please check server logs.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Section Selector Tab List */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-3 mb-2">
            Homepage Blocks
          </span>
          {sections.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSectionId(sec.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                activeSectionId === sec.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80'
              }`}
            >
              <span className="capitalize">{sec.id.replace('_', ' ')}</span>
              {sec.is_enabled ? (
                <Eye className="w-3.5 h-3.5 opacity-70" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-rose-400" />
              )}
            </button>
          ))}
        </div>

        {/* Section Editor Form */}
        {activeSection && (
          <div className="md:col-span-3 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Editing Section
                </span>
                <h2 className="text-xl font-bold text-slate-900 capitalize">
                  {activeSection.id.replace('_', ' ')} Block
                </h2>
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeSection.is_enabled}
                  onChange={(e) => handleFieldChange('is_enabled', e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Visible on Website</span>
              </label>
            </div>

            {/* Title / Headline */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Headline / Title
              </label>
              <input
                type="text"
                value={activeSection.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Subtitle / Teaser Note
              </label>
              <textarea
                rows={2}
                value={activeSection.subtitle || ''}
                onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            {/* Content (if applicable) */}
            {activeSection.id !== 'hero' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Main Body Content
                </label>
                <textarea
                  rows={4}
                  value={activeSection.content || ''}
                  onChange={(e) => handleFieldChange('content', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            {/* Background Image URL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Background / Featured Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={activeSection.background_image || ''}
                  onChange={(e) => handleFieldChange('background_image', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
              {activeSection.background_image && (
                <div className="mt-2 w-32 h-20 rounded-lg overflow-hidden border border-slate-200">
                  <img src={activeSection.background_image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary CTA Text
                </label>
                <input
                  type="text"
                  value={activeSection.cta_text || ''}
                  onChange={(e) => handleFieldChange('cta_text', e.target.value)}
                  placeholder="e.g. Join as Volunteer"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary CTA Link
                </label>
                <input
                  type="text"
                  value={activeSection.cta_link || ''}
                  onChange={(e) => handleFieldChange('cta_link', e.target.value)}
                  placeholder="e.g. /volunteer"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>

            {/* Custom Metadata for specific blocks */}
            {activeSection.id === 'hero' && (
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Floating Top Trust Badge
                </label>
                <input
                  type="text"
                  value={activeSection.meta?.badge || ''}
                  onChange={(e) => handleMetaFieldChange('badge', e.target.value)}
                  placeholder="e.g. Serving Humanity Since 2012"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            {activeSection.id === 'mission_vision' && (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Mission & Vision Statements
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mission</label>
                  <textarea
                    rows={2}
                    value={activeSection.meta?.mission || ''}
                    onChange={(e) => handleMetaFieldChange('mission', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Vision</label>
                  <textarea
                    rows={2}
                    value={activeSection.meta?.vision || ''}
                    onChange={(e) => handleMetaFieldChange('vision', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
