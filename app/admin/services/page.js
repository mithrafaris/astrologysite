'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploadingId, setUploadingId] = useState(null)
  const [savedId, setSavedId] = useState(null)

  async function fetchServices() {
    const { data } = await supabase.from('services').select('*').order('order_index')
    setServices(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchServices()
  }, [])

  async function handleImageUpload(e, serviceId) {
    const file = e.target.files[0]
    if (!file) return
    setUploadingId(serviceId)

    const fileExt = file.name.split('.').pop()
    const fileName = `service-${serviceId}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file)

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message)
      setUploadingId(null)
      return
    }

    const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)

    const { error: updateError } = await supabase
      .from('services')
      .update({ image_url: urlData.publicUrl })
      .eq('id', serviceId)

    if (updateError) {
      alert('Failed to save image: ' + updateError.message)
    } else {
      fetchServices()
    }
    setUploadingId(null)
  }

  async function handleTextUpdate(id, field, value) {
    await supabase.from('services').update({ [field]: value }).eq('id', id)
    setSavedId(id)
    setTimeout(() => setSavedId(null), 2000)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this service?')) return
    await supabase.from('services').delete().eq('id', id)
    setServices(services.filter(s => s.id !== id))
  }

  async function handleAddNew() {
    const { data, error } = await supabase
      .from('services')
      .insert([{ title: 'New Service', description: 'Description here...', order_index: services.length + 1 }])
      .select()
    if (!error && data) {
      setServices([...services, data[0]])
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Services</h1>
            <p className="text-gray-500 mt-1">Edit titles, descriptions and upload images</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm font-semibold">← Back</Link>
            <button onClick={handleAddNew} className="bg-yellow-700 text-white px-4 py-2 rounded-lg hover:bg-yellow-800 transition text-sm font-semibold">+ Add Service</button>
          </div>
        </div>

        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow p-6 flex gap-6 items-start">

              {/* Image */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className="w-32 h-32 bg-yellow-50 rounded-xl overflow-hidden flex items-center justify-center border-2 border-yellow-200">
                  {service.image_url ? (
                    <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">🪐</span>
                  )}
                </div>
                <label className="cursor-pointer bg-yellow-50 border border-yellow-300 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-yellow-100 transition text-center">
                  {uploadingId === service.id ? '⏳ Uploading...' : '📷 Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, service.id)}
                    disabled={uploadingId === service.id}
                  />
                </label>
              </div>

              {/* Text Fields */}
              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                  <input
                    type="text"
                    defaultValue={service.title}
                    onBlur={(e) => handleTextUpdate(service.id, 'title', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                  <textarea
                    defaultValue={service.description}
                    onBlur={(e) => handleTextUpdate(service.id, 'description', e.target.value)}
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-500"
                  />
                </div>
                {savedId === service.id && (
                  <p className="text-green-600 text-xs font-medium">✅ Saved!</p>
                )}
              </div>

              {/* Delete */}
              <button onClick={() => handleDelete(service.id)} className="text-red-500 hover:text-red-700 text-sm font-medium flex-shrink-0 mt-1">🗑 Delete</button>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}