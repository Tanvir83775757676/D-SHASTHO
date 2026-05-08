// lib/fonts/li-ador-noirrit.ts
// Li Ador Noirrit — Custom Bengali font for D-Shastho
// Usage: import { liAdorNoirrit } from '@/lib/fonts/li-ador-noirrit'
// Then apply className: liAdorNoirrit.variable or liAdorNoirrit.className

import localFont from 'next/font/local'

export const liAdorNoirrit = localFont({
  src: [
    {
      path: '../../public/fonts/Li_Ador_Noirrit_ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Li_Ador_Noirrit_ExtraLight_Italic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Li_Ador_Noirrit_Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Li_Ador_Noirrit_Light_Italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Li_Ador_Noirrit_Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Li_Ador_Noirrit_Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Li_Ador_Noirrit_SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Li_Ador_Noirrit_SemiBold_Italic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Li_Ador_Noirrit_Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Li_Ador_Noirrit_Bold_Italic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-bengali',
  display: 'swap',
  preload: true,
})
