import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'

interface GridProps {
  children: React.ReactNode
  type?: 'small' | 'medium' | 'large'
  gap?: string
  className?: string
}

export const Grid: React.FC<GridProps> = ({ 
  children, 
  type = 'medium',
  gap = '4',
  className = '' 
}) => {
  const { getCardGrid } = useResponsive()
  
  return (
    <div className={`grid ${getCardGrid(type)} gap-${gap} ${className}`.trim()}>
      {children}
    </div>
  )
}

