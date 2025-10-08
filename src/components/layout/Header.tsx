'use client'

import { useEffect, useState } from 'react'
import { Search, ShoppingCart, Heart, User, Camera, Menu, X, Bell, Settings } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
      const [isMenuOpen, setIsMenuOpen] = useState(false)
      const [searchQuery, setSearchQuery] = useState('')

  const [cartCount, setCartCount] = useState(0)
  const [wishCount, setWishCount] = useState(0)

  useEffect(() => {
    import('@/store/cart').then(({ useCartStore, getCartTotals }) => {
      const unsub = useCartStore.subscribe((state) => {
        const { itemCount } = getCartTotals(state.items)
        setCartCount(itemCount)
      })
      // initialize
      const { itemCount } = getCartTotals(useCartStore.getState().items)
      setCartCount(itemCount)
      return () => unsub()
    })
  }, [])

  useEffect(() => {
    import('@/store/wishlist').then(({ useWishlistStore }) => {
      const unsub = useWishlistStore.subscribe((state) => {
        setWishCount(Object.keys(state.items).length)
      })
      setWishCount(Object.keys(useWishlistStore.getState().items).length)
      return () => unsub()
    })
  }, [])

  return (
        <header className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg sticky top-0 z-50 border-b-2 border-orange-400">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex items-center justify-between h-20">
          {/* Left side - Menu button and Logo */}
          <div className="flex items-center space-x-6">
            {/* Menu Button */}
            <button
              onClick={onMenuClick}
              className="p-3 text-white hover:bg-orange-600 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                <span className="text-orange-600 font-bold text-xl">CW</span>
              </div>
              <span className="text-white font-bold text-2xl hidden sm:block">ChinaWholesale</span>
            </Link>
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-3xl mx-8 hidden lg:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
                  <input
                type="text"
                placeholder="Search for products, brands, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-16 py-4 border border-transparent rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent shadow-lg text-lg"
              />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-3">
                    <Camera className="h-6 w-6 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                    <Link
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      className="text-sm text-orange-600 font-semibold hover:underline"
                    >
                      Search
                    </Link>
                  </div>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
                <div className="hidden sm:block">
                  <LocaleSwitcher />
                </div>

            {/* Notifications */}
            <button className="relative p-3 text-white hover:bg-orange-600 rounded-lg transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Cart Icon */}
                <Link href="/cart" className="relative p-3 text-white hover:bg-orange-600 rounded-lg transition-colors">
              <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
            </Link>

            {/* Wishlist Icon */}
                <Link href="/wishlist" className="relative p-3 text-white hover:bg-orange-600 rounded-lg transition-colors">
                  <Heart className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishCount}
                  </span>
                </Link>

                {/* User Account */}
                <div className="relative">
                  <AccountButton />
                </div>

            {/* Settings */}
            <button className="p-3 text-white hover:bg-orange-600 rounded-lg transition-colors">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
                <input
              type="text"
              placeholder="Search for products, brands, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-16 py-4 border border-transparent rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent shadow-lg text-lg"
            />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-3">
                  <Camera className="h-6 w-6 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    className="text-sm text-orange-600 font-semibold hover:underline"
                  >
                    Search
                  </Link>
                </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-orange-700 rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-white hover:text-orange-200 py-2">
                Home
              </Link>
              <Link href="/products" className="text-white hover:text-orange-200 py-2">
                Products
              </Link>
              <Link href="/about" className="text-white hover:text-orange-200 py-2">
                About
              </Link>
              <Link href="/contact" className="text-white hover:text-orange-200 py-2">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function AccountButton() {
  const [open, setOpen] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    import('@/store/auth').then(({ useAuthStore }) => {
      const apply = (state: any) => {
        setAuthed(!!state.token)
        setName(state.user?.name ?? null)
      }
      const unsub = useAuthStore.subscribe(apply)
      apply(useAuthStore.getState())
      return () => unsub()
    })
  }, [])

  if (!authed) {
    return (
      <Link href="/sign-in" className="p-3 text-white hover:bg-orange-600 rounded-lg transition-colors">
        <User className="h-6 w-6" />
      </Link>
    )
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="p-3 text-white hover:bg-orange-600 rounded-lg transition-colors flex items-center gap-2">
        <User className="h-6 w-6" />
        <span className="hidden sm:block text-sm">{name ?? 'Account'}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-50">
          <Link href="/account" className="block px-4 py-2 text-sm hover:bg-gray-50">Account</Link>
          <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-gray-50">Orders</Link>
          <button
            onClick={() => {
              import('@/store/auth').then(({ useAuthStore }) => {
                useAuthStore.getState().signOut()
              })
              setOpen(false)
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

function LocaleSwitcher() {
  const [value, setValue] = useState<'en' | 'bn'>('en')
  useEffect(() => {
    import('@/store/locale').then(({ useLocaleStore }) => {
      const apply = (s: any) => setValue(s.locale)
      const unsub = useLocaleStore.subscribe(apply)
      apply(useLocaleStore.getState())
      return () => unsub()
    })
  }, [])

  return (
    <select
      value={value}
      onChange={(e) => {
        const v = e.target.value as 'en' | 'bn'
        setValue(v)
        import('@/store/locale').then(({ useLocaleStore }) => {
          useLocaleStore.getState().setLocale(v)
        })
      }}
      className="bg-transparent text-white border border-white/30 rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors"
    >
      <option value="en" className="bg-orange-600">EN</option>
      <option value="bn" className="bg-orange-600">বাংলা</option>
    </select>
  )
}
