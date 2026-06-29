'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const WHATSAPP_NUMBER = '919731561377'

export default function CallBack() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '' })
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
    const { error } = await supabase.from('callbacks').insert([{ name: formData.name, phone: formData.phone }])
    if (error) {
      setError('Something went wrong. Please try again.')
    } else {
      setSubmitted(true)
      setFormData({ name: '', phone: '' })
    }
    setLoading(false)
  }

  const handleClose = () => {
    setIsOpen(false)
    setSubmitted(false)
    setError(null)
    setFormData({ name: '', phone: '' })
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20would%20like%20to%20consult%20with%20Sri%20Shiva%20Sai%20Astrology.`

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
       <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition flex items-center justify-center">
  <img src="/whatsapp.png" alt="WhatsApp" className="w-14 h-14" />
</a>
        <button onClick={() => setIsOpen(true)} className="bg-yellow-700 text-white px-5 py-3 rounded-full shadow-lg hover:bg-yellow-800 transition font-semibold text-sm flex items-center gap-2">
          <span>📞</span> Request Callback
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
            {submitted ? (
              <div className="text-center py-8">
                <p className="text-5xl mb-4">✅</p>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Request Received!</h3>
                <p className="text-gray-500 text-sm">We will call you back within 1 hour.</p>
                <button onClick={handleClose} className="mt-6 bg-yellow-700 text-white px-6 py-2 rounded-lg hover:bg-yellow-800 transition text-sm font-semibold">Close</button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <p className="text-3xl mb-2">🔮</p>
                  <h3 className="text-xl font-bold text-gray-800">Request a Call Back</h3>
                  <p className="text-gray-500 text-sm mt-1">We will call you back within 1 hour</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-yellow-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-yellow-500" />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button onClick={handleSubmit} disabled={loading} className="w-full bg-yellow-700 text-white py-3 rounded-lg font-semibold hover:bg-yellow-800 transition disabled:opacity-50">
                    {loading ? 'Submitting...' : 'Request Call Back'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}