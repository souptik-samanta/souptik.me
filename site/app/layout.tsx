import type { Metadata, Viewport } from 'next';
import { Newsreader, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const serif = Newsreader({ subsets: ['latin'], variable: '--font-newsreader', style: ['normal', 'italic'] });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

const desc =
  'Souptik Samanta, 17, maker and developer from Kolkata, India. Custom PCBs, a from-scratch 3D printer, STM32/ESP32 firmware and AI projects.';

export const metadata: Metadata = {
  metadataBase: new URL('https://souptik.me'),
  title: 'Souptik Samanta | Maker & Developer from Kolkata',
  description: desc,
  keywords: ['Souptik Samanta', 'Souptik', 'maker', 'PCB design', 'KiCad', '3D printing', 'STM32', 'ESP32', 'Hack Club', 'Kolkata'],
  authors: [{ name: 'Souptik Samanta', url: 'https://souptik.me' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Souptik Samanta | Maker & Developer',
    description: desc,
    url: 'https://souptik.me',
    siteName: 'Souptik Samanta',
    type: 'website',
    images: ['https://cloud-2yhlt75w0-hack-club-bot.vercel.app/0img.png'],
  },
  twitter: { card: 'summary_large_image', title: 'Souptik Samanta | Maker & Developer', description: desc },
};

export const viewport: Viewport = { themeColor: '#ece6d6' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Souptik Samanta',
  url: 'https://souptik.me',
  jobTitle: 'Maker and Developer',
  description: desc,
  address: { '@type': 'PostalAddress', addressLocality: 'Kolkata', addressRegion: 'West Bengal', addressCountry: 'IN' },
  knowsAbout: ['PCB design', '3D printing', 'Embedded firmware', 'Web development', 'Machine learning'],
  sameAs: [
    'https://github.com/souptik-samanta',
    'https://www.linkedin.com/in/me-souptik/',
    'https://www.instagram.com/souptik.me',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
