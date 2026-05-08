'use client'
import { useState } from 'react'
import { Droplets, Utensils, TrendingUp, Scale, Flame, Timer, Target, AlertTriangle, X, Clock, Check } from 'lucide-react'
import { useLang } from '@/i18n/LanguageContext'
import s from '@/components/panels/HomePanel.module.css'

const SVG_POINTS = [[0,60],[30,45],[60,50],[90,30],[120,38],[150,55],[180,40],[210,35],[240,42],[270,28],[300,32]]

export default function HomePanel() {
  const { t } = useLang()
  const [showAlert, setShowAlert] = useState(true)

  const STATS = [
    { accent:'teal',  Icon:Droplets,   label:t('hp_stat1_label'), value:'112', unit:t('hp_stat1_unit'), change:t('hp_stat1_change'), type:'good' },
    { accent:'amber', Icon:Utensils,   label:t('hp_stat2_label'), value:'156', unit:t('hp_stat2_unit'), change:t('hp_stat2_change'), type:'good' },
    { accent:'green', Icon:TrendingUp, label:t('hp_stat3_label'), value:'131', unit:t('hp_stat3_unit'), change:t('hp_stat3_change'), type:'good' },
    { accent:'coral', Icon:Scale,      label:t('hp_stat4_label'), value:'72.4', unit:t('hp_stat4_unit'), change:t('hp_stat4_change'), type:'warn' },
  ]

  const MEDS = [
    { name:t('hp_med1_name'), dose:t('hp_med1_dose'), time:t('hp_med1_time'), done:true,  color:'#0A6E6E' },
    { name:t('hp_med2_name'), dose:t('hp_med2_dose'), time:t('hp_med2_time'), done:true,  color:'#F0A500' },
    { name:t('hp_med3_name'), dose:t('hp_med3_dose'), time:t('hp_med3_time'), done:false, color:'#E8553E' },
  ]

  const MEALS = [
    { Icon:Utensils, name:t('hp_meal1_name'), cal:t('hp_meal1_cal'), gi:t('hp_meal1_gi'), giType:'low' },
    { Icon:Utensils, name:t('hp_meal2_name'), cal:t('hp_meal2_cal'), gi:t('hp_meal2_gi'), giType:'med' },
    { Icon:Utensils, name:t('hp_meal3_name'), cal:t('hp_meal3_cal'), gi:t('hp_meal3_gi'), giType:'low' },
  ]

  const DOCTORS = [
    { name:t('hp_doc1_name'), role:t('hp_doc1_role'), time:t('hp_doc1_time'), status:'online', initial:'S' },
    { name:t('hp_doc2_name'), role:t('hp_doc2_role'), time:t('hp_doc2_time'), status:'busy',   initial:'K' },
  ]

  const ACTIVITY_STATS = [
    { Icon:Flame,  label:t('hp_calories'), value:'320 kcal' },
    { Icon:Timer,  label:t('hp_duration'), value:t('hp_48min') },
    { Icon:Target, label:t('hp_goal'),     value:'68%' },
  ]

  const [meds, setMeds] = useState(MEDS)
  const toggleMed = i => setMeds(prev => prev.map((m, idx) => idx === i ? {...m, done:!m.done} : m))

  const svgPath = 'M ' + SVG_POINTS.map(([x,y]) => `${x},${y}`).join(' L ')
  const svgFill = svgPath + ` L ${SVG_POINTS[SVG_POINTS.length-1][0]},80 L 0,80 Z`
  const days = t('hp_days')

  return (
    <div className={s.panel}>
      {showAlert && (
        <div className={s.alert}>
          <AlertTriangle size={16} />
          <span>{t('hp_alert')}</span>
          <button onClick={() => setShowAlert(false)}><X size={14} /></button>
        </div>
      )}

      <div className={s.statsRow}>
        {STATS.map(st => {
          const StatIcon = st.Icon
          return (
            <div key={st.label} className={`${s.statCard} ${s['accent_'+st.accent]}`}>
              <div className={s.statTop}>
                <span className={s.statIcon}><StatIcon size={18} /></span>
                <span className={`${s.statChange} ${s['type_'+st.type]}`}>{st.change}</span>
              </div>
              <div className={s.statVal}>{st.value}</div>
              <div className={s.statUnit}>{st.unit}</div>
              <div className={s.statLabel}>{st.label}</div>
            </div>
          )
        })}
      </div>

      <div className={s.twoCol}>
        <div className={s.card}>
          <div className={s.cardHead}>
            <span className={s.cardTitle}>{t('hp_chart_title')}</span>
            <div className={s.chartLegend}>
              <span className={s.legendDot} style={{background:'#0A6E6E'}} />{t('hp_fasting')}
              <span className={s.legendDot} style={{background:'#F0A500'}} />{t('hp_postmeal')}
            </div>
          </div>
          <svg viewBox="0 0 300 80" className={s.svg} preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0A6E6E" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0A6E6E" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="0" y="20" width="300" height="30" fill="rgba(26,138,90,0.06)" rx="4" />
            <path d={svgFill} fill="url(#grad)" />
            <path d={svgPath} fill="none" stroke="#0A6E6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {SVG_POINTS.map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="3" fill={i===SVG_POINTS.length-1?'#E8553E':'#0A6E6E'} stroke="white" strokeWidth="1.5" />
            ))}
          </svg>
          <div className={s.chartXLabels}>{days.map(d => <span key={d}>{d}</span>)}</div>
        </div>

        <div className={s.rightCol}>
          <div className={s.card}>
            <div className={s.cardHead}><span className={s.cardTitle}>{t('hp_activity_title')}</span></div>
            <div className={s.activityRow}>
              <svg viewBox="0 0 80 80" className={s.ring}>
                <circle cx="40" cy="40" r="30" fill="none" stroke="var(--mist)" strokeWidth="8" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#0A6E6E" strokeWidth="8"
                  strokeDasharray={`${188.5*0.68} ${188.5}`} strokeLinecap="round"
                  strokeDashoffset="47" transform="rotate(-90 40 40)" />
                <text x="40" y="38" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">6.2k</text>
                <text x="40" y="50" textAnchor="middle" fontSize="7" fill="var(--ink-soft)">{t('hp_steps')}</text>
              </svg>
              <div className={s.activityStats}>
                {ACTIVITY_STATS.map(({ Icon, label, value }) => {
                  const ActIcon = Icon
                  return (
                    <div key={label} className={s.actStat}>
                      <ActIcon size={15} style={{color:'var(--ink-soft)'}} />
                      <div><div className={s.actVal}>{value}</div><div className={s.actLabel}>{label}</div></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className={s.card}>
            <div className={s.cardHead}><span className={s.cardTitle}>{t('hp_meds_title')}</span></div>
            <div className={s.medList}>
              {meds.map((m, i) => (
                <div key={i} className={`${s.medItem} ${m.done?s.medDone:''}`}>
                  <button className={s.medCheck} style={{borderColor:m.done?m.color:undefined,background:m.done?m.color:undefined}} onClick={() => toggleMed(i)}>
                    {m.done && <Check size={12} color="white" />}
                  </button>
                  <div className={s.medInfo}>
                    <div className={s.medName}>{m.name}</div>
                    <div className={s.medDose}>{m.dose}</div>
                  </div>
                  <div className={s.medTime}>{m.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={s.twoCol}>
        <div className={s.card}>
          <div className={s.cardHead}><span className={s.cardTitle}>{t('hp_meals_title')}</span><button className={s.addBtn}>{t('hp_meals_add')}</button></div>
          <div className={s.mealList}>
            {MEALS.map(m => {
              const MealIcon = m.Icon
              return (
                <div key={m.name} className={s.mealItem}>
                  <span className={s.mealEmoji}><MealIcon size={18} style={{color:'var(--ink-soft)'}} /></span>
                  <div className={s.mealInfo}>
                    <div className={s.mealName}>{m.name}</div>
                    <div className={s.mealCal}>{m.cal}</div>
                  </div>
                  <span className={`${s.giTag} ${s['gi_'+m.giType]}`}>{m.gi}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className={s.card}>
          <div className={s.cardHead}><span className={s.cardTitle}>{t('hp_doctors_title')}</span></div>
          <div className={s.docList}>
            {DOCTORS.map(d => (
              <div key={d.name} className={s.docItem}>
                <div className={s.docAvatar}>{d.initial}</div>
                <div className={s.docInfo}>
                  <div className={s.docName}>{d.name}</div>
                  <div className={s.docRole}>{d.role}</div>
                  <div className={s.docTime}><Clock size={12} /> {d.time}</div>
                </div>
                <div className={`${s.docStatus} ${s['status_'+d.status]}`}>
                  {d.status === 'online' ? t('hp_online') : t('hp_busy')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
