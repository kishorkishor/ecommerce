'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  name: string
  email: string
}

interface AuthState {
  token: string | null
  user: AuthUser | null
  signIn: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      async signIn(email: string) {
        // mock token generation
        const token = 'mock_' + Math.random().toString(36).slice(2)
        set({ token, user: { id: 'u1', name: email.split('@')[0] || 'User', email } })
      },
      async register(name: string, email: string) {
        const token = 'mock_' + Math.random().toString(36).slice(2)
        set({ token, user: { id: 'u1', name: name || email.split('@')[0] || 'User', email } })
      },
      signOut() {
        set({ token: null, user: null })
      },
    }),
    {
      name: 'cw-auth',
      partialize: (s) => ({ token: s.token, user: s.user }),
    }
  )
)



