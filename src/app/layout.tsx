import type { Metadata } from 'next'
import { dmSans, fraunces, adorNoirrit } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'D-Shastho | ডি-স্বাস্থ্য',
  description: "Bangladesh's first complete AI-powered diabetes management platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} ${adorNoirrit.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
