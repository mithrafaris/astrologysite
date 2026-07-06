'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  const navLinks = [
    { label: '📊 Dashboard', href: '/admin' },
    { label: '🌟 Hero Section', href: '/admin/hero' },
    { label: '👤 About Us', href: '/admin/about' },
    { label: '🔮 Services', href: '/admin/services' },
    { label: '❓ FAQs', href: '/admin/faqs' },
    { label: '⭐ Reviews', href: '/admin/reviews' },
  ]

  const isPublicAuthPage = pathname === '/admin/login' || pathname === '/admin/forgot-password' || pathname === '/admin/reset-password'

  useEffect(() => {
    if (isPublicAuthPage) return

    let active = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return
      if (!session) {
        router.replace('/admin/login')
      } else {
        setChecked(true)
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/admin/login')
      }
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [isPublicAuthPage, router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  if (isPublicAuthPage) return <>{children}</>

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500">
        Checking session…
      </div>
    )
  }

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
          <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-gray-800 transition">🚪 Logout</button>
        </div>
      </div>
      <div className="flex-1 ml-64 min-h-screen bg-gray-100">
        {children}
      </div>
    </div>
  )
}