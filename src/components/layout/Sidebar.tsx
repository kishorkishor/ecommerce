'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ShoppingBag, 
  Footprints, 
  Shield, 
  Baby, 
  Bike, 
  Zap, 
  Car, 
  Circle, 
  User, 
  Backpack,
  Cog, 
  ShoppingCart, 
  Heart,
  Wrench, 
  Trophy, 
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'fashion-accessories', name: 'Fashion Accessories', icon: ShoppingBag, subcategories: ['Jewelry', 'Watches', 'Bags', 'Belts'] },
  { id: 'footwear', name: 'Footwear', icon: Footprints, subcategories: ['Sneakers', 'Sandals', 'Boots', 'Heels'] },
  { id: 'anti-lost-supplies', name: 'Anti-lost Supplies', icon: Shield, subcategories: ['Trackers', 'Tags', 'Alarms'] },
  { id: 'toddler-belt', name: 'Toddler Belt', icon: Baby, subcategories: ['Safety Belts', 'Walking Harnesses'] },
  { id: 'childrens-balance-bike', name: 'Children\'s Balance Bike', icon: Bike, subcategories: ['Balance Bikes', 'Training Wheels'] },
  { id: 'scooters', name: 'Scooters', icon: Zap, subcategories: ['Electric Scooters', 'Manual Scooters'] },
  { id: 'electric-cars', name: 'Electric Cars', icon: Car, subcategories: ['Kids Cars', 'Remote Control'] },
  { id: 'tricycles', name: 'Tricycles', icon: Circle, subcategories: ['Classic Tricycles', 'Modern Tricycles'] },
  { id: 'strollers', name: 'Strollers', icon: Baby, subcategories: ['Full-size Strollers', 'Umbrella Strollers'] },
  { id: 'wheelchair-accessories', name: 'Wheelchair Accessories', icon: User, subcategories: ['Cushions', 'Wheels', 'Brakes'] },
  { id: 'backpacks-kids', name: 'Backpacks for Kids', icon: Backpack, subcategories: ['School Bags', 'Travel Bags'] },
  { id: 'bicycles', name: 'Bicycles', icon: Bike, subcategories: ['Mountain Bikes', 'Road Bikes', 'Kids Bikes'] },
  { id: 'walkers', name: 'Walkers', icon: User, subcategories: ['Baby Walkers', 'Adult Walkers'] },
  { id: 'wheeled-machines', name: 'Wheeled Machines', icon: Cog, subcategories: ['Lawn Mowers', 'Garden Tools'] },
  { id: 'childrens-wheelbarrow', name: 'Children\'s Wheelbarrow', icon: Circle, subcategories: ['Toy Wheelbarrows', 'Garden Tools'] },
  { id: 'portable-trolley', name: 'Portable Trolley', icon: ShoppingCart, subcategories: ['Shopping Carts', 'Luggage Carts'] },
  { id: 'mother-child', name: 'Mother & Child', icon: Heart, subcategories: ['Nursing Supplies', 'Baby Care'] },
  { id: 'bags-parcel', name: 'Bags & Parcel', icon: ShoppingBag, subcategories: ['Shipping Bags', 'Storage Bags'] },
  { id: 'repair-interior', name: 'Repair & Interior', icon: Wrench, subcategories: ['Tools', 'Hardware'] },
  { id: 'sports-tourism', name: 'Sports & Tourism', icon: Trophy, subcategories: ['Sports Equipment', 'Travel Gear'] },
]

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out overflow-hidden",
        "lg:relative lg:h-auto lg:translate-x-0 lg:shadow-lg lg:border-r lg:border-orange-200",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100 lg:sticky lg:top-0 lg:z-10">
          <h2 className="text-xl font-bold text-orange-800">Categories & Filters</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-orange-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-orange-700" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100%-88px)] lg:h-auto overflow-y-auto lg:overflow-visible">
          <div className="p-6 space-y-5">
            {/* Availability */}
            <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Availability</h3>
              <div className="space-y-2">
                {['In Stock', 'Pre Order', 'Up Coming'].map((option) => (
                  <label key={option} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-700">{option}</span>
                    <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500" />
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <span className="text-gray-500">to</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="text-xs text-gray-500">৳0 - ৳500,000</div>
              </div>
            </div>

            {/* Categories - Simple 2-column grid */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      className="group flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-colors text-center"
                      onClick={onClose}
                    >
                      <Icon className="w-7 h-7 text-gray-600 group-hover:text-orange-600 mb-2" />
                      <span className="text-xs font-medium text-gray-700 group-hover:text-orange-700 leading-tight">
                        {category.name}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Brand</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                {['Apple', 'Samsung', 'HP', 'Dell', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Microsoft', 'Chuwi'].map((brand) => (
                  <label key={brand} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-700">{brand}</span>
                    <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500" />
                  </label>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Features</h3>
              <div className="space-y-2">
                {['Free Shipping', 'Best Seller', 'New Arrival', 'On Sale', 'Top Rated'].map((feature) => (
                  <label key={feature} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-700">{feature}</span>
                    <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500" />
                  </label>
                ))}
              </div>
            </div>

            {/* Help Section at bottom */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">Need Help?</p>
                <a 
                  href="tel:+8801739393868" 
                  className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                >
                  Call +880 1739 393868
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
