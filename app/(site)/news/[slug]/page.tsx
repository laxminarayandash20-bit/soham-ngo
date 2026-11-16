import React from 'react';
import { notFound } from 'next/navigation';
import NextLink from 'next/link';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/db';
import { ArrowLeft, Calendar, User, Tag, Share2, Heart } from 'lucide-react';

export const revalidate = 0;

interface NewsDetailPageProps {
  params: { slug: string };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post || !post.is_published) {
    notFound();
  }

  const related = (await getBlogPosts(true))
    .filter(p => p.id !== post.id)
    .slice(0, 2);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Article Header */}
      <div className="bg-slate-950 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NextLink
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </NextLink>

          <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>{new Date(post.published_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.author_name}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12">
        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] bg-slate-100 border-4 border-white mb-12">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Excerpt Lead Box */}
        <div className="p-6 bg-slate-50 border-l-4 border-emerald-600 rounded-r-2xl mb-8">
          <p className="text-lg sm:text-xl text-slate-800 font-medium leading-relaxed italic">
            &ldquo;{post.excerpt}&rdquo;
          </p>
        </div>

        {/* Article Body */}
        <div className="prose max-w-none text-slate-700 leading-relaxed text-base sm:text-lg space-y-6">
          {post.content.split('\n\n').map((para, idx) => (
            <p key={idx} className="leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 mt-12 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">Tags:</span>
            {post.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Support More Grassroots Stories Like This</h3>
            <p className="text-sm text-emerald-200 mt-1">Your contribution directly funds education and medical care.</p>
          </div>
          <NextLink
            href="/pages/donate"
            className="px-6 py-3 bg-white text-emerald-950 font-bold text-sm rounded-xl hover:bg-emerald-50 transition-colors flex-shrink-0 flex items-center gap-2"
          >
            <Heart className="w-4 h-4 text-emerald-700 fill-emerald-700" />
            <span>Donate Online</span>
          </NextLink>
        </div>
      </div>
    </div>
  );
}
