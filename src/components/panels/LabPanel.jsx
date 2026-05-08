import { useState } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import s from './LabPanel.module.css'

const LABS = [
  { name: 'Popular Diagnostics', logo: '🏥', tests: 120, discount: '15%', rating: '4.8', color: '#0A6E6E', locations: 'Dhaka, Chittagong, Sylhet' },
  { name: 'Ibn Sina Hospital', logo: '🏨', tests: 95, discount: '10%', rating: '4.7', color: '#1A8A5A', locations: 'Dhaka, Gazipur' },
  { name: 'Labaid Diagnostics', logo: '🧬', tests: 140, discount: '20%', rating: '4.9', color: '#5A70C0', locations: 'Nationwide' },
  { name: 'Medinova', logo: '⚕️', tests: 80, discount: '12%', rating: '4.6', color: '#E8553E', locations: 'Dhaka' },
]

const RECOMMENDED_TESTS = [
  { icon: '🩸', name: 'HbA1c', purpose: 'Average blood sugar over 3 months', price: '৳650', due: 'Overdue by 2 weeks', urgent: true },
  { icon: '💧', name: 'Fasting Blood Glucose', purpose: 'Baseline glucose measurement', price: '৳200', due: 'Due in 3 days', urgent: false },
  { icon: '🫁', name: 'Lipid Profile', purpose: 'Cholesterol & triglycerides', price: '৳800', due: 'Due this month', urgent: false },
  { icon: '🫀', name: 'Kidney Function Test', purpose: 'Creatinine, BUN, eGFR', price: '৳950', due: 'Due in 2 weeks', urgent: false },
  { icon: '👁️', name: 'Microalbumin (Urine)', purpose: 'Early kidney damage screening', price: '৳550', due: 'Due next month', urgent: false },
  { icon: '🦶', name: 'Thyroid Profile (TSH)', purpose: 'Thyroid function — affects glucose', price: '৳750', due: 'Due next month', urgent: false },
]

const BOOKED = [
  { test: 'Lipid Profile', lab: 'Popular Diagnostics', date: '10 May 2026', time: '8:00 AM', status: 'confirmed', color: '#0A6E6E' },
  { test: 'HbA1c', lab: 'Labaid Diagnostics', date: '12 May 2026', time: '7:30 AM', status: 'pending', color: '#5A70C0' },
]

export default function LabPanel() {
  const { t } = useLang()
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
      {/* Tabs */}
      <div className={s.tabs}>
        {[['recommended', '🧪 Recommended Tests'], ['booked', '📅 My Bookings'], ['labs', '🏥 Lab Network']].map(([id, label]) => (
          <button key={id} className={`${s.tab} ${tab === id ? s.tabActive : ''}`} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {/* Recommended Tests */}
      {tab === 'recommended' && (
        <div>
          <div className={s.sectionDesc}>Tests recommended by your care team based on your health profile.</div>
          <div className={s.testGrid}>
            {RECOMMENDED_TESTS.map(test => (
              <div key={test.name} className={`${s.testCard} ${test.urgent ? s.testUrgent : ''}`}>
                <div className={s.testTop}>
                  <span className={s.testIcon}>{test.icon}</span>
                  {test.urgent && <span className={s.urgentBadge}>⚠️ Overdue</span>}
                </div>
                <div className={s.testName}>{test.name}</div>
                <div className={s.testPurpose}>{test.purpose}</div>
                <div className={s.testMeta}>
                  <span className={s.testPrice}>{test.price}</span>
                  <span className={`${s.testDue} ${test.urgent ? s.testDueUrgent : ''}`}>{test.due}</span>
                </div>
                <button className={s.bookBtn} onClick={() => setBookingTest(test)}>Book Now</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Bookings */}
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
                    <div className={s.bookedMeta}>🏥 {b.lab} · 📅 {b.date} · ⏰ {b.time}</div>
                  </div>
                  <span className={`${s.bookedStatus} ${b.status === 'confirmed' ? s.statusConfirmed : s.statusPending}`}>
                    {b.status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending'}
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

      {/* Lab Network */}
      {tab === 'labs' && (
        <div>
          <div className={s.sectionDesc}>Partner labs offering discounts for D-Shastho members.</div>
          <div className={s.labGrid}>
            {LABS.map(lab => (
              <div key={lab.name} className={s.labCard}>
                <div className={s.labTop}>
                  <span className={s.labLogo}>{lab.logo}</span>
                  <div className={s.labInfo}>
                    <div className={s.labName}>{lab.name}</div>
                    <div className={s.labLocations}>📍 {lab.locations}</div>
                  </div>
                  <span className={s.discountBadge}>{lab.discount} OFF</span>
                </div>
                <div className={s.labStats}>
                  <span>⭐ {lab.rating}</span>
                  <span>🧪 {lab.tests}+ tests</span>
                </div>
                <button className={s.bookBtn}>Browse Tests</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingTest && (
        <div className={s.overlay}>
          <div className={s.modal}>
            <div className={s.modalHeader}>
              <div className={s.modalTitle}>Book — {bookingTest.name}</div>
              <button className={s.modalClose} onClick={() => setBookingTest(null)}>✕</button>
            </div>
            <p className={s.modalDesc}>{bookingTest.purpose}</p>
            <div className={s.modalSection}>Select a Lab:</div>
            <div className={s.labOptions}>
              {LABS.map(lab => (
                <button
                  key={lab.name}
                  className={`${s.labOption} ${selectedLab === lab.name ? s.labOptionSelected : ''}`}
                  onClick={() => setSelectedLab(lab.name)}
                >
                  <span>{lab.logo} {lab.name}</span>
                  <span className={s.optionDiscount}>{lab.discount} OFF</span>
                </button>
              ))}
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
              <button className={s.btnConfirm} onClick={handleBook} disabled={!selectedLab}>
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={s.toast}>✅ Lab test booked successfully! You'll receive an SMS confirmation.</div>
      )}
    </div>
  )
}
