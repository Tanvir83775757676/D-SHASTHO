'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, FileText, ShieldCheck, Stethoscope,
  FlaskConical, Pill, Users, BookOpen, LogOut,
  Bell, Settings, Plus, Activity
} from 'lucide-react'
import { useLang } from '@/i18n/LanguageContext'
import LangSwitcher from '@/components/LangSwitcher'
import s from '@/components/pages/Dashboard.module.css'
import LogModal from '@/components/LogModal'
import HomePanel from '@/components/panels/HomePanel'
import ReportsPanel from '@/components/panels/ReportsPanel'
import RiskPanel from '@/components/panels/RiskPanel'
import DoctorsPanel from '@/components/panels/DoctorsPanel'
import LabPanel from '@/components/panels/LabPanel'
import MedsPanel from '@/components/panels/MedsPanel'
import FamilyPanel from '@/components/panels/FamilyPanel'
import EducationPanel from '@/components/panels/EducationPanel'
import SettingsPanel from '@/components/panels/SettingsPanel'
import NotificationsPanel from '@/components/panels/NotificationsPanel'

type Panel = 'home'|'reports'|'risk'|'doctors'|'lab'|'meds'|'family'|'education'

export default function Dashboard() {
  const router = useRouter()
  const { t, lang } = useLang()
  const [panel, setPanel] = useState<Panel>('home')
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showNotifs, setShowNotifs] = useState(false)

  const NAV = [
    { id: 'home'    as Panel, icon: <LayoutDashboard size={16}/>, label: t('dash_nav_dashboard') },
    { id: 'reports' as Panel, icon: <FileText size={16}/>,        label: t('dash_nav_reports') },
    { id: 'risk'    as Panel, icon: <ShieldCheck size={16}/>,     label: t('dash_nav_risk') },
    { id: 'doctors' as Panel, icon: <Stethoscope size={16}/>,     label: t('dash_nav_doctors'), badge: 1 },
  ]

  const HEALTH_NAV = [
    { id: 'lab'       as Panel, icon: <FlaskConical size={16}/>, label: t('dash_nav_lab') },
    { id: 'meds'      as Panel, icon: <Pill size={16}/>,         label: t('dash_nav_meds') },
    { id: 'family'    as Panel, icon: <Users size={16}/>,        label: t('dash_nav_family') },
    { id: 'education' as Panel, icon: <BookOpen size={16}/>,     label: t('dash_nav_education') },
  ]

  const TITLES: Record<Panel, [string, string]> = {
    home:      [t('dash_title_home'),    t('dash_sub_home')],
    reports:   [t('dash_title_reports'), t('dash_sub_reports')],
    risk:      [t('dash_title_risk'),    t('dash_sub_risk')],
    doctors:   [t('dash_title_doctors'), t('dash_sub_doctors')],
    lab:       ['Lab Tests', 'Book tests at partner diagnostic centres'],
    meds:      ['Medications', 'Track doses, refills and adherence'],
    family:    ['Family Health', 'Monitor your family members'],
    education: ['Education Hub', 'Articles, videos and quizzes'],
  }

  const showToast = () => { setToast(true); setTimeout(() => setToast(false), 3000) }
  const [title, sub] = TITLES[panel]

  return (
    <div className={s.layout} lang={lang === 'bn' ? 'bn' : 'en'}>
      {/* Sidebar */}
      <nav className={s.sidebar}>
        <div className={s.sidebarLogo}>
          <div className={s.sidebarLogoIcon}><Activity size={18} color="white" /></div>
          <div className={s.sidebarLogoText}>D-Shastho</div>
        </div>

        <div className={s.sectionLabel}>{t('dash_section_main')}</div>
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

        <div className={s.sectionLabel} style={{ marginTop: 16 }}>{t('dash_section_health')}</div>
        {HEALTH_NAV.map(item => (
          <button
            key={item.id}
            className={`${s.navItem} ${panel === item.id ? s.navActive : ''}`}
            onClick={() => setPanel(item.id)}
          >
            <span className={s.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        <div className={s.spacer} />
        <div className={s.langWrap}><LangSwitcher /></div>
        <button className={s.navItem} onClick={() => router.push('/landing')}>
          <span className={s.navIcon}><LogOut size={16} /></span>
          <span>{t('dash_nav_signout')}</span>
        </button>
        <div className={s.sidebarUser}>
          <div className={s.avatar}>R</div>
          <div>
            <div className={s.userName}>Rahul Ahmed</div>
            <div className={s.userType}>{t('dash_user_type')}</div>
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
            <div className={s.iconBtn} title={t('dash_notif')} onClick={() => setShowNotifs(true)}>
              <Bell size={18} />
              <div className={s.notifDot} />
            </div>
            <div className={s.iconBtn} title={t('dash_settings')} onClick={() => setShowSettings(true)}>
              <Settings size={18} />
            </div>
            <button className={s.logBtn} onClick={() => setModalOpen(true)}>
              <Plus size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
              {t('dash_log_btn')}
            </button>
          </div>
        </div>

        {panel === 'home'      && <HomePanel />}
        {panel === 'reports'   && <ReportsPanel />}
        {panel === 'risk'      && <RiskPanel />}
        {panel === 'doctors'   && <DoctorsPanel />}
        {panel === 'lab'       && <LabPanel />}
        {panel === 'meds'      && <MedsPanel />}
        {panel === 'family'    && <FamilyPanel />}
        {panel === 'education' && <EducationPanel />}
      </div>

      {modalOpen     && <LogModal onClose={() => setModalOpen(false)} onSave={() => { setModalOpen(false); showToast() }} />}
      {showSettings  && <SettingsPanel onClose={() => setShowSettings(false)} />}
      {showNotifs    && <NotificationsPanel onClose={() => setShowNotifs(false)} />}

      {toast && (
        <div className={s.toast}>
          <Check size={14} /> {t('toast_saved')}
        </div>
      )}
    </div>
  )
}
