'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Grid3X3, User, Phone, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Categories',
      href: '/categories',
      icon: Grid3X3,
    },
    {
      name: 'Account',
      href: '/account',
      icon: User,
    },
    {
      name: 'Call',
      href: 'tel:+8801739393868',
      icon: Phone,
    },
    {
      name: 'Cart',
      href: '/cart',
      icon: ShoppingCart,
    },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-3 px-2 text-xs transition-colors",
                isActive 
                  ? "text-orange-600 bg-orange-50" 
                  : "text-gray-600 hover:text-orange-600"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 mb-1",
                isActive ? "text-orange-600" : "text-gray-600"
              )} />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
