import { useState } from 'react'
import s from './NotificationsPanel.module.css'

const INITIAL_NOTIFS = [
  { id: 1, type: 'alert', icon: '⚠️', title: 'High Glucose Reading', msg: 'Your post-meal reading of 186 mg/dL is above your target range of 140 mg/dL.', time: '10 min ago', read: false, color: '#E8553E' },
  { id: 2, type: 'med', icon: '💊', title: 'Medication Reminder', msg: 'Time to take Metformin 500mg with dinner.', time: '45 min ago', read: false, color: '#F0A500' },
  { id: 3, type: 'family', icon: '👨‍👩‍👧', title: 'Family Alert — Omar Ahmed', msg: "Your father's glucose reading (164 mg/dL) is above the normal range.", time: '2h ago', read: false, color: '#E8553E' },
  { id: 4, type: 'report', icon: '📋', title: 'Monthly Report Ready', msg: 'Your April 2026 health report has been generated. Tap to view or download.', time: '5h ago', read: true, color: '#0A6E6E' },
  { id: 5, type: 'tip', icon: '💡', title: 'Daily Health Tip', msg: 'Walking for 30 minutes after meals can reduce post-meal glucose spikes by up to 20%.', time: 'Yesterday', read: true, color: '#1A8A5A' },
  { id: 6, type: 'lab', icon: '🧪', title: 'Lab Booking Confirmed', msg: 'Your HbA1c test at Labaid Diagnostics is confirmed for 12 May at 7:30 AM.', time: 'Yesterday', read: true, color: '#5A70C0' },
  { id: 7, type: 'med', icon: '💊', title: 'Refill Reminder', msg: 'Glibenclamide stock is low — only 6 tablets remaining. Refill soon.', time: '2 days ago', read: true, color: '#F0A500' },
]

export default function NotificationsPanel({ onClose }) {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS)

  const unread = notifs.filter(n => !n.read).length
  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  const markRead = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const dismiss = (id) => setNotifs(prev => prev.filter(n => n.id !== id))

  return (
    <div className={s.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={s.drawer}>
        <div className={s.header}>
          <div className={s.headerLeft}>
            <div className={s.title}>🔔 Notifications</div>
            {unread > 0 && <span className={s.unreadBadge}>{unread} new</span>}
          </div>
          <div className={s.headerRight}>
            {unread > 0 && <button className={s.markAllBtn} onClick={markAllRead}>Mark all read</button>}
            <button className={s.closeBtn} onClick={onClose}>✕</button>
          </div>
        </div>

        <div className={s.list}>
          {notifs.length === 0 ? (
            <div className={s.empty}>
              <div className={s.emptyIcon}>🔔</div>
              <div className={s.emptyText}>No notifications</div>
              <div className={s.emptySub}>You're all caught up!</div>
            </div>
          ) : (
            notifs.map(n => (
              <div key={n.id} className={`${s.item} ${!n.read ? s.itemUnread : ''}`} onClick={() => markRead(n.id)}>
                <div className={s.iconWrap} style={{ background: n.color + '20' }}>
                  <span className={s.icon}>{n.icon}</span>
                </div>
                <div className={s.itemContent}>
                  <div className={s.itemTitle} style={{ color: !n.read ? n.color : undefined }}>{n.title}</div>
                  <div className={s.itemMsg}>{n.msg}</div>
                  <div className={s.itemTime}>{n.time}</div>
                </div>
                {!n.read && <div className={s.unreadDot} style={{ background: n.color }} />}
                <button className={s.dismissBtn} onClick={e => { e.stopPropagation(); dismiss(n.id) }}>✕</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
