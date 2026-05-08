'use client'
import { useState } from 'react'
import { Droplets, Scale, Heart, X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import s from '@/components/LogModal.module.css'

export default function LogModal({ onClose, onSave }) {
  const { t } = useLang()
  const [tab, setTab] = useState('glucose')
  const [glucose, setGlucose] = useState({ value:'', type:'fasting', note:'' })
  const [weight, setWeight]   = useState({ value:'', note:'' })
  const [bp, setBp]           = useState({ sys:'', dia:'', pulse:'', note:'' })

  const TABS = [
    { id:'glucose', Icon:Droplets, label:t('log_glucose') },
    { id:'weight',  Icon:Scale,    label:t('log_weight') },
    { id:'bp',      Icon:Heart,    label:t('log_bp') },
  ]

  return (
    <div className={s.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={s.modal}>
        <div className={s.header}>
          <h3 className={s.title}>{t('log_title')}</h3>
          <button className={s.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>
        <div className={s.tabs}>
          {TABS.map(tb => {
            const TabIcon = tb.Icon
            return (
              <button key={tb.id} className={`${s.tab} ${tab===tb.id?s.tabActive:''}`} onClick={() => setTab(tb.id)}>
                <TabIcon size={15} /> {tb.label}
              </button>
            )
          })}
        </div>
        <div className={s.body}>
          {tab === 'glucose' && (
            <div className={s.form}>
              <div className={s.bigInput}>
                <input type="number" className={s.numInput} placeholder="0" value={glucose.value} onChange={e=>setGlucose(p=>({...p,value:e.target.value}))} />
                <span className={s.unit}>mg/dL</span>
              </div>
              <div className={s.field}>
                <label className={s.label}>{t('log_measure_time')}</label>
                <div className={s.chipRow}>
                  {[['fasting',t('log_fasting')],['post_meal',t('log_post_meal')],['bedtime',t('log_bedtime')],['random',t('log_random')]].map(([v,l]) => (
                    <button key={v} className={`${s.chip} ${glucose.type===v?s.chipActive:''}`} onClick={()=>setGlucose(p=>({...p,type:v}))}>{l}</button>
                  ))}
                </div>
              </div>
              <div className={s.field}>
                <label className={s.label}>{t('log_note')}</label>
                <input className={s.textInput} placeholder={t('log_note_ph')} value={glucose.note} onChange={e=>setGlucose(p=>({...p,note:e.target.value}))} />
              </div>
            </div>
          )}
          {tab === 'weight' && (
            <div className={s.form}>
              <div className={s.bigInput}>
                <input type="number" step="0.1" className={s.numInput} placeholder="0.0" value={weight.value} onChange={e=>setWeight(p=>({...p,value:e.target.value}))} />
                <span className={s.unit}>kg</span>
              </div>
              <div className={s.field}>
                <label className={s.label}>{t('log_note')}</label>
                <input className={s.textInput} placeholder={t('log_weight_note_ph')} value={weight.note} onChange={e=>setWeight(p=>({...p,note:e.target.value}))} />
              </div>
            </div>
          )}
          {tab === 'bp' && (
            <div className={s.form}>
              <div className={s.bpRow}>
                <div className={s.bpField}>
                  <label className={s.label}>{t('log_systolic')}</label>
                  <input type="number" className={s.numInputSm} placeholder="120" value={bp.sys} onChange={e=>setBp(p=>({...p,sys:e.target.value}))} />
                  <span className={s.unitSm}>mmHg</span>
                </div>
                <div className={s.bpSep}>/</div>
                <div className={s.bpField}>
                  <label className={s.label}>{t('log_diastolic')}</label>
                  <input type="number" className={s.numInputSm} placeholder="80" value={bp.dia} onChange={e=>setBp(p=>({...p,dia:e.target.value}))} />
                  <span className={s.unitSm}>mmHg</span>
                </div>
                <div className={s.bpField}>
                  <label className={s.label}>{t('log_pulse')}</label>
                  <input type="number" className={s.numInputSm} placeholder="72" value={bp.pulse} onChange={e=>setBp(p=>({...p,pulse:e.target.value}))} />
                  <span className={s.unitSm}>bpm</span>
                </div>
              </div>
              <div className={s.field}>
                <label className={s.label}>{t('log_note')}</label>
                <input className={s.textInput} placeholder={t('log_bp_note_ph')} value={bp.note} onChange={e=>setBp(p=>({...p,note:e.target.value}))} />
              </div>
            </div>
          )}
        </div>
        <div className={s.footer}>
          <button className={s.cancelBtn} onClick={onClose}>{t('log_cancel')}</button>
          <button className={s.saveBtn} onClick={onSave}>{t('log_save')}</button>
        </div>
      </div>
    </div>
  )
}
