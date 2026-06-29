'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }) {
  const pathname = usePathname()

  const navLinks = [
    { label: '📊 Dashboard', href: '/admin' },
    { label: '🌟 Hero Section', href: '/admin/hero' },
    { label: '👤 About Us', href: '/admin/about' },
    { label: '🔮 Services', href: '/admin/services' },
    { label: '❓ FAQs', href: '/admin/faqs' },
    { label: '⭐ Reviews', href: '/admin/reviews' },
  ]

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-gray-900 text-white flex flex-col fixed h-full z-10">
        <div className="px-6 py-6 border-b border-gray-700">
          <p className="text-yellow-500 font-bold text-lg leading-tight">Guruji Thulsi Acharya</p>
          <p className="text-gray-400 text-xs mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${pathname === link.href ? 'bg-yellow-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-gray-700 space-y-1">
          <a href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition">🌐 View Site</a>
          <a href="/admin/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-gray-800 transition">🚪 Logout</a>
        </div>
      </div>
      <div className="flex-1 ml-64 min-h-screen bg-gray-100">
        {children}
      </div>
    </div>
  )
}