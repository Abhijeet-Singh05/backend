import React from 'react'
import Card from './Card'

export default function VideoCard({ title }: { title: string }) {
  return (
    <Card>
      <div className="bg-gray-200 w-full h-44 rounded" />
      <div className="mt-3">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-500">User • 2.3k views</div>
      </div>
    </Card>
  )
}
