import React from 'react';
import { notFound } from 'next/navigation';
import NextLink from 'next/link';
import { getProjectBySlug } from '@/lib/db';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  CheckCircle2,
  Target,
  FileText,
  Download,
  Heart,
  Share2
} from 'lucide-react';

export const revalidate = 0;

interface ProjectDetailPageProps {
  params: { slug: string };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project || !project.is_published) {
    notFound();
  }

  const statusColor =
    project.status === 'completed'
      ? 'bg-blue-500/20 text-blue-300 border-blue-400'
      : project.status === 'active'
      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
      : 'bg-amber-500/20 text-amber-300 border-amber-400';

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Banner */}
      <div className="relative h-80 sm:h-96 lg:h-[450px] bg-slate-950 overflow-hidden">
        <img
          src={project.featured_image}
          alt={project.title}
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
          <NextLink
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </NextLink>

          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider backdrop-blur-md ${statusColor}`}>
              Status: {project.status}
            </span>
            <span className="bg-white/20 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
              {project.category}
            </span>
            <span className="text-xs text-white/80 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{project.location}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-4xl">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview Box */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
                Project Synopsis
              </h3>
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium">
                {project.description}
              </p>
            </div>

            {/* Full Content */}
            <div className="prose max-w-none text-slate-700 leading-relaxed text-base sm:text-lg space-y-6">
              {project.full_content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Strategic Objectives */}
            {project.objectives && project.objectives.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Target className="w-6 h-6 text-emerald-600" />
                  <span>Targeted Project Objectives</span>
                </h3>
                <ul className="space-y-3">
                  {project.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 text-base">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Verified Outcomes */}
            {project.outcomes && project.outcomes.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <span>Achieved & Verified Outcomes</span>
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {project.outcomes.map((outcome, idx) => (
                    <div key={idx} className="p-4 bg-emerald-50/60 border border-emerald-200/60 rounded-xl flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-emerald-950 font-medium">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-6 sticky top-28">
              <h3 className="text-lg font-bold text-slate-900">Project Details</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <span className="block text-slate-400 font-medium">Location</span>
                  <span className="block font-semibold text-slate-800 mt-0.5">{project.location}</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-medium">Timeline</span>
                  <span className="block font-semibold text-slate-800 mt-0.5">
                    {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'N/A'} – {project.end_date ? new Date(project.end_date).toLocaleDateString() : 'Present'}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400 font-medium">Program Category</span>
                  <span className="block font-semibold text-slate-800 mt-0.5">{project.category}</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-medium">Current Status</span>
                  <span className="block font-semibold text-emerald-700 capitalize mt-0.5">{project.status}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <NextLink
                  href="/pages/donate"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Fund This Project</span>
                </NextLink>

                <NextLink
                  href="/volunteer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm rounded-xl border border-slate-300 transition-all"
                >
                  <span>Volunteer On-Ground</span>
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
