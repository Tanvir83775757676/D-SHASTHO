'use client'
import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Bot, UserCheck, Activity, UtensilsCrossed, Bell, FileBarChart2,
  ShieldCheck, Send, MapPin, Phone, Mail, Clock,
  ChevronRight, Star
} from 'lucide-react'
import { useLang } from '@/i18n/LanguageContext'
import LangSwitcher from '@/components/LangSwitcher'
import styles from '@/components/pages/Landing.module.css'

const FEATURE_ICONS = [Bot, UserCheck, Activity, UtensilsCrossed, Bell, FileBarChart2]

export default function Landing() {
  const router = useRouter()
  const { t, lang } = useLang()
  const sparkRef = useRef<HTMLDivElement>(null)

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

  const features = [
    { key: 'feat1', Icon: FEATURE_ICONS[0] },
    { key: 'feat2', Icon: FEATURE_ICONS[1] },
    { key: 'feat3', Icon: FEATURE_ICONS[2] },
    { key: 'feat4', Icon: FEATURE_ICONS[3] },
    { key: 'feat5', Icon: FEATURE_ICONS[4] },
    { key: 'feat6', Icon: FEATURE_ICONS[5] },
  ]

  return (
    <div className={styles.landing} lang={lang === 'bn' ? 'bn' : 'en'}>

      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <div className={styles.navLogoIcon}><Activity size={18} color="white" /></div>
          <span className={styles.navLogoText}>D-Shastho</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#features">{t('nav_features')}</a>
          <a href="#about">{t('nav_about')}</a>
          <a href="#contact">{t('nav_contact')}</a>
        </div>
        <div className={styles.navActions}>
          <LangSwitcher />
          <button className={styles.navLogin}  onClick={() => router.push('/dashboard')}>{t('nav_login')}</button>
          <button className={styles.navCta}    onClick={() => router.push('/onboarding')}>{t('nav_cta')}</button>
        </div>
      </nav>

      {/* HERO */}
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
            {([['50,000+', t('stat_patients')], ['200+', t('stat_doctors')], ['40+', t('stat_labs')], ['98%', t('stat_satisfaction')]] as const).map(([n, l]) => (
              <div key={l} className={styles.hstat}>
                <div className={styles.hstatNum}>{n}</div>
                <div className={styles.hstatLabel}>{l}</div>
              </div>
            ))}
          </div>
          <div className={styles.heroCtas}>
            <button className={styles.ctaPrimary}   onClick={() => router.push('/onboarding')}>{t('hero_cta_primary')}</button>
            <button className={styles.ctaSecondary} onClick={() => router.push('/dashboard')}>{t('hero_cta_secondary')}</button>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={`${styles.heroCard} animate-float`}>
            <div className={styles.hcardHeader}>
              <span className={styles.hcardTitle}>{t('card_title')}</span>
              <span className={styles.hcardDate}>8 May, 2026</span>
            </div>
            <div className={styles.hcardGlucose}>
              <div className={styles.hcardNum}>112</div>
              <div className={styles.hcardUnit}>{t('card_unit')}</div>
              <span className={styles.hcardStatus}>{t('card_status')}</span>
            </div>
            <div className={styles.sparkline} ref={sparkRef} />
            <div className={styles.hcardMetrics}>
              {([
                [t('card_hba1c'), '6.8', '%'],
                [t('card_weight'), '72', 'kg'],
                [t('card_steps'), '6.2', 'k'],
                [t('card_next_med'), '8:00', 'PM'],
              ] as const).map(([l, v, u]) => (
                <div key={l} className={styles.hcardMetric}>
                  <div className={styles.hmLabel}>{l}</div>
                  <div className={styles.hmValue}>{v}<span className={styles.hmUnit}>{u}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className={styles.features}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>{t('features_heading')}</h2>
          <p className={styles.sectionSub}>{t('features_sub')}</p>
        </div>
        <div className={styles.featGrid}>
          {features.map(({ key, Icon }) => (
            <div key={key} className={styles.featCard}>
              <div className={styles.featIcon}><Icon size={28} color="#0A6E6E" /></div>
              <h3 className={styles.featTitle}>{t(`${key}_title` as string)}</h3>
              <p className={styles.featDesc}>{t(`${key}_desc` as string)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={styles.about}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>About D-Shastho</h2>
          <p className={styles.sectionSub}>Built in Bangladesh, for Bangladesh&apos;s 84 million at-risk diabetics</p>
        </div>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <p>D-Shastho (ডি-স্বাস্থ্য) is Bangladesh&apos; first complete digital diabetes management platform — combining AI-powered analytics, Bengali-language doctor consultations, and a local food guide, all in one place.</p>
            <p>We believe every Bangladeshi deserves access to world-class diabetes care, regardless of where they live or what they can afford.</p>
            <div className={styles.aboutStats}>
              {([['2026','Founded'],['50,000+','Patients'],['200+','Doctors'],['40+','Labs']] as const).map(([v, l]) => (
                <div key={l} className={styles.aboutStat}>
                  <div className={styles.aboutStatVal}>{v}</div>
                  <div className={styles.aboutStatLabel}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.aboutValues}>
            {[
              { Icon: MapPin,    title: 'Made for Bangladesh', desc: 'Bengali language, local food data, and Bangladeshi doctors.' },
              { Icon: Bot,       title: 'AI-Powered',          desc: 'Machine learning that understands your glucose patterns.' },
              { Icon: ShieldCheck, title: 'Privacy First',     desc: 'Your health data is encrypted and never sold.' },
              { Icon: Star,      title: 'Affordable Care',     desc: 'Free tier available. Pro from ৳299/month.' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className={styles.valueCard}>
                <span className={styles.valueIcon}><Icon size={22} color="#0A6E6E" /></span>
                <div>
                  <div className={styles.valueTitle}>{title}</div>
                  <div className={styles.valueDesc}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={styles.contact}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle} style={{ color: 'white' }}>Get in Touch</h2>
          <p className={styles.sectionSub} style={{ color: 'rgba(255,255,255,0.7)' }}>Questions, partnerships, or feedback</p>
        </div>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            {[
              { Icon: MapPin, label: 'Address',       value: 'Gulshan-2, Dhaka 1212, Bangladesh' },
              { Icon: Phone,  label: 'Phone',         value: '+880 1700-000000' },
              { Icon: Mail,   label: 'Email',         value: 'hello@d-shastho.com' },
              { Icon: Clock,  label: 'Support Hours', value: 'Sat–Thu, 9 AM – 6 PM BST' },
            ].map(({ Icon, label, value }) => (
              <div key={label} className={styles.contactItem}>
                <span className={styles.contactIcon}><Icon size={18} color="rgba(255,255,255,0.7)" /></span>
                <div>
                  <div className={styles.contactLabel}>{label}</div>
                  <div className={styles.contactValue}>{value}</div>
                </div>
              </div>
            ))}
          </div>
          <form className={styles.contactForm} onSubmit={e => e.preventDefault()}>
            <div className={styles.formRow}>
              <input className={styles.contactInput} placeholder="Your Name" />
              <input className={styles.contactInput} placeholder="Phone / Email" />
            </div>
            <select className={styles.contactInput}>
              <option>General Inquiry</option>
              <option>Partnership / B2B</option>
              <option>Doctor Onboarding</option>
              <option>Technical Support</option>
            </select>
            <textarea className={styles.contactTextarea} placeholder="Your message..." rows={4} />
            <button type="submit" className={styles.contactSubmit}>
              <Send size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className={styles.ctaBanner}>
        <h2>{t('cta_heading')}</h2>
        <p>{t('cta_sub')}</p>
        <button className={styles.ctaPrimary} onClick={() => router.push('/onboarding')}>
          {t('cta_btn')} <ChevronRight size={16} style={{ verticalAlign: 'middle' }} />
        </button>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <Activity size={18} /> D-Shastho
        </div>
        <p className={styles.footerText}>{t('footer_copy')}</p>
      </footer>
    </div>
  )
}
