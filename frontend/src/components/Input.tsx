import React from 'react'
import cn from 'classnames'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className, ...rest }: InputProps) {
  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input className={cn('w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary', className)} {...rest} />
      {error && <p className="text-sm text-danger mt-1">{error}</p>}
    </div>
  )
}
