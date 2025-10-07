import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'

interface TextProps {
  children: React.ReactNode
  className?: string
  size?: 'body' | 'caption'
  as?: 'p' | 'span' | 'div' | 'small'
}

export const Text: React.FC<TextProps> = ({ 
  children, 
  className = '',
  size = 'body',
  as: Component = 'p'
}) => {
  const { getTextSize } = useResponsive()
  
  return (
    <Component className={`${getTextSize(size)} ${className}`.trim()}>
      {children}
    </Component>
  )
}

