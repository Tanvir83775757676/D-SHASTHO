import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import LangSwitcher from '../components/LangSwitcher'
import styles from './Landing.module.css'

export default function Landing() {
  const nav = useNavigate()
  const { t } = useLang()
  const sparkRef = useRef(null)

  useEffect(() => {
    const el = sparkRef.current
    if (!el) return
    const heights = [30, 50, 40, 65, 55, 45, 70, 60, 48, 52, 68, 45]
    el.innerHTML = ''
    heights.forEach((h, i) => {
      const bar = document.createElement('div')
      bar.className = styles.sparkbar + (i === heights.length - 1 ? ' ' + styles.sparkbarActive : '')
      bar.style.height = h + '%'
      el.appendChild(bar)
    })
  }, [])

  return (
    <div className={styles.landing}>
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <div className={styles.navLogoIcon}>🩺</div>
          <span className={styles.navLogoText}>D-Shastho</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#features">{t('nav_features')}</a>
          <a href="#about">{t('nav_about')}</a>
          <a href="#contact">{t('nav_contact')}</a>
        </div>
        <div className={styles.navActions}>
          <LangSwitcher />
          <button className={styles.navLogin} onClick={() => nav('/dashboard')}>{t('nav_login')}</button>
          <button className={styles.navCta} onClick={() => nav('/onboarding')}>{t('nav_cta')}</button>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroBadge}>{t('hero_badge')}</div>
          <h1 className={styles.heroTitle}>
            {t('hero_title_1')}<br />
            {t('hero_title_2') && <>{t('hero_title_2')}<br /></>}
            <span className={styles.heroTitleAccent}>{t('hero_title_accent')}</span>
          </h1>
          <p className={styles.heroSub}>{t('hero_sub')}</p>
          <div className={styles.heroStats}>
            {[['50,000+',t('stat_patients')],['200+',t('stat_doctors')],['40+',t('stat_labs')],['98%',t('stat_satisfaction')]].map(([n,l]) => (
              <div key={l} className={styles.hstat}>
                <div className={styles.hstatNum}>{n}</div>
                <div className={styles.hstatLabel}>{l}</div>
              </div>
            ))}
          </div>
          <div className={styles.heroCtas}>
            <button className={styles.ctaPrimary} onClick={() => nav('/onboarding')}>{t('hero_cta_primary')}</button>
            <button className={styles.ctaSecondary} onClick={() => nav('/dashboard')}>{t('hero_cta_secondary')}</button>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={`${styles.heroCard} animate-float`}>
            <div className={styles.hcardHeader}>
              <span className={styles.hcardTitle}>{t('card_title')}</span>
              <span className={styles.hcardDate}>5 May, 2026</span>
            </div>
            <div className={styles.hcardGlucose}>
              <div className={styles.hcardNum}>112</div>
              <div className={styles.hcardUnit}>{t('card_unit')}</div>
              <span className={styles.hcardStatus}>{t('card_status')}</span>
            </div>
            <div className={styles.sparkline} ref={sparkRef} />
            <div className={styles.hcardMetrics}>
              {[[t('card_hba1c'),'6.8','%'],[t('card_weight'),'72','kg'],[t('card_steps'),'6.2','k'],[t('card_next_med'),'8:00','PM']].map(([l,v,u]) => (
                <div key={l} className={styles.hcardMetric}>
                  <div className={styles.hmLabel}>{l}</div>
                  <div className={styles.hmValue}>{v}<span className={styles.hmUnit}>{u}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className={styles.features}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>{t('features_heading')}</h2>
          <p className={styles.sectionSub}>{t('features_sub')}</p>
        </div>
        <div className={styles.featGrid}>
          {[
            {icon:'🤖',title:t('feat1_title'),desc:t('feat1_desc')},
            {icon:'👨‍⚕️',title:t('feat2_title'),desc:t('feat2_desc')},
            {icon:'📊',title:t('feat3_title'),desc:t('feat3_desc')},
            {icon:'🍛',title:t('feat4_title'),desc:t('feat4_desc')},
            {icon:'💊',title:t('feat5_title'),desc:t('feat5_desc')},
            {icon:'📋',title:t('feat6_title'),desc:t('feat6_desc')},
          ].map(f => (
            <div key={f.title} className={styles.featCard}>
              <div className={styles.featIcon}>{f.icon}</div>
              <h3 className={styles.featTitle}>{f.title}</h3>
              <p className={styles.featDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <h2>{t('cta_heading')}</h2>
        <p>{t('cta_sub')}</p>
        <button className={styles.ctaPrimary} onClick={() => nav('/onboarding')}>{t('cta_btn')}</button>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLogo}><span>🩺</span> D-Shastho</div>
        <p className={styles.footerText}>{t('footer_copy')}</p>
      </footer>
    </div>
  )
}
