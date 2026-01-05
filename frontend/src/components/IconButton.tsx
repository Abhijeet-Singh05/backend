import React from 'react'
import cn from 'classnames'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string
}

export default function IconButton({ className, children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={cn('inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none', className)}
    >
      {children}
    </button>
  )
}
