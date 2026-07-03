import { supabase } from '@/lib/supabase'

async function getData() {
  const [{ data: settingsData }, { data: testimonials }] = await Promise.all([
    supabase.from('settings').select('*'),
    supabase.from('testimonials').select('*').order('created_at', { ascending: false })
  ])
  const settings = {}
  settingsData?.forEach(item => { settings[item.key] = item.value })
  return { settings, testimonials: testimonials || [] }
}

const platformConfig = {
  justdial: { label: 'JustDial', icon: '📒' },
  google:   { label: 'Google',   icon: '🌐' },
  facebook: { label: 'Facebook', icon: '📘' },
}

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? 'text-yellow-400' : 'text-gray-700'}>★</span>
      ))}
    </div>
  )
}

function TestimonialCard({ t }) {
  return (
    <div className="w-80 flex-shrink-0 bg-gray-900 border border-yellow-500/20 rounded-2xl p-6 flex flex-col mx-3 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
      <div className="text-yellow-500 text-5xl font-serif leading-none mb-3 opacity-60">"</div>
      <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">{t.review}</p>
      <Stars count={t.rating || 5} />
      <div className="border-t border-gray-800 mt-4 pt-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {(t.name || 'A').charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-white text-sm">{t.name}</p>
          <p className="text-gray-500 text-xs">{t.location || 'Bengaluru'}</p>
        </div>
        {t.platform && (
          <span className="ml-auto text-xs text-yellow-500/70 font-medium capitalize bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">{t.platform}</span>
        )}
      </div>
    </div>
  )
}

export default async function Reviews() {
  const { settings, testimonials } = await getData()
  const platforms = ['justdial', 'google', 'facebook'].filter(p => settings[`review_${p}_url`])
  const doubled = [...testimonials, ...testimonials]

  return (
    <section id="reviews" className="scroll-mt-20 bg-gray-950 py-20 overflow-hidden relative">

      {/* Background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-600 opacity-5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600 opacity-5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-white opacity-[0.02] text-[300px] font-bold">★</span>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track { display: flex; width: max-content; animation: marquee 30s linear infinite; }
        .marquee-track-reverse { display: flex; width: max-content; animation: marquee-reverse 30s linear infinite; }
        .marquee-wrapper:hover .marquee-track,
        .marquee-wrapper:hover .marquee-track-reverse { animation-play-state: paused; }
      `}</style>

      <div className="relative max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500"></div>
            <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest">🔱 Divine Testimonials 🔱</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Ratings & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Reviews</span>
          </h2>
          <p className="text-gray-500 text-sm">Real experiences from people whose lives we have touched</p>
        </div>

        {/* Stats */}
        {/* Stats */}
<div className="grid grid-cols-3 gap-4 mb-14">
  <div className="bg-gray-900 border border-yellow-500/20 rounded-2xl p-5 text-center">
    <p className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">4.9★</p>
    <p className="text-gray-500 text-xs mt-1">Average Rating</p>
  </div>
  <div className="bg-gray-900 border border-yellow-500/20 rounded-2xl p-5 text-center">
    <p className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">2500+</p>
    <p className="text-gray-500 text-xs mt-1">Happy Customers</p>
  </div>
  <div className="bg-gray-900 border border-yellow-500/20 rounded-2xl p-5 text-center">
    <p className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">100%</p>
    <p className="text-gray-500 text-xs mt-1">Effective Solutions</p>
  </div>
</div>

        {/* Platform badges */}
        {platforms.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {platforms.map(p => {
              const cfg = platformConfig[p]
              return (
                <a key={p} href={settings[`review_${p}_url`]} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-900 border border-yellow-500/20 hover:border-yellow-500/60 hover:shadow-lg hover:shadow-yellow-500/10 transition-all">
                  <span className="text-2xl">{cfg.icon}</span>
                  <div>
                    <p className="font-bold text-white text-sm">{cfg.label}</p>
                    <p className="text-yellow-500 text-xs font-semibold">View Reviews →</p>
                  </div>
                </a>
              )
            })}
          </div>
        )}

      </div>

      {/* Scrolling testimonials */}
      {testimonials.length > 0 ? (
        <div className="space-y-6">
          <div className="marquee-wrapper overflow-hidden">
            <div className="marquee-track">
              {doubled.map((t, i) => <TestimonialCard key={`r1-${i}`} t={t} />)}
            </div>
          </div>
          
         
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">🔱</p>
          <p className="text-gray-400 text-lg font-medium">No testimonials yet</p>
          <p className="text-gray-600 text-sm mt-1">Add reviews from the admin panel</p>
        </div>
      )}

      {/* CTA */}
      <div className="relative max-w-6xl mx-auto px-4 mt-14">
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-3xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Join Our Happy Customers</h3>
          <p className="text-gray-500 text-sm mb-6">Experience divine guidance from Guruji Thulsi Acharya</p>
          <a href="#contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-yellow-500/30 transition-all hover:scale-105">
            🙏 Book a Consultation
          </a>
        </div>
      </div>

    </section>
  )
}