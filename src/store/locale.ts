'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Locale = 'en' | 'bn'

interface LocaleState {
  locale: Locale
  setLocale: (l: Locale) => void
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'en',
      setLocale: (l) => set({ locale: l }),
    }),
    { name: 'cw-locale' }
  )
)

export function t(en: string, bn: string, current: Locale) {
  return current === 'bn' ? bn : en
}
