'use client'

import Link from 'next/link'

export default function AdminDashboard() {
  const cards = [
    { href: '/admin/products', title: 'Products', desc: 'Manage catalog items' },
    { href: '/admin/orders', title: 'Orders', desc: 'Track and fulfill orders' },
    { href: '/admin/users', title: 'Users', desc: 'View and manage customers' },
  ]
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="block bg-white border rounded-lg p-5 hover:shadow">
            <div className="text-lg font-semibold mb-1">{c.title}</div>
            <div className="text-sm text-gray-600">{c.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}


