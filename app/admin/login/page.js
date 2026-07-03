'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      router.push('/admin')
      router.refresh()
    }
    setLoading(false)
  }

  async function handleSignUp(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
    } else {
      setSuccess('Account created! You can now log in.')
      setIsSignUp(false)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-yellow-950 to-gray-900 flex items-center justify-center px-4">

      {/* Background orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>

      <div className="relative bg-gray-900 border border-yellow-500/20 rounded-3xl shadow-2xl w-full max-w-md p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔮</div>
          <h1 className="text-2xl font-bold text-white">Guruji Thulsi Acharya</h1>
          <p className="text-yellow-500 text-sm mt-1">Astrology Center — Admin Panel</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-800 rounded-xl p-1 mb-6">
          <button onClick={() => { setIsSignUp(false); setError(null) }} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${!isSignUp ? 'bg-yellow-700 text-white' : 'text-gray-400 hover:text-white'}`}>
            Login
          </button>
          <button onClick={() => { setIsSignUp(true); setError(null) }} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${isSignUp ? 'bg-yellow-700 text-white' : 'text-gray-400 hover:text-white'}`}>
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 placeholder-gray-500"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
              ❌ {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-xl">
              ✅ {success}
            </div>
          )}

          <button
            onClick={isSignUp ? handleSignUp : handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/20 transition-all disabled:opacity-50"
          >
            {loading ? '⏳ Please wait...' : isSignUp ? '🚀 Create Account' : '🔐 Login to Dashboard'}
          </button>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          Protected admin area — authorized users only
        </p>

      </div>
    </div>
  )
}