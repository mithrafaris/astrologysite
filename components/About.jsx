import { supabase } from '@/lib/supabase'

async function getSettings() {
  const { data } = await supabase.from('settings').select('*')
  const map = {}
  data?.forEach(item => { map[item.key] = item.value })
  return map
}
export default async function About() {
  const settings = await getSettings()

  const highlights = [
    { icon: '🔱', text: 'Experienced Astrologer with Accurate Predictions' },
    { icon: '📿', text: '35+ Years of Experience in Vedic Astrology' },
    { icon: '🌙', text: 'Expert in Numerology, Palmistry & Vastu Shastra' },
    { icon: '⚡', text: 'Titles: Jyotish Ratna, Jyotish Bhushan, Vastu Ratna' },
    { icon: '✨', text: '100% Effective Solutions Guaranteed' },
    { icon: '🙏', text: '2500+ Happy Customers Across India' },
  ]

  const specialities = settings.about_specialities
    ? settings.about_specialities.split(',').map(s => s.trim())
    : ['Relationship Issues', 'Love Failure', 'Late Marriage', 'Husband-Wife Disputes', 'Career Blocks', 'Business Problems', 'Negative Energy', 'Evil Eye Effects', 'Mental Stress']

  return (
    <section id="about" className="scroll-mt-20 bg-gray-950 py-20 px-4 relative overflow-hidden">

      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600 opacity-5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500 opacity-5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-700 opacity-5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-white opacity-[0.02] text-[350px] font-bold">ॐ</span>
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500"></div>
            <span className="text-yellow-500 text-sm font-semibold uppercase tracking-widest">🔱 Har Har Mahadev 🔱</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Guruji</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">Blessed by Lord Shiva — A divine guide for those seeking spiritual light</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">

          {/* Left Image */}
          <div className="flex justify-center">
            {settings.about_image ? (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-yellow-500/20 rounded-3xl blur-2xl scale-110"></div>
                <div className="relative w-80 h-[500px] rounded-3xl overflow-hidden border-2 border-yellow-500/30 shadow-2xl shadow-orange-500/20">
                  <img src={settings.about_image} alt={settings.about_name || 'Guruji'} className="w-full h-full object-cover object-top" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent p-6">
                    <p className="text-white font-bold text-lg">{settings.about_name || 'Guruji Thulsi Acharya'}</p>
                    <p className="text-yellow-400 text-sm">{settings.about_title || 'Astrology Center, Bengaluru'}</p>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg">🔱 {settings.about_experience || '35+'} Yrs</div>
                <div className="absolute -bottom-3 -left-3 bg-gray-900 border border-yellow-500/40 text-yellow-400 text-xs font-bold px-3 py-2 rounded-full shadow-lg">⭐ {settings.about_rating || '4.9'} Rated</div>
              </div>
            ) : (
              <div className="w-72 h-96 bg-gray-900 rounded-2xl border border-yellow-500/30 flex flex-col items-center justify-center gap-4 shadow-2xl">
                <span className="text-8xl">🔱</span>
                <p className="text-yellow-400 font-semibold text-lg text-center px-4">{settings.about_name || 'Guruji Thulsi Acharya'}</p>
                <p className="text-gray-500 text-sm text-center px-4">{settings.about_title || 'Astrology Center, Bengaluru'}</p>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-1">{settings.about_name || 'Guruji Thulsi Acharya'}</h3>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 font-semibold text-lg mb-6">{settings.about_title || 'Astrology Center, Bengaluru'}</p>

            {settings.about_description1 && <p className="text-gray-400 text-sm leading-relaxed mb-4">{settings.about_description1}</p>}
            {settings.about_description2 && <p className="text-gray-400 text-sm leading-relaxed mb-8">{settings.about_description2}</p>}

            <ul className="space-y-3 mb-8">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">{settings.about_experience || '35+'}</p>
                <p className="text-gray-500 text-xs mt-1">Years Experience</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">{settings.about_customers || '2500+'}</p>
                <p className="text-gray-500 text-xs mt-1">Happy Customers</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">{settings.about_rating || '4.9'}★</p>
                <p className="text-gray-500 text-xs mt-1">Average Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Intro Card */}
        {settings.about_intro && (
          <div className="bg-gray-900 border border-yellow-500/20 rounded-3xl p-8 mb-10 relative overflow-hidden">
            <div className="absolute top-2 right-4 text-yellow-500/5 text-8xl font-bold select-none">ॐ</div>
            <div className="flex items-start gap-4">
              <span className="text-4xl flex-shrink-0">🔱</span>
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3">{settings.about_headline || `About ${settings.about_name || 'Guruji'}`}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{settings.about_intro}</p>
              </div>
            </div>
          </div>
        )}

        {/* Specialities */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-white text-center mb-2">Areas We <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Help With</span></h3>
          <p className="text-gray-600 text-sm text-center mb-8">Divine solutions for every life challenge</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {specialities.map((item, index) => (
              <span key={index} className="bg-gray-900 border border-yellow-500/30 text-yellow-300 text-sm font-medium px-4 py-2 rounded-full hover:bg-yellow-500/10 hover:border-yellow-500 transition cursor-default">
                🔱 {item}
              </span>
            ))}
          </div>
        </div>

        {/* Why Choose */}
        {settings.about_why_title && (
          <div className="relative p-px rounded-3xl bg-gradient-to-r from-yellow-500 to-orange-500 overflow-hidden">
            <div className="bg-gray-950 rounded-3xl p-8">
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">⚡</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{settings.about_why_title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{settings.about_why_desc}</p>
                </div>
              </div>
            </div>
          </div>
        )}

       
       

      </div>
    </section>
  )
}