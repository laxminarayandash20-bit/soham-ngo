import React from 'react';
import { getSettings, getTeamMembers } from '@/lib/db';
import {
  ShieldCheck,
  Award,
  Heart,
  Target,
  FileText,
  Download,
  Users,
  CheckCircle2,
  Mail,
  Linkedin,
  Twitter,
  Calendar
} from 'lucide-react';
import NextLink from 'next/link';

export const revalidate = 0;

export default async function AboutPage() {
  const [settings, teamMembers] = await Promise.all([
    getSettings(),
    getTeamMembers(true)
  ]);

  const leadership = teamMembers.filter(m => m.category === 'leadership');
  const operations = teamMembers.filter(m => m.category === 'operations' || m.category === 'volunteer_lead');

  const annualReports = [
    { year: '2025 – 2026', title: 'Annual Impact & Financial Transparency Report', size: '2.4 MB' },
    { year: '2024 – 2025', title: 'Audited Financial Statement & Activity Review', size: '1.8 MB' },
    { year: '2023 – 2024', title: 'Decennial Grassroots Transformation Summary', size: '3.1 MB' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1600&auto=format&fit=crop"
            alt="About Soham NGO"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-3.5 py-1.5 rounded-full inline-block">
            Our Story & Stewardship
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            About {settings.org_name}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Founded on the principle of human dignity, Soham NGO works tirelessly across underserved hamlets to create pathways of hope, education, and health.
          </p>
        </div>
      </section>

      {/* History & Genesis */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md">
              Genesis & Background
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              A Decade of Unwavering Humanitarian Commitment
            </h2>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              Soham NGO began in 2012 when a small group of doctors, social activists, and educators recognized a recurring tragedy: capable rural children dropping out of primary school due to seasonal migration, and preventable health conditions worsening into fatal illnesses due to lack of diagnostic care.
            </p>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              Starting with a single makeshift classroom in a community courtyard, Soham has grown into an impactful movement operating digital classrooms, weekly mobile diagnostic clinics, women craft cooperatives, and emergency relief distribution networks reaching over 85+ rural and peri-urban communities.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div>
                <span className="block text-3xl font-extrabold text-emerald-700">14+ Years</span>
                <span className="text-xs text-slate-500 font-medium">Of Verified Ground Service</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-emerald-700">85+ Communities</span>
                <span className="text-xs text-slate-500 font-medium">Actively Supported</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
              alt="Soham NGO History"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision, Mission, and Core Values */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Our Vision, Mission & Moral Imperative
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              The foundational ethical bedrock that drives every initiative, volunteer deployment, and partnership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                To empower underprivileged communities through equitable access to holistic schooling, preventive healthcare, vocational training, and sustainable community infrastructure — ensuring that socio-economic status is never an obstacle to human potential.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                A compassionate, self-reliant society where every individual lives with dignity, equal opportunities, and the power to shape their own destiny without discrimination.
              </p>
            </div>
          </div>

          {/* Objectives List */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>Core Organizational Objectives</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Eradicate illiteracy by equipping government and informal village schools with solar smart digital classrooms.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Provide continuous preventive diagnostic screenings and free medication to remote communities lacking hospitals.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Empower rural and slum women through vocational skills in tailoring, organic farming, and self-help cooperatives.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Construct sustainable community water filtration units and hygienic sanitation blocks in fluoride-affected villages.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Team Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="team">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md">
            Our People
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Leadership & Operational Team
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Meet the experienced doctors, social activists, and field coordinators directing Soham NGO’s initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                  {member.category.replace('_', ' ')}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-xs font-semibold text-emerald-700 mb-3 uppercase tracking-wider">
                    {member.designation}
                  </p>
                  {member.bio && (
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 hover:text-emerald-700">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{member.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Registration & Legal Details */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Registration, Compliance & Tax Exemptions</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="block text-xs font-bold text-slate-500 uppercase">Entity Classification</span>
                <span className="block text-sm font-semibold text-slate-900 mt-1">Non-Governmental Social Welfare Society</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="block text-xs font-bold text-slate-500 uppercase">Income Tax Exemption</span>
                <span className="block text-sm font-semibold text-emerald-700 mt-1">80G & 12A Certified</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="block text-xs font-bold text-slate-500 uppercase">Annual Financial Audit</span>
                <span className="block text-sm font-semibold text-slate-900 mt-1">Statutory Audited Annually</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="block text-xs font-bold text-slate-500 uppercase">Registered Jurisdiction</span>
                <span className="block text-sm font-semibold text-slate-900 mt-1">New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Reports & Documents */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="reports">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md">
            Transparency
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
            Annual Reports & Financial Filings
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            In compliance with our open governance charter, download our complete audited financial records and impact evaluations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {annualReports.map((report, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    {report.year}
                  </span>
                  <span className="text-xs text-slate-400">{report.size}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{report.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  Includes full balance sheet, expenditure breakdowns across programs, and independent auditor sign-offs.
                </p>
              </div>

              <a
                href="#download-report"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading Soham NGO ${report.year} Annual Financial Report...`);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Report</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
