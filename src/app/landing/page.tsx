'use client'
import Landing from '@/components/pages/Landing'
import { LanguageProvider } from '@/i18n/LanguageContext'

export default function LandingPage() {
  return (
    <LanguageProvider>
      <Landing />
    </LanguageProvider>
  )
}
