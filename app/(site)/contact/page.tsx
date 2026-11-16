import React from 'react';
import { getSettings } from '@/lib/db';
import ContactSection from '@/components/ContactSection';
import { MapPin, Phone, Mail, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-slate-950 text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-3.5 py-1.5 rounded-full inline-block">
            Open Dialogue & Assistance
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Contact Soham NGO
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Have questions about donating, CSR partnerships, or volunteering? Our administrative office is ready to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Quick Highlights Bar */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase">Call Directly</span>
              <a href={`tel:${settings.phone.split('/')[0].trim()}`} className="text-sm font-bold text-slate-900 hover:text-emerald-700">
                {settings.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase">Email Us</span>
              <a href={`mailto:${settings.email}`} className="text-sm font-bold text-slate-900 hover:text-emerald-700">
                {settings.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase">Office Timings</span>
              <span className="text-sm font-bold text-slate-900">
                {settings.working_hours}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <ContactSection settings={settings} />

        {/* Google Map Location */}
        <div className="mt-16 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Our Operational Headquarters</h3>
              <p className="text-xs text-slate-500">{settings.address}</p>
            </div>
            <a
              href={settings.google_maps_url || 'https://maps.google.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>Open in Google Maps</span>
              <MapPin className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[16/6] bg-slate-100 border border-slate-200">
            <iframe
              title="Soham NGO Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://maps.google.com/maps?q=New%20Delhi,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
