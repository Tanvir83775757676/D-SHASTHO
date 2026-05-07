import { useState } from 'react'
import s from './HomePanel.module.css'

const STATS = [
  { accent:'teal',  icon:'💧', label:'ফাস্টিং গ্লুকোজ',   value:'১১২', unit:'mg/dL · আজ সকাল ৭:১০', change:'↓ ৮ গতকালের চেয়ে',            type:'good' },
  { accent:'amber', icon:'🍽️', label:'খাবার পরের গ্লুকোজ', value:'১৫৬', unit:'mg/dL · দুপুরের পরে',   change:'↓ ৪২ ডিনার পিক থেকে',         type:'good' },
  { accent:'green', icon:'📈', label:'৭-দিনের গড়',        value:'১৩১', unit:'mg/dL · সাপ্তাহিক গড়',  change:'↓ ৫ গত সপ্তাহের চেয়ে',        type:'good' },
  { accent:'coral', icon:'⚖️', label:'ওজন',               value:'৭২.৪', unit:'kg · BMI: ২৫.১',       change:'→ এই সপ্তাহে কোনো পরিবর্তন নেই', type:'warn' },
]

const MEDS = [
  { name:'মেটফর্মিন',       dose:'৫০০mg · সকালের খাবারের পরে', time:'সকাল ৮:০০', done:true,  color:'#0A6E6E' },
  { name:'গ্লিবেনক্লামাইড', dose:'৫mg · দুপুরের খাবারের আগে', time:'দুপুর ১:০০', done:true,  color:'#F0A500' },
  { name:'মেটফর্মিন',       dose:'৫০০mg · রাতের খাবারের পরে',  time:'রাত ৮:০০',  done:false, color:'#E8553E' },
]

const MEALS = [
  { emoji:'🌾', name:'ওটস + কলা',       cal:'সকালের খাবার · ৩২০ কিলোক্যালরি', gi:'কম GI',    giType:'low' },
  { emoji:'🍛', name:'ভাত + মসুর ডাল', cal:'দুপুরের খাবার · ৫৮০ কিলোক্যালরি', gi:'মাঝারি GI', giType:'med' },
  { emoji:'🍎', name:'আপেল (১টি)',       cal:'স্ন্যাক · ৯৫ কিলোক্যালরি',       gi:'কম GI',    giType:'low' },
]

const DOCTORS = [
  { name:'ডা. সামিয়া রহমান', role:'এন্ডোক্রিনোলজিস্ট', time:'আজ বিকাল ৪:০০', status:'online', initial:'স' },
  { name:'ডা. কামাল হোসেন',  role:'পুষ্টিবিদ',           time:'বৃহস্পতিবার',   status:'busy',   initial:'ক' },
]

const SVG_POINTS = [
  [0,60],[30,45],[60,50],[90,30],[120,38],[150,55],[180,40],[210,35],[240,42],[270,28],[300,32]
]

export default function HomePanel() {
  const [meds, setMeds] = useState(MEDS)
  const [showAlert, setShowAlert] = useState(true)

  const toggleMed = i => setMeds(prev => prev.map((m, idx) => idx === i ? {...m, done:!m.done} : m))

  const svgPath = 'M ' + SVG_POINTS.map(([x,y]) => `${x},${y}`).join(' L ')
  const svgFill = 'M ' + SVG_POINTS.map(([x,y]) => `${x},${y}`).join(' L ') + ` L ${SVG_POINTS[SVG_POINTS.length-1][0]},80 L 0,80 Z`

  return (
    <div className={s.panel}>
      {showAlert && (
        <div className={s.alert}>
          <span>⚠️</span>
          <span>আপনার আজকের রাতের গ্লুকোজ পরীক্ষা এখনো দেওয়া হয়নি। মেটফর্মিন খাওয়ার আগে পরিমাপ করুন।</span>
          <button onClick={() => setShowAlert(false)}>✕</button>
        </div>
      )}

      {/* Stats */}
      <div className={s.statsRow}>
        {STATS.map(st => (
          <div key={st.label} className={`${s.statCard} ${s['accent_'+st.accent]}`}>
            <div className={s.statTop}>
              <span className={s.statIcon}>{st.icon}</span>
              <span className={`${s.statChange} ${s['type_'+st.type]}`}>{st.change}</span>
            </div>
            <div className={s.statVal}>{st.value}</div>
            <div className={s.statUnit}>{st.unit}</div>
            <div className={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>

      <div className={s.twoCol}>
        {/* Glucose Chart */}
        <div className={s.card}>
          <div className={s.cardHead}>
            <span className={s.cardTitle}>📈 গ্লুকোজ ট্রেন্ড (৭ দিন)</span>
            <div className={s.chartLegend}>
              <span className={s.legendDot} style={{background:'#0A6E6E'}} />ফাস্টিং
              <span className={s.legendDot} style={{background:'#F0A500'}} />খাবার পরে
            </div>
          </div>
          <svg viewBox="0 0 300 80" className={s.svg} preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0A6E6E" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0A6E6E" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Target zone */}
            <rect x="0" y="20" width="300" height="30" fill="rgba(26,138,90,0.06)" rx="4" />
            <text x="302" y="30" fontSize="6" fill="#1A8A5A">১৮০</text>
            <text x="302" y="55" fontSize="6" fill="#1A8A5A">৭০</text>
            {/* Fill */}
            <path d={svgFill} fill="url(#grad)" />
            {/* Line */}
            <path d={svgPath} fill="none" stroke="#0A6E6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Points */}
            {SVG_POINTS.map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="3" fill={i === SVG_POINTS.length-1 ? '#E8553E' : '#0A6E6E'} stroke="white" strokeWidth="1.5" />
            ))}
          </svg>
          <div className={s.chartXLabels}>
            {['রবি','সোম','মঙ্গল','বুধ','বৃহ','শুক্র','শনি'].map(d => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>

        {/* Activity Ring + Medications */}
        <div className={s.rightCol}>
          {/* Activity */}
          <div className={s.card}>
            <div className={s.cardHead}><span className={s.cardTitle}>🏃 আজকের কার্যকলাপ</span></div>
            <div className={s.activityRow}>
              <svg viewBox="0 0 80 80" className={s.ring}>
                <circle cx="40" cy="40" r="30" fill="none" stroke="var(--mist)" strokeWidth="8" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#0A6E6E" strokeWidth="8"
                  strokeDasharray={`${188.5 * 0.68} ${188.5}`} strokeLinecap="round"
                  strokeDashoffset="47" transform="rotate(-90 40 40)" />
                <text x="40" y="38" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">৬.২k</text>
                <text x="40" y="50" textAnchor="middle" fontSize="7" fill="var(--ink-soft)">পদক্ষেপ</text>
              </svg>
              <div className={s.activityStats}>
                {[['🔥','ক্যালরি','৩২০ kcal'],['⏱️','সময়','৪৮ মিনিট'],['🎯','লক্ষ্য','৬৮%']].map(([ic,lb,vl]) => (
                  <div key={lb} className={s.actStat}>
                    <span>{ic}</span>
                    <div>
                      <div className={s.actVal}>{vl}</div>
                      <div className={s.actLabel}>{lb}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Medications */}
          <div className={s.card}>
            <div className={s.cardHead}><span className={s.cardTitle}>💊 আজকের ওষুধ</span></div>
            <div className={s.medList}>
              {meds.map((m, i) => (
                <div key={i} className={`${s.medItem} ${m.done ? s.medDone : ''}`}>
                  <button className={s.medCheck} style={{borderColor: m.done ? m.color : undefined, background: m.done ? m.color : undefined}} onClick={() => toggleMed(i)}>
                    {m.done && '✓'}
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
        {/* Meals */}
        <div className={s.card}>
          <div className={s.cardHead}><span className={s.cardTitle}>🍛 আজকের খাবার</span><button className={s.addBtn}>+ যোগ করুন</button></div>
          <div className={s.mealList}>
            {MEALS.map(m => (
              <div key={m.name} className={s.mealItem}>
                <span className={s.mealEmoji}>{m.emoji}</span>
                <div className={s.mealInfo}>
                  <div className={s.mealName}>{m.name}</div>
                  <div className={s.mealCal}>{m.cal}</div>
                </div>
                <span className={`${s.giTag} ${s['gi_'+m.giType]}`}>{m.gi}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Doctors */}
        <div className={s.card}>
          <div className={s.cardHead}><span className={s.cardTitle}>👨‍⚕️ আমার ডাক্তার</span></div>
          <div className={s.docList}>
            {DOCTORS.map(d => (
              <div key={d.name} className={s.docItem}>
                <div className={s.docAvatar}>{d.initial}</div>
                <div className={s.docInfo}>
                  <div className={s.docName}>{d.name}</div>
                  <div className={s.docRole}>{d.role}</div>
                  <div className={s.docTime}>⏰ {d.time}</div>
                </div>
                <div className={`${s.docStatus} ${s['status_'+d.status]}`}>
                  {d.status === 'online' ? 'অনলাইন' : 'ব্যস্ত'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
