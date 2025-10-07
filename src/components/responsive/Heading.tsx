import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'

interface HeadingProps {
  level?: 'h1' | 'h2' | 'h3' | 'h4'
  children: React.ReactNode
  className?: string
}

export const Heading: React.FC<HeadingProps> = ({ 
  level = 'h1', 
  children, 
  className = '' 
}) => {
  const { getTextSize } = useResponsive()
  const Tag = level
  
  return (
    <Tag className={`${getTextSize(level)} ${className}`.trim()}>
      {children}
    </Tag>
  )
}

