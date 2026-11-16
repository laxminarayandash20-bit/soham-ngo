import React from 'react';
import { ShieldCheck, Building2, Globe, HeartHandshake } from 'lucide-react';

export default function PartnersSection() {
  const partners = [
    { name: 'National Health Mission Support', category: 'Healthcare Partner' },
    { name: 'Solar Energy Alliance', category: 'Infrastructure Partner' },
    { name: 'Palwal Rural Development Council', category: 'Local Panchayat' },
    { name: 'Empower Her Foundation', category: 'Livelihood Alliance' },
    { name: 'Digital Schools Initiative', category: 'Technology Partner' }
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Institutional Allies & Community Councils
          </span>
          <p className="text-sm text-slate-600 mt-1">
            Collaborating with panchayats, medical institutions, and non-profit coalitions
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-700 hover:border-emerald-500 transition-all"
            >
              <Building2 className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="block text-xs font-bold text-slate-900">{p.name}</span>
                <span className="block text-[10px] text-slate-500">{p.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
