'use client'
import { useState } from 'react'
import { User, Droplets, Bell, Lock, Star, Pill, ClipboardList, Users, Lightbulb, Upload, Link, Trash2, Check, X, Settings } from 'lucide-react'
import s from '@/components/panels/SettingsPanel.module.css'

const SECTIONS = [
  { id: 'profile',      Icon: User,     label: 'Profile'           },
  { id: 'glucose',      Icon: Droplets, label: 'Glucose Targets'   },
  { id: 'notifications',Icon: Bell,     label: 'Notifications'     },
  { id: 'privacy',      Icon: Lock,     label: 'Privacy & Data'    },
  { id: 'subscription', Icon: Star,     label: 'Subscription'      },
]

const NOTIF_ITEMS = [
  { key: 'meds',     Icon: Pill,          title: 'Medication Reminders', desc: 'Alerts to take your medications on time'          },
  { key: 'readings', Icon: Droplets,      title: 'Reading Reminders',    desc: 'Reminders to log your blood sugar'                },
  { key: 'reports',  Icon: ClipboardList, title: 'Report Ready',         desc: 'When a new health report is generated'           },
  { key: 'family',   Icon: Users,         title: 'Family Alerts',        desc: "When a family member's reading is abnormal"      },
  { key: 'tips',     Icon: Lightbulb,     title: 'Daily Health Tips',    desc: 'Educational tips and diabetes management advice' },
]

export default function SettingsPanel({ onClose }) {
  const [section, setSection] = useState('profile')
  const [glucose, setGlucose] = useState({ fasting_min: 70, fasting_max: 99, postmeal_max: 140, unit: 'mg/dL' })
  const [notifs, setNotifs] = useState({ meds: true, readings: true, reports: true, family: true, tips: false })
  const [profile, setProfile] = useState({ name: 'Rahul Ahmed', phone: '01712345678', age: '58', gender: 'Male', city: 'Dhaka', plan: 'Pro' })
  const [saved, setSaved] = useState(false)

  const toggleNotif = k => setNotifs(p => ({ ...p, [k]: !p[k] }))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  return (
    <div className={s.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={s.panel}>
        <div className={s.panelHeader}>
          <div className={s.panelTitle}><Settings size={18} /> Settings</div>
          <button className={s.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>

        <div className={s.layout}>
          <div className={s.sidebar}>
            {SECTIONS.map(({ id, Icon, label }) => (
              <button key={id} className={`${s.sideItem} ${section === id ? s.sideActive : ''}`} onClick={() => setSection(id)}>
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          <div className={s.content}>
            {section === 'profile' && (
              <div className={s.section}>
                <div className={s.sectionTitle}>Profile Information</div>
                <div className={s.formGrid}>
                  {[['Full Name', 'name'], ['Phone', 'phone'], ['Age', 'age'], ['City', 'city']].map(([label, key]) => (
                    <div key={key} className={s.field}>
                      <label className={s.label}>{label}</label>
                      <input className={s.input} value={profile[key]} onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))} />
                    </div>
                  ))}
                  <div className={s.field}>
                    <label className={s.label}>Gender</label>
                    <select className={s.input} value={profile.gender} onChange={e => setProfile(p => ({ ...p, gender: e.target.value }))}>
                      {['Male', 'Female', 'Other'].map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                </div>
                <button className={s.saveBtn} onClick={save}>{saved ? <><Check size={14} /> Saved!</> : 'Save Changes'}</button>
              </div>
            )}

            {section === 'glucose' && (
              <div className={s.section}>
                <div className={s.sectionTitle}>Glucose Target Ranges</div>
                <p className={s.sectionDesc}>Set your personal target ranges. Readings outside these ranges will trigger alerts.</p>
                <div className={s.targetList}>
                  {[
                    ['Fasting Minimum (mg/dL)',  'fasting_min',  40,  200],
                    ['Fasting Maximum (mg/dL)',  'fasting_max',  60,  200],
                    ['Post-Meal Maximum (mg/dL)','postmeal_max', 100, 300],
                  ].map(([label, key, min, max]) => (
                    <div key={key} className={s.targetRow}>
                      <div className={s.targetLabel}>{label}</div>
                      <div className={s.targetControl}>
                        <input type="range" min={min} max={max} value={glucose[key]}
                          onChange={e => setGlucose(p => ({ ...p, [key]: +e.target.value }))}
                          className={s.rangeInput} />
                        <span className={s.targetVal}>{glucose[key]}</span>
                      </div>
                    </div>
                  ))}
                  <div className={s.targetRow}>
                    <div className={s.targetLabel}>Unit</div>
                    <div className={s.unitToggle}>
                      {['mg/dL', 'mmol/L'].map(u => (
                        <button key={u} className={`${s.unitBtn} ${glucose.unit === u ? s.unitActive : ''}`} onClick={() => setGlucose(p => ({ ...p, unit: u }))}>{u}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <button className={s.saveBtn} onClick={save}>{saved ? <><Check size={14} /> Saved!</> : 'Save Targets'}</button>
              </div>
            )}

            {section === 'notifications' && (
              <div className={s.section}>
                <div className={s.sectionTitle}>Notification Preferences</div>
                <div className={s.notifList}>
                  {NOTIF_ITEMS.map(({ key, Icon, title, desc }) => (
                    <div key={key} className={s.notifRow}>
                      <span className={s.notifIcon}><Icon size={16} /></span>
                      <div className={s.notifInfo}>
                        <div className={s.notifTitle}>{title}</div>
                        <div className={s.notifDesc}>{desc}</div>
                      </div>
                      <label className={s.switch}>
                        <input type="checkbox" checked={notifs[key]} onChange={() => toggleNotif(key)} />
                        <span className={s.slider} />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === 'privacy' && (
              <div className={s.section}>
                <div className={s.sectionTitle}>Privacy & Data</div>
                <div className={s.privacyList}>
                  <div className={s.privacyItem}>
                    <div className={s.privacyLabel}><Upload size={15} /> Export My Data</div>
                    <div className={s.privacyDesc}>Download all your health data as a CSV or PDF file.</div>
                    <button className={s.privacyBtn}>Export Data</button>
                  </div>
                  <div className={s.privacyItem}>
                    <div className={s.privacyLabel}><Link size={15} /> Connected Devices</div>
                    <div className={s.privacyDesc}>Manage CGM and Bluetooth glucose monitor connections.</div>
                    <button className={s.privacyBtn}>Manage Devices</button>
                  </div>
                  <div className={s.privacyItem}>
                    <div className={s.privacyLabel}><Trash2 size={15} /> Delete Account</div>
                    <div className={s.privacyDesc}>Permanently delete your account and all associated data.</div>
                    <button className={s.privacyBtnDanger}>Delete Account</button>
                  </div>
                </div>
              </div>
            )}

            {section === 'subscription' && (
              <div className={s.section}>
                <div className={s.sectionTitle}>Subscription</div>
                <div className={s.planCard}>
                  <div className={s.planBadge}><Star size={14} fill="currentColor" /> Pro Plan</div>
                  <div className={s.planPrice}>৳299<span>/month</span></div>
                  <div className={s.planRenew}>Renews on 1 June 2026</div>
                  <div className={s.planFeatures}>
                    {['Advanced analytics & trends', 'Unlimited PDF reports', 'Doctor consultations (chat)', 'Family sharing (up to 5)', 'Lab test booking discounts', 'Priority support'].map(f => (
                      <div key={f} className={s.planFeature}><span className={s.planCheck}><Check size={13} /></span> {f}</div>
                    ))}
                  </div>
                  <button className={s.upgradeBtn}>Upgrade to Premium — ৳599/mo</button>
                  <button className={s.cancelBtn}>Cancel Subscription</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
