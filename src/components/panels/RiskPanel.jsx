import { useLang } from '../../i18n/LanguageContext'
import s from './RiskPanel.module.css'

export default function RiskPanel() {
  const { t } = useLang()

  const LIFESTYLE = [
    { icon:'🏃', titleKey:'risk_l1_title', descKey:'risk_l1_desc', progress:68, color:'#0A6E6E' },
    { icon:'🍛', titleKey:'risk_l2_title', descKey:'risk_l2_desc', progress:75, color:'#1A8A5A' },
    { icon:'😴', titleKey:'risk_l3_title', descKey:'risk_l3_desc', progress:50, color:'#F0A500' },
    { icon:'🧘', titleKey:'risk_l4_title', descKey:'risk_l4_desc', progress:40, color:'#E8553E' },
    { icon:'💊', titleKey:'risk_l5_title', descKey:'risk_l5_desc', progress:87, color:'#0D8A8A' },
    { icon:'🩺', titleKey:'risk_l6_title', descKey:'risk_l6_desc', progress:60, color:'#5A70C0' },
  ]

  return (
    <div className={s.panel}>
      <div className={s.riskHero}>
        <div className={s.riskLeft}>
          <div className={s.riskBadge}>{t('risk_badge')}</div>
          <h2 className={s.riskScore}>38<span className={s.riskMax}>/100</span></h2>
          <div className={s.riskLabel}>{t('risk_label')}</div>
          <p className={s.riskDesc}>{t('risk_desc')}</p>
          <div className={s.riskTrend}>
            <span className={s.riskTrendVal}>{t('risk_trend_val')}</span>
            <span className={s.riskTrendLabel}>{t('risk_trend_label')}</span>
          </div>
        </div>
        <div className={s.riskRight}>
          <svg viewBox="0 0 180 100" className={s.riskGauge}>
            <path d="M 20 90 A 70 70 0 0 1 160 90" fill="none" stroke="#f0f6f6" strokeWidth="14" strokeLinecap="round" />
            <path d="M 20 90 A 70 70 0 0 1 160 90" fill="none" stroke="#0A6E6E" strokeWidth="14" strokeLinecap="round"
              strokeDasharray="220" strokeDashoffset={220-(220*0.38)} />
            <text x="90" y="70" textAnchor="middle" fontFamily="Fraunces,serif" fontSize="28" fontWeight="600" fill="#0E1C1C">38</text>
            <text x="90" y="85" textAnchor="middle" fontSize="10" fill="#5A7070">{t('risk_label')}</text>
          </svg>
          <div className={s.riskLegend}>
            <span className={s.dot} style={{background:'#1A8A5A'}} /> {t('risk_low')}
            <span className={s.dot} style={{background:'#F0A500'}} /> {t('risk_moderate')}
            <span className={s.dot} style={{background:'#E8553E'}} /> {t('risk_high')}
          </div>
        </div>
      </div>

      <div className={s.sectionTitle}>{t('risk_section')}</div>
      <div className={s.cardGrid}>
        {LIFESTYLE.map(l => (
          <div key={l.titleKey} className={s.lifestyleCard}>
            <div className={s.lcTop}>
              <span className={s.lcIcon}>{l.icon}</span>
              <div className={s.lcInfo}>
                <div className={s.lcTitle}>{t(l.titleKey)}</div>
                <div className={s.lcDesc}>{t(l.descKey)}</div>
              </div>
              <span className={s.lcPct} style={{color:l.color}}>{l.progress}%</span>
            </div>
            <div className={s.progressTrack}>
              <div className={s.progressFill} style={{width:`${l.progress}%`,background:l.color}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
