'use client'

import { useMemo, useState } from 'react'

const mockOrders = Array.from({ length: 20 }).map((_, i) => ({
  id: `CW${(100000 + i).toString()}`,
  customer: `Customer ${i + 1}`,
  total: 1200 + i * 37,
  status: ['pending', 'processing', 'shipped', 'delivered'][i % 4],
  date: new Date(Date.now() - i * 86400000).toISOString(),
}))

export default function AdminOrdersPage() {
  const [status, setStatus] = useState<string>('')
  const filtered = useMemo(() => mockOrders.filter((o) => !status || o.status === status), [status])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded px-3 py-2">
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      <div className="overflow-x-auto bg-white border rounded-lg">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b last:border-b-0">
                <td className="px-4 py-2">{o.id}</td>
                <td className="px-4 py-2">{o.customer}</td>
                <td className="px-4 py-2">{new Date(o.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 capitalize">{o.status}</td>
                <td className="px-4 py-2 text-right">৳{o.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


