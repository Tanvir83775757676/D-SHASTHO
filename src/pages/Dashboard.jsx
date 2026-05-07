import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './Dashboard.module.css'
import LogModal from '../components/LogModal'
import HomePanel from '../components/panels/HomePanel'
import ReportsPanel from '../components/panels/ReportsPanel'
import RiskPanel from '../components/panels/RiskPanel'
import DoctorsPanel from '../components/panels/DoctorsPanel'

const NAV = [
  { id:'home',    icon:'📊', label:'ড্যাশবোর্ড' },
  { id:'reports', icon:'📋', label:'রিপোর্ট' },
  { id:'risk',    icon:'🛡️', label:'ঝুঁকি ও প্রতিরোধ' },
  { id:'doctors', icon:'👨‍⚕️', label:'আমার ডাক্তার', badge:1 },
]

const TITLES = {
  home:    ['শুভ সকাল, রাহুল 👋', 'মঙ্গলবার, ৫ মে ২০২৬ · HbA1c: ৬.৮% · শেষ রিডিং ২ ঘণ্টা আগে'],
  reports: ['স্বাস্থ্য রিপোর্ট',  'ডাউনলোড, শেয়ার বা নতুন রিপোর্ট তৈরি করুন'],
  risk:    ['ঝুঁকি ও প্রতিরোধ', 'আপনার ব্যক্তিগতকৃত ডায়াবেটিস প্রতিরোধ রোডম্যাপ'],
  doctors: ['আমার চিকিৎসা দল',  'ডাক্তার, পুষ্টিবিদ এবং বিশেষজ্ঞগণ'],
}

export default function Dashboard() {
  const nav = useNavigate()
  const [panel, setPanel] = useState('home')
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState(false)

  const showToast = () => {
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  const [title, sub] = TITLES[panel]

  return (
    <div className={s.layout}>
      {/* Sidebar */}
      <nav className={s.sidebar}>
        <div className={s.sidebarLogo}>
          <div className={s.sidebarLogoIcon}>🩺</div>
          <div className={s.sidebarLogoText}>D-Shastho</div>
        </div>

        <div className={s.sectionLabel}>প্রধান</div>
        {NAV.map(item => (
          <button
            key={item.id}
            className={`${s.navItem} ${panel === item.id ? s.navActive : ''}`}
            onClick={() => setPanel(item.id)}
          >
            <span className={s.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span className={s.navBadge}>{item.badge}</span>}
          </button>
        ))}

        <div className={s.sectionLabel} style={{marginTop:16}}>স্বাস্থ্য</div>
        {[['🧪','ল্যাব টেস্ট'],['💊','ওষুধ'],['👨‍👩‍👧','পরিবার'],['📚','শিক্ষা']].map(([icon,label]) => (
          <button key={label} className={s.navItem}>
            <span className={s.navIcon}>{icon}</span>
            <span>{label}</span>
          </button>
        ))}

        <div className={s.spacer} />
        <button className={s.navItem} onClick={() => nav('/')}>
          <span className={s.navIcon}>🚪</span><span>সাইন আউট</span>
        </button>
        <div className={s.sidebarUser}>
          <div className={s.avatar}>র</div>
          <div>
            <div className={s.userName}>রাহুল আহমেদ</div>
            <div className={s.userType}>ডায়াবেটিক · টাইপ ২</div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className={s.main}>
        <div className={s.topbar}>
          <div>
            <div className={s.pageTitle}>{title}</div>
            <div className={s.pageSub}>{sub}</div>
          </div>
          <div className={s.topbarRight}>
            <div className={s.iconBtn} title="বিজ্ঞপ্তি">🔔<div className={s.notifDot}/></div>
            <div className={s.iconBtn} title="সেটিংস">⚙️</div>
            <button className={s.logBtn} onClick={() => setModalOpen(true)}>+ রিডিং যোগ করুন</button>
          </div>
        </div>

        {panel === 'home'    && <HomePanel />}
        {panel === 'reports' && <ReportsPanel />}
        {panel === 'risk'    && <RiskPanel />}
        {panel === 'doctors' && <DoctorsPanel />}
      </div>

      {modalOpen && <LogModal onClose={() => setModalOpen(false)} onSave={() => { setModalOpen(false); showToast() }} />}

      {toast && (
        <div className={s.toast}>
          <span>✅</span> রিডিং সফলভাবে সংরক্ষিত হয়েছে!
        </div>
      )}
    </div>
  )
}
