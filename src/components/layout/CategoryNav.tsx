'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

export default function CategoryNav() {

  const categories = [
    { id: 1, name: 'Fashion Accessories', slug: 'fashion-accessories' },
    { id: 2, name: 'Footwear', slug: 'footwear' },
    { id: 3, name: 'Anti-lost Supplies', slug: 'anti-lost-supplies' },
    { id: 4, name: 'Toddler Belt', slug: 'toddler-belt' },
    { id: 5, name: 'Children\'s Balance Bike', slug: 'childrens-balance-bike' },
    { id: 6, name: 'Scooters', slug: 'scooters' },
    { id: 7, name: 'Electric Cars', slug: 'electric-cars' },
    { id: 8, name: 'Tricycles', slug: 'tricycles' },
    { id: 9, name: 'Strollers', slug: 'strollers' },
    { id: 10, name: 'Accessories for Wheelchairs and Seats', slug: 'wheelchair-accessories' },
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Category Grid */}
        <div className="hidden md:block py-4">
          <div className="grid grid-cols-5 lg:grid-cols-10 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group flex flex-col items-center p-3 rounded-lg hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-all duration-200"
              >
                <div className="w-8 h-8 flex items-center justify-center text-gray-600 group-hover:text-orange-600 transition-colors">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-xs text-center text-gray-700 group-hover:text-orange-700 mt-1 leading-tight">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Category Scroll */}
        <div className="md:hidden py-3">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {categories.slice(0, 10).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex-shrink-0 flex flex-col items-center p-2 rounded-lg hover:bg-orange-50 transition-colors min-w-[60px]"
              >
                <div className="w-6 h-6 flex items-center justify-center text-gray-600">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-xs text-center text-gray-700 mt-1 leading-tight">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
