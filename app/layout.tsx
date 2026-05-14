// app/layout.tsx
import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
})

export const metadata: Metadata = {
  title: {
    default: 'كلينك كومبير — قارن أسعار عيادات التجميل',
    template: '%s | كلينك كومبير',
  },
  description: 'قارن أسعار عيادات التجميل في السعودية. ابحث عن أفضل العيادات وأرخص الأسعار مع تقييمات حقيقية.',
  keywords: ['عيادات تجميل', 'أسعار البوتوكس', 'مقارنة عيادات', 'السعودية'],
  openGraph: {
    title: 'كلينك كومبير',
    description: 'قارن أسعار عيادات التجميل في السعودية',
    locale: 'ar_SA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${ibmPlexArabic.variable} font-arabic antialiased`}>
        {children}
      </body>
    </html>
  )
}
