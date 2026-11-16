import React from 'react';
import NextLink from 'next/link';
import { getProjects } from '@/lib/db';
import { MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

export const revalidate = 0;

export default async function ProjectsPage() {
  const projects = await getProjects(true);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-slate-950 text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-3.5 py-1.5 rounded-full inline-block">
            Field Execution & Tracking
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Flagship Projects & Interventions
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Every project is monitored against structured objectives, verified ground milestones, and community ownership goals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const statusColor =
              project.status === 'completed'
                ? 'bg-blue-100 text-blue-800'
                : project.status === 'active'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800';

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={project.featured_image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${statusColor}`}>
                      {project.status}
                    </span>
                    <span className="bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-3">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Key Outcome Highlights */}
                    {project.outcomes && project.outcomes.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                          Verified Outcome:
                        </span>
                        <div className="flex items-start gap-1.5 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{project.outcomes[0]}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {project.start_date ? new Date(project.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'Ongoing'}
                    </span>
                    <NextLink
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-emerald-700 group-hover:translate-x-1 transition-all"
                    >
                      <span>Explore Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </NextLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
