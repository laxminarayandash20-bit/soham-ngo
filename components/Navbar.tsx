'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/navigation';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem, WebsiteSettings } from '@/lib/types';
import {
  Menu,
  X,
  Phone,
  Mail,
  Heart,
  UserCheck,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  settings: WebsiteSettings;
  navItems: NavItem[];
}

export default function Navbar({ settings, navItems }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter header items
  const headerLinks = navItems
    .filter(item => item.is_header && item.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            {settings.phone && (
              <a href={`tel:${settings.phone.split('/')[0].trim()}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{settings.phone}</span>
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{settings.email}</span>
              </a>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Registered Non-Profit • 80G Tax-Exempt</span>
            </span>
            <NextLink
              href="/admin"
              className="text-slate-400 hover:text-white transition-colors text-[11px] bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700"
            >
              CMS Admin
            </NextLink>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-white shadow-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <NextLink href="/" className="flex items-center gap-3 group">
              <img
                src={settings.logo_url || '/images/soham-logo.svg'}
                alt={settings.org_name}
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {settings.org_name}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 tracking-wider uppercase">
                  Humanitarian Welfare
                </span>
              </div>
            </NextLink>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {headerLinks.map((item) => {
                const active = isActive(item.path);
                return (
                  <NextLink
                    key={item.id}
                    href={item.path}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      active
                        ? 'text-emerald-700 bg-emerald-50 font-semibold'
                        : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </NextLink>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <NextLink
                href="/volunteer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-slate-200 transition-colors"
              >
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Volunteer</span>
              </NextLink>
              <NextLink
                href="/pages/donate"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate Now</span>
              </NextLink>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-120px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-6 space-y-1">
              {headerLinks.map((item) => {
                const active = isActive(item.path);
                return (
                  <NextLink
                    key={item.id}
                    href={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      active
                        ? 'text-emerald-700 bg-emerald-50 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </NextLink>
                );
              })}

              <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                <NextLink
                  href="/volunteer"
                  className="flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200"
                >
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Join as Volunteer</span>
                </NextLink>
                <NextLink
                  href="/pages/donate"
                  className="flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate to Soham NGO</span>
                </NextLink>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
