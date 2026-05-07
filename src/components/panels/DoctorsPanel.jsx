import { useState } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import s from './DoctorsPanel.module.css'

export default function DoctorsPanel() {
  const { t } = useLang()
  const [permissions, setPermissions] = useState({ glucose:true, hba1c:true, weight:false, meds:true, diet:false })
  const toggle = k => setPermissions(p => ({...p, [k]:!p[k]}))

  const DOCTORS = [
    { nameKey:'doc_d1_name', roleKey:'doc_d1_role', hospitalKey:'doc_d1_hospital', rating:'4.9', reviews:'234', status:'online', initial:'S', color:'#0A6E6E',
      shared:['doc_shared_glucose','doc_shared_hba1c','doc_shared_meds'], nextKey:'doc_d1_next' },
    { nameKey:'doc_d2_name', roleKey:'doc_d2_role', hospitalKey:'doc_d2_hospital', rating:'4.7', reviews:'156', status:'busy', initial:'K', color:'#1A8A5A',
      shared:['doc_shared_diet','doc_shared_weight'], nextKey:'doc_d2_next' },
    { nameKey:'doc_d3_name', roleKey:'doc_d3_role', hospitalKey:'doc_d3_hospital', rating:'4.8', reviews:'89',  status:'offline', initial:'N', color:'#5A70C0',
      shared:['doc_shared_retina'], nextKey:'doc_d3_next' },
  ]

  const APPOINTMENTS = [
    { doctorKey:'doc_d1_name', typeKey:'doc_a1_type', timeKey:'doc_a1_time', status:'confirm', color:'#0A6E6E' },
    { doctorKey:'doc_d2_name', typeKey:'doc_a2_type', timeKey:'doc_a2_time', status:'pending', color:'#1A8A5A' },
    { doctorKey:'doc_d3_name', typeKey:'doc_a3_type', timeKey:'doc_a3_time', status:'pending', color:'#5A70C0' },
  ]

  const statusLabel = s => s === 'online' ? t('doc_online') : s === 'busy' ? t('doc_busy') : t('doc_offline')

  return (
    <div className={s.panel}>
      <div className={s.sectionTitle}>{t('doc_team_title')}</div>
      <div className={s.docGrid}>
        {DOCTORS.map(d => (
          <div key={d.nameKey} className={s.docCard}>
            <div className={s.docTop}>
              <div className={s.docAvatar} style={{background:d.color}}>{d.initial}</div>
              <div className={s.docInfo}>
                <div className={s.docName}>{t(d.nameKey)}</div>
                <div className={s.docRole}>{t(d.roleKey)}</div>
                <div className={s.docHospital}>🏥 {t(d.hospitalKey)}</div>
              </div>
              <div className={`${s.statusDot} ${s['status_'+d.status]}`} />
            </div>
            <div className={s.docStats}><span>⭐ {d.rating}</span><span>({d.reviews})</span></div>
            <div className={s.sharedLabel}>{t('doc_shared')}</div>
            <div className={s.sharedTags}>{d.shared.map(k => <span key={k} className={s.sharedTag}>{t(k)}</span>)}</div>
            <div className={s.nextAppt}>{t('doc_next')} {t(d.nextKey)}</div>
            <div className={s.docActions}>
              <button className={s.btnCall}>{t('doc_call')}</button>
              <button className={s.btnMsg}>{t('doc_msg')}</button>
            </div>
          </div>
        ))}
      </div>

      <div className={s.card}>
        <div className={s.cardHead}><span className={s.cardTitle}>{t('doc_perm_title')}</span></div>
        <p className={s.permDesc}>{t('doc_perm_desc')}</p>
        <div className={s.permList}>
          {[['glucose','💧','doc_perm_glucose'],['hba1c','📊','doc_perm_hba1c'],['weight','⚖️','doc_perm_weight'],['meds','💊','doc_perm_meds'],['diet','🍛','doc_perm_diet']].map(([k,ic,lk]) => (
            <div key={k} className={s.permItem}>
              <span className={s.permIcon}>{ic}</span>
              <span className={s.permLabel}>{t(lk)}</span>
              <button className={`${s.toggle} ${permissions[k]?s.toggleOn:''}`} onClick={() => toggle(k)}>
                <span className={s.toggleThumb} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={s.card}>
        <div className={s.cardHead}><span className={s.cardTitle}>{t('doc_appt_title')}</span><button className={s.addBtn}>{t('doc_appt_add')}</button></div>
        <div className={s.apptList}>
          {APPOINTMENTS.map(a => (
            <div key={a.doctorKey+a.timeKey} className={s.apptItem}>
              <div className={s.apptLine} style={{background:a.color}} />
              <div className={s.apptInfo}>
                <div className={s.apptDoctor}>{t(a.doctorKey)}</div>
                <div className={s.apptType}>{t(a.typeKey)} · {t(a.timeKey)}</div>
              </div>
              <span className={`${s.apptStatus} ${s['apptStatus_'+a.status]}`}>
                {a.status === 'confirm' ? t('doc_appt_confirmed') : t('doc_appt_pending')}
              </span>
              {a.status === 'confirm' && <button className={s.joinBtn}>{t('doc_join')}</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
