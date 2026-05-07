import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import LangSwitcher from '../components/LangSwitcher'
import s from './Onboarding.module.css'

export default function Onboarding() {
  const nav = useNavigate()
  const { t } = useLang()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name:'', age:'', gender:'', phone:'',
    diabetesType:'', diagnosedYear:'', fasting:'', hba1c:'',
    medications:[], conditions:[], goals:[],
  })

  const STEPS = [
    { id:1, title:t('ob_step1_title'), sub:t('ob_step1_sub'), icon:'👤' },
    { id:2, title:t('ob_step2_title'), sub:t('ob_step2_sub'), icon:'🩺' },
    { id:3, title:t('ob_step3_title'), sub:t('ob_step3_sub'), icon:'📋' },
    { id:4, title:t('ob_step4_title'), sub:t('ob_step4_sub'), icon:'🎯' },
  ]

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const toggleArr = (k, v) => setForm(p => ({
    ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v]
  }))
  const next = () => step < 4 ? setStep(s => s + 1) : nav('/dashboard')
  const back = () => step > 1 ? setStep(s => s - 1) : nav('/')

  return (
    <div className={s.layout}>
      <aside className={s.sidebar}>
        <div className={s.sidebarLogo}>
          <div className={s.sidebarLogoIcon}>🩺</div>
          <div className={s.sidebarLogoText}>D-Shastho</div>
        </div>
        <div className={s.steps}>
          {STEPS.map(st => (
            <div key={st.id} className={`${s.step} ${step===st.id?s.stepActive:step>st.id?s.stepDone:s.stepLocked}`}>
              <div className={s.stepNum}>{step > st.id ? '✓' : st.id}</div>
              <div>
                <div className={s.stepTitle}>{st.title}</div>
                <div className={s.stepSub}>{st.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={s.sidebarNote}>{t('ob_secure')}</div>
        <div style={{marginTop:12,display:'flex',justifyContent:'center'}}>
          <LangSwitcher />
        </div>
      </aside>

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
                <label className={s.label}>{t('ob_name')}</label>
                <input className={s.input} placeholder={t('ob_name_ph')} value={form.name} onChange={e=>set('name',e.target.value)} />
              </div>
              <div>
                <label className={s.label}>{t('ob_age')}</label>
                <input className={s.input} type="number" placeholder={t('ob_age_ph')} value={form.age} onChange={e=>set('age',e.target.value)} />
              </div>
              <div>
                <label className={s.label}>{t('ob_gender')}</label>
                <select className={s.input} value={form.gender} onChange={e=>set('gender',e.target.value)}>
                  <option value="">{t('ob_gender_ph')}</option>
                  <option>{t('ob_gender_male')}</option>
                  <option>{t('ob_gender_female')}</option>
                  <option>{t('ob_gender_other')}</option>
                </select>
              </div>
              <div>
                <label className={s.label}>{t('ob_phone')}</label>
                <input className={s.input} placeholder={t('ob_phone_ph')} value={form.phone} onChange={e=>set('phone',e.target.value)} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={s.formGrid}>
              <div className={s.fieldFull}>
                <label className={s.label}>{t('ob_diabetes_type')}</label>
                <div className={s.chipRow}>
                  {[t('ob_type1'),t('ob_type2'),t('ob_prediabetic'),t('ob_gestational'),t('ob_unknown')].map(tp => (
                    <button key={tp} className={`${s.chip} ${form.diabetesType===tp?s.chipActive:''}`} onClick={()=>set('diabetesType',tp)}>{tp}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className={s.label}>{t('ob_diagnosed')}</label>
                <input className={s.input} placeholder={t('ob_diagnosed_ph')} value={form.diagnosedYear} onChange={e=>set('diagnosedYear',e.target.value)} />
              </div>
              <div>
                <label className={s.label}>{t('ob_fasting')}</label>
                <input className={s.input} type="number" placeholder={t('ob_fasting_ph')} value={form.fasting} onChange={e=>set('fasting',e.target.value)} />
              </div>
              <div>
                <label className={s.label}>{t('ob_hba1c')}</label>
                <input className={s.input} type="number" step="0.1" placeholder={t('ob_hba1c_ph')} value={form.hba1c} onChange={e=>set('hba1c',e.target.value)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={s.formGrid}>
              <div className={s.fieldFull}>
                <label className={s.label}>{t('ob_medications')}</label>
                <div className={s.chipRow}>
                  {['Metformin','Insulin','Glibenclamide','Sitagliptin','Empagliflozin','Other'].map(m => (
                    <button key={m} className={`${s.chip} ${form.medications.includes(m)?s.chipActive:''}`} onClick={()=>toggleArr('medications',m)}>{m}</button>
                  ))}
                </div>
              </div>
              <div className={s.fieldFull}>
                <label className={s.label}>{t('ob_conditions')}</label>
                <div className={s.chipRow}>
                  {[t('ob_cond1'),t('ob_cond2'),t('ob_cond3'),t('ob_cond4'),t('ob_cond5'),t('ob_cond6')].map(c => (
                    <button key={c} className={`${s.chip} ${form.conditions.includes(c)?s.chipActive:''}`} onClick={()=>toggleArr('conditions',c)}>{c}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className={s.formGrid}>
              <div className={s.fieldFull}>
                <label className={s.label}>{t('ob_goals_label')}</label>
                <div className={s.goalGrid}>
                  {[
                    {icon:'📉', key:'ob_goal1'}, {icon:'⚖️', key:'ob_goal2'},
                    {icon:'💪', key:'ob_goal3'}, {icon:'🍛', key:'ob_goal4'},
                    {icon:'💊', key:'ob_goal5'}, {icon:'🩺', key:'ob_goal6'},
                  ].map(g => {
                    const label = t(g.key)
                    return (
                      <button key={g.key} className={`${s.goalCard} ${form.goals.includes(g.key)?s.goalActive:''}`} onClick={()=>toggleArr('goals',g.key)}>
                        <span className={s.goalIcon}>{g.icon}</span>
                        <span className={s.goalLabel}>{label}</span>
                        {form.goals.includes(g.key) && <span className={s.goalCheck}>✓</span>}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          <div className={s.actions}>
            <button className={s.btnBack} onClick={back}>{t('ob_back')}</button>
            <button className={s.btnNext} onClick={next}>{step === 4 ? t('ob_finish') : t('ob_next')}</button>
          </div>
        </div>
      </main>
    </div>
  )
}
