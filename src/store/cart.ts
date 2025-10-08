'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types'

export interface CartLineItem {
  product: Product
  quantity: number
}

interface CartState {
  items: Record<string, CartLineItem>
  addItem: (product: Product, qty?: number) => void
  removeItem: (productId: string) => void
  increase: (productId: string) => void
  decrease: (productId: string) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: {},
      addItem: (product, qty = 1) => {
        set((state) => {
          const existing = state.items[product.id]
          const nextQty = (existing?.quantity ?? 0) + qty
          return {
            items: {
              ...state.items,
              [product.id]: { product, quantity: nextQty },
            },
          }
        })
      },
      removeItem: (productId) => {
        set((state) => {
          const next = { ...state.items }
          delete next[productId]
          return { items: next }
        })
      },
      increase: (productId) => {
        const item = get().items[productId]
        if (!item) return
        set((state) => ({
          items: {
            ...state.items,
            [productId]: { ...item, quantity: item.quantity + 1 },
          },
        }))
      },
      decrease: (productId) => {
        const item = get().items[productId]
        if (!item) return
        const newQty = item.quantity - 1
        if (newQty <= 0) {
          set((state) => {
            const next = { ...state.items }
            delete next[productId]
            return { items: next }
          })
        } else {
          set((state) => ({
            items: {
              ...state.items,
              [productId]: { ...item, quantity: newQty },
            },
          }))
        }
      },
      clear: () => set({ items: {} }),
    }),
    {
      name: 'cw-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)

export function getCartTotals(items: Record<string, CartLineItem>) {
  let itemCount = 0
  let subtotal = 0
  for (const key in items) {
    const { product, quantity } = items[key]
    itemCount += quantity
    subtotal += product.price * quantity
  }
  return { itemCount, subtotal }
}


