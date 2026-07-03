import { supabase } from '@/lib/supabase'

async function getSettings() {
  const { data } = await supabase.from('settings').select('*')
  const map = {}
  data?.forEach(item => { map[item.key] = item.value })
  return map
}

// Static star positions to avoid hydration mismatch from Math.random()
const STARS = [
  { top: '8%',  left: '12%',  delay: '0s',   dur: '2.5s' },
  { top: '15%', left: '78%',  delay: '0.3s', dur: '3.1s' },
  { top: '22%', left: '34%',  delay: '1.2s', dur: '2.8s' },
  { top: '31%', left: '91%',  delay: '0.7s', dur: '3.5s' },
  { top: '40%', left: '5%',   delay: '2.1s', dur: '2.2s' },
  { top: '47%', left: '55%',  delay: '0.5s', dur: '4.0s' },
  { top: '53%', left: '23%',  delay: '1.8s', dur: '2.6s' },
  { top: '60%', left: '67%',  delay: '0.2s', dur: '3.3s' },
  { top: '68%', left: '43%',  delay: '1.5s', dur: '2.9s' },
  { top: '74%', left: '82%',  delay: '0.9s', dur: '3.7s' },
  { top: '80%', left: '18%',  delay: '2.4s', dur: '2.3s' },
  { top: '87%', left: '72%',  delay: '0.6s', dur: '4.2s' },
  { top: '92%', left: '38%',  delay: '1.1s', dur: '2.7s' },
  { top: '5%',  left: '50%',  delay: '1.7s', dur: '3.0s' },
  { top: '28%', left: '62%',  delay: '0.4s', dur: '3.8s' },
  { top: '45%', left: '88%',  delay: '2.0s', dur: '2.4s' },
  { top: '63%', left: '7%',   delay: '1.3s', dur: '3.4s' },
  { top: '76%', left: '30%',  delay: '0.8s', dur: '2.1s' },
  { top: '35%', left: '15%',  delay: '2.2s', dur: '3.6s' },
  { top: '56%', left: '48%',  delay: '1.6s', dur: '2.9s' },
]

export default async function Hero() {
  const settings = await getSettings()

  const stats = [
    { value: '35+',  label: 'Years Experience' },
    { value: '2500+', label: 'Happy Customers' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '100%', label: 'Effective Solutions' },
  ]

  const titleWords = settings.hero_title?.split(' ') || ['Guruji', 'Thulsi', 'Acharya', 'Astrology', 'Center']
  const titleLine1 = titleWords.slice(0, 2).join(' ')
  const titleLine2 = titleWords.slice(2).join(' ')

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-950 via-yellow-950 to-gray-900 overflow-hidden flex items-center">

      {/* Background orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full opacity-10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400 rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Static star field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-40 animate-pulse"
            style={{ top: s.top, left: s.left, animationDelay: s.delay, animationDuration: s.dur }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left content */}
          <div className="text-white order-2 md:order-1">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-ping flex-shrink-0" />
              {settings.hero_badge || 'Best Astrologer in Bangalore'}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">{titleLine1}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                {titleLine2 || 'Acharya Astrology Center'}
              </span>
            </h1>

           

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={`tel:${settings.hero_phone || '+919731561377'}`}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-7 py-3.5 rounded-full font-bold hover:shadow-lg hover:shadow-yellow-500/30 transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
              >
                📞 Call Now
              </a>
              <a
                href="#contact"
                className="border-2 border-yellow-500/50 text-yellow-400 px-7 py-3.5 rounded-full font-bold hover:bg-yellow-500/10 transition-all hover:scale-105 text-sm sm:text-base"
              >
                Book Appointment
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-yellow-400">{stat.value}</p>
                  <p className="text-gray-400 text-xs mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="flex justify-center order-1 md:order-2">
            {settings.hero_image ? (
              <div className="relative">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-500/30 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-4 bg-gradient-to-b from-yellow-500/20 to-orange-500/20 rounded-3xl blur-xl" />
                <div className="relative w-64 sm:w-72 md:w-80 h-[400px] sm:h-[460px] md:h-[500px] rounded-3xl overflow-hidden border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/20">
                  <img
                    src={settings.hero_image}
                    alt={settings.about_name || 'Astrologer'}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-full shadow-lg whitespace-nowrap">
                  ✨ {settings.about_experience || '35'} Years of Experience
                </div>
              </div>
            ) : (
              <div className="w-64 sm:w-80 h-80 sm:h-96 bg-yellow-900/30 rounded-3xl flex items-center justify-center text-6xl border-2 border-yellow-500/30 shadow-2xl">
                🔮
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}