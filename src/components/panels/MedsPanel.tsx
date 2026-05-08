'use client'
import { useState } from 'react'
import { Calendar, Pill, TrendingUp, Clock, ClipboardList, AlertTriangle, Check, Lightbulb, X } from 'lucide-react'
import s from '@/components/panels/MedsPanel.module.css'

const INITIAL_MEDS = [
  { id: 1, name: 'Metformin',    dose: '500mg', frequency: 'Twice daily', times: ['8:00 AM', '8:00 PM'], instructions: 'After meals',    category: 'Oral', stock: 18, refillAt: 10, color: '#0A6E6E', active: true },
  { id: 2, name: 'Glibenclamide',dose: '5mg',   frequency: 'Once daily',  times: ['1:00 PM'],            instructions: 'Before lunch',   category: 'Oral', stock: 6,  refillAt: 7,  color: '#F0A500', active: true },
  { id: 3, name: 'Atorvastatin', dose: '10mg',  frequency: 'Once daily',  times: ['9:00 PM'],            instructions: 'At bedtime',     category: 'Oral', stock: 22, refillAt: 7,  color: '#5A70C0', active: true },
  { id: 4, name: 'Aspirin',      dose: '75mg',  frequency: 'Once daily',  times: ['8:00 AM'],            instructions: 'After breakfast',category: 'Oral', stock: 30, refillAt: 7,  color: '#E8553E', active: false },
]

const TODAY_LOG = [
  { medId: 1, time: '8:00 AM',  taken: true  },
  { medId: 2, time: '1:00 PM',  taken: true  },
  { medId: 1, time: '8:00 PM',  taken: false },
  { medId: 3, time: '9:00 PM',  taken: false },
]

const ADHERENCE = [
  { day: 'Mon', pct: 100 }, { day: 'Tue', pct: 100 }, { day: 'Wed', pct: 67 },
  { day: 'Thu', pct: 100 }, { day: 'Fri', pct: 100 }, { day: 'Sat', pct: 33 }, { day: 'Sun', pct: 50 },
]

const TABS = [
  { id: 'today',       Icon: Calendar,   label: "Today's Schedule" },
  { id: 'medications', Icon: Pill,       label: 'All Medications'  },
  { id: 'adherence',   Icon: TrendingUp, label: 'Adherence'        },
]

export default function MedsPanel() {
  const [meds, setMeds] = useState(INITIAL_MEDS)
  const [log, setLog] = useState(TODAY_LOG)
  const [tab, setTab] = useState('today')
  const [showAdd, setShowAdd] = useState(false)
  const [newMed, setNewMed] = useState({ name: '', dose: '', frequency: 'Once daily', time: '', instructions: '' })

  const toggleTaken = (idx) => setLog(prev => prev.map((l, i) => i === idx ? { ...l, taken: !l.taken } : l))
  const toggleActive = (id) => setMeds(prev => prev.map(m => m.id === id ? { ...m, active: !m.active } : m))

  const takenCount = log.filter(l => l.taken).length
  const totalDoses = log.length
  const adherencePct = Math.round((takenCount / totalDoses) * 100)
  const getMedById = (id) => meds.find(m => m.id === id)

  return (
    <div className={s.panel}>
      <div className={s.summaryRow}>
        <div className={s.summaryCard}>
          <div className={s.summaryVal}>{takenCount}/{totalDoses}</div>
          <div className={s.summaryLabel}>Today's Doses</div>
        </div>
        <div className={s.summaryCard}>
          <div className={s.summaryVal} style={{ color: adherencePct >= 80 ? '#1A8A5A' : '#E8553E' }}>{adherencePct}%</div>
          <div className={s.summaryLabel}>Today's Adherence</div>
        </div>
        <div className={s.summaryCard}>
          <div className={s.summaryVal}>{meds.filter(m => m.active && m.stock <= m.refillAt).length}</div>
          <div className={s.summaryLabel}>Refills Needed</div>
        </div>
        <div className={s.summaryCard}>
          <div className={s.summaryVal}>{meds.filter(m => m.active).length}</div>
          <div className={s.summaryLabel}>Active Medications</div>
        </div>
      </div>

      <div className={s.tabs}>
        {TABS.map(({ id, Icon, label }) => (
          <button key={id} className={`${s.tab} ${tab === id ? s.tabActive : ''}`} onClick={() => setTab(id)}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {tab === 'today' && (
        <div className={s.card}>
          <div className={s.cardHead}>
            <span className={s.cardTitle}><Pill size={16} /> Today's Medication Schedule</span>
            <span className={s.cardSub}>{takenCount} of {totalDoses} taken</span>
          </div>
          <div className={s.todayList}>
            {log.map((entry, i) => {
              const med = getMedById(entry.medId)
              if (!med) return null
              return (
                <div key={i} className={`${s.doseItem} ${entry.taken ? s.doseTaken : ''}`}>
                  <button
                    className={s.doseCheck}
                    style={{ borderColor: entry.taken ? med.color : undefined, background: entry.taken ? med.color : undefined }}
                    onClick={() => toggleTaken(i)}
                  >
                    {entry.taken && <Check size={12} color="white" />}
                  </button>
                  <div className={s.doseInfo}>
                    <div className={s.doseName}>{med.name} <span className={s.doseDose}>{med.dose}</span></div>
                    <div className={s.doseInstr}>{med.instructions}</div>
                  </div>
                  <div className={s.doseTime}>{entry.time}</div>
                  {entry.taken && <span className={s.takenBadge}><Check size={11} /> Taken</span>}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {tab === 'medications' && (
        <div>
          <div className={s.medActions}>
            <button className={s.addMedBtn} onClick={() => setShowAdd(true)}>+ Add Medication</button>
          </div>
          <div className={s.medGrid}>
            {meds.map(med => (
              <div key={med.id} className={`${s.medCard} ${!med.active ? s.medInactive : ''}`}>
                <div className={s.medCardTop}>
                  <div className={s.medDot} style={{ background: med.color }} />
                  <div className={s.medCardInfo}>
                    <div className={s.medCardName}>{med.name}</div>
                    <div className={s.medCardDose}>{med.dose} · {med.frequency}</div>
                  </div>
                  <label className={s.switch}>
                    <input type="checkbox" checked={med.active} onChange={() => toggleActive(med.id)} />
                    <span className={s.slider} />
                  </label>
                </div>
                <div className={s.medCardTimes}><Clock size={13} /> {med.times.join(', ')}</div>
                <div className={s.medCardInstr}><ClipboardList size={13} /> {med.instructions}</div>
                <div className={s.stockRow}>
                  <span className={s.stockLabel}>Stock:</span>
                  <span className={`${s.stockVal} ${med.stock <= med.refillAt ? s.stockLow : ''}`}>
                    {med.stock} pills
                    {med.stock <= med.refillAt && <><AlertTriangle size={12} /> Refill soon</>}
                  </span>
                </div>
                <div className={s.stockTrack}>
                  <div className={s.stockFill} style={{ width: `${Math.min((med.stock / 30) * 100, 100)}%`, background: med.stock <= med.refillAt ? '#E8553E' : med.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'adherence' && (
        <div className={s.card}>
          <div className={s.cardHead}>
            <span className={s.cardTitle}><TrendingUp size={16} /> 7-Day Adherence</span>
            <span className={s.cardSub}>Weekly average: {Math.round(ADHERENCE.reduce((a, d) => a + d.pct, 0) / 7)}%</span>
          </div>
          <div className={s.adherenceChart}>
            {ADHERENCE.map(d => (
              <div key={d.day} className={s.adherenceCol}>
                <div className={s.adherencePctLabel} style={{ color: d.pct >= 80 ? '#1A8A5A' : d.pct >= 50 ? '#F0A500' : '#E8553E' }}>{d.pct}%</div>
                <div className={s.adherenceBarWrap}>
                  <div className={s.adherenceBar} style={{ height: `${d.pct}%`, background: d.pct >= 80 ? '#1A8A5A' : d.pct >= 50 ? '#F0A500' : '#E8553E' }} />
                </div>
                <div className={s.adherenceDay}>{d.day}</div>
              </div>
            ))}
          </div>
          <div className={s.adherenceTip}>
            <Lightbulb size={15} /> <strong>Tip:</strong> Set your phone reminders at the exact scheduled times to improve adherence.
          </div>
        </div>
      )}

      {showAdd && (
        <div className={s.overlay}>
          <div className={s.modal}>
            <div className={s.modalHeader}>
              <div className={s.modalTitle}>Add New Medication</div>
              <button className={s.modalClose} onClick={() => setShowAdd(false)}><X size={16} /></button>
            </div>
            <div className={s.formGrid}>
              <div className={s.field}>
                <label className={s.label}>Medication Name</label>
                <input className={s.input} placeholder="e.g. Metformin" value={newMed.name} onChange={e => setNewMed(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div className={s.field}>
                <label className={s.label}>Dose</label>
                <input className={s.input} placeholder="e.g. 500mg" value={newMed.dose} onChange={e => setNewMed(p => ({ ...p, dose: e.target.value }))} />
              </div>
              <div className={s.field}>
                <label className={s.label}>Frequency</label>
                <select className={s.input} value={newMed.frequency} onChange={e => setNewMed(p => ({ ...p, frequency: e.target.value }))}>
                  <option>Once daily</option><option>Twice daily</option><option>Three times daily</option><option>With meals</option><option>As needed</option>
                </select>
              </div>
              <div className={s.field}>
                <label className={s.label}>Time</label>
                <input type="time" className={s.input} value={newMed.time} onChange={e => setNewMed(p => ({ ...p, time: e.target.value }))} />
              </div>
              <div className={s.fieldFull}>
                <label className={s.label}>Instructions</label>
                <input className={s.input} placeholder="e.g. After meals, with water" value={newMed.instructions} onChange={e => setNewMed(p => ({ ...p, instructions: e.target.value }))} />
              </div>
            </div>
            <div className={s.modalActions}>
              <button className={s.btnCancel} onClick={() => setShowAdd(false)}>Cancel</button>
              <button className={s.btnConfirm} onClick={() => {
                if (newMed.name && newMed.dose) {
                  setMeds(prev => [...prev, { id: Date.now(), ...newMed, times: [newMed.time || '8:00 AM'], category: 'Oral', stock: 30, refillAt: 7, color: '#0A6E6E', active: true }])
                  setShowAdd(false)
                  setNewMed({ name: '', dose: '', frequency: 'Once daily', time: '', instructions: '' })
                }
              }}>Add Medication</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
