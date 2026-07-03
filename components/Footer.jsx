import { Cormorant_Garamond, Inter } from 'next/font/google'
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

export default function Footer() {
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Ratings & Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ]

  const services = [
    'Love & Marriage',
    'Career & Business',
    'Health Problems',
    'Family Disputes',
    'Negative Energy',
    'Future Predictions',
  ]

  return (
    <footer
      className={`${display.variable} ${body.variable} font-body relative overflow-hidden`}
      style={{
        background: 'linear-gradient(180deg,black 0%, #120920 100%)',
        borderTop: '1px solid rgba(201,162,75,0.18)',
      }}
    >
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-[#C9A24B] opacity-[0.06] blur-3xl rounded-full pointer-events-none" />
      <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none select-none">
        <span className="text-[#ceb276] opacity-[0.04] text-[200px] font-bold leading-none">ॐ</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">

        {/* Top section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <ZodiacMark className="w-10 h-10 shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-[#F3E9D2] text-lg leading-tight">
                  Guruji Thulsi Acharya
                </h3>
                <p className="text-[0.68rem] tracking-[0.18em] uppercase text-[#C9A24B]/80">
                  Astrology Center, Bengaluru
                </p>
              </div>
            </div>
            <p className="text-[#B9AFC9] text-sm leading-relaxed mb-6 max-w-md">
              Renowned Astrologer in Bengaluru with 35+ Years of Experience. Blessed by Lord Shiva, specializing in Vedic Astrology, Tantra Vidya, career predictions, black magic removal, and spiritual healing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F3E9D2] font-semibold mb-5 flex items-center gap-2 text-sm tracking-wide">
              <span className="text-[#C9A24B] text-xs">🔱</span> Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#8A7FA3] hover:text-[#C9A24B] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#C9A24B]/40 rounded-full group-hover:bg-[#C9A24B] transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#F3E9D2] font-semibold mb-5 flex items-center gap-2 text-sm tracking-wide">
              <span className="text-[#C9A24B] text-xs">🔱</span> Our Services
            </h4>
            <ul className="space-y-3 mb-6">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-[#8A7FA3] hover:text-[#C9A24B] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#C9A24B]/40 rounded-full group-hover:bg-[#C9A24B] transition-colors" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divine quote */}
        <div
          className="text-center mb-10 py-6"
          style={{ borderTop: '1px solid rgba(201,162,75,0.15)', borderBottom: '1px solid rgba(201,162,75,0.15)' }}
        >
          <p className="text-[#C9A24B]/70 text-lg font-semibold tracking-widest">🔱 ॐ नमः शिवाय 🔱</p>
          <p className="text-[#6E6485] text-xs mt-1">Om Namah Shivaya — I bow to Lord Shiva</p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6E6485]">
          <p>© 2026 Guruji Thulsi Acharya Astrology Center. All rights reserved.</p>
          <p>Designed &amp; Developed with 🔱</p>
        </div>

      </div>
    </footer>
  )
}