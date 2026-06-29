export default function Services({ services = [] }) {
  return (
    <section id="services" className="py-16 px-4 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-yellow-700 font-semibold uppercase tracking-widest mb-2">What We Offer</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Services</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Connect with the Best Astrologer in Bangalore to discuss your concerns and get solutions</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-yellow-50 rounded-2xl overflow-hidden shadow hover:shadow-lg transition group">
              <div className="w-full h-48 bg-yellow-100 flex items-center justify-center text-5xl overflow-hidden">
                {service.image_url ? (
                  <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
                ) : (
                  '🪐'
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-yellow-700 transition">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{service.description}</p>
                <a href="tel:+919731561377" className="inline-block bg-yellow-700 text-white text-sm px-4 py-2 rounded hover:bg-yellow-800 transition">Call Now</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}