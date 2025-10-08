'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useProducts } from '@/hooks/useProducts'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

function SearchContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const { data, isLoading, isError } = useProducts({ q, per_page: 24, page: 1 })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-4">Search: {q || 'All'}</h1>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Failed to load results.</div>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.data?.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="block bg-white border rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
            <div className="p-3">
              <h3 className="text-sm font-medium line-clamp-2">{p.name}</h3>
              <div className="text-orange-600 font-semibold">{formatPrice(p.price)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  )
}


