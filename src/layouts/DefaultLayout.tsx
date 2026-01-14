import React from 'react'
import { Navigation, Footer } from '../components/layout'

interface DefaultLayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default DefaultLayout
