'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Ratings & Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <div className="text-xl font-bold text-yellow-700 leading-tight">
          Guruji Thulsi Acharya
          <div className="text-sm font-medium text-yellow-600">Astrology Center</div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-gray-700 hover:text-yellow-700 font-medium transition">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+919731561377" className="text-yellow-700 font-semibold hover:underline">+91 9731561377</a>
          <a href="#contact" className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800 transition text-sm">Book Appointment</a>
        </div>

        <button className="md:hidden text-gray-700 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-gray-700 hover:text-yellow-700 font-medium" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <a href="tel:+919731561377" className="text-yellow-700 font-semibold">+91 9731561377</a>
          <a href="#contact" className="bg-yellow-700 text-white px-4 py-2 rounded text-center text-sm" onClick={() => setMenuOpen(false)}>Book Appointment</a>
        </div>
      )}
    </header>
  )
}