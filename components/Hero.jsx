import { supabase } from '@/lib/supabase'

async function getSettings() {
  const { data } = await supabase.from('settings').select('*')
  const map = {}
  data?.forEach(item => { map[item.key] = item.value })
  return map
}

export default async function Hero() {
  const settings = await getSettings()

  const stats = [
    { value: '35+', label: 'Years Experience' },
    { value: '2500+', label: 'Happy Customers' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '100%', label: 'Effective Solutions' },
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-950 via-yellow-950 to-gray-900 overflow-hidden flex items-center">

      {/* Animated background orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400 rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Stars decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-40 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="text-white">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
              {settings.hero_badge || 'Best Astrologer in Bangalore'}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">{settings.hero_title?.split(' ').slice(0, 2).join(' ') || 'Guruji Thulsi'}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                {settings.hero_title?.split(' ').slice(2).join(' ') || 'Acharya Astrology Center'}
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {settings.hero_description || 'Renowned Astrologer in Bangalore with 35 Years Experience specializing in career predictions, black magic removal, and reuniting true love.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap mb-12">
              <a href={`tel:${settings.hero_phone || '+919731561377'}`} className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-yellow-500/30 transition-all hover:scale-105 flex items-center gap-2">
                📞 Call Now
              </a>
              <a href="#contact" className="border-2 border-yellow-500/50 text-yellow-400 px-8 py-4 rounded-full font-bold hover:bg-yellow-500/10 transition-all hover:scale-105">
                Book Appointment
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">{stat.value}</p>
                  <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Image */}
          <div className="flex justify-center relative">
            {settings.hero_image ? (
              <div className="relative">
                {/* Rotating ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-500/30 animate-spin" style={{ animationDuration: '20s' }}></div>
                {/* Outer glow */}
                <div className="absolute inset-4 bg-gradient-to-b from-yellow-500/20 to-orange-500/20 rounded-3xl blur-xl"></div>
                {/* Image container */}
                <div className="relative w-80 h-[500px] rounded-3xl overflow-hidden border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/20">
                  <img src={settings.hero_image} alt="Hero" className="w-full h-full object-cover object-top" />
                  {/* Bottom overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg whitespace-nowrap">
                  ✨ {settings.about_experience || '35'}+ Years of Experience
                </div>
              </div>
            ) : (
              <div className="w-80 h-96 bg-yellow-900/30 rounded-3xl flex items-center justify-center text-6xl border-2 border-yellow-500/30 shadow-2xl">
                🔮
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}