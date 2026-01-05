import React from 'react'

export default function Spinner({ size = 5 }: { size?: number }) {
  return (
    <div className={`w-${size} h-${size} border-2 border-gray-200 border-t-primary rounded-full animate-spin`} style={{ width: 20 * size / 5, height: 20 * size / 5 }} />
  )
}
