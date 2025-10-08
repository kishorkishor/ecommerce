'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore, getCartTotals } from '@/store/cart'
import { formatPrice } from '@/lib/utils'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clear } = useCartStore()
  const { itemCount, subtotal } = getCartTotals(items)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [payment, setPayment] = useState<'cod' | 'online'>('cod')
  const [placing, setPlacing] = useState(false)

  const canPlace = itemCount > 0 && firstName && phone && address && city

  async function placeOrder() {
    if (!canPlace || placing) return
    setPlacing(true)
    // Simulate processing
    await new Promise((r) => setTimeout(r, 800))
    const orderNumber = 'CW' + Math.floor(Math.random() * 1_000_000).toString().padStart(6, '0')
    clear()
    router.push(`/checkout/success?order=${orderNumber}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipping form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border rounded-lg p-4">
            <h2 className="font-semibold mb-3">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className="border rounded px-3 py-2" />
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" className="border rounded px-3 py-2" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="border rounded px-3 py-2" />
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="border rounded px-3 py-2" />
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="border rounded px-3 py-2 md:col-span-2" rows={3} />
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h2 className="font-semibold mb-3">Payment Method</h2>
            <div className="flex items-center gap-4 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={payment === 'cod'} onChange={() => setPayment('cod')} />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={payment === 'online'} onChange={() => setPayment('online')} />
                Online (Demo)
              </label>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white border rounded-lg p-4 h-fit">
          <h2 className="font-semibold mb-3">Order Summary</h2>
          <div className="flex justify-between text-sm mb-2">
            <span>Items</span>
            <span>{itemCount}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Shipping</span>
            <span>{formatPrice(0)}</span>
          </div>
          <div className="flex justify-between font-medium text-base mb-4">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button disabled={!canPlace || placing} onClick={placeOrder} className="w-full bg-orange-600 text-white py-2 rounded font-medium disabled:opacity-50">
            {placing ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  )
}



