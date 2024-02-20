import { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import Script from 'next/script';
import * as React from 'react';

import '@/styles/globals.css';

import Provider from '@/components/provider';

import { siteConfig } from '@/constant/config';

// If loading a variable font, you don't need to specify the font weight
const dm_sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/og.png`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
  },
  authors: [
    {
      name: 'Chandraprakash Darji',
      url: 'https://twitter.com/chandra_7852',
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning className={dm_sans.variable}>
      <Script
        async
        defer
        src='https://unami-kohl.vercel.app/script.js'
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ''}
      ></Script>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
