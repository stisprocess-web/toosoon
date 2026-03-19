import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TooSoon — Is it too soon? Let the people decide.',
  description: 'Vote on whether something is Too Soon or Not Too Soon. The crowd-powered moral compass for the internet age.',
  keywords: ['too soon', 'voting', 'social', 'opinions', 'culture', 'hot takes'],
  openGraph: {
    title: 'TooSoon — Is it too soon?',
    description: 'The crowd-powered moral compass. Vote on hot takes.',
    url: 'https://nottoosoon.com',
    siteName: 'TooSoon',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TooSoon — Is it too soon?',
    description: 'The crowd-powered moral compass. Vote on hot takes.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-toosoon-dark text-white antialiased">
        {children}
      </body>
    </html>
  )
}
