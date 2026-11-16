import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPageBySlug, getSettings } from '@/lib/db';
import { ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import NextLink from 'next/link';

export const revalidate = 0;

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);
  if (!page) return { title: 'Page Not Found' };
  return {
    title: page.meta_title || page.title,
    description: page.meta_description || page.description
  };
}

export default async function DynamicCmsPage({ params }: PageProps) {
  const page = await getPageBySlug(params.slug);
  const settings = await getSettings();

  if (!page || !page.is_published) {
    notFound();
  }

  // Format content paragraphs and headers
  const renderFormattedContent = (content: string) => {
    return content.split('\n\n').map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-100 pb-2">
            {trimmed.replace(/^## /, '')}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-bold text-slate-800 mt-6 mb-3">
            {trimmed.replace(/^### /, '')}
          </h3>
        );
      }
      if (trimmed.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-base sm:text-lg font-bold text-emerald-800 mt-4 mb-2">
            {trimmed.replace(/^#### /, '')}
          </h4>
        );
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').filter(Boolean);
        return (
          <ul key={idx} className="list-disc list-inside space-y-2 text-slate-700 my-4 pl-2">
            {items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item.replace(/^[-*] /, '')}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-slate-700 leading-relaxed text-base sm:text-lg mb-4">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Banner */}
      <div className="bg-slate-950 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-3.5 py-1.5 rounded-full inline-block">
            {settings.org_name} Official Portal
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {page.title}
          </h1>
          {page.description && (
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              {page.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl">
          {page.banner_image && (
            <div className="rounded-2xl overflow-hidden aspect-[16/8] mb-8 bg-slate-100">
              <img src={page.banner_image} alt={page.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose max-w-none text-slate-700">
            {renderFormattedContent(page.content)}
          </div>

          {/* If this is the donate page, render an interactive Donation helper card */}
          {page.slug === 'donate' && (
            <div className="mt-12 p-8 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>80G Tax Exemption Certificate Issued Within 48 Hours</span>
              </div>
              <p className="text-sm text-emerald-900 leading-relaxed">
                After completing your direct bank transfer, please email your transaction reference UTR number along with your PAN card details to{' '}
                <a href={`mailto:${settings.email}`} className="font-bold underline">
                  {settings.email}
                </a>{' '}
                to receive your official tax-exemption donation receipt.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <NextLink
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
                >
                  <span>Need an invoice or have wire transfer queries? Contact our finance desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </NextLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
