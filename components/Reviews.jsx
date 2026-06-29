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
  justdial: { label: 'JustDial', color: 'bg-orange-50 border-orange-200', text: 'text-orange-600', icon: '📒' },
  google:   { label: 'Google',   color: 'bg-blue-50 border-blue-200',   text: 'text-blue-600',   icon: '🌐' },
  facebook: { label: 'Facebook', color: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-600', icon: '📘' },
}

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? 'text-yellow-500' : 'text-gray-200'}>★</span>
      ))}
    </div>
  )
}

function TestimonialCard({ t }) {
  return (
    <div className="w-80 flex-shrink-0 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col mx-3">
      <div className="text-yellow-400 text-4xl font-serif leading-none mb-3">"</div>
      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">{t.review}</p>
      <Stars count={t.rating || 5} />
      <div className="border-t border-gray-100 mt-4 pt-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {(t.name || 'A').charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
          <p className="text-gray-400 text-xs">{t.location || 'Bengaluru'}</p>
        </div>
        {t.platform && (
          <span className="ml-auto text-xs text-gray-400 font-medium capitalize bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">{t.platform}</span>
        )}
      </div>
    </div>
  )
}

export default async function ReviewsSection() {
  const { settings, testimonials } = await getData()
  const platforms = ['justdial', 'google', 'facebook'].filter(p => settings[`review_${p}_url`])

  // Duplicate for seamless infinite loop
  const doubled = [...testimonials, ...testimonials]

  return (
    <section id="reviews" className="py-20 bg-gray-50 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-track-reverse {
          display: flex;
          width: max-content;
          animation: marquee-reverse 30s linear infinite;
        }
        .marquee-wrapper:hover .marquee-track,
        .marquee-wrapper:hover .marquee-track-reverse {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-yellow-700 font-semibold uppercase tracking-widest text-xs mb-2">What Clients Say</p>
          <h2 className="text-4xl font-bold text-gray-900">Ratings & Reviews</h2>
          <p className="text-gray-400 mt-3 text-sm">Real experiences from people whose lives we've touched</p>
        </div>

        {/* Platform badges */}
        {platforms.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {platforms.map(p => {
              const cfg = platformConfig[p]
              return (
                <a key={p} href={settings[`review_${p}_url`]} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl border ${cfg.color} hover:shadow-md transition-shadow`}>
                  <span className="text-2xl">{cfg.icon}</span>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{cfg.label}</p>
                    <p className={`text-xs font-semibold ${cfg.text}`}>View Reviews →</p>
                  </div>
                </a>
              )
            })}
          </div>
        )}
      </div>

      {/* Scrolling rows — full bleed, no max-w constraint */}
      {testimonials.length > 0 ? (
        <div className="space-y-6">

          {/* Row 1 — left to right scroll */}
          <div className="marquee-wrapper overflow-hidden">
            <div className="marquee-track">
              {doubled.map((t, i) => <TestimonialCard key={`r1-${i}`} t={t} />)}
            </div>
          </div>

          

        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">⭐</p>
          <p className="text-lg font-medium">No testimonials yet</p>
          <p className="text-sm mt-1">Add your first review from the admin panel</p>
        </div>
      )}

     
      
    </section>
  )
}