import type { Metadata } from 'next'
import './globals.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/CartSidebar'
import ReviewCard from '@/components/ReviewCard'
import { CartProvider } from '@/contexts/CartContext'
import { Import } from 'lucide-react'

export const metadata: Metadata = {
  title: 'SnuzzShop - ProtoType Verion',
  description: 'Done by Snuzz',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CartProvider>
          <Header />
          {children}
          <ReviewCard />
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}
