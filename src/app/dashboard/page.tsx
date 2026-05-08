'use client'
import Dashboard from '@/components/pages/Dashboard'
import { LanguageProvider } from '@/i18n/LanguageContext'

export default function DashboardPage() {
  return (
    <LanguageProvider>
      <Dashboard />
    </LanguageProvider>
  )
}
