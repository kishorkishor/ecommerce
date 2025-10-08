import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  // Prices in data are assumed to be in BDT. Convert to selected currency.
  try {
    // dynamic import to avoid server-side zustand usage issues in some contexts
    // if store not available yet, fallback to env symbol
    const { getCurrencyInfo, convertFromBDT } = require('@/store/currency') as typeof import('@/store/currency')
    const info = getCurrencyInfo()
    const converted = convertFromBDT(price, info)
    return `${info.symbol}${converted.toFixed(2)}`
  } catch {
    return `${process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '৳'}${price.toFixed(2)}`
  }
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'MMM dd, yyyy')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function calculateDiscount(originalPrice: number, discountedPrice: number): number {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
}
