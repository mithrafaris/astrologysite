'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const PLATFORMS = ['justdial', 'google', 'facebook']

const emptyForm = { name: '', location: '', review: '', rating: 5, platform: 'google' }

export default function AdminReviews() {
  const [settings, setSettings]         = useState({})
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading]           = useState(true)
  const [saving, setSaving]             = useState(false)
  const [saved, setSaved]               = useState(false)
  const [form, setForm]                 = useState(emptyForm)
  const [editId, setEditId]             = useState(null)
  const [submitting, setSubmitting]     = useState(false)
  const [deletingId, setDeletingId]     = useState(null)

  useEffect(() => { fetchAll() }, [])

  async function fetchAll() {
    const [{ data: sData }, { data: tData }] = await Promise.all([
      supabase.from('settings').select('*'),
      supabase.from('testimonials').select('*').order('created_at', { ascending: false })
    ])
    const map = {}
    sData?.forEach(item => { map[item.key] = item.value })
    setSettings(map)
    setTestimonials(tData || [])
    setLoading(false)
  }

  async function handleSaveUrls() {
    setSaving(true)
    const keys = PLATFORMS.map(p => `review_${p}_url`)
    await Promise.all(keys.map(key => supabase.from('settings').upsert({ key, value: settings[key] || '' })))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handleSubmitTestimonial() {
    if (!form.name.trim() || !form.review.trim()) return
    setSubmitting(true)
    if (editId) {
      await supabase.from('testimonials').update(form).eq('id', editId)
      setEditId(null)
    } else {
      await supabase.from('testimonials').insert(form)
    }
    setForm(emptyForm)
    await fetchAll()
    setSubmitting(false)
  }

  async function handleDelete(id) {
    setDeletingId(id)
    await supabase.from('testimonials').delete().eq('id', id)
    await fetchAll()
    setDeletingId(null)
  }

  function handleEdit(t) {
    setForm({ name: t.name, location: t.location || '', review: t.review, rating: t.rating || 5, platform: t.platform || 'google' })
    setEditId(t.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) return <div className="p-10 text-gray-500">Loading...</div>

  return (
    <div className="py-10 px-8">
      <div className="max-w-3xl space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Reviews</h1>
            <p className="text-gray-500 mt-1">Manage platform links and testimonials</p>
          </div>
        </div>

        {/* ── Platform URLs ── */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-800 text-lg">Platform Review Links</h2>
            <button onClick={handleSaveUrls} disabled={saving} className="bg-yellow-700 text-white px-5 py-2 rounded-lg hover:bg-yellow-800 transition text-sm font-semibold disabled:opacity-50">
              {saving ? 'Saving...' : saved ? '✅ Saved!' : 'Save Links'}
            </button>
          </div>
          <div className="space-y-4">
            {PLATFORMS.map(p => (
              <div key={p}>
                <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">{p} Review URL</label>
                <input
                  type="text"
                  value={settings[`review_${p}_url`] || ''}
                  onChange={e => setSettings({ ...settings, [`review_${p}_url`]: e.target.value })}
                  placeholder={`https://${p}.com/...`}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Add / Edit Testimonial ── */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-5">
            {editId ? '✏️ Edit Testimonial' : '➕ Add Testimonial'}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Customer Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Rajesh Kumar"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                  placeholder="Bengaluru"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Review *</label>
              <textarea value={form.review} onChange={e => setForm({ ...form, review: e.target.value })}
                rows={3} placeholder="Write the customer's review here..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Rating</label>
                <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500">
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Platform</label>
                <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500">
                  {PLATFORMS.map(p => <option key={p} value={p} className="capitalize">{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={handleSubmitTestimonial} disabled={submitting || !form.name.trim() || !form.review.trim()}
                className="bg-yellow-700 text-white px-6 py-2 rounded-lg hover:bg-yellow-800 transition text-sm font-semibold disabled:opacity-50">
                {submitting ? 'Saving...' : editId ? 'Update Testimonial' : 'Add Testimonial'}
              </button>
              {editId && (
                <button onClick={() => { setEditId(null); setForm(emptyForm) }}
                  className="border border-gray-300 text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-semibold">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Testimonials List ── */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-5">All Testimonials ({testimonials.length})</h2>
          {testimonials.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No testimonials yet. Add your first one above.</p>
          ) : (
            <div className="space-y-4">
              {testimonials.map(t => (
                <div key={t.id} className="border border-gray-100 rounded-xl p-4 flex gap-4 items-start hover:bg-gray-50 transition">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {(t.name || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                      {t.location && <span className="text-gray-400 text-xs">• {t.location}</span>}
                      <span className="text-yellow-500 text-xs">{'★'.repeat(t.rating || 5)}</span>
                      <span className="ml-auto text-xs text-gray-400 capitalize bg-gray-100 px-2 py-0.5 rounded-full">{t.platform}</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{t.review}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => handleEdit(t)}
                      className="text-xs text-yellow-700 border border-yellow-300 px-3 py-1 rounded-lg hover:bg-yellow-50 transition font-medium">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(t.id)} disabled={deletingId === t.id}
                      className="text-xs text-red-600 border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50 transition font-medium disabled:opacity-50">
                      {deletingId === t.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}