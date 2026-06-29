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
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden
      ${isOpen
        ? 'bg-yellow-700 border-yellow-700 shadow-lg shadow-yellow-200'
        : 'bg-white border-gray-100 shadow-sm hover:border-yellow-300 hover:shadow-md'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        {/* Number + Question */}
        <div className="flex items-center gap-4">
          <span className={`text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300
            ${isOpen ? 'bg-white/20 text-white' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
            {String(faq.index).padStart(2, '0')}
          </span>
          <span className={`font-semibold text-sm md:text-base transition-colors duration-300
            ${isOpen ? 'text-white' : 'text-gray-800'}`}>
            {faq.question}
          </span>
        </div>

        {/* Icon */}
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300
          ${isOpen ? 'bg-white/20 text-white rotate-45' : 'bg-yellow-50 text-yellow-700 border border-yellow-200 rotate-0'}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>

      {/* Animated answer */}
      <div
        style={{ height, transition: 'height 0.35s cubic-bezier(0.4,0,0.2,1)' }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="px-6 pb-5 pl-[4.5rem]">
          <p className="text-yellow-100 text-sm leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq({ faqs = [] }) {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null)

  const toggle = (id) => setOpenId(openId === id ? null : id)

  return (
    <section id="faq" className="py-20 px-4 bg-gray-50 scroll-mt-20">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-yellow-700 font-semibold uppercase tracking-widest text-xs mb-2">Have Questions?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-400 mt-3 text-sm">Everything you need to know before your first consultation</p>
        </div>

        {faqs.length > 0 ? (
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.id}
                faq={{ ...faq, index: i + 1 }}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">🔮</p>
            <p className="text-lg font-medium">No FAQs yet</p>
            <p className="text-sm mt-1">Add questions from the admin panel</p>
          </div>
        )}

        {/* CTA strip */}
        <div className="mt-12 bg-white rounded-2xl border border-yellow-100 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-800">Still have questions?</p>
            <p className="text-gray-400 text-sm mt-0.5">Call Guruji directly for a personal consultation</p>
          </div>
          <a href="tel:+919731561377"
            className="flex-shrink-0 bg-yellow-700 hover:bg-yellow-800 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors">
            📞 Call Now
          </a>
        </div>

      </div>
    </section>
  )
}