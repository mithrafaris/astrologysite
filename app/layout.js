import './globals.css'

export const metadata = {
  title: 'Guruji Thulsi Acharya Astrology Center',
  description: 'Astrology Center in Bengaluru, India',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}