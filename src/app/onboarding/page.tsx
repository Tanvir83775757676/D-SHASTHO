'use client'
import Onboarding from '@/components/pages/Onboarding'
import { LanguageProvider } from '@/i18n/LanguageContext'

export default function OnboardingPage() {
  return (
    <LanguageProvider>
      <Onboarding />
    </LanguageProvider>
  )
}
