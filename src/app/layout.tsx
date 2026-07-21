import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/components/layout/Providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'ApexUI — Open-Source UI Component Library',
    template: '%s | ApexUI',
  },
  description:
    'Discover, preview, and copy beautiful, production-ready UI components. Community-driven. Free forever.',
  keywords: ['UI components', 'Tailwind CSS', 'React', 'open source', 'dark mode', 'design system'],
  openGraph: {
    title: 'ApexUI — Open-Source UI Component Library',
    description: 'Discover, preview, and copy beautiful UI components. Free forever.',
    url: 'https://apexui.dev',
    siteName: 'ApexUI',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexUI — Open-Source UI Component Library',
    description: 'Discover, preview, and copy beautiful UI components. Free forever.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://apexui.dev'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#18181B',
              color: '#FAFAFA',
              border: '1px solid #27272A',
              borderRadius: '8px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#10B981', secondary: '#FAFAFA' },
              duration: 2500,
            },
            error: {
              iconTheme: { primary: '#EF4444', secondary: '#FAFAFA' },
            },
          }}
        />
      </body>
    </html>
  )
}
