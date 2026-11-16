'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MediaItem } from '@/lib/types';
import {
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  FolderOpen,
  Image as ImageIcon,
  FileText,
  X,
  ExternalLink
} from 'lucide-react';

export default function AdminMediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = () => {
    fetch('/api/admin/media')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMedia(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const file = files[0];

    // Read as Base64 to support easy local storage and universal Next.js handler
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        await fetch('/api/admin/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            original_name: file.name,
            mime_type: file.type,
            size_bytes: file.size,
            category: file.type.startsWith('image/') ? 'image' : 'document',
            base64Data
          })
        });
        fetchMedia();
      } catch (err) {
        alert('File upload failed');
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete media item "${name}"?`)) return;
    try {
      await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE' });
      fetchMedia();
    } catch (e) {
      alert('Failed to delete media item');
    }
  };

  const filtered = media.filter(m =>
    m.original_name.toLowerCase().includes(search.toLowerCase()) ||
    (m.category && m.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Media Library & File Assets</h1>
          <p className="text-xs text-slate-500 mt-1">
            Upload images, brochures, and PDF audit reports. Copy URLs for use across any page or project.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,application/pdf"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading File...' : 'Upload Media File'}</span>
          </button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search media files..."
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Media Grid */}
      {media.length === 0 && !loading ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed p-8 space-y-3">
          <FolderOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No Custom Uploads Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click &ldquo;Upload Media File&rdquo; to store images or documents. You can also paste external URLs (like Unsplash) in any image input!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group"
            >
              <div className="relative aspect-square bg-slate-100 overflow-hidden flex items-center justify-center">
                {item.mime_type.startsWith('image/') ? (
                  <img src={item.url} alt={item.original_name} className="w-full h-full object-cover" />
                ) : (
                  <FileText className="w-10 h-10 text-emerald-600" />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    title="Copy URL"
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-slate-900 transition-colors"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.original_name)}
                    title="Delete File"
                    className="p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-2.5">
                <p className="text-[11px] font-bold text-slate-800 truncate">{item.original_name}</p>
                <p className="text-[10px] text-slate-400">{(item.size_bytes / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
