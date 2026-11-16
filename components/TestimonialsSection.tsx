import React from 'react';
import { Testimonial } from '@/lib/types';
import { Star, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md">
            Voices of Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            What Beneficiaries & Partners Say
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Hear directly from the villagers, women cooperatives, and medical volunteers whose lives and communities have been impacted.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((test) => (
            <div
              key={test.id}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between relative group hover:shadow-lg transition-all"
            >
              <div className="absolute top-6 right-6 text-emerald-200 group-hover:text-emerald-300 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: test.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6 relative z-10">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                {test.photo_url ? (
                  <img
                    src={test.photo_url}
                    alt={test.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-300"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                    {test.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{test.name}</h4>
                  <p className="text-xs text-slate-500">
                    {test.role} {test.organization ? `• ${test.organization}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
