'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchFaqs() {
    const { data } = await supabase.from('faqs').select('*').order('order_index')
    setFaqs(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchFaqs() }, [])

  async function handleUpdate(id, field, value) {
    await supabase.from('faqs').update({ [field]: value }).eq('id', id)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this FAQ?')) return
    await supabase.from('faqs').delete().eq('id', id)
    setFaqs(faqs.filter(f => f.id !== id))
  }

  async function handleAddNew() {
    const { data, error } = await supabase
      .from('faqs')
      .insert([{ question: 'New Question?', answer: 'Answer here...', order_index: faqs.length + 1 }])
      .select()
    if (!error && data) setFaqs([...faqs, data[0]])
  }

  if (loading) return <div className="p-10 text-gray-500">Loading...</div>

  return (
    <div className="py-10 px-8">
      <div className="max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">FAQs</h1>
            <p className="text-gray-500 mt-1">Manage frequently asked questions</p>
          </div>
          <button onClick={handleAddNew} className="bg-yellow-700 text-white px-4 py-2 rounded-lg hover:bg-yellow-800 transition text-sm font-semibold">+ Add FAQ</button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-2xl shadow p-6 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Question</label>
                <input
                  type="text"
                  defaultValue={faq.question}
                  onBlur={(e) => handleUpdate(faq.id, 'question', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Answer</label>
                <textarea
                  defaultValue={faq.answer}
                  onBlur={(e) => handleUpdate(faq.id, 'answer', e.target.value)}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                />
              </div>
              <button onClick={() => handleDelete(faq.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">🗑 Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}