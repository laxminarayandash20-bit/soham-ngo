import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSettings, getNavItems } from '@/lib/db';

export const revalidate = 0; // Fresh dynamic data on every request

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, navItems] = await Promise.all([
    getSettings(),
    getNavItems()
  ]);

  return (
    <>
      <Navbar settings={settings} navItems={navItems} />
      <main className="flex-1">
        {children}
      </main>
      <Footer settings={settings} navItems={navItems} />
    </>
  );
}
