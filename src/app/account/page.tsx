'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockOrders = Array.from({ length: 5 }).map((_, i) => ({
  id: `CW${(123450 + i).toString()}`,
  date: new Date(Date.now() - i * 86400000).toISOString(),
  total: 999 + i * 123,
  status: ['pending', 'processing', 'shipped', 'delivered'][i % 4],
}))

export default function AccountPage() {
  const [tab, setTab] = useState<'orders' | 'profile'>('orders')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      <div className="flex gap-2 border-b mb-6">
        <button onClick={() => setTab('orders')} className={`px-4 py-2 text-sm font-medium ${tab==='orders'?'border-b-2 border-orange-600 text-orange-600':'text-gray-600'}`}>Orders</button>
        <button onClick={() => setTab('profile')} className={`px-4 py-2 text-sm font-medium ${tab==='profile'?'border-b-2 border-orange-600 text-orange-600':'text-gray-600'}`}>Profile</button>
      </div>

      {tab === 'orders' && (
        <div className="bg-white border rounded-lg">
          <div className="grid grid-cols-4 gap-4 px-4 py-3 font-semibold text-sm border-b">
            <div>Order</div>
            <div>Date</div>
            <div>Status</div>
            <div className="text-right">Total</div>
          </div>
          {mockOrders.map((o) => (
            <div key={o.id} className="grid grid-cols-4 gap-4 px-4 py-3 text-sm border-b last:border-b-0">
              <div><Link href="#" className="text-orange-600">{o.id}</Link></div>
              <div>{new Date(o.date).toLocaleDateString()}</div>
              <div className="capitalize">{o.status}</div>
              <div className="text-right">৳{o.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'profile' && (
        <div className="bg-white border rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input defaultValue="John" className="border rounded px-3 py-2" />
            <input defaultValue="Doe" className="border rounded px-3 py-2" />
            <input defaultValue="john@example.com" className="border rounded px-3 py-2 md:col-span-2" />
            <input defaultValue="+8801XXXXXXXXX" className="border rounded px-3 py-2 md:col-span-2" />
            <textarea defaultValue="Dhaka, Bangladesh" className="border rounded px-3 py-2 md:col-span-2" rows={3} />
          </div>
          <button className="mt-4 bg-orange-600 text-white px-5 py-2 rounded font-medium">Save Changes</button>
        </div>
      )}
    </div>
  )
}


