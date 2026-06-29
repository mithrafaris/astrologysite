'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [contacts, setContacts] = useState([])
  const [callbacks, setCallbacks] = useState([])

  async function fetchData() {
    const { data: contactsData } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })
    const { data: callbacksData } = await supabase.from('callbacks').select('*').order('created_at', { ascending: false })
    setContacts(contactsData || [])
    setCallbacks(callbacksData || [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function deleteContact(id) {
    await supabase.from('contacts').delete().eq('id', id)
    setContacts(contacts.filter(c => c.id !== id))
  }

  async function deleteCallback(id) {
    await supabase.from('callbacks').delete().eq('id', id)
    setCallbacks(callbacks.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Guruji Thulsi Acharya Astrology Center — Submissions</p>
          </div>
          
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
            <div className="bg-yellow-100 text-yellow-700 text-3xl w-14 h-14 rounded-full flex items-center justify-center">✉️</div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{contacts.length}</p>
              <p className="text-gray-500 text-sm">Contact Submissions</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
            <div className="bg-yellow-100 text-yellow-700 text-3xl w-14 h-14 rounded-full flex items-center justify-center">📞</div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{callbacks.length}</p>
              <p className="text-gray-500 text-sm">Callback Requests</p>
            </div>
          </div>
        </div>

        {/* Contact Submissions */}
        <div className="bg-white rounded-2xl shadow mb-10">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Contact Submissions</h2>
          </div>
          {contacts.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-400">No submissions yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Phone</th>
                    <th className="px-6 py-3 text-left">Message</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">{contact.name}</td>
                      <td className="px-6 py-4">
                        <a href={`tel:${contact.phone}`} className="text-yellow-700 hover:underline">{contact.phone}</a>
                      </td>
                      <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{contact.message || '—'}</td>
                      <td className="px-6 py-4 text-gray-400">{new Date(contact.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => deleteContact(contact.id)} className="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Callback Requests */}
        <div className="bg-white rounded-2xl shadow">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Callback Requests</h2>
          </div>
          {callbacks.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-400">No callback requests yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Phone</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {callbacks.map((callback) => (
                    <tr key={callback.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">{callback.name}</td>
                      <td className="px-6 py-4">
                        <a href={`tel:${callback.phone}`} className="text-yellow-700 hover:underline">{callback.phone}</a>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{new Date(callback.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => deleteCallback(callback.id)} className="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}