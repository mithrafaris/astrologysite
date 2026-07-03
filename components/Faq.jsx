'use client'

import { useState, useRef, useEffect } from 'react'

function FaqItem({ faq, isOpen, onToggle }) {
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-yellow-500/50 shadow-lg shadow-yellow-500/10' : 'bg-gray-900 border-gray-800 hover:border-yellow-500/30'}`}>
      <button onClick={onToggle} className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
        <div className="flex items-center gap-4">
          <span className={`text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-gray' : 'bg-gray-800 text-yellow-500 border border-yellow-500/30'}`}>
            {String(faq.index).padStart(2, '0')}
          </span>
          <span className={`font-semibold text-sm md:text-base transition-colors duration-300 ${isOpen ? 'text-yellow-400' : 'text-gray-200'}`}>
            {faq.question}
          </span>
        </div>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-yellow-500/20 text-yellow-400 rotate-45' : 'bg-gray-800 text-gray-500 border border-gray-700 rotate-0'}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div style={{ height, transition: 'height 0.35s cubic-bezier(0.4,0,0.2,1)' }} className="overflow-hidden">
        <div ref={contentRef} className="px-6 pb-5 pl-[4.5rem]">
          <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq({ faqs = [] }) {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null)
  const toggle = (id) => setOpenId(openId === id ? null : id)

  return (
    <section id="faq" className="scroll-mt-20 bg-gray-950 py-20 px-4 relative overflow-hidden">

      {/* Background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-600 opacity-5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600 opacity-5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-white opacity-[0.02] text-[300px] font-bold">?</span>
      </div>

      <div className="relative max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500"></div>
            <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest">🔱 Seek Clarity 🔱</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Asked</span>
          </h2>
          <p className="text-gray-500 text-sm">Everything you need to know before your first consultation</p>
        </div>

        {faqs.length > 0 ? (
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.id} faq={{ ...faq, index: i + 1 }} isOpen={openId === faq.id} onToggle={() => toggle(faq.id)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🔱</p>
            <p className="text-gray-400 text-lg font-medium">No FAQs yet</p>
            <p className="text-gray-600 text-sm mt-1">Add questions from the admin panel</p>
          </div>
        )}

        {/* CTA Strip */}
        <div className="mt-12 bg-gray-900 border border-yellow-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white">Still have questions?</p>
            <p className="text-gray-500 text-sm mt-0.5">Call Guruji directly for a personal consultation</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="tel:+919731561377" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold text-sm px-5 py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/20 transition">📞 Call Now</a>
            <a href={`https://wa.me/919731561377`} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-green-700 transition">💬 WhatsApp</a>
          </div>
        </div>

      </div>
    </section>
  )
}