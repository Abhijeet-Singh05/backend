import React from 'react'
import cn from 'classnames'

type Variant = 'primary' | 'ghost' | 'danger'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium rounded'
  const variants: Record<Variant, string> = {
    primary: 'bg-primary text-white hover:bg-primaryHover',
    ghost: 'bg-transparent text-primary hover:bg-gray-100',
    danger: 'bg-danger text-white hover:opacity-90'
  }
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base'
  }

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  )
}
