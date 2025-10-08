'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const params = useSearchParams()
  const order = params.get('order')
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-3xl font-bold mb-2">Thank you!</h1>
      <p className="text-gray-700 mb-6">Your order has been placed successfully.</p>
      {order && <p className="text-sm text-gray-600 mb-8">Order Number: <span className="font-semibold">{order}</span></p>}
      <div className="flex items-center justify-center gap-4">
        <Link href="/" className="bg-orange-600 text-white px-5 py-2 rounded font-medium">Continue Shopping</Link>
        <Link href="/account" className="border px-5 py-2 rounded font-medium">Go to Account</Link>
      </div>
    </div>
  )
}


