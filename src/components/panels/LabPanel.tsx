'use client'
import { useState } from 'react'
import { Hospital, FlaskConical, TestTube, Droplets, Heart, Eye, Activity, MapPin, Star, AlertTriangle, Clock, Calendar, Check, Hourglass, X } from 'lucide-react'
import s from '@/components/panels/LabPanel.module.css'

const LABS = [
  { name: 'Popular Diagnostics', Icon: Hospital,     tests: 120, discount: '15%', rating: '4.8', color: '#0A6E6E', locations: 'Dhaka, Chittagong, Sylhet' },
  { name: 'Ibn Sina Hospital',   Icon: Heart,        tests: 95,  discount: '10%', rating: '4.7', color: '#1A8A5A', locations: 'Dhaka, Gazipur' },
  { name: 'Labaid Diagnostics',  Icon: FlaskConical, tests: 140, discount: '20%', rating: '4.9', color: '#5A70C0', locations: 'Nationwide' },
  { name: 'Medinova',            Icon: Activity,     tests: 80,  discount: '12%', rating: '4.6', color: '#E8553E', locations: 'Dhaka' },
]

const RECOMMENDED_TESTS = [
  { Icon: Activity,     name: 'HbA1c',                purpose: 'Average blood sugar over 3 months',  price: '650 BDT', due: 'Overdue by 2 weeks', urgent: true  },
  { Icon: Droplets,     name: 'Fasting Blood Glucose', purpose: 'Baseline glucose measurement',       price: '200 BDT', due: 'Due in 3 days',      urgent: false },
  { Icon: Heart,        name: 'Lipid Profile',         purpose: 'Cholesterol and triglycerides',      price: '800 BDT', due: 'Due this month',     urgent: false },
  { Icon: Activity,     name: 'Kidney Function Test',  purpose: 'Creatinine, BUN, eGFR',             price: '950 BDT', due: 'Due in 2 weeks',     urgent: false },
  { Icon: Eye,          name: 'Microalbumin (Urine)',  purpose: 'Early kidney damage screening',      price: '550 BDT', due: 'Due next month',     urgent: false },
  { Icon: FlaskConical, name: 'Thyroid Profile (TSH)', purpose: 'Thyroid function — affects glucose', price: '750 BDT', due: 'Due next month',     urgent: false },
]

const BOOKED = [
  { test: 'Lipid Profile', lab: 'Popular Diagnostics', date: '10 May 2026', time: '8:00 AM', status: 'confirmed', color: '#0A6E6E' },
  { test: 'HbA1c',         lab: 'Labaid Diagnostics',  date: '12 May 2026', time: '7:30 AM', status: 'pending',   color: '#5A70C0' },
]

const TABS = [
  { id: 'recommended', Icon: TestTube, label: 'Recommended Tests' },
  { id: 'booked',      Icon: Calendar, label: 'My Bookings'       },
  { id: 'labs',        Icon: Hospital, label: 'Lab Network'       },
]

export default function LabPanel() {
  const [tab, setTab] = useState('recommended')
  const [bookingTest, setBookingTest] = useState(null)
  const [selectedLab, setSelectedLab] = useState(null)
  const [toast, setToast] = useState(false)

  const handleBook = () => {
    setBookingTest(null)
    setSelectedLab(null)
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  return (
    <div className={s.panel}>
      <div className={s.tabs}>
        {TABS.map(({ id, Icon, label }) => {
          const TabIcon = Icon
          return (
            <button key={id} className={`${s.tab} ${tab === id ? s.tabActive : ''}`} onClick={() => setTab(id)}>
              <TabIcon size={14} /> {label}
            </button>
          )
        })}
      </div>

      {tab === 'recommended' && (
        <div>
          <div className={s.sectionDesc}>Tests recommended by your care team based on your health profile.</div>
          <div className={s.testGrid}>
            {RECOMMENDED_TESTS.map(test => {
              const TestIcon = test.Icon
              return (
                <div key={test.name} className={`${s.testCard} ${test.urgent ? s.testUrgent : ''}`}>
                  <div className={s.testTop}>
                    <span className={s.testIcon}><TestIcon size={20} /></span>
                    {test.urgent && <span className={s.urgentBadge}><AlertTriangle size={12} /> Overdue</span>}
                  </div>
                  <div className={s.testName}>{test.name}</div>
                  <div className={s.testPurpose}>{test.purpose}</div>
                  <div className={s.testMeta}>
                    <span className={s.testPrice}>{test.price}</span>
                    <span className={`${s.testDue} ${test.urgent ? s.testDueUrgent : ''}`}>{test.due}</span>
                  </div>
                  <button className={s.bookBtn} onClick={() => setBookingTest(test)}>Book Now</button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {tab === 'booked' && (
        <div>
          <div className={s.sectionDesc}>Your upcoming lab appointments.</div>
          {BOOKED.length === 0 ? (
            <div className={s.empty}>No bookings yet. Book a test from Recommended Tests.</div>
          ) : (
            <div className={s.bookedList}>
              {BOOKED.map((b, i) => (
                <div key={i} className={s.bookedCard}>
                  <div className={s.bookedLine} style={{ background: b.color }} />
                  <div className={s.bookedInfo}>
                    <div className={s.bookedTest}>{b.test}</div>
                    <div className={s.bookedMeta}>
                      <Hospital size={12} /> {b.lab} &nbsp;·&nbsp;
                      <Calendar size={12} /> {b.date} &nbsp;·&nbsp;
                      <Clock size={12} /> {b.time}
                    </div>
                  </div>
                  <span className={`${s.bookedStatus} ${b.status === 'confirmed' ? s.statusConfirmed : s.statusPending}`}>
                    {b.status === 'confirmed' ? <><Check size={12} /> Confirmed</> : <><Hourglass size={12} /> Pending</>}
                  </span>
                  <div className={s.bookedActions}>
                    {b.status === 'confirmed' && <button className={s.btnView}>View Details</button>}
                    <button className={s.btnCancel}>Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'labs' && (
        <div>
          <div className={s.sectionDesc}>Partner labs offering discounts for D-Shastho members.</div>
          <div className={s.labGrid}>
            {LABS.map(lab => {
              const LabIcon = lab.Icon
              return (
                <div key={lab.name} className={s.labCard}>
                  <div className={s.labTop}>
                    <span className={s.labLogo}><LabIcon size={22} style={{color:lab.color}} /></span>
                    <div className={s.labInfo}>
                      <div className={s.labName}>{lab.name}</div>
                      <div className={s.labLocations}><MapPin size={12} /> {lab.locations}</div>
                    </div>
                    <span className={s.discountBadge}>{lab.discount} OFF</span>
                  </div>
                  <div className={s.labStats}>
                    <span><Star size={13} fill="#F0A500" stroke="none" /> {lab.rating}</span>
                    <span><TestTube size={13} /> {lab.tests}+ tests</span>
                  </div>
                  <button className={s.bookBtn}>Browse Tests</button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {bookingTest && (
        <div className={s.overlay}>
          <div className={s.modal}>
            <div className={s.modalHeader}>
              <div className={s.modalTitle}>Book — {bookingTest.name}</div>
              <button className={s.modalClose} onClick={() => setBookingTest(null)}><X size={16} /></button>
            </div>
            <p className={s.modalDesc}>{bookingTest.purpose}</p>
            <div className={s.modalSection}>Select a Lab:</div>
            <div className={s.labOptions}>
              {LABS.map(lab => {
                const LabIcon = lab.Icon
                return (
                  <button
                    key={lab.name}
                    className={`${s.labOption} ${selectedLab === lab.name ? s.labOptionSelected : ''}`}
                    onClick={() => setSelectedLab(lab.name)}
                  >
                    <span><LabIcon size={14} /> {lab.name}</span>
                    <span className={s.optionDiscount}>{lab.discount} OFF</span>
                  </button>
                )
              })}
            </div>
            <div className={s.modalSection}>Select Date:</div>
            <input type="date" className={s.dateInput} defaultValue="2026-05-12" />
            <div className={s.modalSection}>Select Time:</div>
            <div className={s.timeSlots}>
              {['7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM'].map(t => (
                <button key={t} className={s.timeSlot}>{t}</button>
              ))}
            </div>
            <div className={s.modalActions}>
              <button className={s.btnCancel} onClick={() => setBookingTest(null)}>Cancel</button>
              <button className={s.btnConfirm} onClick={handleBook} disabled={!selectedLab}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={s.toast}><Check size={14} /> Lab test booked successfully! You will receive an SMS confirmation.</div>
      )}
    </div>
  )
}
