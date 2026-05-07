import s from './RiskPanel.module.css'

const LIFESTYLE = [
  { icon:'🏃', title:'শারীরিক কার্যকলাপ', desc:'সপ্তাহে ৫ দিন ৩০ মিনিট হাঁটুন', progress:68, color:'#0A6E6E' },
  { icon:'🍛', title:'খাদ্যাভ্যাস নিয়ন্ত্রণ', desc:'কম GI খাবার বেছে নিন', progress:75, color:'#1A8A5A' },
  { icon:'😴', title:'পর্যাপ্ত ঘুম', desc:'রাতে ৭-৮ ঘণ্টা ঘুমান', progress:50, color:'#F0A500' },
  { icon:'🧘', title:'মানসিক চাপ নিয়ন্ত্রণ', desc:'মেডিটেশন বা যোগব্যায়াম করুন', progress:40, color:'#E8553E' },
  { icon:'💊', title:'ওষুধ মেনে চলা', desc:'নিয়মিত ওষুধ খান', progress:87, color:'#0D8A8A' },
  { icon:'🩺', title:'নিয়মিত চেকআপ', desc:'প্রতি ৩ মাসে ডাক্তার দেখান', progress:60, color:'#5A70C0' },
]

export default function RiskPanel() {
  return (
    <div className={s.panel}>
      {/* Risk Hero */}
      <div className={s.riskHero}>
        <div className={s.riskLeft}>
          <div className={s.riskBadge}>🛡️ আপনার ঝুঁকি মূল্যায়ন</div>
          <h2 className={s.riskScore}>৩৮<span className={s.riskMax}>/১০০</span></h2>
          <div className={s.riskLabel}>মাঝারি ঝুঁকি</div>
          <p className={s.riskDesc}>আপনার বর্তমান জীবনযাত্রা পর্যালোচনা করে AI এই স্কোর নির্ধারণ করেছে। নিয়মিত ব্যায়াম ও সঠিক খাদ্যাভ্যাস মেনে চললে এটি উল্লেখযোগ্যভাবে কমানো সম্ভব।</p>
          <div className={s.riskTrend}>
            <span className={s.riskTrendVal}>↓ ৫ পয়েন্ট</span>
            <span className={s.riskTrendLabel}>গত মাসের তুলনায় উন্নতি</span>
          </div>
        </div>
        <div className={s.riskRight}>
          <svg viewBox="0 0 180 100" className={s.riskGauge}>
            <path d="M 20 90 A 70 70 0 0 1 160 90" fill="none" stroke="#f0f6f6" strokeWidth="14" strokeLinecap="round" />
            <path d="M 20 90 A 70 70 0 0 1 160 90" fill="none" stroke="#0A6E6E" strokeWidth="14" strokeLinecap="round"
              strokeDasharray="220" strokeDashoffset={220 - (220 * 0.38)} />
            <text x="90" y="70" textAnchor="middle" fontFamily="Fraunces,serif" fontSize="28" fontWeight="600" fill="#0E1C1C">৩৮</text>
            <text x="90" y="85" textAnchor="middle" fontSize="10" fill="#5A7070">মাঝারি</text>
          </svg>
          <div className={s.riskLegend}>
            <span className={s.dot} style={{background:'#1A8A5A'}} /> কম (০-৩০)
            <span className={s.dot} style={{background:'#F0A500'}} /> মাঝারি (৩১-৬০)
            <span className={s.dot} style={{background:'#E8553E'}} /> উচ্চ (৬১-১০০)
          </div>
        </div>
      </div>

      {/* Lifestyle Cards */}
      <div className={s.sectionTitle}>জীবনযাত্রার উন্নতির পরিকল্পনা</div>
      <div className={s.cardGrid}>
        {LIFESTYLE.map(l => (
          <div key={l.title} className={s.lifestyleCard}>
            <div className={s.lcTop}>
              <span className={s.lcIcon}>{l.icon}</span>
              <div className={s.lcInfo}>
                <div className={s.lcTitle}>{l.title}</div>
                <div className={s.lcDesc}>{l.desc}</div>
              </div>
              <span className={s.lcPct} style={{color:l.color}}>{l.progress}%</span>
            </div>
            <div className={s.progressTrack}>
              <div className={s.progressFill} style={{width:`${l.progress}%`, background:l.color}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
