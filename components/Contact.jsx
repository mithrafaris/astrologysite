'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase
      .from('contacts')
      .insert([{ name: formData.name, phone: formData.phone, message: formData.message }])
    if (error) {
      setError('Something went wrong. Please try again.')
    } else {
      setSubmitted(true)
      setFormData({ name: '', phone: '', message: '' })
    }
    setLoading(false)
  }

  return (
    <section id="contact" className="py-20 px-4 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-yellow-700 font-semibold uppercase tracking-widest text-xs mb-2">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-gray-400 mt-3 text-sm">Complete the form below or reach us directly — we respond within 1 hour</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left — Form (wider) */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-md p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-center text-base">✉️</span>
              Send a Message
            </h3>

            {submitted ? (
              <div className="text-center py-14">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
                <p className="text-green-600 font-bold text-lg">Message Received!</p>
                <p className="text-gray-400 text-sm mt-2">Guruji will call you back within 1 hour.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-yellow-700 text-sm font-semibold underline underline-offset-2">
                  Send another message
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Your Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      placeholder="Rajesh Kumar"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 transition bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 transition bg-gray-50" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Your Concern</label>
                  <textarea name="message" value={formData.message} onChange={handleChange}
                    placeholder="Describe what you'd like guidance on..."
                    rows={5}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 transition bg-gray-50 resize-none" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button onClick={handleSubmit} disabled={loading}
                  className="w-full bg-yellow-700 hover:bg-yellow-800 text-white py-3.5 rounded-xl font-semibold text-sm transition disabled:opacity-50 shadow-sm shadow-yellow-200">
                  {loading ? 'Submitting...' : '🙏 Submit Message'}
                </button>
                <p className="text-center text-gray-400 text-xs">We respect your privacy. Your details are never shared.</p>
              </div>
            )}
          </div>

          {/* Right — Info + Map (narrower) */}
          <div className="lg:col-span-2 space-y-5">

            {/* Contact info cards */}
            {[
              { icon: '📍', label: 'Location', value: 'Bengaluru, Karnataka, India', href: null },
              { icon: '📞', label: 'Call / WhatsApp', value: '+91 9731561377', href: 'tel:+919731561377' },
              { icon: '✉️', label: 'Email', value: 'srigurutulasiastro@gmail.com', href: 'mailto:srigurutulasiastro@gmail.com' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md hover:border-yellow-200 transition">
                <div className="w-11 h-11 bg-yellow-50 border border-yellow-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-semibold text-gray-800 hover:text-yellow-700 transition truncate block">{item.value}</a>
                  ) : (
                    <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62208.50546193504!2d77.5703726!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a href="tel:+919731561377"
                className="flex items-center justify-center gap-2 bg-yellow-700 hover:bg-yellow-800 text-white text-sm font-semibold py-3 rounded-xl transition">
                📞 Call Now
              </a>
              <a href="https://wa.me/919731561377" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded-xl transition">
                💬 WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}