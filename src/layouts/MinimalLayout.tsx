import React from 'react'

interface MinimalLayoutProps {
  children: React.ReactNode
}

const MinimalLayout: React.FC<MinimalLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <main>
        {children}
      </main>
    </div>
  )
}

export default MinimalLayout
