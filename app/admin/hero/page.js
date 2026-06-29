'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminHero() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('settings').select('*')
      const map = {}
      data?.forEach(item => { map[item.key] = item.value })
      setSettings(map)
      setLoading(false)
    }
    fetchSettings()
  }, [])

  async function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploadingImage(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `hero-image-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file)
    if (uploadError) { alert('Upload failed: ' + uploadError.message); setUploadingImage(false); return }

    const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
    await supabase.from('settings').upsert({ key: 'hero_image', value: urlData.publicUrl })
    setSettings({ ...settings, hero_image: urlData.publicUrl })
    setUploadingImage(false)
  }

  async function handleSaveAll() {
    setSaving(true)
    const keys = Object.keys(settings).filter(k => k.startsWith('hero_'))
    await Promise.all(keys.map(key => supabase.from('settings').upsert({ key, value: settings[key] })))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) return <div className="p-10 text-gray-500">Loading...</div>

  return (
    <div className="py-10 px-8">
      <div className="max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Hero Section</h1>
            <p className="text-gray-500 mt-1">Edit the main banner content and image</p>
          </div>
          <button onClick={handleSaveAll} disabled={saving} className="bg-yellow-700 text-white px-6 py-2 rounded-lg hover:bg-yellow-800 transition font-semibold disabled:opacity-50">
            {saving ? 'Saving...' : saved ? '✅ Saved!' : 'Save All'}
          </button>
        </div>

        {/* Hero Image Upload */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <h3 className="font-bold text-gray-800 mb-4">Hero Image</h3>
          <div className="flex items-center gap-6">
            <div className="w-40 h-48 bg-yellow-50 rounded-xl overflow-hidden border-2 border-yellow-200 flex items-center justify-center">
              {settings.hero_image ? (
                <img src={settings.hero_image} alt="Hero" className="w-full h-full object-cover" />
              ) : (
                <span className="text-5xl">🔮</span>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-3">Upload the main banner image</p>
              <label className="cursor-pointer bg-yellow-50 border border-yellow-300 text-yellow-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-yellow-100 transition">
                {uploadingImage ? '⏳ Uploading...' : '📷 Upload Image'}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
              </label>
            </div>
          </div>
        </div>

        {/* Text Fields */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          {[
            { key: 'hero_badge', label: 'Badge Text' },
            { key: 'hero_title', label: 'Main Title' },
            { key: 'hero_description', label: 'Description', textarea: true },
            { key: 'hero_stat1', label: 'Stat 1' },
            { key: 'hero_stat2', label: 'Stat 2' },
            { key: 'hero_stat3', label: 'Stat 3' },
            { key: 'hero_stat4', label: 'Stat 4' },
            { key: 'hero_phone', label: 'Phone Number' },
          ].map(({ key, label, textarea }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              {textarea ? (
                <textarea value={settings[key] || ''} onChange={(e) => setSettings({ ...settings, [key]: e.target.value })} rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-yellow-500" />
              ) : (
                <input type="text" value={settings[key] || ''} onChange={(e) => setSettings({ ...settings, [key]: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-yellow-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}