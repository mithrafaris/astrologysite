export default function Footer() {
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Ratings & Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
       <h3 className="text-yellow-500 text-xl font-bold mb-3">Guruji Thulsi Acharya Astrology Center</h3>
          <p className="text-sm text-gray-400 leading-relaxed">Renowned Astrologer in Bangalore with 35 Years Experience. Specializing in career predictions, black magic removal, birth chart reading and more.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-gray-400 hover:text-yellow-500 text-sm transition">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">📍</span>
             <span>📍</span>
                <span>Bengaluru, India</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">📞</span>
              <a href="tel:+919731561377" className="hover:text-yellow-500 transition">+91 9731561377</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">✉️</span>
              <a href="mailto:shivasaiastro@gmail.com" className="hover:text-yellow-500 transition">srigurutulasiastro@gmail.com</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <p>© 2026 Guruji Thulsi Astrology. All rights reserved.</p>
        <p>Designed & Developed with ❤️</p>
      </div>
    </footer>
  )
}