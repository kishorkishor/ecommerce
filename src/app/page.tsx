'use client'

import { ArrowRight, Star, Heart } from 'lucide-react'
import { useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'


export default function Home() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [sort, setSort] = useState<
    'popular' | 'new' | 'price_low' | 'price_high' | 'name' | undefined
  >(undefined)

  const { data, isLoading, isError } = useProducts({ per_page: perPage, page, sort })

  return (
    <div className="w-full">
      {/* Promotional Cards Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 h-80 lg:h-96">
            
            {/* Main Promotional Card - Left */}
            <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white group cursor-pointer">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative h-full p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                {/* Background Elements */}
                <div className="absolute top-4 right-8 text-6xl opacity-20">✈️</div>
                <div className="absolute bottom-4 left-4 text-4xl opacity-20">📦</div>
                <div className="absolute top-1/2 right-12 text-3xl opacity-20">🚢</div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight">
                    বিশ্বের সব ব্যবসায়িক পণ্য
                  </h2>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 text-blue-100">
                    একসাথে এক ওয়েবসাইটে
                  </h3>
                  <p className="text-lg sm:text-xl text-blue-100 mb-6 max-w-md">
                    Professional wholesale platform for Bangladesh with global product access
                  </p>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Explore Products
                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Special Offers Cards - Right */}
            <div className="space-y-6">
              
              {/* Top Card - Special Offer */}
              <div className="h-36 lg:h-44 relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white group cursor-pointer">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative h-full p-4 sm:p-6 flex flex-col justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">SKYONE</h3>
                    <p className="text-sm sm:text-base text-orange-100 mb-3">
                      এক পিস কিনতে ভিজিট করুন
                    </p>
                    <p className="text-xs sm:text-sm text-orange-200">
                      Visit to buy one piece
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Card - Shipping */}
              <div className="h-36 lg:h-44 relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white group cursor-pointer">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative h-full p-4 sm:p-6 flex flex-col justify-center">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-2xl sm:text-3xl font-bold">Sky</span>
                      <span className="text-2xl mx-2">🌍</span>
                      <span className="text-2xl sm:text-3xl font-bold">Ship</span>
                    </div>
                    <p className="text-sm sm:text-base text-blue-100 mb-2">
                      দ্রুত ও নির্ভরযোগ্য শিপমেন্ট
                    </p>
                    <p className="text-xs sm:text-sm text-blue-200">
                      Fast & Reliable Shipping
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* Featured Categories */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                Featured Categories
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600">Discover our most popular product categories</p>
            </div>
            
            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { name: 'Fashion Accessories', image: '/api/placeholder/300/200', color: 'from-pink-500 to-pink-600', icon: '💎' },
                { name: 'Footwear', image: '/api/placeholder/300/200', color: 'from-blue-500 to-blue-600', icon: '👟' },
                { name: 'Bags & Luggage', image: '/api/placeholder/300/200', color: 'from-green-500 to-green-600', icon: '👜' },
                { name: 'Watches', image: '/api/placeholder/300/200', color: 'from-purple-500 to-purple-600', icon: '⌚' },
              ].map((category, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2">
                  <div className={`h-24 sm:h-32 bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <span className="text-3xl sm:text-4xl">{category.icon}</span>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">{category.name}</h3>
                    <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors group-hover:underline text-sm sm:text-base">
                      Shop Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8 bg-white">
        <div className="w-full px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Featured Products
              </h2>
              <p className="text-gray-600">Best-selling items this month</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show:</span>
                <select
                  value={perPage}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10)
                    setPerPage(v)
                    setPage(1)
                  }}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value={20}>20</option>
                  <option value={40}>40</option>
                  <option value={60}>60</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort By:</span>
                <select
                  value={sort ?? ''}
                  onChange={(e) => {
                    const value = e.target.value as
                      | 'popular'
                      | 'new'
                      | 'price_low'
                      | 'price_high'
                      | 'name'
                      | ''
                    setSort(value === '' ? undefined : value)
                    setPage(1)
                  }}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {isLoading && Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="animate-pulse bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-40 bg-gray-200" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}

            {isError && !isLoading && (
              <div className="col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 text-center text-sm text-gray-600 py-8">
                Could not load products. Please try again later.
              </div>
            )}

            {!isLoading && !isError && data?.data?.map((product) => (
              <div key={product.id} className="group bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="relative">
                  <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl">📦</span>
                    )}
                  </div>
                  {product.discount_percentage && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                      -{product.discount_percentage}%
                    </div>
                  )}
                  <button
                    type="button"
                    aria-label="Toggle wishlist"
                    onClick={() => {
                      import('@/store/wishlist').then(({ useWishlistStore }) => {
                        useWishlistStore.getState().toggle(product)
                      })
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
                  >
                    <Heart className="w-3 h-3 text-gray-600" />
                  </button>
                </div>
                <div className="p-3">
                  <Link href={`/product/${product.id}`} className="block">
                    <h3 className="font-medium text-gray-900 mb-2 text-sm line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(N/A)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-orange-600 font-bold text-sm">{formatPrice(product.price)}</span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-gray-400 line-through text-xs ml-1">{formatPrice(product.original_price)}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">SOLD: {product.sold_count}</span>
                  </div>
                  <div className="mt-2 flex space-x-1">
                    <button
                      className="flex-1 bg-orange-600 text-white text-xs py-1.5 px-2 rounded font-medium hover:bg-orange-700 transition-colors"
                      onClick={() => {
                        // Lazy import to avoid SSR issues
                        import('../store/cart').then(({ useCartStore }) => {
                          useCartStore.getState().addItem(product, 1)
                        })
                      }}
                    >
                      Add to Cart
                    </button>
                    <button className="px-2 py-1.5 border border-gray-300 rounded text-xs hover:bg-gray-50 transition-colors">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                PREV
              </button>
              {(() => {
                const current = data?.current_page ?? 1
                const last = data?.last_page ?? 1
                const start = Math.max(1, current - 2)
                const end = Math.min(last, start + 4)
                const pages = [] as number[]
                for (let i = start; i <= end; i++) pages.push(i)
                return pages
              })().map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    p === (data?.current_page ?? page)
                      ? 'bg-orange-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min((data?.last_page ?? p), p + 1))}
                disabled={(data?.current_page ?? 1) >= (data?.last_page ?? 1)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
