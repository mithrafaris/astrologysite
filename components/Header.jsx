'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { useTheme } from './ThemeProvider'
import ZodiacMark from './ZodiacMark'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
})

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
})

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Ratings & Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]



function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full border border-[#C9A24B]/40 transition-all duration-300 focus:outline-none"
      style={{ background: theme === 'dark' ? 'rgba(201,162,75,0.15)' : 'rgba(201,162,75,0.7)' }}
      aria-label="Toggle theme"
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all duration-300 shadow-md ${
          theme === 'dark' ? 'left-0.5 bg-gray-900 text-yellow-400' : 'left-6 bg-white text-yellow-600'
        }`}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </div>
    </button>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`${display.variable} ${body.variable} sticky top-0 z-50 font-body transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.35)]' : 'shadow-none'
      }`}
      style={{
        background: 'linear-gradient(180deg,black 0%, #120920 100%)',
        borderBottom: '1px solid rgba(201,162,75,0.25)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

        {/* Logo mark + wordmark */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <span className="relative flex items-center justify-center w-11 h-11">
            <span className="absolute inset-0 rounded-full bg-[#C9A24B] opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-500" />
            <ZodiacMark className="w-11 h-11 transition-transform duration-700 ease-out group-hover:rotate-45" />
          </span>
          <span className="leading-tight">
            <span className="block font-display font-semibold text-[1.35rem] sm:text-[1.5rem] tracking-wide text-[#F3E9D2]">
              Guruji Thulsi Acharya
            </span>
            <span className="block text-[0.68rem] sm:text-[0.72rem] font-medium tracking-[0.22em] uppercase text-[#C9A24B]">
              Vedic Astrology &amp; Guidance
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative text-[0.92rem] font-medium text-[#E7DFF0]/85 hover:text-[#F3E9D2] transition-colors duration-200 after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-[#C9A24B] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        

          <a
            href="tel:+919731561377"
            className="flex items-center gap-2 text-[#F3E9D2] font-medium text-sm hover:text-[#C9A24B] transition-colors"
          >
            <svg className="w-4 h-4 text-[#C9A24B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +91 97315 61377
          </a>
          <a
            href="#contact"
            className="relative overflow-hidden bg-[#C9A24B] text-[#1B1030] px-5 py-2.5 rounded-sm font-semibold text-sm tracking-wide hover:bg-[#DDB865] transition-colors duration-300"
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-[#F3E9D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] rounded p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ borderTop: menuOpen ? '1px solid rgba(201,162,75,0.2)' : 'none' }}
      >
        <div className="px-5 pb-6 pt-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[#E7DFF0]/90 font-medium text-[0.95rem] hover:text-[#C9A24B] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a href="tel:+919731561377" className="text-[#F3E9D2] font-medium text-sm">
            +91 97315 61377
          </a>
          <div className="flex items-center justify-between">
            <span className="text-[#C9A24B] text-sm font-medium"></span>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
          <a
            href="#contact"
            className="bg-[#C9A24B] text-[#1B1030] px-4 py-2.5 rounded-sm text-center font-semibold text-sm"
            onClick={() => setMenuOpen(false)}
          >
            Book Appointment
          </a>
        </div>
      </div>
    </header>
  )
}