'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types'

interface WishlistState {
  items: Record<string, Product>
  toggle: (product: Product) => void
  remove: (productId: string) => void
  clear: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: {},
      toggle: (product) => {
        const exists = !!get().items[product.id]
        set((state) => {
          const next = { ...state.items }
          if (exists) delete next[product.id]
          else next[product.id] = product
          return { items: next }
        })
      },
      remove: (productId) => set((state) => {
        const next = { ...state.items }
        delete next[productId]
        return { items: next }
      }),
      clear: () => set({ items: {} }),
    }),
    {
      name: 'cw-wishlist',
      partialize: (s) => ({ items: s.items }),
    }
  )
)



