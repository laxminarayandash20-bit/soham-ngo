'use client';

import React, { useState, useEffect } from 'react';
import { GalleryImage } from '@/lib/types';
import {
  Plus,
  Trash2,
  X,
  Search,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';

export default function AdminGalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState<Partial<GalleryImage> | null>(null);
  const [search, setSearch] = useState('');

  const fetchImages = () => {
    fetch('/api/admin/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setImages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage?.title || !editingImage?.category || !editingImage?.image_url) return;

    try {
      await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingImage)
      });
      setEditingImage(null);
      fetchImages();
    } catch (e) {
      alert('Failed to save image');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete image "${title}" from gallery?`)) return;
    try {
      await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      fetchImages();
    } catch (e) {
      alert('Failed to delete image');
    }
  };

  const filtered = images.filter(img =>
    img.title.toLowerCase().includes(search.toLowerCase()) ||
    img.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Photo Gallery Manager</h1>
          <p className="text-xs text-slate-500 mt-1">
            Organize albums, upload photos, add captions, and categorize field impressions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setEditingImage({
            title: '',
            category: 'Education',
            image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
            caption: '',
            album_name: 'Outreach 2026',
            sort_order: images.length + 1
          })}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter gallery photos..."
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square bg-slate-200 animate-pulse rounded-2xl" />
          ))
        ) : filtered.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group"
          >
            <div className="relative aspect-square bg-slate-100 overflow-hidden">
              <img src={img.image_url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
                {img.category}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(img.id, img.title)}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700"
                title="Delete Image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5">
              <h4 className="text-xs font-bold text-slate-900 truncate">{img.title}</h4>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">{img.caption || img.album_name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Add Image to Gallery</h3>
              <button
                type="button"
                onClick={() => setEditingImage(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image Title *</label>
                <input
                  type="text"
                  required
                  value={editingImage.title || ''}
                  onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                  placeholder="e.g. Science Fair 2026"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                <input
                  type="text"
                  required
                  value={editingImage.category || ''}
                  onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value })}
                  placeholder="Education, Healthcare, Events..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={editingImage.image_url || ''}
                  onChange={(e) => setEditingImage({ ...editingImage, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Caption / Description</label>
                <input
                  type="text"
                  value={editingImage.caption || ''}
                  onChange={(e) => setEditingImage({ ...editingImage, caption: e.target.value })}
                  placeholder="Students participating in mathematics session"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Album Name</label>
                <input
                  type="text"
                  value={editingImage.album_name || ''}
                  onChange={(e) => setEditingImage({ ...editingImage, album_name: e.target.value })}
                  placeholder="General"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingImage(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
