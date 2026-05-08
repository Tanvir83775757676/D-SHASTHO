# DESIGN_GUIDE.md — D-Shastho

> Living design system reference. Updated when new components or tokens are added.
> Last updated: 2026-05-08

---

## Brand Identity

- **Name:** D-Shastho (ডি-স্বাস্থ্য)
- **Logo Mark:** `D·S` monogram — dot-separated, medical-grade feel
- **Tagline:** "Bangladesh's first complete diabetes management solution"
- **Tone:** Trustworthy, modern, warm — not clinical or cold
- **Audience:** Bangladeshi users — Bengali and English speakers

---

## Color Tokens

| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| Background | `--bg` | `#0a1628` | Deep navy page background |
| Surface | `--surface` | `#0f2040` | Cards, panels |
| Surface Elevated | `--surface-2` | `#1a3050` | Modals, elevated cards |
| Border | `--border` | `#1e3a5f` | Dividers, outlines |
| Accent (Teal) | `--accent` | `#00bfa5` | Primary CTAs, active states, highlights |
| Accent Dim | `--accent-dim` | `#00bfa520` | Accent fills, hover backgrounds |
| Accent Blue | `--accent-blue` | `#2979ff` | Secondary actions, info states |
| Text Primary | `--text` | `#f0f4f8` | Body text |
| Text Muted | `--text-muted` | `#7a9cc0` | Secondary labels, captions |
| Text Disabled | `--text-disabled` | `#3a5a7a` | Disabled states |
| Success | `--success` | `#00e676` | Normal glucose readings, confirmations |
| Warning | `--warning` | `#ffaa00` | Pre-diabetic range, caution |
| Danger | `--danger` | `#ff5252` | High glucose alerts, errors |
| White | `--white` | `#ffffff` | High-contrast text on accent buttons |

**Gradient Defaults:**
- Hero background: `linear-gradient(135deg, #0a1628, #0f2040, #1a0a2e)`
- Accent button: `linear-gradient(135deg, #00bfa5, #2979ff)`
- Card accent: `linear-gradient(135deg, #00bfa520, #2979ff10)`

---

## Typography

**Font Stack:**
- Display/Headings: `Fraunces` — weights 300, 400, 600 (serif, elegant)
- Body/UI: `DM Sans` — weights 300, 400, 500, 600
- Bengali text: System Bengali font fallback (`'Noto Sans Bengali', sans-serif`)

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

**Scale:**

| Name | Size | Weight | Usage |
|---|---|---|---|
| `display` | 3.5rem–4rem | 300 (Fraunces) | Hero headline |
| `h1` | 2.25rem | 600 (Fraunces) | Page titles |
| `h2` | 1.5rem | 600 (DM Sans) | Section headings |
| `h3` | 1.125rem | 600 (DM Sans) | Card headings |
| `body` | 1rem | 400 (DM Sans) | Default body text |
| `small` | 0.875rem | 400 (DM Sans) | Labels, captions |
| `xs` | 0.75rem | 500 (DM Sans) | Badges, metadata, tags |

---

## Spacing Scale

Uses standard 4px base grid:

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Icon + label gap |
| `space-2` | 8px | Tight inner padding |
| `space-3` | 12px | Default item gap |
| `space-4` | 16px | Card inner padding |
| `space-5` | 20px | Section inner padding (mobile) |
| `space-6` | 24px | Section inner padding (desktop) |
| `space-8` | 32px | Between sections |
| `space-12` | 48px | Large section gaps |
| `space-16` | 64px | Hero spacing |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 4px | Tags, badges |
| `radius` | 8px | Buttons, inputs |
| `radius-md` | 12px | Cards, panels |
| `radius-lg` | 16px | Modals, feature cards |
| `radius-xl` | 24px | Hero cards |
| `radius-full` | 9999px | Avatars, pills, toggles |

---

## Shadows

| Name | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 4px rgba(0,0,0,0.3)` | Subtle lift |
| `shadow-md` | `0 4px 16px rgba(0,0,0,0.4)` | Cards |
| `shadow-lg` | `0 8px 32px rgba(0,0,0,0.5)` | Modals |
| `shadow-accent` | `0 0 24px rgba(0,191,165,0.2)` | CTA buttons, active elements |
| `shadow-blue` | `0 0 24px rgba(41,121,255,0.15)` | Secondary accent glow |
| `shadow-danger` | `0 0 16px rgba(255,82,82,0.2)` | Alert states |

---

## Component Patterns

### Primary Button (Accent Gradient)
```jsx
<button style={{
  background: 'linear-gradient(135deg, #00bfa5, #2979ff)',
  color: '#fff',
  fontFamily: 'DM Sans',
  fontWeight: 600,
  fontSize: '0.95rem',
  padding: '12px 28px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 0 24px rgba(0,191,165,0.2)',
}}>
  Label
</button>
```

### Ghost Button
```jsx
<button style={{
  background: 'transparent',
  color: '#00bfa5',
  fontFamily: 'DM Sans',
  fontWeight: 500,
  fontSize: '0.95rem',
  padding: '10px 24px',
  borderRadius: 8,
  border: '1px solid rgba(0,191,165,0.3)',
  cursor: 'pointer',
}}>
  Label
</button>
```

### Stat Card
```jsx
<div style={{
  background: 'rgba(15,32,64,0.8)',
  border: '1px solid rgba(0,191,165,0.15)',
  borderRadius: 12,
  padding: '16px 20px',
  backdropFilter: 'blur(10px)',
}}>
  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#00bfa5' }}>Value</div>
  <div style={{ fontSize: '0.8rem', color: '#7a9cc0' }}>Label</div>
</div>
```

### Feature Card
```jsx
<div style={{
  background: 'linear-gradient(135deg, rgba(0,191,165,0.05), rgba(41,121,255,0.05))',
  border: '1px solid rgba(0,191,165,0.1)',
  borderRadius: 16,
  padding: 24,
}}>
  <div style={{ fontSize: '2rem', marginBottom: 12 }}>🩺</div>
  <h3 style={{ fontFamily: 'DM Sans', fontWeight: 600, color: '#f0f4f8', marginBottom: 8 }}>Title</h3>
  <p style={{ color: '#7a9cc0', fontSize: '0.875rem', lineHeight: 1.6 }}>Description</p>
</div>
```

### Input Field
```jsx
<input style={{
  background: 'rgba(10,22,40,0.8)',
  border: '1px solid rgba(0,191,165,0.2)',
  borderRadius: 8,
  color: '#f0f4f8',
  fontFamily: 'DM Sans',
  fontSize: '0.95rem',
  padding: '10px 14px',
  width: '100%',
  outline: 'none',
  // focus: border-color → #00bfa5
}}
  placeholder="..."
/>
```

### Badge / Tag
```jsx
// Accent badge
<span style={{
  background: 'rgba(0,191,165,0.15)',
  color: '#00bfa5',
  fontSize: '0.75rem',
  fontWeight: 600,
  padding: '3px 10px',
  borderRadius: 9999,
  border: '1px solid rgba(0,191,165,0.3)',
}}>
  Label
</span>

// Normal range badge
<span style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', ... }}>Normal</span>

// Danger badge
<span style={{ background: 'rgba(255,82,82,0.15)', color: '#ff5252', ... }}>High</span>
```

### Glucose Reading Card
```jsx
<div style={{
  background: 'linear-gradient(135deg, #0f2040, #1a3050)',
  border: '1px solid rgba(0,191,165,0.2)',
  borderRadius: 20,
  padding: 24,
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
}}>
  <div style={{ fontSize: '3rem', fontWeight: 700, color: '#00e676' }}>96</div>
  <div style={{ color: '#7a9cc0', fontSize: '0.8rem' }}>mg/dL — Fasting</div>
  <span style={{ color: '#00e676', fontSize: '0.75rem' }}>✓ Normal Range</span>
</div>
```

### Navigation Bar (Bottom, Mobile)
```jsx
<nav style={{
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(10,22,40,0.95)',
  backdropFilter: 'blur(20px)',
  borderTop: '1px solid rgba(0,191,165,0.1)',
  display: 'flex',
  justifyContent: 'space-around',
  padding: '8px 0',
}}>
```

### Modal / Overlay
```jsx
<div style={{
  position: 'fixed', inset: 0,
  background: 'rgba(0,0,0,0.7)',
  backdropFilter: 'blur(4px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 100,
}}>
  <div style={{
    background: '#0f2040',
    border: '1px solid rgba(0,191,165,0.2)',
    borderRadius: 20,
    padding: 28,
    width: '90%',
    maxWidth: 400,
  }}>
```

### Toast Notification
```jsx
<div style={{
  position: 'fixed',
  bottom: 90, left: '50%',
  transform: 'translateX(-50%)',
  background: '#00bfa5',
  color: '#fff',
  fontFamily: 'DM Sans',
  fontWeight: 600,
  padding: '10px 20px',
  borderRadius: 9999,
  fontSize: '0.875rem',
  boxShadow: '0 4px 16px rgba(0,191,165,0.4)',
  zIndex: 200,
}}>
  ✓ Saved successfully
</div>
```

---

## Glucose Status Colors

| Range (mg/dL) | Status | Color |
|---|---|---|
| < 70 | Low | `#ff5252` (danger) |
| 70–99 | Normal | `#00e676` (success) |
| 100–125 | Pre-diabetic | `#ffaa00` (warning) |
| ≥ 126 | High | `#ff5252` (danger) |

---

## Animations / Transitions

| Usage | Style |
|---|---|
| Button hover | `opacity: 0.88`, `transform: translateY(-1px)` |
| Card hover | `border-color` brightens, subtle lift |
| Screen transitions | Fade in — `opacity 0.3s ease` |
| Toast appear/disappear | `opacity` + `translateY` — 200ms |
| Pulse (alert icons) | `@keyframes pulse` — scale 1 → 1.05 |
| Glow (accent elements) | `box-shadow` with `rgba(0,191,165,0.2–0.4)` |

---

## Bilingual (EN/BN) UI Notes

- Default language: **English**
- Toggle: Language switcher button in navbar (EN ↔ বাংলা)
- Bengali font: `'Noto Sans Bengali'` system fallback — no extra import needed for most devices
- Translation context: `LanguageContext.jsx` with `useLang()` hook
- All UI strings go through `t('key')` — never hardcoded

---

## Dark Mode Notes

- All screens are **dark-first**. No light mode planned.
- Base layer: `#0a1628` (deep navy) — not pure black
- Surface layers: `#0f2040` → `#1a3050` (card → modal)
- Never use pure white (`#ffffff`) for backgrounds
- Frosted glass effect: `backdrop-filter: blur(10–20px)` on overlays and nav
