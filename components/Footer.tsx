'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { NavItem, WebsiteSettings } from '@/lib/types';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Send,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

interface FooterProps {
  settings: WebsiteSettings;
  navItems: NavItem[];
}

export default function Footer({ settings, navItems }: FooterProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const footerLinks = navItems
    .filter(item => item.is_footer && item.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1: About NGO */}
          <div className="space-y-4">
            <NextLink href="/" className="flex items-center gap-3">
              <img
                src={settings.logo_url || '/images/soham-logo.svg'}
                alt={settings.org_name}
                className="h-10 w-auto brightness-0 invert object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-2xl font-bold tracking-tight text-white">
                {settings.org_name}
              </span>
            </NextLink>
            <p className="text-sm text-slate-400 leading-relaxed">
              {settings.tagline || 'Empowering Communities, Transforming Lives with Compassion & Dignity.'}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>12A & 80G Certified Non-Profit</span>
              </span>
            </div>
            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.twitter_url && (
                <a
                  href={settings.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {settings.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings.youtube_url && (
                <a
                  href={settings.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Explore & Engage
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <NextLink
                    href={link.path}
                    className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Reach Out
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${settings.phone.split('/')[0].trim()}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{settings.working_hours}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Transparency */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              Stay Connected
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Subscribe to our monthly newsletter for field stories, health camp schedules, and transparent financial impact reports.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-lg text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Thank you! You are now subscribed to our impact reports.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-[11px] text-slate-500">Zero spam. Unsubscribe anytime.</span>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-slate-900">
              <NextLink
                href="/pages/donate"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Support Our Cause</span>
              </NextLink>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>{settings.copyright_text || `© ${new Date().getFullYear()} Soham NGO. All Rights Reserved.`}</p>
          <div className="flex items-center gap-4">
            <NextLink href="/pages/privacy-policy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </NextLink>
            <span>•</span>
            <NextLink href="/pages/terms-and-conditions" className="hover:text-slate-400 transition-colors">
              Terms & Conditions
            </NextLink>
            <span>•</span>
            <NextLink href="/admin" className="hover:text-emerald-400 transition-colors">
              Admin CMS Login
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
