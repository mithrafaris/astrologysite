import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Reviews from '@/components/Reviews'
import Faq from '@/components/Faq'
import Contact from '@/components/Contact'
import { supabase } from '@/lib/supabase'

async function getServices() {
  const { data } = await supabase.from('services').select('*').order('order_index')
  return data || []
}

async function getFaqs() {
  const { data } = await supabase.from('faqs').select('*').order('order_index')
  return data || []
}

export default async function Home() {
  const servicesData = await getServices()
  const faqsData = await getFaqs()

  return (
    <main>
      <Hero />
      <About />
      <Services services={servicesData} />
      <Reviews />
      <Faq faqs={faqsData} />
      <Contact />
    </main>
  )
}