'use client'
import { useState } from 'react'
import s from '@/components/panels/FamilyPanel.module.css'

const FAMILY = [
  { id: 1, name: 'Fatema Ahmed', relation: 'Wife', age: 52, type: 'Type 2', glucose: 118, hba1c: '7.1%', status: 'normal', lastReading: '2h ago', initial: 'F', color: '#1A8A5A', phone: '01712345678' },
  { id: 2, name: 'Omar Ahmed', relation: 'Father', age: 72, type: 'Type 2', glucose: 164, hba1c: '8.2%', status: 'high', lastReading: '5h ago', initial: 'O', color: '#E8553E', phone: '01898765432' },
  { id: 3, name: 'Nadia Ahmed', relation: 'Daughter', age: 24, type: 'Pre-diabetic', glucose: 102, hba1c: '5.9%', status: 'caution', lastReading: 'Yesterday', initial: 'N', color: '#F0A500', phone: '01611223344' },
]

const ALERTS = [
  { member: 'Omar Ahmed', msg: 'Glucose reading of 164 mg/dL — above target range', time: '5h ago', urgent: true },
  { member: 'Nadia Ahmed', msg: 'Missed afternoon medication dose', time: '3h ago', urgent: false },
]

export default function FamilyPanel() {
  const [tab, setTab] = useState('overview')
  const [showInvite, setShowInvite] = useState(false)
  const [invitePhone, setInvitePhone] = useState('')
  const [inviteRelation, setInviteRelation] = useState('Spouse')
  const [toast, setToast] = useState('')

  const statusColor = (status) => status === 'normal' ? '#1A8A5A' : status === 'high' ? '#E8553E' : '#F0A500'
  const statusLabel = (status) => status === 'normal' ? '✓ Normal' : status === 'high' ? '⚠️ High' : '⚡ Caution'

  const handleInvite = () => {
    setShowInvite(false)
    setInvitePhone('')
    setToast('Invitation sent via SMS!')
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <div className={s.panel}>
      {/* Alert strip */}
      {ALERTS.length > 0 && (
        <div className={s.alertStrip}>
          <span className={s.alertIcon}>🔔</span>
          <div className={s.alertMessages}>
            {ALERTS.map((a, i) => (
              <div key={i} className={`${s.alertMsg} ${a.urgent ? s.alertUrgent : ''}`}>
                <strong>{a.member}</strong>: {a.msg} <span className={s.alertTime}>· {a.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className={s.tabs}>
        {[['overview', '👨‍👩‍👧 Family Overview'], ['alerts', '🔔 Alerts'], ['settings', '⚙️ Sharing Settings']].map(([id, label]) => (
          <button key={id} className={`${s.tab} ${tab === id ? s.tabActive : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
        <button className={s.inviteBtn} onClick={() => setShowInvite(true)}>+ Invite Member</button>
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div className={s.memberGrid}>
          {FAMILY.map(member => (
            <div key={member.id} className={s.memberCard}>
              <div className={s.memberTop}>
                <div className={s.memberAvatar} style={{ background: member.color }}>{member.initial}</div>
                <div className={s.memberInfo}>
                  <div className={s.memberName}>{member.name}</div>
                  <div className={s.memberMeta}>{member.relation} · {member.age} yrs · {member.type}</div>
                </div>
                <span className={s.statusBadge} style={{ background: statusColor(member.status) + '20', color: statusColor(member.status) }}>
                  {statusLabel(member.status)}
                </span>
              </div>
              <div className={s.memberStats}>
                <div className={s.mstat}>
                  <div className={s.mstatVal} style={{ color: statusColor(member.status) }}>{member.glucose}</div>
                  <div className={s.mstatLabel}>mg/dL · {member.lastReading}</div>
                </div>
                <div className={s.mstatDivider} />
                <div className={s.mstat}>
                  <div className={s.mstatVal}>{member.hba1c}</div>
                  <div className={s.mstatLabel}>HbA1c</div>
                </div>
              </div>
              <div className={s.memberActions}>
                <button className={s.btnView}>View Full Profile</button>
                <button className={s.btnCall} onClick={() => window.open(`tel:${member.phone}`)}>📞 Call</button>
              </div>
            </div>
          ))}
          <div className={s.addCard} onClick={() => setShowInvite(true)}>
            <div className={s.addIcon}>+</div>
            <div className={s.addLabel}>Add Family Member</div>
            <div className={s.addSub}>Invite via phone number</div>
          </div>
        </div>
      )}

      {/* Alerts Tab */}
      {tab === 'alerts' && (
        <div className={s.card}>
          <div className={s.cardHead}>
            <span className={s.cardTitle}>🔔 Family Health Alerts</span>
            <span className={s.cardSub}>Last 24 hours</span>
          </div>
          {ALERTS.length === 0 ? (
            <div className={s.empty}>No alerts in the last 24 hours. Everyone's on track! ✓</div>
          ) : (
            <div className={s.alertList}>
              {ALERTS.map((a, i) => (
                <div key={i} className={`${s.alertItem} ${a.urgent ? s.alertItemUrgent : ''}`}>
                  <span className={s.alertDot} style={{ background: a.urgent ? '#E8553E' : '#F0A500' }} />
                  <div className={s.alertContent}>
                    <div className={s.alertMember}>{a.member}</div>
                    <div className={s.alertText}>{a.msg}</div>
                    <div className={s.alertTime2}>{a.time}</div>
                  </div>
                  <button className={s.btnAck}>Acknowledge</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sharing Settings */}
      {tab === 'settings' && (
        <div className={s.card}>
          <div className={s.cardHead}>
            <span className={s.cardTitle}>⚙️ Data Sharing Preferences</span>
          </div>
          <p className={s.settingsDesc}>Choose what health data each family member can view about you.</p>
          <div className={s.settingsGrid}>
            {FAMILY.map(member => (
              <div key={member.id} className={s.settingsCard}>
                <div className={s.settingsTop}>
                  <div className={s.memberAvatarSm} style={{ background: member.color }}>{member.initial}</div>
                  <div>
                    <div className={s.memberNameSm}>{member.name}</div>
                    <div className={s.memberRelSm}>{member.relation}</div>
                  </div>
                </div>
                <div className={s.permList}>
                  {([['Glucose Readings', true], ['Medications', true], ['HbA1c', true], ['Weight', false], ['Diet Log', false]] as [string, boolean][]).map(([label, on]) => (
                    <div key={label} className={s.permRow}>
                      <span className={s.permLabel}>{label}</span>
                      <label className={s.switch}>
                        <input type="checkbox" defaultChecked={on} />
                        <span className={s.slider} />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInvite && (
        <div className={s.overlay}>
          <div className={s.modal}>
            <div className={s.modalHeader}>
              <div className={s.modalTitle}>Invite Family Member</div>
              <button className={s.modalClose} onClick={() => setShowInvite(false)}>✕</button>
            </div>
            <p className={s.modalDesc}>They'll receive an SMS invitation to join your D-Shastho family group.</p>
            <div className={s.field}>
              <label className={s.label}>Phone Number</label>
              <input className={s.input} placeholder="01XXXXXXXXX" value={invitePhone} onChange={e => setInvitePhone(e.target.value)} />
            </div>
            <div className={s.field} style={{ marginTop: 12 }}>
              <label className={s.label}>Relation</label>
              <select className={s.input} value={inviteRelation} onChange={e => setInviteRelation(e.target.value)}>
                {['Spouse', 'Parent', 'Child', 'Sibling', 'Other'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className={s.limitNote}>👨‍👩‍👧 {FAMILY.length}/5 members · {5 - FAMILY.length} slots remaining (Pro plan)</div>
            <div className={s.modalActions}>
              <button className={s.btnCancel} onClick={() => setShowInvite(false)}>Cancel</button>
              <button className={s.btnConfirm} onClick={handleInvite} disabled={!invitePhone}>Send Invite</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={s.toast}>✅ {toast}</div>}
    </div>
  )
}

