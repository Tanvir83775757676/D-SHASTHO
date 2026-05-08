import { useState } from 'react'
import s from './SettingsPanel.module.css'

export default function SettingsPanel({ onClose }) {
  const [section, setSection] = useState('profile')
  const [glucose, setGlucose] = useState({ fasting_min: 70, fasting_max: 99, postmeal_max: 140, unit: 'mg/dL' })
  const [notifs, setNotifs] = useState({ meds: true, readings: true, reports: true, family: true, tips: false })
  const [profile, setProfile] = useState({ name: 'Rahul Ahmed', phone: '01712345678', age: '58', gender: 'Male', city: 'Dhaka', plan: 'Pro' })
  const [saved, setSaved] = useState(false)

  const toggleNotif = k => setNotifs(p => ({ ...p, [k]: !p[k] }))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  const SECTIONS = [
    ['profile', '👤 Profile'],
    ['glucose', '💧 Glucose Targets'],
    ['notifications', '🔔 Notifications'],
    ['privacy', '🔒 Privacy & Data'],
    ['subscription', '⭐ Subscription'],
  ]

  return (
    <div className={s.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={s.panel}>
        <div className={s.panelHeader}>
          <div className={s.panelTitle}>⚙️ Settings</div>
          <button className={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={s.layout}>
          <div className={s.sidebar}>
            {SECTIONS.map(([id, label]) => (
              <button key={id} className={`${s.sideItem} ${section === id ? s.sideActive : ''}`} onClick={() => setSection(id)}>
                {label}
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
                <button className={s.saveBtn} onClick={save}>{saved ? '✓ Saved!' : 'Save Changes'}</button>
              </div>
            )}

            {section === 'glucose' && (
              <div className={s.section}>
                <div className={s.sectionTitle}>Glucose Target Ranges</div>
                <p className={s.sectionDesc}>Set your personal target ranges. Readings outside these ranges will trigger alerts.</p>
                <div className={s.targetList}>
                  {[
                    ['Fasting Minimum (mg/dL)', 'fasting_min', 40, 200],
                    ['Fasting Maximum (mg/dL)', 'fasting_max', 60, 200],
                    ['Post-Meal Maximum (mg/dL)', 'postmeal_max', 100, 300],
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
                        <button key={u} className={`${s.unitBtn} ${glucose.unit === u ? s.unitActive : ''}`} onClick={() => setGlucose(p => ({ ...p, unit: u }))}>
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button className={s.saveBtn} onClick={save}>{saved ? '✓ Saved!' : 'Save Targets'}</button>
              </div>
            )}

            {section === 'notifications' && (
              <div className={s.section}>
                <div className={s.sectionTitle}>Notification Preferences</div>
                <div className={s.notifList}>
                  {[
                    ['meds', '💊', 'Medication Reminders', 'Alerts to take your medications on time'],
                    ['readings', '💧', 'Reading Reminders', 'Reminders to log your blood sugar'],
                    ['reports', '📋', 'Report Ready', 'When a new health report is generated'],
                    ['family', '👨‍👩‍👧', 'Family Alerts', 'When a family member\'s reading is abnormal'],
                    ['tips', '💡', 'Daily Health Tips', 'Educational tips and diabetes management advice'],
                  ].map(([key, icon, title, desc]) => (
                    <div key={key} className={s.notifRow}>
                      <span className={s.notifIcon}>{icon}</span>
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
                    <div className={s.privacyLabel}>📤 Export My Data</div>
                    <div className={s.privacyDesc}>Download all your health data as a CSV or PDF file.</div>
                    <button className={s.privacyBtn}>Export Data</button>
                  </div>
                  <div className={s.privacyItem}>
                    <div className={s.privacyLabel}>🔗 Connected Devices</div>
                    <div className={s.privacyDesc}>Manage CGM and Bluetooth glucose monitor connections.</div>
                    <button className={s.privacyBtn}>Manage Devices</button>
                  </div>
                  <div className={s.privacyItem}>
                    <div className={s.privacyLabel}>🗑️ Delete Account</div>
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
                  <div className={s.planBadge}>⭐ Pro Plan</div>
                  <div className={s.planPrice}>৳299<span>/month</span></div>
                  <div className={s.planRenew}>Renews on 1 June 2026</div>
                  <div className={s.planFeatures}>
                    {['Advanced analytics & trends', 'Unlimited PDF reports', 'Doctor consultations (chat)', 'Family sharing (up to 5)', 'Lab test booking discounts', 'Priority support'].map(f => (
                      <div key={f} className={s.planFeature}><span className={s.planCheck}>✓</span> {f}</div>
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
