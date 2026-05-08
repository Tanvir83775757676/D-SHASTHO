import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal:    { DEFAULT: '#0A6E6E', light: '#0D8A8A', pale: '#E6F4F4' },
        coral:   { DEFAULT: '#E8553E', light: '#FDECEA' },
        amber:   { DEFAULT: '#F0A500', light: '#FEF5E0' },
        green:   { DEFAULT: '#1A8A5A', light: '#E6F4EE' },
        ink:     { DEFAULT: '#0E1C1C', mid: '#2D4040', soft: '#5A7070' },
        mist:    '#F0F6F6',
        border:  '#D4E6E6',
      },
      fontFamily: {
        sans:    ['var(--font-dm-sans)', 'sans-serif'],
        serif:   ['var(--font-fraunces)', 'serif'],
        bengali: ['var(--font-bengali)', 'sans-serif'],
      },
      boxShadow: {
        sm:  '0 2px 8px rgba(10,110,110,0.08)',
        md:  '0 8px 32px rgba(10,110,110,0.12)',
        lg:  '0 20px 60px rgba(10,110,110,0.16)',
      },
      borderRadius: {
        DEFAULT: '16px',
        sm:  '10px',
        lg:  '24px',
      },
    },
  },
  plugins: [],
}

export default config
