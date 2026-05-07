import { useState } from 'react'
import s from './DoctorsPanel.module.css'

const DOCTORS = [
  { name:'ডা. সামিয়া রহমান', role:'এন্ডোক্রিনোলজিস্ট', hospital:'বারডেম হাসপাতাল, ঢাকা', rating:'৪.৯', reviews:'২৩৪', status:'online', initial:'স', color:'#0A6E6E',
    shared:['গ্লুকোজ লগ','HbA1c রিপোর্ট','ওষুধ তালিকা'], nextAppt:'আজ বিকাল ৪:০০' },
  { name:'ডা. কামাল হোসেন', role:'পুষ্টিবিদ ও ডায়েটিশিয়ান', hospital:'স্কয়ার হাসপাতাল, ঢাকা', rating:'৪.৭', reviews:'১৫৬', status:'busy', initial:'ক', color:'#1A8A5A',
    shared:['খাদ্য তালিকা','ওজন লগ'], nextAppt:'বৃহস্পতিবার সকাল ১০:০০' },
  { name:'ডা. নাফিসা আক্তার', role:'চক্ষু বিশেষজ্ঞ', hospital:'ন্যাশনাল আই কেয়ার, চট্টগ্রাম', rating:'৪.৮', reviews:'৮৯', status:'offline', initial:'ন', color:'#5A70C0',
    shared:['রিটিনা রিপোর্ট'], nextAppt:'পরের সপ্তাহ সোমবার' },
]

const APPOINTMENTS = [
  { doctor:'ডা. সামিয়া রহমান', type:'অনলাইন পরামর্শ', time:'আজ বিকাল ৪:০০', status:'confirm', color:'#0A6E6E' },
  { doctor:'ডা. কামাল হোসেন', type:'ফলো-আপ', time:'বৃহস্পতিবার সকাল ১০:০০', status:'pending', color:'#1A8A5A' },
  { doctor:'ডা. নাফিসা আক্তার', type:'চোখ পরীক্ষা', time:'পরের সপ্তাহ সোমবার', status:'pending', color:'#5A70C0' },
]

export default function DoctorsPanel() {
  const [permissions, setPermissions] = useState({ glucose:true, hba1c:true, weight:false, meds:true, diet:false })

  const toggle = k => setPermissions(p => ({...p, [k]:!p[k]}))

  return (
    <div className={s.panel}>
      {/* Care Team */}
      <div className={s.sectionTitle}>আমার চিকিৎসা দল</div>
      <div className={s.docGrid}>
        {DOCTORS.map(d => (
          <div key={d.name} className={s.docCard}>
            <div className={s.docTop}>
              <div className={s.docAvatar} style={{background:d.color}}>{d.initial}</div>
              <div className={s.docInfo}>
                <div className={s.docName}>{d.name}</div>
                <div className={s.docRole}>{d.role}</div>
                <div className={s.docHospital}>🏥 {d.hospital}</div>
              </div>
              <div className={`${s.statusDot} ${s['status_'+d.status]}`} title={d.status} />
            </div>
            <div className={s.docStats}>
              <span>⭐ {d.rating}</span>
              <span>({d.reviews} রিভিউ)</span>
            </div>
            <div className={s.sharedLabel}>শেয়ার করা তথ্য:</div>
            <div className={s.sharedTags}>
              {d.shared.map(t => <span key={t} className={s.sharedTag}>{t}</span>)}
            </div>
            <div className={s.nextAppt}>📅 পরবর্তী: {d.nextAppt}</div>
            <div className={s.docActions}>
              <button className={s.btnCall}>📞 কল করুন</button>
              <button className={s.btnMsg}>💬 বার্তা</button>
            </div>
          </div>
        ))}
      </div>

      {/* Data Permissions */}
      <div className={s.card}>
        <div className={s.cardHead}><span className={s.cardTitle}>🔐 তথ্য শেয়ার অনুমতি</span></div>
        <p className={s.permDesc}>আপনার ডাক্তাররা কোন তথ্য দেখতে পাবেন তা নিয়ন্ত্রণ করুন।</p>
        <div className={s.permList}>
          {[
            ['glucose','💧','গ্লুকোজ রিডিং'],
            ['hba1c',  '📊','HbA1c রিপোর্ট'],
            ['weight', '⚖️','ওজন ও BMI'],
            ['meds',   '💊','ওষুধ তালিকা'],
            ['diet',   '🍛','খাদ্যাভ্যাস'],
          ].map(([k,ic,lb]) => (
            <div key={k} className={s.permItem}>
              <span className={s.permIcon}>{ic}</span>
              <span className={s.permLabel}>{lb}</span>
              <button className={`${s.toggle} ${permissions[k] ? s.toggleOn : ''}`} onClick={() => toggle(k)}>
                <span className={s.toggleThumb} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className={s.card}>
        <div className={s.cardHead}><span className={s.cardTitle}>📅 আসন্ন অ্যাপয়েন্টমেন্ট</span><button className={s.addBtn}>+ নতুন বুক করুন</button></div>
        <div className={s.apptList}>
          {APPOINTMENTS.map(a => (
            <div key={a.doctor+a.time} className={s.apptItem}>
              <div className={s.apptLine} style={{background:a.color}} />
              <div className={s.apptInfo}>
                <div className={s.apptDoctor}>{a.doctor}</div>
                <div className={s.apptType}>{a.type} · {a.time}</div>
              </div>
              <span className={`${s.apptStatus} ${s['apptStatus_'+a.status]}`}>
                {a.status === 'confirm' ? '✓ নিশ্চিত' : '⏳ অপেক্ষায়'}
              </span>
              {a.status === 'confirm' && <button className={s.joinBtn}>যোগ দিন →</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
