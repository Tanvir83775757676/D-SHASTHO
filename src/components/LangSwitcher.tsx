'use client'
import { useLang } from '@/i18n/LanguageContext'
import s from './LangSwitcher.module.css'

export default function LangSwitcher() {
  const { lang, toggle } = useLang()
  return (
    <button className={s.switcher} onClick={toggle} title="Switch language">
      <span className={lang === 'en' ? s.active : s.inactive}>EN</span>
      <span className={s.divider}>|</span>
      <span className={`${lang === 'bn' ? s.active : s.inactive} font-bengali`}>বাং</span>
    </button>
  )
}
