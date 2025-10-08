'use client'

import { useEffect, useRef, useState } from 'react'
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
  const [authed, setAuthed] = useState(false)

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

  useEffect(() => {
    import('@/store/auth').then(({ useAuthStore }) => {
      const apply = (state: any) => setAuthed(!!state.token)
      const unsub = useAuthStore.subscribe(apply)
      apply(useAuthStore.getState())
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
          <div className="flex-1 max-w-3xl mx-2 sm:mx-4 lg:mx-8 hidden lg:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
                  <input
                type="text"
                placeholder="Search for products, brands, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-24 py-4 border border-transparent rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent shadow-lg text-lg"
              />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
                    <button
                      aria-label="Visual search"
                      className="h-9 w-9 shrink-0 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Camera className="h-5 w-5 text-gray-500" />
                    </button>
                    <Link
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      className="shrink-0 px-3 h-9 inline-flex items-center justify-center rounded-lg bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700 transition-colors"
                    >
                      Search
                    </Link>
                  </div>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Currency Switcher */}
                <div className="hidden sm:block">
                  <CurrencySwitcher />
                </div>

            {/* Notifications */}
            {authed && (
              <button className="relative p-3 text-white hover:bg-orange-600 rounded-lg transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
            )}

            {/* Cart Icon */}
                <Link href="/cart" className="relative p-2 sm:p-3 text-white hover:bg-orange-600 rounded-lg transition-colors">
              <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
            </Link>

            {/* Wishlist Icon */}
                <Link href="/wishlist" className="relative p-2 sm:p-3 text-white hover:bg-orange-600 rounded-lg transition-colors">
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
              className="block w-full pl-12 pr-24 py-4 border border-transparent rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent shadow-lg text-lg"
            />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
                  <button
                    aria-label="Visual search"
                    className="h-9 w-9 shrink-0 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Camera className="h-5 w-5 text-gray-500" />
                  </button>
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    className="shrink-0 px-3 h-9 inline-flex items-center justify-center rounded-lg bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700 transition-colors"
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

function CurrencySwitcher() {
  const [value, setValue] = useState<'BDT' | 'USD' | 'AED' | 'INR' | 'PKR' | 'PHP' | 'SAR' | 'EUR'>('BDT')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    import('@/store/currency').then(({ useCurrencyStore }) => {
      const apply = (s: any) => setValue(s.currency)
      const unsub = useCurrencyStore.subscribe(apply)
      apply(useCurrencyStore.getState())
      return () => unsub()
    })
  }, [])

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const el = containerRef.current
      if (!el) return
      if (!el.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const options: Array<typeof value> = ['BDT','USD','AED','INR','PKR','PHP','SAR','EUR']

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="bg-gradient-to-r from-orange-400/30 to-orange-600/30 backdrop-blur-md backdrop-saturate-150 text-white border border-orange-200/40 rounded-xl px-3 py-2 text-base font-semibold shadow-lg hover:from-orange-400/40 hover:to-orange-600/40 focus:outline-none focus:ring-2 focus:ring-orange-200/60 transition-colors min-w-[92px] text-left"
      >
        {value}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl border border-orange-200/40 bg-gradient-to-br from-orange-500/20 to-orange-700/20 backdrop-blur-xl backdrop-saturate-150 shadow-2xl overflow-hidden z-50">
          <ul className="py-1">
            {options.map((opt) => (
              <li key={opt}>
                <button
                  onClick={() => {
                    setValue(opt)
                    setOpen(false)
                    import('@/store/currency').then(({ useCurrencyStore }) => {
                      useCurrencyStore.getState().setCurrency(opt)
                    })
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2 text-base text-white hover:bg-orange-500/30 transition-colors',
                    opt === value && 'bg-orange-500/40'
                  )}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
