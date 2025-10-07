import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '',
  onClick,
  type = 'button',
  disabled = false
}) => {
  const { getResponsiveClass } = useResponsive()
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${getResponsiveClass('button')} ${className}`.trim()}
    >
      {children}
    </button>
  )
}

