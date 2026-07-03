'use client'

import { useState } from 'react'

export default function Services({ services = [] }) {
  const [selected, setSelected] = useState(null)

  return (
    <section id="services" className="scroll-mt-20 bg-gray-950 py-20 px-4 relative overflow-hidden">

      {/* Background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 opacity-5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500 opacity-5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-white opacity-[0.02] text-[300px] font-bold">🔱</span>
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500"></div>
            <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest">🔱 Divine Services 🔱</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Services</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">Connect with Guruji Thulsi Acharya for divine guidance and spiritual solutions</p>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} onClick={() => setSelected(service)} className="group relative bg-gray-900 border border-yellow-500/20 rounded-2xl overflow-hidden cursor-pointer hover:border-yellow-500/60 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10">

                {/* Image */}
                <div className="w-full h-48 bg-gray-800 overflow-hidden flex-shrink-0">
                  {service.image_url ? (
                    <img src={service.image_url} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">🔱</div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-gray-900/60 pointer-events-none"></div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">{service.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-500/70 text-xs font-medium group-hover:text-yellow-400 transition-colors">View Details →</span>
                    <div className="w-7 h-7 bg-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center justify-center group-hover:bg-yellow-500/20 transition">
                      <span className="text-yellow-400 text-xs">🔱</span>
                    </div>
                  </div>
                </div>

                {/* Bottom glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🔱</p>
            <p className="text-gray-400 text-lg font-medium">No services yet</p>
            <p className="text-gray-600 text-sm mt-1">Add services from the admin panel</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-14">
          <a href="#contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-yellow-500/30 transition-all hover:scale-105">
            🙏 Consult Guruji Now
          </a>
        </div>

      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8" onClick={() => setSelected(null)}>
          <div className="relative bg-gray-900 border border-yellow-500/30 rounded-3xl shadow-2xl shadow-yellow-500/10 w-full max-w-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>

            {/* Close */}
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-10 bg-gray-800 border border-gray-700 text-gray-400 hover:text-white w-9 h-9 rounded-full flex items-center justify-center transition font-bold">✕</button>

            {/* Image */}
            {selected.image_url ? (
              <div className="w-full h-64 overflow-hidden bg-gray-800">
                <img src={selected.image_url} alt={selected.title} className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-gray-900/80 pointer-events-none"></div>
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-6xl">🔱</div>
            )}

            {/* Details */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500">🔱</span>
                <h3 className="text-xl font-bold text-white">{selected.title}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{selected.description}</p>

              <div className="flex gap-3">
                <a href="tel:+919731561377" className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-center py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/30 transition">📞 Call Now</a>
                <a href={`https://wa.me/919731561377?text=Hello, I need help with ${encodeURIComponent(selected.title)}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-600 text-white text-center py-3 rounded-xl font-bold hover:bg-green-700 transition">💬 WhatsApp</a>
              </div>
            </div>

            {/* Bottom glow line */}
            <div className="h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
          </div>
        </div>
      )}

    </section>
  )
}