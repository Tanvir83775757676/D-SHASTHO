import { useLang } from '../../i18n/LanguageContext'
import s from './ReportsPanel.module.css'

export default function ReportsPanel() {
  const { t } = useLang()

  const STATS = [
    { icon:'📊', label:t('rp_hba1c'),         value:'6.8%',  change:'↓ 0.4%',         good:true },
    { icon:'💧', label:t('rp_avg_glucose'),    value:'131',   unit:'mg/dL', change:'↓ 5', good:true },
    { icon:'📅', label:t('rp_readings'),       value:'24',    change:t('rp_regular'),   good:true },
    { icon:'⚖️', label:t('rp_weight_change'), value:'-2.1',  unit:'kg', change:t('rp_good'), good:true },
  ]

  const REPORTS = [
    { icon:'📋', title:t('rp_r1'), date:'April 2026',  type:'PDF', size:'1.2 MB', color:'#0A6E6E' },
    { icon:'🩺', title:t('rp_r2'), date:'Q1 2026',     type:'PDF', size:'856 KB', color:'#1A8A5A' },
    { icon:'💊', title:t('rp_r3'), date:'May 2026',    type:'PDF', size:'432 KB', color:'#F0A500' },
    { icon:'🍛', title:t('rp_r4'), date:'April 2026',  type:'PDF', size:'984 KB', color:'#E8553E' },
    { icon:'🏃', title:t('rp_r5'), date:'April 2026',  type:'PDF', size:'672 KB', color:'#0D8A8A' },
    { icon:'👨‍⚕️', title:t('rp_r6'), date:'5 May 2026', type:'PDF', size:'236 KB', color:'#5A70C0' },
  ]

  return (
    <div className={s.panel}>
      <div className={s.statsRow}>
        {STATS.map(st => (
          <div key={st.label} className={s.statCard}>
            <div className={s.statTop}>
              <span className={s.statIcon}>{st.icon}</span>
              <span className={`${s.badge} ${st.good?s.badgeGood:s.badgeWarn}`}>{st.change}</span>
            </div>
            <div className={s.statVal}>{st.value}<span className={s.statUnit}>{st.unit}</span></div>
            <div className={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>

      <div className={s.actionRow}>
        <button className={s.btnPrimary}>{t('rp_btn_new')}</button>
        <button className={s.btnSecondary}>{t('rp_btn_share')}</button>
        <button className={s.btnSecondary}>{t('rp_btn_print')}</button>
      </div>

      <div className={s.card}>
        <div className={s.cardHead}>
          <span className={s.cardTitle}>{t('rp_list_title')}</span>
          <span className={s.cardSub}>{t('rp_list_sub')}</span>
        </div>
        <div className={s.reportList}>
          {REPORTS.map(r => (
            <div key={r.title} className={s.reportItem}>
              <div className={s.reportIcon} style={{background:r.color+'20',color:r.color}}>{r.icon}</div>
              <div className={s.reportInfo}>
                <div className={s.reportTitle}>{r.title}</div>
                <div className={s.reportMeta}>{r.date} · {r.type} · {r.size}</div>
              </div>
              <button className={s.downloadBtn}>{t('rp_download')}</button>
              <button className={s.shareBtn}>{t('rp_share')}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
