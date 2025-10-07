import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'main' | 'article' | 'aside' | 'nav' | 'header' | 'footer'
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '',
  as: Component = 'div'
}) => {
  const { getSpacing } = useResponsive()
  
  return (
    <Component className={`${getSpacing('padding')} ${className}`.trim()}>
      {children}
    </Component>
  )
}

