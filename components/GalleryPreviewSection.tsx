import React from 'react';
import NextLink from 'next/link';
import { GalleryImage } from '@/lib/types';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';

interface GalleryPreviewSectionProps {
  images: GalleryImage[];
}

export default function GalleryPreviewSection({ images }: GalleryPreviewSectionProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md">
              Moments of Hope
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Photo Gallery & Field Impressions
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              Authentic glimpses of our teams, volunteer doctors, teachers, and resilient communities in action.
            </p>
          </div>
          <NextLink
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors self-start md:self-auto"
          >
            <span>View Complete Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </NextLink>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.slice(0, 6).map((img, idx) => (
            <div
              key={img.id || idx}
              className="group relative rounded-xl overflow-hidden aspect-square bg-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                  {img.category}
                </span>
                <span className="text-xs font-bold truncate">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
