import { useLang } from '../i18n/LanguageContext'
import s from './LangSwitcher.module.css'

export default function LangSwitcher({ variant = 'default' }) {
  const { lang, toggle } = useLang()
  const isEn = lang === 'en'

  return (
    <button
      className={`${s.switcher} ${s['variant_' + variant]} ${isEn ? '' : s.bn}`}
      onClick={toggle}
      title={isEn ? 'Switch to Bengali' : 'Switch to English'}
      aria-label="Toggle language"
    >
      <span className={`${s.option} ${isEn ? s.active : ''}`}>EN</span>
      <span className={s.divider}>|</span>
      <span className={`${s.option} ${!isEn ? s.active : ''}`}>বাং</span>
    </button>
  )
}
