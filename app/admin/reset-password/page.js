'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [ready, setReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Supabase automatically exchanges the recovery token in the URL
    // for a session when this page loads via the emailed link.
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true)
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/admin/login'), 2000)
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
          <h1 className="text-2xl font-bold text-white">Set New Password</h1>
          <p className="text-yellow-500 text-sm mt-1">Guruji Thulsi Acharya Astrology Center</p>
        </div>

        {!ready ? (
          <div className="text-center text-gray-400 text-sm py-6">
            Verifying reset link...
          </div>
        ) : success ? (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-4 rounded-xl text-center">
            ✅ Password updated! Redirecting to login...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
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
              {loading ? '⏳ Updating...' : '🔐 Update Password'}
            </button>
          </form>
        )}

      </div>
    </div>
  )
}