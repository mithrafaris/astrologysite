'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please enter your name and phone number.')
      return
    }
    setLoading(true)
    setError(null)
    const { error: dbError } = await supabase
      .from('contacts')
      .insert([{ name: formData.name.trim(), phone: formData.phone.trim(), message: formData.message.trim() }])
    if (dbError) {
      setError('Something went wrong. Please try again.')
    } else {
      setSubmitted(true)
      setFormData({ name: '', phone: '', message: '' })
    }
    setLoading(false)
  }

  const INFO = [
    { icon: '📍', label: 'Location', value: 'Bengaluru, Karnataka, India', href: null },
    { icon: '📞', label: 'Call / WhatsApp', value: '+91 9731561377', href: 'tel:+919731561377' },
    { icon: '✉️', label: 'Email', value: 'srigurutulasiastro@gmail.com', href: 'mailto:srigurutulasiastro@gmail.com' },
  ]

  return (
    <section id="contact" className="scroll-mt-20 bg-gray-950 py-20 px-4 relative overflow-hidden">

      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-orange-600 opacity-5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500 opacity-5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-700 opacity-5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-white opacity-[0.02] text-[300px] font-bold">ॐ</span>
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500"></div>
            <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest">🔱 Seek Guidance 🔱</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Guruji</span>
          </h2>
          <p className="text-gray-500 text-sm">Reach out for divine guidance — we respond within 1 hour</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Form */}
          <div className="lg:col-span-3 bg-gray-900 border border-yellow-500/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-2 right-4 text-yellow-500/5 text-8xl font-bold select-none">ॐ</div>

            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-9 h-9 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center justify-center text-base flex-shrink-0">✉️</span>
              Send a Message
            </h3>

            {submitted ? (
              <div className="text-center py-14">
                <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🙏</div>
                <p className="text-yellow-400 font-bold text-xl mb-2">Jai Shiva! 🔱</p>
                <p className="text-white font-semibold">Message Received!</p>
                <p className="text-gray-500 text-sm mt-2">Guruji will call you back within 1 hour.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-yellow-500 text-sm font-semibold underline underline-offset-2 hover:text-yellow-400 transition">
                  Send another message
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Your Name <span className="text-red-400">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/10 transition placeholder-gray-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Phone Number <span className="text-red-400">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/10 transition placeholder-gray-600" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Your Concern</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Describe what you'd like guidance on..." rows={5} className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/10 transition placeholder-gray-600 resize-none" />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button onClick={handleSubmit} disabled={loading} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl font-bold text-sm transition disabled:opacity-50 hover:shadow-lg hover:shadow-yellow-500/20 hover:scale-[1.01]">
                  {loading ? '⏳ Submitting…' : '🙏 Submit Message'}
                </button>

                <p className="text-center text-gray-600 text-xs">We respect your privacy. Your details are never shared.</p>
              </div>
            )}
          </div>

          {/* Info + Map */}
          <div className="lg:col-span-2 space-y-4">

            {/* Contact info cards */}
            {INFO.map((item, i) => (
              <div key={i} className="bg-gray-900 border border-yellow-500/20 rounded-2xl p-4 flex items-center gap-4 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10 transition-all">
                <div className="w-11 h-11 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-semibold text-gray-300 hover:text-yellow-400 transition break-all block">{item.value}</a>
                  ) : (
                    <p className="text-sm font-semibold text-gray-300 break-words">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-yellow-500/20 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62208.50546193504!2d77.5703726!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="200"
                title="Location map"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
              <a href="tel:+919731561377" className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/20 transition">📞 Call Now</a>
              <a href="https://wa.me/919731561377" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-3 rounded-xl transition">💬 WhatsApp</a>
            </div>

            {/* Divine message */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-4 text-center">
              <p className="text-yellow-400 text-2xl mb-1">🔱</p>
              <p className="text-yellow-400 font-semibold text-sm">Har Har Mahadev</p>
              <p className="text-gray-600 text-xs mt-1">May Lord Shiva guide your path</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}