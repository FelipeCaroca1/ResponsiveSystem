import React from 'react'
import { useResponsiveLayout } from '../hooks'

interface MinimalLayoutProps {
  children: React.ReactNode
}

const MinimalLayout: React.FC<MinimalLayoutProps> = ({ children }) => {
  const { layoutUtils } = useResponsiveLayout()
  
  return (
    <div className="min-h-screen bg-black">
      <main className={layoutUtils.getContainerClass()}>
        {children}
      </main>
    </div>
  )
}

export default MinimalLayout
