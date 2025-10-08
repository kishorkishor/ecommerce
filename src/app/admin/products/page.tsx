'use client'

import { useState } from 'react'
import { MOCK_PRODUCTS } from '@/lib/mock-data'

export default function AdminProductsPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS.slice(0, 20))
  const [q, setQ] = useState('')

  const filtered = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => {
            const id = (products.length + 1).toString()
            setProducts([{ ...MOCK_PRODUCTS[0], id, name: `New Product ${id}` }, ...products])
          }}
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." className="w-full border rounded px-3 py-2 mb-4" />
      <div className="overflow-x-auto bg-white border rounded-lg">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b last:border-b-0">
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">৳{p.price.toFixed(2)}</td>
                <td className="px-4 py-2">{p.stock_quantity}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-sm border px-3 py-1 rounded" onClick={() => alert('Edit (mock)')}>Edit</button>
                  <button className="text-sm border px-3 py-1 rounded" onClick={() => setProducts(products.filter((x) => x.id !== p.id))}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}



