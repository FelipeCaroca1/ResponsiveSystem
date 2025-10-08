import React, { createContext, useContext, useState } from 'react'

interface NavigationContextType {
  currentPage: 'demo' | 'test'
  setCurrentPage: (page: 'demo' | 'test') => void
}

const NavigationContext = createContext<NavigationContextType>({
  currentPage: 'test',
  setCurrentPage: () => {}
})

export const useNavigation = () => useContext(NavigationContext)

interface NavigationProviderProps {
  children: React.ReactNode
  defaultPage?: 'demo' | 'test'
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ 
  children, 
  defaultPage = 'test' 
}) => {
  const [currentPage, setCurrentPage] = useState<'demo' | 'test'>(defaultPage)

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </NavigationContext.Provider>
  )
}

