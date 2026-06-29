import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CallBack from '@/components/CallBack'

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <CallBack />
    </>
  )
}