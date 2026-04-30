import type { Metadata, Viewport } from 'next'
import './globals.css'
import { themeScript } from '@/components/ThemeScript'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://toosoon.example'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'TooSoon — Is it too soon? Let the people decide.',
    template: '%s · TooSoon',
  },
  description:
    'Drop a take, the crowd decides. TooSoon is the crowd-powered moral compass — vote on whether something is Too Soon or Fair Game.',
  applicationName: 'TooSoon',
  keywords: ['too soon', 'voting', 'social', 'opinions', 'culture', 'hot takes'],
  authors: [{ name: 'TooSoon' }],
  openGraph: {
    title: 'TooSoon — Is it too soon?',
    description: 'The crowd-powered moral compass. Vote on hot takes.',
    url: SITE_URL,
    siteName: 'TooSoon',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'TooSoon — vote on hot takes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TooSoon — Is it too soon?',
    description: 'The crowd-powered moral compass. Vote on hot takes.',
    images: ['/og.png'],
  },
  robots: {
    // Pre-launch — keep search engines out until we're ready. Flip to true
    // before going live, and update public/robots.txt to match.
    index: false,
    follow: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#FAF8F4' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Pick the theme before paint to avoid a light/dark flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-toosoon-dark text-tt-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:font-semibold"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
