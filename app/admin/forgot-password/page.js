'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-yellow-950 to-gray-900 flex items-center justify-center px-4">

      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>

      <div className="relative bg-gray-900 border border-yellow-500/20 rounded-3xl shadow-2xl w-full max-w-md p-8">

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔮</div>
          <h1 className="text-2xl font-bold text-white">Reset Admin Password</h1>
          <p className="text-yellow-500 text-sm mt-1">Guruji Thulsi Acharya Astrology Center</p>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-4 rounded-xl mb-6">
              ✅ If an account exists for that email, a password reset link has been sent. Check your inbox.
            </div>
            <Link href="/admin/login" className="text-yellow-500 text-sm hover:underline">
              ← Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 placeholder-gray-500"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/20 transition-all disabled:opacity-50"
            >
              {loading ? '⏳ Sending...' : '📧 Send Reset Link'}
            </button>

            <div className="text-center">
              <Link href="/admin/login" className="text-gray-400 text-sm hover:text-yellow-500">
                ← Back to login
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  )
}