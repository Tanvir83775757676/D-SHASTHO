import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './Onboarding.module.css'

const STEPS = [
  { id:1, title:'ব্যক্তিগত তথ্য', sub:'আপনার পরিচয় দিন', icon:'👤' },
  { id:2, title:'স্বাস্থ্যের অবস্থা', sub:'আপনার ডায়াবেটিস সম্পর্কে', icon:'🩺' },
  { id:3, title:'চিকিৎসা ইতিহাস', sub:'আপনার চিকিৎসা ইতিহাস', icon:'📋' },
  { id:4, title:'লক্ষ্য নির্ধারণ', sub:'আপনার স্বাস্থ্য লক্ষ্য', icon:'🎯' },
]

export default function Onboarding() {
  const nav = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name:'', age:'', gender:'', phone:'',
    diabetesType:'', diagnosedYear:'', fasting:'', hba1c:'',
    medications:[], conditions:[],
    goals:[],
  })

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const toggleArr = (k, v) => setForm(p => ({
    ...p,
    [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v]
  }))

  const next = () => step < 4 ? setStep(s => s + 1) : nav('/dashboard')
  const back = () => step > 1 ? setStep(s => s - 1) : nav('/')

  return (
    <div className={s.layout}>
      {/* Sidebar */}
      <aside className={s.sidebar}>
        <div className={s.sidebarLogo}>
          <div className={s.sidebarLogoIcon}>🩺</div>
          <div className={s.sidebarLogoText}>D-Shastho</div>
        </div>
        <div className={s.steps}>
          {STEPS.map(st => (
            <div key={st.id} className={`${s.step} ${step === st.id ? s.stepActive : step > st.id ? s.stepDone : s.stepLocked}`}>
              <div className={s.stepNum}>{step > st.id ? '✓' : st.id}</div>
              <div>
                <div className={s.stepTitle}>{st.title}</div>
                <div className={s.stepSub}>{st.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={s.sidebarNote}>
          আপনার তথ্য সম্পূর্ণ নিরাপদ ও সুরক্ষিত 🔒
        </div>
      </aside>

      {/* Main */}
      <main className={s.main}>
        <div className={s.progress}>
          <div className={s.progressBar} style={{ width: `${(step / 4) * 100}%` }} />
        </div>

        <div className={s.formWrap}>
          <div className={s.stepHeader}>
            <span className={s.stepIcon}>{STEPS[step-1].icon}</span>
            <div>
              <h2 className={s.stepHeading}>{STEPS[step-1].title}</h2>
              <p className={s.stepHeadSub}>{STEPS[step-1].sub}</p>
            </div>
          </div>

          {step === 1 && (
            <div className={s.formGrid}>
              <div className={s.fieldFull}>
                <label className={s.label}>পুরো নাম *</label>
                <input className={s.input} placeholder="আপনার নাম লিখুন" value={form.name} onChange={e => set('name', e.target.value)} />
              </div>
              <div>
                <label className={s.label}>বয়স *</label>
                <input className={s.input} type="number" placeholder="বছর" value={form.age} onChange={e => set('age', e.target.value)} />
              </div>
              <div>
                <label className={s.label}>লিঙ্গ</label>
                <select className={s.input} value={form.gender} onChange={e => set('gender', e.target.value)}>
                  <option value="">নির্বাচন করুন</option>
                  <option>পুরুষ</option>
                  <option>মহিলা</option>
                  <option>অন্যান্য</option>
                </select>
              </div>
              <div>
                <label className={s.label}>মোবাইল নম্বর</label>
                <input className={s.input} placeholder="০১৭XXXXXXXX" value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={s.formGrid}>
              <div className={s.fieldFull}>
                <label className={s.label}>ডায়াবেটিসের ধরন</label>
                <div className={s.chipRow}>
                  {['টাইপ ১','টাইপ ২','প্রি-ডায়াবেটিক','গেস্টেশনাল','জানি না'].map(t => (
                    <button key={t} className={`${s.chip} ${form.diabetesType === t ? s.chipActive : ''}`} onClick={() => set('diabetesType', t)}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className={s.label}>রোগ নির্ণয়ের বছর</label>
                <input className={s.input} placeholder="যেমন: ২০২০" value={form.diagnosedYear} onChange={e => set('diagnosedYear', e.target.value)} />
              </div>
              <div>
                <label className={s.label}>সর্বশেষ ফাস্টিং গ্লুকোজ (mg/dL)</label>
                <input className={s.input} type="number" placeholder="যেমন: ১২৬" value={form.fasting} onChange={e => set('fasting', e.target.value)} />
              </div>
              <div>
                <label className={s.label}>সর্বশেষ HbA1c (%)</label>
                <input className={s.input} type="number" step="0.1" placeholder="যেমন: ৭.২" value={form.hba1c} onChange={e => set('hba1c', e.target.value)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={s.formGrid}>
              <div className={s.fieldFull}>
                <label className={s.label}>বর্তমান ওষুধসমূহ (যেগুলো প্রযোজ্য বেছে নিন)</label>
                <div className={s.chipRow}>
                  {['মেটফর্মিন','ইনসুলিন','গ্লিবেনক্লামাইড','সিটাগ্লিপটিন','এম্পাগ্লিফ্লোজিন','অন্যান্য'].map(m => (
                    <button key={m} className={`${s.chip} ${form.medications.includes(m) ? s.chipActive : ''}`} onClick={() => toggleArr('medications', m)}>{m}</button>
                  ))}
                </div>
              </div>
              <div className={s.fieldFull}>
                <label className={s.label}>সহাবস্থানকারী রোগ</label>
                <div className={s.chipRow}>
                  {['উচ্চ রক্তচাপ','হৃদরোগ','কিডনি সমস্যা','চোখের সমস্যা','নার্ভ ক্ষতি','কোনোটি নয়'].map(c => (
                    <button key={c} className={`${s.chip} ${form.conditions.includes(c) ? s.chipActive : ''}`} onClick={() => toggleArr('conditions', c)}>{c}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className={s.formGrid}>
              <div className={s.fieldFull}>
                <label className={s.label}>আপনার স্বাস্থ্য লক্ষ্য কী? (একাধিক বেছে নিতে পারেন)</label>
                <div className={s.goalGrid}>
                  {[
                    { icon:'📉', label:'রক্তে শর্করা নিয়ন্ত্রণ' },
                    { icon:'⚖️', label:'ওজন কমানো' },
                    { icon:'💪', label:'শারীরিক সক্রিয়তা বাড়ানো' },
                    { icon:'🍛', label:'স্বাস্থ্যকর খাদ্যাভ্যাস' },
                    { icon:'💊', label:'ওষুধ সময়মতো খাওয়া' },
                    { icon:'🩺', label:'নিয়মিত ডাক্তার পরামর্শ' },
                  ].map(g => (
                    <button key={g.label} className={`${s.goalCard} ${form.goals.includes(g.label) ? s.goalActive : ''}`} onClick={() => toggleArr('goals', g.label)}>
                      <span className={s.goalIcon}>{g.icon}</span>
                      <span className={s.goalLabel}>{g.label}</span>
                      {form.goals.includes(g.label) && <span className={s.goalCheck}>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className={s.actions}>
            <button className={s.btnBack} onClick={back}>← পেছনে</button>
            <button className={s.btnNext} onClick={next}>
              {step === 4 ? '🚀 ড্যাশবোর্ডে যান' : 'পরবর্তী →'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
