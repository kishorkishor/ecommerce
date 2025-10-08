'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { useCategoryProducts } from '@/hooks/useCategoryProducts'
import { formatPrice } from '@/lib/utils'

export default function CategoryPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug as string
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(24)
  const [sort, setSort] = useState<string | undefined>(undefined)
  const { data, isLoading, isError } = useCategoryProducts(slug, page, perPage, sort)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold capitalize">{slug.replace(/-/g, ' ')}</h1>
        <div className="flex items-center gap-3">
          <select
            value={perPage}
            onChange={(e) => { setPerPage(parseInt(e.target.value, 10)); setPage(1) }}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            <option value={24}>24</option>
            <option value={48}>48</option>
            <option value={72}>72</option>
          </select>
          <select
            value={sort ?? ''}
            onChange={(e) => { setSort(e.target.value || undefined); setPage(1) }}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            <option value="">Default</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="new">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Failed to load category products.</div>}

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

      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={(data?.current_page ?? 1) <= 1}
          className="px-3 py-2 border rounded disabled:opacity-50"
        >
          PREV
        </button>
        {(() => {
          const current = data?.current_page ?? 1
          const last = data?.last_page ?? 1
          const start = Math.max(1, current - 2)
          const end = Math.min(last, start + 4)
          const pages: number[] = []
          for (let i = start; i <= end; i++) pages.push(i)
          return pages
        })().map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-2 rounded ${p === (data?.current_page ?? page) ? 'bg-orange-600 text-white' : 'border'}`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min((data?.last_page ?? p), p + 1))}
          disabled={(data?.current_page ?? 1) >= (data?.last_page ?? 1)}
          className="px-3 py-2 border rounded disabled:opacity-50"
        >
          NEXT
        </button>
      </div>
    </div>
  )
}


