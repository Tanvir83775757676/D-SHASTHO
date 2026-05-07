import { useState } from 'react'
import s from './LogModal.module.css'

const TABS = [
  { id:'glucose', icon:'💧', label:'গ্লুকোজ' },
  { id:'weight',  icon:'⚖️', label:'ওজন' },
  { id:'bp',      icon:'❤️', label:'রক্তচাপ' },
]

export default function LogModal({ onClose, onSave }) {
  const [tab, setTab] = useState('glucose')
  const [glucose, setGlucose] = useState({ value:'', type:'fasting', note:'' })
  const [weight, setWeight]   = useState({ value:'', note:'' })
  const [bp, setBp]           = useState({ sys:'', dia:'', pulse:'', note:'' })

  return (
    <div className={s.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={s.modal}>
        <div className={s.header}>
          <h3 className={s.title}>📝 স্বাস্থ্য তথ্য লগ করুন</h3>
          <button className={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={s.tabs}>
          {TABS.map(t => (
            <button key={t.id} className={`${s.tab} ${tab === t.id ? s.tabActive : ''}`} onClick={() => setTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div className={s.body}>
          {tab === 'glucose' && (
            <div className={s.form}>
              <div className={s.bigInput}>
                <input
                  type="number"
                  className={s.numInput}
                  placeholder="০"
                  value={glucose.value}
                  onChange={e => setGlucose(p => ({...p, value: e.target.value}))}
                />
                <span className={s.unit}>mg/dL</span>
              </div>
              <div className={s.field}>
                <label className={s.label}>পরিমাপের সময়</label>
                <div className={s.chipRow}>
                  {[['fasting','খালি পেটে'],['post_meal','খাবার পরে'],['bedtime','রাতে ঘুমের আগে'],['random','যেকোনো সময়']].map(([v,l]) => (
                    <button key={v} className={`${s.chip} ${glucose.type === v ? s.chipActive : ''}`} onClick={() => setGlucose(p => ({...p, type:v}))}>{l}</button>
                  ))}
                </div>
              </div>
              <div className={s.field}>
                <label className={s.label}>নোট (ঐচ্ছিক)</label>
                <input className={s.textInput} placeholder="যেমন: খাবার পরে একটু বেশি মনে হচ্ছে..." value={glucose.note} onChange={e => setGlucose(p => ({...p, note:e.target.value}))} />
              </div>
            </div>
          )}

          {tab === 'weight' && (
            <div className={s.form}>
              <div className={s.bigInput}>
                <input type="number" step="0.1" className={s.numInput} placeholder="০.০" value={weight.value} onChange={e => setWeight(p => ({...p, value:e.target.value}))} />
                <span className={s.unit}>kg</span>
              </div>
              <div className={s.field}>
                <label className={s.label}>নোট (ঐচ্ছিক)</label>
                <input className={s.textInput} placeholder="যেমন: সকালে নাস্তার আগে..." value={weight.note} onChange={e => setWeight(p => ({...p, note:e.target.value}))} />
              </div>
            </div>
          )}

          {tab === 'bp' && (
            <div className={s.form}>
              <div className={s.bpRow}>
                <div className={s.bpField}>
                  <label className={s.label}>সিস্টোলিক</label>
                  <input type="number" className={s.numInputSm} placeholder="১২০" value={bp.sys} onChange={e => setBp(p => ({...p, sys:e.target.value}))} />
                  <span className={s.unitSm}>mmHg</span>
                </div>
                <div className={s.bpSep}>/</div>
                <div className={s.bpField}>
                  <label className={s.label}>ডায়াস্টোলিক</label>
                  <input type="number" className={s.numInputSm} placeholder="৮০" value={bp.dia} onChange={e => setBp(p => ({...p, dia:e.target.value}))} />
                  <span className={s.unitSm}>mmHg</span>
                </div>
                <div className={s.bpField}>
                  <label className={s.label}>পালস</label>
                  <input type="number" className={s.numInputSm} placeholder="৭২" value={bp.pulse} onChange={e => setBp(p => ({...p, pulse:e.target.value}))} />
                  <span className={s.unitSm}>bpm</span>
                </div>
              </div>
              <div className={s.field}>
                <label className={s.label}>নোট (ঐচ্ছিক)</label>
                <input className={s.textInput} placeholder="যেমন: বিশ্রামের পরে..." value={bp.note} onChange={e => setBp(p => ({...p, note:e.target.value}))} />
              </div>
            </div>
          )}
        </div>

        <div className={s.footer}>
          <button className={s.cancelBtn} onClick={onClose}>বাতিল</button>
          <button className={s.saveBtn} onClick={onSave}>✓ সংরক্ষণ করুন</button>
        </div>
      </div>
    </div>
  )
}
