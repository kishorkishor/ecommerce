'use client'

import Link from 'next/link'
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-4">
              Company Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  123 Business Street, Dhaka, Bangladesh
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-orange-400" />
                <a href="mailto:info@chinawholesale.com.bd" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  info@chinawholesale.com.bd
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-orange-400" />
                <a href="tel:+8801739393868" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  +8801739393868
                </a>
              </div>
            </div>
          </div>

          {/* Customer Links */}
          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-4">
              Customer Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/retail" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Retail Purchase
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-4">
              Information
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/secured-payment" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Secured Payment
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-4">
              Social Media
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © 2024 ChinaWholesale.com.bd. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Powered by Next.js & Tailwind CSS
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Language:</span>
              <select className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 text-sm">
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
