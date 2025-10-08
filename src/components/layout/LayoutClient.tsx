'use client'

import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import MobileNav from './MobileNav'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={toggleSidebar} />
      
      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        
        {/* Main Content */}
        <main className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
      
      {/* Footer - Full Width */}
      <Footer />
      
      <MobileNav />
    </div>
  )
}
