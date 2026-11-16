import React from 'react';
import NextLink from 'next/link';
import { Project } from '@/lib/types';
import { MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-100/70 px-3 py-1 rounded-md">
              Field Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Featured Flagship Projects
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              Explore our tangible ground initiatives delivering verified impact across targeted villages, schools, and medical outposts.
            </p>
          </div>
          <NextLink
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors self-start md:self-auto"
          >
            <span>All Projects & Reports</span>
            <ArrowRight className="w-4 h-4" />
          </NextLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project) => {
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
    </section>
  );
}
