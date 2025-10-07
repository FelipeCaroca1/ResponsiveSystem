import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '' 
}) => {
  const { getSpacing } = useResponsive()
  
  return (
    <div className={`${getSpacing('padding')} ${className}`.trim()}>
      {children}
    </div>
  )
}

