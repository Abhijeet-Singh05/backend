import React from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import { Button } from '../components'

export default function Video() {
  const { id } = useParams()

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <div className="bg-black text-white rounded-md h-64 flex items-center justify-center">Video Player placeholder</div>
        <h2 className="mt-4 text-xl font-semibold">Video Title — {id}</h2>
        <div className="mt-2 text-sm text-gray-600">by User • 1.2k views</div>
        <div className="mt-4 flex gap-2">
          <Button variant="ghost">Like</Button>
          <Button variant="ghost">Comment</Button>
          <Button variant="ghost">Share</Button>
        </div>
      </Card>

      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Comments</h3>
        <div className="space-y-3">
          <div className="p-3 bg-white rounded shadow">Comment placeholder 1</div>
          <div className="p-3 bg-white rounded shadow">Comment placeholder 2</div>
        </div>
      </section>
    </div>
  )
}
