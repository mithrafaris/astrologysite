'use client'

import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none border border-yellow-500/30"
      style={{ background: theme === 'dark' ? 'rgba(234,179,8,0.15)' : 'rgba(234,179,8,0.8)' }}
      aria-label="Toggle theme"
    >
      <div className={`absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-300 shadow-md ${theme === 'dark' ? 'left-0.5 bg-gray-900' : 'left-7 bg-white'}`}>
        {theme === 'dark' ? '🌙' : '☀️'}
      </div>
    </button>
  )
}