import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Landing.module.css'

export default function Landing() {
  const nav = useNavigate()
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
      {/* Navbar */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <div className={styles.navLogoIcon}>🩺</div>
          <span className={styles.navLogoText}>D-Shastho</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#features">বৈশিষ্ট্য</a>
          <a href="#about">আমাদের সম্পর্কে</a>
          <a href="#contact">যোগাযোগ</a>
        </div>
        <div className={styles.navActions}>
          <button className={styles.navLogin} onClick={() => nav('/dashboard')}>লগইন</button>
          <button className={styles.navCta} onClick={() => nav('/onboarding')}>বিনামূল্যে শুরু করুন</button>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroBadge}>🇧🇩 বাংলাদেশের জন্য তৈরি</div>
          <h1 className={styles.heroTitle}>
            আপনার ডায়াবেটিস<br />
            <span className={styles.heroTitleAccent}>বুদ্ধিমত্তার সাথে</span><br />
            নিয়ন্ত্রণ করুন
          </h1>
          <p className={styles.heroSub}>
            AI-চালিত বিশ্লেষণ, বাংলায় ডাক্তার পরামর্শ এবং ব্যক্তিগতকৃত স্বাস্থ্য পরিকল্পনা — সব এক জায়গায়।
          </p>
          <div className={styles.heroStats}>
            {[['৫০,০০০+','সক্রিয় রোগী'],['২০০+','বিশেষজ্ঞ ডাক্তার'],['৪০+','ল্যাব নেটওয়ার্ক'],['৯৮%','ব্যবহারকারী সন্তুষ্টি']].map(([n,l]) => (
              <div key={l} className={styles.hstat}>
                <div className={styles.hstatNum}>{n}</div>
                <div className={styles.hstatLabel}>{l}</div>
              </div>
            ))}
          </div>
          <div className={styles.heroCtas}>
            <button className={styles.ctaPrimary} onClick={() => nav('/onboarding')}>
              বিনামূল্যে শুরু করুন →
            </button>
            <button className={styles.ctaSecondary} onClick={() => nav('/dashboard')}>
              ডেমো দেখুন
            </button>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={`${styles.heroCard} animate-float`}>
            <div className={styles.hcardHeader}>
              <span className={styles.hcardTitle}>📊 আজকের রক্তে শর্করা</span>
              <span className={styles.hcardDate}>৫ মে, ২০২৬</span>
            </div>
            <div className={styles.hcardGlucose}>
              <div className={styles.hcardNum}>১১২</div>
              <div className={styles.hcardUnit}>mg/dL — খালি পেটে</div>
              <span className={styles.hcardStatus}>✓ স্বাভাবিক মাত্রা</span>
            </div>
            <div className={styles.sparkline} ref={sparkRef} />
            <div className={styles.hcardMetrics}>
              {[['HbA1c','৬.৮','%'],['ওজন','৭২','kg'],['পদক্ষেপ','৬.২','k'],['পরবর্তী ওষুধ','৮:০০','PM']].map(([l,v,u]) => (
                <div key={l} className={styles.hcardMetric}>
                  <div className={styles.hmLabel}>{l}</div>
                  <div className={styles.hmValue}>{v}<span className={styles.hmUnit}>{u}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className={styles.features}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>কেন D-Shastho?</h2>
          <p className={styles.sectionSub}>বাংলাদেশের প্রথম সম্পূর্ণ ডায়াবেটিস ব্যবস্থাপনা সমাধান</p>
        </div>
        <div className={styles.featGrid}>
          {[
            { icon:'🤖', title:'AI-চালিত বিশ্লেষণ', desc:'আপনার গ্লুকোজ প্যাটার্ন বিশ্লেষণ করে ব্যক্তিগতকৃত পরামর্শ দেয়।' },
            { icon:'👨‍⚕️', title:'বিশেষজ্ঞ ডাক্তার', desc:'২০০+ এন্ডোক্রিনোলজিস্ট ও পুষ্টিবিদের সাথে অনলাইন পরামর্শ।' },
            { icon:'📊', title:'রিয়েল-টাইম মনিটরিং', desc:'CGM ডিভাইস ও ম্যানুয়াল লগিং — সব একত্রে ট্র্যাক করুন।' },
            { icon:'🍛', title:'বাংলা খাদ্য গাইড', desc:'স্থানীয় খাবারের GI সূচক, পুষ্টি তথ্য ও ডায়েট পরিকল্পনা।' },
            { icon:'💊', title:'ওষুধ রিমাইন্ডার', desc:'সময়মতো ওষুধ খাওয়ার স্মার্ট রিমাইন্ডার সিস্টেম।' },
            { icon:'📋', title:'স্বাস্থ্য রিপোর্ট', desc:'ডাক্তারের সাথে শেয়ারযোগ্য বিস্তারিত স্বাস্থ্য রিপোর্ট।' },
          ].map(f => (
            <div key={f.title} className={styles.featCard}>
              <div className={styles.featIcon}>{f.icon}</div>
              <h3 className={styles.featTitle}>{f.title}</h3>
              <p className={styles.featDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <h2>আজই শুরু করুন — সম্পূর্ণ বিনামূল্যে</h2>
        <p>১৪ দিনের বিনামূল্যে ট্রায়াল · কোনো ক্রেডিট কার্ড প্রয়োজন নেই</p>
        <button className={styles.ctaPrimary} onClick={() => nav('/onboarding')}>
          বিনামূল্যে অ্যাকাউন্ট খুলুন →
        </button>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <span>🩺</span> D-Shastho
        </div>
        <p className={styles.footerText}>© ২০২৬ D-Shastho · বাংলাদেশ · সর্বস্বত্ব সংরক্ষিত</p>
      </footer>
    </div>
  )
}
