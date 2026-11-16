import type { Metadata } from 'next';
import './globals.css';
import { getSettings } from '@/lib/db';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: {
      default: settings.meta_title || 'Soham NGO | Empowering Communities & Transforming Lives',
      template: `%s | ${settings.org_name || 'Soham NGO'}`
    },
    description: settings.meta_description || 'Dedicated to community welfare, child education, accessible rural healthcare, and women empowerment.',
    keywords: settings.keywords?.split(',') || ['ngo', 'charity', 'education', 'healthcare', 'volunteer'],
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sohamngo.com'),
    openGraph: {
      title: settings.meta_title || 'Soham NGO',
      description: settings.meta_description || 'Empowering communities through education and healthcare.',
      url: 'https://sohamngo.com',
      siteName: settings.org_name || 'Soham NGO',
      images: [
        {
          url: settings.og_image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
          width: 1200,
          height: 630,
          alt: settings.org_name
        }
      ],
      locale: 'en_US',
      type: 'website'
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col font-sans bg-white text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
