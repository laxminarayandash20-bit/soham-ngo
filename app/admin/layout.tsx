'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Home,
  FileText,
  Menu as MenuIcon,
  Activity,
  Briefcase,
  Newspaper,
  Image as ImageIcon,
  Users,
  MessageSquareQuote,
  Mail,
  UserCheck,
  FolderOpen,
  Settings,
  Shield,
  LogOut,
  ExternalLink,
  ChevronRight,
  X,
  Bell,
  Sparkles,
  Lock
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string; full_name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    // Check session
    fetch('/api/auth/me')
      .then(res => {
        if (!res.ok) {
          router.replace('/admin/login');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.authenticated) {
          setCurrentUser(data.user);
        } else if (!isLoginPage) {
          router.replace('/admin/login');
        }
        setLoading(false);
      })
      .catch(() => {
        if (!isLoginPage) router.replace('/admin/login');
        setLoading(false);
      });
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.replace('/admin/login');
    } catch (e) {
      router.replace('/admin/login');
    }
  };

  // If on login page, render child without admin layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-400">Loading Soham NGO CMS...</p>
        </div>
      </div>
    );
  }

  const navGroups = [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { label: 'Homepage Editor', href: '/admin/homepage', icon: Home },
      ]
    },
    {
      group: 'Content Management',
      items: [
        { label: 'Pages & Content', href: '/admin/pages', icon: FileText },
        { label: 'Navigation Menus', href: '/admin/navigation', icon: MenuIcon },
        { label: 'Activities & Programs', href: '/admin/activities', icon: Activity },
        { label: 'Projects & Outposts', href: '/admin/projects', icon: Briefcase },
        { label: 'Blog & Field News', href: '/admin/news', icon: Newspaper },
        { label: 'Photo Gallery', href: '/admin/gallery', icon: ImageIcon },
        { label: 'Team Members', href: '/admin/team', icon: Users },
        { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
      ]
    },
    {
      group: 'Submissions & CRM',
      items: [
        { label: 'Contact Inquiries', href: '/admin/contacts', icon: Mail },
        { label: 'Volunteer Applications', href: '/admin/volunteers', icon: UserCheck },
      ]
    },
    {
      group: 'System & Assets',
      items: [
        { label: 'Media Library', href: '/admin/media', icon: FolderOpen },
        { label: 'Website Settings', href: '/admin/settings', icon: Settings },
        ...(currentUser?.role === 'super_admin' ? [
          { label: 'Admin Users & Roles', href: '/admin/users', icon: Shield }
        ] : []),
      ]
    }
  ];

  const isActive = (href: string) => {
    if (href === '/admin' && pathname === '/admin') return true;
    if (href !== '/admin' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-950 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
            S
          </div>
          <span className="font-bold text-sm tracking-tight">Soham Admin CMS</span>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-72 bg-slate-950 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo & Org Info */}
          <div className="p-6 border-b border-slate-900 flex items-center justify-between">
            <NextLink href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-black text-white text-base shadow-md shadow-emerald-500/20">
                S
              </div>
              <div>
                <span className="block text-base font-extrabold text-white tracking-tight">Soham NGO</span>
                <span className="block text-[10px] font-semibold text-emerald-400 uppercase tracking-widest">
                  Control Center
                </span>
              </div>
            </NextLink>
          </div>

          {/* Nav List */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            {navGroups.map((grp, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {grp.group}
                </span>
                <div className="space-y-0.5 mt-2">
                  {grp.items.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;
                    return (
                      <NextLink
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                          active
                            ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-600/30'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </NextLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* User Profile & Actions Footer */}
          <div className="p-4 border-t border-slate-900 bg-slate-950/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-emerald-900 text-emerald-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {currentUser?.full_name?.charAt(0) || 'A'}
                </div>
                <div className="overflow-hidden">
                  <span className="block text-xs font-bold text-white truncate">
                    {currentUser?.full_name || 'Admin'}
                  </span>
                  <span className="block text-[10px] text-emerald-400 font-medium capitalize">
                    {currentUser?.role?.replace('_', ' ') || 'Editor'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                title="Log Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <NextLink
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors border border-slate-800"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>View Live Website</span>
            </NextLink>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <NextLink href="/admin" className="hover:text-emerald-700 font-medium">CMS</NextLink>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold capitalize">
              {pathname === '/admin' ? 'Dashboard Overview' : pathname.replace('/admin/', '').replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Database Connected</span>
            </span>

            <NextLink
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-emerald-700 py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview Site</span>
            </NextLink>
          </div>
        </header>

        {/* Page Inner Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
