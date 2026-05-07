import s from './ReportsPanel.module.css'

const STATS = [
  { icon:'📊', label:'HbA1c', value:'৬.৮%', change:'↓ ০.৪%', good:true },
  { icon:'💧', label:'গড় গ্লুকোজ', value:'১৩১', unit:'mg/dL', change:'↓ ৫', good:true },
  { icon:'📅', label:'পরিমাপ (মাস)', value:'২৪', change:'নিয়মিত', good:true },
  { icon:'⚖️', label:'ওজন পরিবর্তন', value:'-২.১', unit:'kg', change:'↓ ভালো', good:true },
]

const REPORTS = [
  { icon:'📋', title:'মাসিক গ্লুকোজ রিপোর্ট', date:'এপ্রিল ২০২৬', type:'PDF', size:'১.২ MB', color:'#0A6E6E' },
  { icon:'🩺', title:'HbA1c ট্রেন্ড বিশ্লেষণ', date:'Q1 ২০২৬',     type:'PDF', size:'৮৫৬ KB', color:'#1A8A5A' },
  { icon:'💊', title:'ওষুধ মেনে চলার রিপোর্ট', date:'মে ২০২৬',     type:'PDF', size:'৪৩২ KB', color:'#F0A500' },
  { icon:'🍛', title:'খাদ্যাভ্যাস ও পুষ্টি বিশ্লেষণ', date:'এপ্রিল ২০২৬', type:'PDF', size:'৯৮৪ KB', color:'#E8553E' },
  { icon:'🏃', title:'শারীরিক কার্যকলাপ রিপোর্ট', date:'এপ্রিল ২০২৬', type:'PDF', size:'৬৭২ KB', color:'#0D8A8A' },
  { icon:'👨‍⚕️', title:'ডাক্তার পরামর্শ সারাংশ', date:'৫ মে ২০২৬', type:'PDF', size:'২৩৬ KB', color:'#5A70C0' },
]

export default function ReportsPanel() {
  return (
    <div className={s.panel}>
      {/* Stats */}
      <div className={s.statsRow}>
        {STATS.map(st => (
          <div key={st.label} className={s.statCard}>
            <div className={s.statTop}>
              <span className={s.statIcon}>{st.icon}</span>
              <span className={`${s.badge} ${st.good ? s.badgeGood : s.badgeWarn}`}>{st.change}</span>
            </div>
            <div className={s.statVal}>{st.value}<span className={s.statUnit}>{st.unit}</span></div>
            <div className={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className={s.actionRow}>
        <button className={s.btnPrimary}>📊 নতুন রিপোর্ট তৈরি করুন</button>
        <button className={s.btnSecondary}>📤 ডাক্তারের সাথে শেয়ার করুন</button>
        <button className={s.btnSecondary}>🖨️ প্রিন্ট করুন</button>
      </div>

      {/* Report List */}
      <div className={s.card}>
        <div className={s.cardHead}>
          <span className={s.cardTitle}>📁 আমার রিপোর্ট সমূহ</span>
          <span className={s.cardSub}>সর্বশেষ ৬টি রিপোর্ট</span>
        </div>
        <div className={s.reportList}>
          {REPORTS.map(r => (
            <div key={r.title} className={s.reportItem}>
              <div className={s.reportIcon} style={{background: r.color + '20', color: r.color}}>
                {r.icon}
              </div>
              <div className={s.reportInfo}>
                <div className={s.reportTitle}>{r.title}</div>
                <div className={s.reportMeta}>{r.date} · {r.type} · {r.size}</div>
              </div>
              <button className={s.downloadBtn}>⬇ ডাউনলোড</button>
              <button className={s.shareBtn}>↗ শেয়ার</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
