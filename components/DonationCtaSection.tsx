import React from 'react';
import NextLink from 'next/link';
import { HomepageSection } from '@/lib/types';
import { Heart, ShieldCheck, ArrowRight } from 'lucide-react';

interface DonationCtaSectionProps {
  section?: HomepageSection;
}

export default function DonationCtaSection({ section }: DonationCtaSectionProps) {
  if (section && !section.is_enabled) return null;

  const title = section?.title || 'Your Generosity Transforms Vulnerable Lives';
  const subtitle = section?.subtitle || 'Every single contribution directly sponsors school kits, mobile doctor visits, clean water filtration, and women livelihood centers with 100% financial transparency.';

  const tiers = [
    { amount: '₹1,500', desc: 'Sponsors school bag, textbooks & uniform for a child' },
    { amount: '₹3,500', desc: 'Funds mobile clinic diagnostic checkup for 15 elderly' },
    { amount: '₹7,500', desc: 'Provides sewing machine kit for a rural woman entrepreneur' }
  ];

  return (
    <section className="py-20 lg:py-24 bg-emerald-50 border-t border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl border border-emerald-200/60 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tax Exemption Under Section 80G</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {subtitle}
            </p>

            {/* Donation Quick Tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {tiers.map((tier, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-left">
                  <span className="block text-xl font-extrabold text-emerald-700">{tier.amount}</span>
                  <span className="text-xs text-slate-600 mt-1 block leading-snug">{tier.desc}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <NextLink
                href="/pages/donate"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Make a Charitable Contribution</span>
                <ArrowRight className="w-4 h-4" />
              </NextLink>

              <NextLink
                href="/about#reports"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-all"
              >
                <span>View Audited Reports</span>
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
