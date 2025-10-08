'use client'

import Link from 'next/link'
import { useCartStore, getCartTotals } from '@/store/cart'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, increase, decrease, removeItem, clear } = useCartStore()
  const entries = Object.values(items)
  const { itemCount, subtotal } = getCartTotals(items)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {entries.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-lg border">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link href="/" className="text-orange-600 font-medium">Continue Shopping →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {entries.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4 bg-white p-4 rounded-lg border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">{formatPrice(product.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => decrease(product.id)} className="px-3 py-1 border rounded">-</button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button onClick={() => increase(product.id)} className="px-3 py-1 border rounded">+</button>
                </div>
                <div className="w-24 text-right font-medium">
                  {formatPrice(product.price * quantity)}
                </div>
                <button onClick={() => removeItem(product.id)} className="ml-2 text-sm text-red-600">Remove</button>
              </div>
            ))}
          </div>
          <div className="bg-white p-4 rounded-lg border h-fit">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm mb-2">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
            <div className="flex justify-between font-medium mb-4">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <button className="w-full bg-orange-600 text-white py-2 rounded font-medium mb-2">Checkout</button>
            <button onClick={clear} className="w-full border py-2 rounded text-sm">Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  )
}


