import React from 'react'
import { Navigation, Footer } from '../components/layout'
import { useResponsiveLayout } from '../hooks'

interface DefaultLayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { layoutUtils } = useResponsiveLayout()
  
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Navigation fijo arriba */}
      <Navigation />
      
      {/* Main content con padding-top para la navigation */}
      <main className="flex-1">
        <div className={layoutUtils.getContainerClass()}>
          {children}
        </div>
      </main>
      
      {/* Footer fijo abajo */}
      <Footer />
    </div>
  )
}

export default DefaultLayout
