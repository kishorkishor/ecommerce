'use client'

import Link from 'next/link'
import { useWishlistStore } from '@/store/wishlist'
import { formatPrice } from '@/lib/utils'

export default function WishlistPage() {
  const { items, remove, clear } = useWishlistStore()
  const list = Object.values(items)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Wishlist</h1>
        {list.length > 0 && (
          <button onClick={clear} className="text-sm border px-3 py-1 rounded">Clear</button>
        )}
      </div>
      {list.length === 0 ? (
        <div className="p-12 text-center bg-white border rounded">No items yet.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map((p) => (
            <div key={p.id} className="bg-white border rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
              <div className="p-3">
                <Link href={`/product/${p.id}`} className="font-medium text-sm line-clamp-2 block mb-1">{p.name}</Link>
                <div className="text-orange-600 font-semibold mb-2">{formatPrice(p.price)}</div>
                <button onClick={() => remove(p.id)} className="text-sm border px-3 py-1 rounded">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}



