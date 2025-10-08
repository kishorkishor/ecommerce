'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'

export default function RegisterPage() {
  const router = useRouter()
  const register = useAuthStore((s) => s.register)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await register(name, email, password)
    router.push('/account')
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-white border rounded-lg p-4">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border rounded px-3 py-2" required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full border rounded px-3 py-2" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border rounded px-3 py-2" required />
        <button disabled={loading} className="w-full bg-orange-600 text-white py-2 rounded font-medium disabled:opacity-50">
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}


