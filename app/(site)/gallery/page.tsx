'use client';

import React, { useState, useEffect } from 'react';
import { GalleryImage } from '@/lib/types';
import { X, ZoomIn, Tag } from 'lucide-react';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalImage, setActiveModalImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetch('/api/admin/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setImages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-slate-950 text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-3.5 py-1.5 rounded-full inline-block">
            Visual Chronicles
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Photo Gallery & Field Archives
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real stories captured through the lens — showcasing our educational camps, healthcare outreaches, and community spirit.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500">No images found for category &ldquo;{selectedCategory}&rdquo;.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setActiveModalImage(img)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-square bg-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer border border-slate-200/80"
              >
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between text-white">
                  <div className="flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                      {img.category}
                    </span>
                    <h4 className="text-sm font-bold truncate">{img.title}</h4>
                    {img.caption && (
                      <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{img.caption}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-[16/10] max-h-[75vh] bg-black">
              <img
                src={activeModalImage.image_url}
                alt={activeModalImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 bg-slate-900 text-white">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                {activeModalImage.category}
              </span>
              <h3 className="text-xl font-bold">{activeModalImage.title}</h3>
              {activeModalImage.caption && (
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">{activeModalImage.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
