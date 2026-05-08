# PLANNER.md — D-Shastho

> Living technical document. Updated whenever `update repo` is triggered.
> Last updated: 2026-05-08

---

## Overview

| Field | Value |
|---|---|
| Project | D-Shastho (ডি-স্বাস্থ্য) |
| Purpose | Bangladesh's first complete AI-powered diabetes management platform |
| Target User | Bangladeshi diabetics and at-risk individuals (84M+), families, and doctors |
| Key Value | AI analytics + Bengali doctor consultations + local food GI guide — all in one app |
| Status | 🔄 In Progress |
| Repo | `https://github.com/Tanvir83775757676/D-SHASTHO` |
| Live URL | Deployed on Vercel |

---

## Vision

> "A world where diabetes is managed, not feared — one family at a time."

Target: Serve Bangladesh's 84 million at-risk diabetics with affordable, Bengali-language digital health tools.

---

## Architecture

**Stack:**
- Framework: React + Vite (frontend web app)
- Styling: CSS-in-JS (inline styles), Google Fonts (Fraunces + DM Sans)
- Routing: React Router DOM (`/`, `/onboarding`, `/dashboard`)
- Backend: Node.js / Express (planned)
- Database: PostgreSQL + TimescaleDB for time-series glucose data (planned)
- Cache: Redis (planned)
- Storage: AWS S3 — lab reports, PDFs (planned)
- APIs: FHIR-compliant health data APIs (planned)
- Deployment: Vercel (frontend), GitHub Actions CI (planned)
- Mobile: React Native (planned — Phase 3)

**Folder Structure:**
```
/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx       # Landing page (EN/BN switcher)
│   │   ├── Onboarding.jsx    # 4-step onboarding flow
│   │   └── Dashboard.jsx     # Full dashboard (4 panels)
│   ├── i18n/
│   │   └── LanguageContext.jsx  # EN/BN language context + translations
│   ├── App.jsx               # Router setup
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/
├── index.html
├── vite.config.js
├── package.json
├── PLANNER.md
└── DESIGN_GUIDE.md
```

---

## User Flows

### Flow 1: New User Signup
1. User lands on `/` (Landing page)
2. Sees hero, stats, features, CTA
3. Clicks "Get Started Free" → navigates to `/onboarding`
4. Completes 4-step onboarding:
   - Step 1: Personal info (name, age, gender, phone, city)
   - Step 2: Health status (Diabetic / Prevention Mode)
   - Step 3: Medical history (diabetes type, HbA1c, medications, complications)
   - Step 4: Goals and preferences (language: EN/BN)
5. Submitted → redirects to `/dashboard`

### Flow 2: Returning User — Daily Logging
1. User opens app → lands on Dashboard Home panel
2. Sees today's glucose, medication tracker, meal log
3. Taps "Log Reading" → modal opens (Glucose / Weight / BP tabs)
4. Enters values → saves → toast notification confirms
5. 7-day SVG chart updates automatically

### Flow 3: Doctor Consultation
1. User navigates to Doctors panel
2. Browses doctor cards (endocrinologists, nutritionists)
3. Taps "Book" / "Chat" / "Video" button
4. Consultation booked (payment flow — planned)

### Flow 4: Lab Test Booking
1. User goes to Services section
2. Selects lab (Popular, Ibn Sina, Labaid)
3. Books test in-app
4. Digital report delivered to Reports panel

---

## Features (9 Core)

| # | Feature | Status |
|---|---|---|
| 1 | AI-Powered Glucose Analytics | 🔄 UI built, AI integration planned |
| 2 | Expert Doctor Consultations (200+) | 🔄 UI built, booking backend planned |
| 3 | Real-Time Monitoring (CGM + manual) | 🔄 Manual logging built |
| 4 | Bengali Food GI Guide | ⏳ Planned |
| 5 | Smart Medication Reminders | 🔄 UI built, push notifications planned |
| 6 | Health Reports (PDF) | 🔄 UI built, PDF generation planned |
| 7 | Lab Test Booking | ⏳ Planned |
| 8 | Family Sharing (up to 5 members) | ⏳ Planned |
| 9 | Risk & Prevention Tracker | 🔄 UI built |

---

## DB Schema

> Planned — PostgreSQL + TimescaleDB via Drizzle ORM

```ts
// users.ts
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull().unique(),
  age: integer('age'),
  gender: text('gender'),
  city: text('city'),
  diabetesType: text('diabetes_type'), // type1, type2, prediabetic, gestational
  diagnosedYear: integer('diagnosed_year'),
  latestHba1c: real('latest_hba1c'),
  plan: text('plan').default('free'), // free, pro, premium
  lang: text('lang').default('en'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// glucose_logs.ts (TimescaleDB hypertable)
export const glucoseLogs = pgTable('glucose_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  value: real('value').notNull(), // mg/dL
  type: text('type').notNull(), // fasting, post_meal, random
  loggedAt: timestamp('logged_at').defaultNow().notNull(),
});

// medications.ts
export const medications = pgTable('medications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  name: text('name').notNull(),
  dose: text('dose'),
  frequency: text('frequency'),
  reminderTime: text('reminder_time'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// doctors.ts
export const doctors = pgTable('doctors', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  specialty: text('specialty'),
  hospital: text('hospital'),
  consultationFee: integer('consultation_fee'),
  isOnline: boolean('is_online').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

---

## API Routes

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login with phone + OTP |
| GET | `/api/users/me` | Protected | Get current user profile |
| GET | `/api/glucose` | Protected | Get user's glucose logs |
| POST | `/api/glucose` | Protected | Add new glucose reading |
| GET | `/api/medications` | Protected | Get user's medications |
| POST | `/api/medications` | Protected | Add medication |
| GET | `/api/doctors` | Public | List available doctors |
| POST | `/api/consultations` | Protected | Book a consultation |
| GET | `/api/reports` | Protected | Get health reports |
| POST | `/api/reports/generate` | Protected | Generate PDF report |

---

## Env Vars

| Variable | Required | Description | Example |
|---|---|---|---|
| `VITE_API_URL` | ✅ | Backend API base URL | `https://api.d-shastho.com` |
| `DATABASE_URL` | ✅ | PostgreSQL connection string | `postgresql://...` |
| `REDIS_URL` | ⚠️ Optional | Redis cache URL | `redis://...` |
| `AWS_S3_BUCKET` | ⚠️ Optional | S3 bucket for reports | `d-shastho-reports` |
| `AWS_ACCESS_KEY_ID` | ⚠️ Optional | AWS access key | — |
| `AWS_SECRET_ACCESS_KEY` | ⚠️ Optional | AWS secret | — |
| `ANTHROPIC_API_KEY` | ⚠️ Optional | For AI chat assistant | `sk-ant-...` |

---

## Revenue Model

### B2C (Users)
| Plan | Price | Features |
|---|---|---|
| Free | ৳0 | Basic glucose logging |
| Pro | ৳299/month or ৳2,499/year | Advanced analytics, unlimited reports, doctor chat, family sharing |
| Premium | ৳599/month | Pro + monthly doctor consultation included |

### B2B (Business)
| Client Type | Revenue | Model |
|---|---|---|
| Hospitals & Clinics | ৳50,000–2,00,000/month | SaaS dashboard + white-label |
| Diagnostic Labs | 15–20% commission | Per test booked in-app |
| Pharma Companies | Sponsorship fees | Medication reminder + content sponsorship |
| Insurance Companies | Partnership fees | Health score reporting, risk assessment |
| Corporate Wellness | ৳500/employee/month | Group health monitoring + quarterly reports |

---

## Phases & Timeline

| Phase | Name | Status | Key Tasks |
|---|---|---|---|
| 1 | Foundation | ✅ | Landing page, onboarding flow, dashboard UI, bilingual EN/BN |
| 2 | Core Logging | 🔄 | Glucose log modal, medication tracker, 7-day chart, reports UI |
| 3 | Backend + Auth | ⏳ | Node/Express API, PostgreSQL, phone OTP auth |
| 4 | AI Integration | ⏳ | AI chat assistant, glucose trend predictions, anomaly alerts |
| 5 | Marketplace | ⏳ | Lab booking, doctor consultations, payment (bKash/Nagad) |
| 6 | Mobile App | ⏳ | React Native app, push notifications, CGM device sync |
| 7 | Scale | ⏳ | Insurance partnerships, SAARC expansion (India, Pakistan, Sri Lanka) |

---

## Next Steps

> Ordered by priority. Rewritten fresh on each `update repo`.

1. [ ] Set up Node.js/Express backend with PostgreSQL
2. [ ] Implement phone OTP authentication
3. [ ] Wire glucose logging modal to real API
4. [ ] Add PDF report generation (server-side)
5. [ ] Integrate AI assistant (Claude API / Anthropic)
6. [ ] Add Bengali food GI guide data
7. [ ] Set up bKash/Nagad payment for Pro plans
8. [ ] Begin React Native mobile port

---

## Notes / Decisions Log

- **2026-05-05** — Decided on "D-Shastho" branding (ডি-স্বাস্থ্য). "D·S" monogram used as logo mark.
- **2026-05-07** — Added EN/BN language switcher using React Context. Default language is English.
- **2026-05-07** — Deployed to Vercel via GitHub repo `Tanvir83775757676/D-SHASTHO`.
- **2026-05-07** — App built as single-page React + Vite. No backend yet — all data is local/mock state.
