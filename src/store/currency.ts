'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CurrencyCode = 'BDT' | 'USD' | 'AED' | 'INR' | 'PKR' | 'PHP' | 'SAR' | 'EUR'

interface CurrencyInfo {
  code: CurrencyCode
  symbol: string
  // rate means: 1 BDT equals rate in target currency? We define base as BDT.
  // conversion: priceBDT * rate -> target currency
  rate: number
}

interface CurrencyState {
  currency: CurrencyCode
  currencies: Record<CurrencyCode, CurrencyInfo>
  setCurrency: (c: CurrencyCode) => void
  updateRates: (rates: Partial<Record<CurrencyCode, number>>) => void
}

const DEFAULTS: Record<CurrencyCode, CurrencyInfo> = {
  BDT: { code: 'BDT', symbol: '৳', rate: 1 },
  USD: { code: 'USD', symbol: '$', rate: 0.0086 },
  AED: { code: 'AED', symbol: 'د.إ', rate: 0.0316 },
  INR: { code: 'INR', symbol: '₹', rate: 0.72 },
  PKR: { code: 'PKR', symbol: '₨', rate: 2.39 },
  PHP: { code: 'PHP', symbol: '₱', rate: 0.49 },
  SAR: { code: 'SAR', symbol: '﷼', rate: 0.0321 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.0080 },
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: 'BDT',
      currencies: DEFAULTS,
      setCurrency: (c) => set({ currency: c }),
      updateRates: (rates) =>
        set((state) => {
          const next = { ...state.currencies }
          for (const k in rates) {
            const code = k as CurrencyCode
            if (next[code] && typeof rates[code] === 'number') {
              next[code] = { ...next[code], rate: rates[code]! }
            }
          }
          return { currencies: next }
        }),
    }),
    { name: 'cw-currency' }
  )
)

export function convertFromBDT(amountInBDT: number, currency: CurrencyInfo): number {
  return amountInBDT * currency.rate
}

export function getCurrencyInfo(): CurrencyInfo {
  const state = useCurrencyStore.getState()
  return state.currencies[state.currency]
}


