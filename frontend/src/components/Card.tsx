import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function Card({ children, className, ...rest }: CardProps) {
  return (
    <div className={"bg-white rounded shadow-sm p-4 " + (className || '')} {...rest}>
      {children}
    </div>
  )
}
