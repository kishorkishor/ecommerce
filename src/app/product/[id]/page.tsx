'use client'

import { useParams } from 'next/navigation'
import { useProduct } from '@/hooks/useProduct'
import { useProducts } from '@/hooks/useProducts'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id as string
  const { data: product, isLoading, isError } = useProduct(id)
  const { data: related } = useProducts({ per_page: 8 })
  const addItem = useCartStore((s) => s.addItem)

  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<'specs' | 'description' | 'seller' | 'reviews' | 'images'>('specs')
  const [shipping, setShipping] = useState<'air' | 'sea'>('air')
  const [now, setNow] = useState<number>(() => Date.now())

  const gallery = useMemo(() => {
    if (!product) return [] as string[]
    const imgs = [product.image, ...(product.images ?? [])].filter(Boolean) as string[]
    return imgs.length ? imgs : [product.image]
  }, [product])

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const offerEnd = useMemo(() => {
    const base = typeof window !== 'undefined' ? (Number(localStorage.getItem('cw-offer-base')) || Date.now()) : Date.now()
    if (typeof window !== 'undefined' && !localStorage.getItem('cw-offer-base')) {
      localStorage.setItem('cw-offer-base', String(base))
    }
    return base + (2 * 24 * 60 * 60 + 3 * 60 * 60 + 30 * 60) * 1000
  }, [])
  const remaining = Math.max(0, offerEnd - now)
  const remDays = Math.floor(remaining / (24 * 60 * 60 * 1000))
  const remHours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  const remMins = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000))
  const remSecs = Math.floor((remaining % (60 * 1000)) / 1000)

  if (isLoading) return <div className="p-6">Loading...</div>
  if (isError || !product) return <div className="p-6">Product not found.</div>

  const showImage = activeImage || gallery[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Offer Banner */}
      <div className="mb-6 rounded-xl border bg-gradient-to-r from-blue-50 to-blue-100 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="font-semibold text-lg">GOLDEN DAYS OFFER - 5% Off</div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-white px-3 py-1 text-sm font-semibold border">{remDays} Days</span>
            <span className="rounded-md bg-white px-3 py-1 text-sm font-semibold border">{remHours} Hours</span>
            <span className="rounded-md bg-white px-3 py-1 text-sm font-semibold border">{remMins} Min</span>
            <span className="rounded-md bg-white px-3 py-1 text-sm font-semibold border">{remSecs} Sec</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-600">Offer ends soon — placeholder text</div>
      </div>
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
              <li>Feature A: placeholder</li>
              <li>Feature B: placeholder</li>
              <li>Feature C: placeholder</li>
            </ul>
          </div>

          {/* Variant thumbnails */}
          <div className="mb-6">
            <div className="text-sm font-medium mb-2">Color / Variant</div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {gallery.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt="variant"
                  onClick={() => setActiveImage(src)}
                  className={`h-14 w-14 object-cover rounded border cursor-pointer ${
                    (activeImage || gallery[0]) === src ? 'ring-2 ring-orange-500' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Shipping method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => setShipping('air')}
              className={`text-left rounded-xl border p-4 ${shipping === 'air' ? 'bg-blue-100 border-blue-300' : 'bg-white'}`}
            >
              <div className="font-semibold">By Air</div>
              <div className="text-sm text-gray-600">৳1120 Per Kg</div>
            </button>
            <button
              onClick={() => setShipping('sea')}
              className={`text-left rounded-xl border p-4 ${shipping === 'sea' ? 'bg-blue-100 border-blue-300' : 'bg-white'}`}
            >
              <div className="font-semibold">By Sea</div>
              <div className="text-sm text-gray-600">৳400 Per Kg</div>
            </button>
          </div>

          {/* Shipping charge note */}
          <div className="rounded-xl border bg-amber-50 p-3 text-sm mb-4">Shipping charge placeholder — e.g., ৳680/ ৳1120 Per Kg</div>

          {/* Cost breakdown */}
          <div className="overflow-hidden rounded-xl border mb-6">
            <div className="grid grid-cols-2 gap-0">
              <div className="px-3 py-2 text-sm flex items-center gap-2 border-b bg-gray-50">From China 🇨🇳</div>
              <div className="px-3 py-2 text-sm flex items-center gap-2 border-b">To Bangladesh 🇧🇩</div>
            </div>
            {(() => {
              const weightKg = product.weight ?? 0.3
              const pricePerKg = shipping === 'air' ? 1120 : 400
              const productPrice = (product.price ?? 0) * qty
              const shippingCharge = weightKg * pricePerKg
              const totalCost = productPrice + shippingCharge
              const payNow = totalCost * 0.7
              return (
                <div className="divide-y">
                  <Row label="Product Quantity" value={String(qty)} />
                  <Row label="Product Price" value={formatPrice(productPrice)} />
                  <Row label="Shipping Charge" value={`${formatPrice(shippingCharge)} (${formatPrice(pricePerKg)}/Kg)`} />
                  <Row label="Total Cost" value={`${formatPrice(totalCost)} + local charges`} />
                  <Row label="Pay now (70%)" value={formatPrice(payNow)} />
                  <Row label="Pay on Delivery" value={`Remaining + local charges`} />
                </div>
              )
            })()}
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

          {/* Social share */}
          <div className="flex items-center gap-2 mb-2 text-sm">
            <span className="text-gray-600">Share:</span>
            <button className="rounded bg-blue-600 text-white px-2 py-1">f</button>
            <button className="rounded bg-sky-500 text-white px-2 py-1">X</button>
            <button className="rounded bg-green-500 text-white px-2 py-1">WhatsApp</button>
            <button className="rounded border px-2 py-1">Copy</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex gap-2 border-b">
          {([
            { k: 'specs', label: 'Specification' },
            { k: 'description', label: 'Description' },
            { k: 'seller', label: 'Seller Info' },
            { k: 'reviews', label: 'Reviews (0)' },
            { k: 'images', label: 'Original Images' },
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
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gray-50 p-3">
                <SpecRow name="Color" value={product?.name || '—'} />
                <SpecRow name="Style" value={null} />
                <SpecRow name="Material" value={null} />
                <SpecRow name="Popular Elements" value={null} />
                <SpecRow name="Year And Season Of Launch" value={null} />
                <SpecRow name="Lining Texture" value={null} />
                <SpecRow name="Internal Structure" value={null} />
                <SpecRow name="Hardness" value={null} />
                <SpecRow name="Outer Bag Type" value={null} />
                <SpecRow name="Brand" value={'Generic'} />
                <SpecRow name="Private Brands" value={null} />
                <SpecRow name="With Or Without Mezzanine" value={null} />
                <SpecRow name="Applicable Scenarios" value={null} />
                <SpecRow name="Function" value={null} />
              </div>
              <div className="p-3">
                <SpecRow name="Approximate Weight" value={`${(product?.weight ?? 0.3).toFixed(2)} Kg`} />
                <SpecRow name="Dimensions" value={product?.dimensions ? `${product.dimensions.length}x${product.dimensions.width}x${product.dimensions.height}` : null} />
                <SpecRow name="Category" value={product?.category?.name ?? null} />
              </div>
            </div>
          )}
          {tab === 'description' && <p>{product.description || 'No description available.'}</p>}
          {tab === 'seller' && (
            <div>
              <p className="mb-2">Seller Name: <span className="font-medium">Placeholder</span></p>
              <p>Rating: <span className="font-medium">N/A</span></p>
            </div>
          )}
          {tab === 'reviews' && <p>No reviews yet.</p>}
          {tab === 'images' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="original" className="w-full h-32 object-cover rounded border" />
              ))}
            </div>
          )}
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-2">
      <div className="px-3 py-2 text-gray-600 text-sm border-r bg-gray-50">{label}</div>
      <div className="px-3 py-2 text-sm">{value}</div>
    </div>
  )
}

function SpecRow({ name, value }: { name: string; value: string | null }) {
  return (
    <div className="flex items-center justify-between border-b py-2 text-sm">
      <span className="text-gray-600">{name}</span>
      <span className="text-gray-900">{value ?? '—'}</span>
    </div>
  )
}
