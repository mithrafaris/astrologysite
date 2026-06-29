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
    "Experienced Astrologer with Accurate Predictions",
    "35+ Years of Experience in Vedic Astrology",
    "Expert in Numerology, Palmistry & Vastu Shastra",
    "Titles: Jyotish Ratna, Jyotish Bhushan, Vastu Ratna",
    "100% Effective Solutions Guaranteed",
    "2500+ Happy Customers Across India"
  ]

  return (
    <section id="about" className="py-16 px-4 bg-white scroll-mt-20">
      <style>{`
        @keyframes float-img {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes badge-pop {
          0% { transform: scale(0.7) translateY(6px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes draw-arc {
          from { stroke-dashoffset: 440; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes draw-arc2 {
          from { stroke-dashoffset: 340; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes dot-appear {
          0% { opacity: 0; transform: scale(0); }
          60% { opacity: 1; transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes line-grow {
          from { stroke-dashoffset: 120; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes corner-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .float-img { animation: float-img 5s ease-in-out infinite; }
        .badge-exp { animation: badge-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.8s both; }
        .badge-rat { animation: badge-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.0s both; }
        .arc-1 { stroke-dasharray: 440; animation: draw-arc 1.4s ease-out 0.2s both; }
        .arc-2 { stroke-dasharray: 340; animation: draw-arc2 1.2s ease-out 0.5s both; }
        .arc-3 { stroke-dasharray: 340; animation: draw-arc2 1.0s ease-out 0.4s both; }
        .dot-1 { animation: dot-appear 0.4s ease-out 1.40s both; }
        .dot-2 { animation: dot-appear 0.4s ease-out 1.55s both; }
        .dot-3 { animation: dot-appear 0.4s ease-out 1.70s both; }
        .dot-4 { animation: dot-appear 0.4s ease-out 1.85s both; }
        .line-t { stroke-dasharray: 120; animation: line-grow 0.5s ease-out 1.0s both; }
        .line-b { stroke-dasharray: 120; animation: line-grow 0.5s ease-out 1.1s both; }
        .corner-tl { animation: corner-fade 0.4s ease-out 1.3s both; }
        .corner-br { animation: corner-fade 0.4s ease-out 1.5s both; }
      `}</style>

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-yellow-700 font-semibold uppercase tracking-widest mb-2">Who We Are</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">About Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left - Image (CHANGED) */}
          <div className="flex justify-center items-center">
            {settings.about_image ? (
              /* Outer wrapper — adds 48px padding on all sides for arcs + badges */
              <div className="relative" style={{ width: 300 + 96, height: 420 + 96 }}>

                {/* SVG frame — sits exactly over the full wrapper */}
                <svg
                  viewBox="0 0 396 516"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 2 }}
                >
                  {/* Centre of viewBox: 198, 258 — arc radius 170 fits nicely */}

                  {/* Outer arc top — solid */}
                  <path className="arc-1"
                    d="M 28 258 A 170 170 0 0 1 368 258"
                    stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" />

                  {/* Outer arc bottom — dashed */}
                  <path className="arc-2"
                    d="M 368 258 A 170 170 0 0 1 28 258"
                    stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.28"
                    strokeDasharray="8 6" />

                  {/* Inner arc — subtle dashed */}
                  <path className="arc-3"
                    d="M 58 258 A 140 140 0 1 1 338 258"
                    stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.18"
                    strokeDasharray="4 8" />

                  {/* Cardinal dots — N E S W */}
                  <circle className="dot-1" cx="198" cy="88"  r="4" fill="#ca8a04" opacity="0.7" />
                  <circle className="dot-2" cx="368" cy="258" r="4" fill="#ca8a04" opacity="0.7" />
                  <circle className="dot-3" cx="198" cy="428" r="4" fill="#ca8a04" opacity="0.7" />
                  <circle className="dot-4" cx="28"  cy="258" r="4" fill="#ca8a04" opacity="0.7" />

                  {/* Tick lines */}
                  <line className="line-t" x1="138" y1="76"  x2="258" y2="76"  stroke="#ca8a04" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
                  <line className="line-b" x1="138" y1="440" x2="258" y2="440" stroke="#ca8a04" strokeWidth="1" opacity="0.4" strokeLinecap="round" />

                  {/* Corner bracket — top left */}
                  <g className="corner-tl" opacity="0.55">
                    <line x1="48" y1="168" x2="48" y2="138" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="48" y1="138" x2="78" y2="138" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
                  </g>
                  {/* Corner bracket — bottom right */}
                  <g className="corner-br" opacity="0.55">
                    <line x1="348" y1="348" x2="348" y2="378" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="348" y1="378" x2="318" y2="378" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
                  </g>
                </svg>

                {/* Image card — centred inside the padded wrapper */}
                <div
                  className="float-img absolute rounded-3xl overflow-hidden border-4 border-yellow-300/50"
                  style={{
                    top: 48, left: 48,
                    width: 300, height: 420,
                    zIndex: 3,
                    boxShadow: '0 12px 40px rgba(120,60,0,0.15)',
                  }}
                >
                  <img
                    src={settings.about_image}
                    alt={settings.about_name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-bold text-sm leading-tight">{settings.about_name || 'Guruji Thulsi Acharya'}</p>
                    <p className="text-yellow-300 text-xs">{settings.about_title || 'Astrology Center, Bengaluru'}</p>
                  </div>
                </div>

                {/* Experience badge — top-right of image */}
                <div className="badge-exp absolute bg-yellow-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
                  style={{ top: 36, right: 12, zIndex: 5 }}>
                  ✦ {settings.about_experience || '35+'} Yrs Exp
                </div>

                {/* Rating badge — bottom-left of image */}
                <div className="badge-rat absolute bg-white border-2 border-yellow-500 text-yellow-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
                  style={{ bottom: 36, left: 12, zIndex: 5 }}>
                  ⭐ {settings.about_rating || '4.9'} Rating
                </div>

              </div>
            ) : (
              <div className="w-72 h-96 bg-yellow-50 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4 border-2 border-yellow-200">
                <span className="text-8xl">🧘</span>
                <p className="text-yellow-700 font-semibold text-lg">{settings.about_name || 'Guruji Thulsi Acharya'}</p>
                <p className="text-gray-500 text-sm">{settings.about_title || 'Astrology Center, Bengaluru'}</p>
              </div>
            )}
          </div>

          {/* Right - Content (UNCHANGED) */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{settings.about_name || 'Guruji Thulsi Acharya'}</h3>
            <p className="text-yellow-700 font-semibold mb-4">{settings.about_title || 'Astrology Center, Bengaluru'}</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{settings.about_description1 || ''}</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{settings.about_description2 || ''}</p>

            <ul className="space-y-2 mb-8">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="text-yellow-600">✦</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 text-center border border-yellow-200 shadow-sm">
                <p className="text-2xl font-bold text-yellow-700">{settings.about_experience || '35+'}</p>
                <p className="text-gray-500 text-xs mt-1">Years Experience</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 text-center border border-yellow-200 shadow-sm">
                <p className="text-2xl font-bold text-yellow-700">{settings.about_customers || '2500+'}</p>
                <p className="text-gray-500 text-xs mt-1">Happy Customers</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 text-center border border-yellow-200 shadow-sm">
                <p className="text-2xl font-bold text-yellow-700">{settings.about_rating || '4.9'}★</p>
                <p className="text-gray-500 text-xs mt-1">Average Rating</p>
              </div>
            </div> */}
          </div>

        </div>
      </div>
    </section>
  )
}