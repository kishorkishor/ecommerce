'use client'

import { useParams } from 'next/navigation'
import { useProduct } from '@/hooks/useProduct'
import { useProducts } from '@/hooks/useProducts'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import { useMemo, useState } from 'react'
import Link from 'next/link'

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id as string
  const { data: product, isLoading, isError } = useProduct(id)
  const { data: related } = useProducts({ per_page: 8 })
  const addItem = useCartStore((s) => s.addItem)

  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<'specs' | 'description' | 'reviews'>('specs')

  const gallery = useMemo(() => {
    if (!product) return [] as string[]
    const imgs = [product.image, ...(product.images ?? [])].filter(Boolean) as string[]
    return imgs.length ? imgs : [product.image]
  }, [product])

  if (isLoading) return <div className="p-6">Loading...</div>
  if (isError || !product) return <div className="p-6">Product not found.</div>

  const showImage = activeImage || gallery[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gallery */}
        <div className="lg:col-span-5">
          <div className="bg-white border rounded-lg p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={showImage} alt={product.name} className="w-full h-auto rounded" />
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {gallery.slice(0, 5).map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt="thumb"
                onClick={() => setActiveImage(src)}
                className={`h-16 w-full object-cover rounded border cursor-pointer ${
                  (activeImage || gallery[0]) === src ? 'ring-2 ring-orange-500' : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-7">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-orange-600 font-bold text-2xl">{formatPrice(product.price)}</span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-gray-400 line-through">{formatPrice(product.original_price)}</span>
            )}
            {product.discount_percentage && (
              <span className="bg-red-100 text-red-700 text-sm font-semibold px-2 py-0.5 rounded">
                -{product.discount_percentage}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span>
              Status:{' '}
              <span className="font-medium text-green-600">{product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</span>
            </span>
            <span>Brand: <span className="font-medium">Generic</span></span>
            <span>Code: <span className="font-medium">{product.id}</span></span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm">
            <span className="font-semibold">200৳ Discount</span> on Checkout — Online / Cash Payment
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Model: GS27FA (demo)</li>
              <li>Resolution: FHD (1920 x 1080)</li>
              <li>Display: IPS, 180Hz, 1ms MPRT</li>
              <li>Ports: HDMI, DP, Earphone</li>
              <li>Features: HDR, Low Blue Light</li>
            </ul>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2"
              >
                -
              </button>
              <span className="px-4">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2"
              >
                +
              </button>
            </div>
            <button
              className="bg-orange-600 text-white px-5 py-2 rounded font-medium"
              onClick={() => addItem(product, qty)}
            >
              Buy Now
            </button>
            <button
              className="border px-5 py-2 rounded font-medium"
              onClick={() => addItem(product, qty)}
            >
              Add to Cart
            </button>
            <button
              className="border px-4 py-2 rounded font-medium"
              onClick={() => {
                import('@/store/wishlist').then(({ useWishlistStore }) => {
                  useWishlistStore.getState().toggle(product)
                })
              }}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex gap-2 border-b">
          {([
            { k: 'specs', label: 'Specification' },
            { k: 'description', label: 'Description' },
            { k: 'reviews', label: 'Reviews (0)' },
          ] as const).map((t) => (
            <button
              key={t.k}
              className={`px-4 py-2 text-sm font-medium ${tab === t.k ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-600'}`}
              onClick={() => setTab(t.k)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="bg-white border rounded-b-lg p-4 text-sm text-gray-700">
          {tab === 'specs' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Demo spec one</li>
              <li>Demo spec two</li>
              <li>Demo spec three</li>
            </ul>
          )}
          {tab === 'description' && <p>{product.description || 'No description available.'}</p>}
          {tab === 'reviews' && <p>No reviews yet.</p>}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {related?.data?.slice(0, 8).map((p) => (
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
    </div>
  )
}


