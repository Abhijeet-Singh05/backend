import React from 'react'
import Composer from '../components/Composer'
import { PostCard, VideoCard } from '../components'

export default function Home() {
  const samplePosts = [
    { id: 1, user: { name: 'Alice' }, content: 'Hello world — my first post!' },
    { id: 2, user: { name: 'Bob' }, content: 'Check out this cool clip.' }
  ]

  const sampleVideos = [
    { id: 'v1', title: 'Short clip 1' },
    { id: 'v2', title: 'Short clip 2' }
  ]

  return (
    <div>
      <Composer />
      <h1 className="text-2xl font-semibold my-4">For you</h1>
      <div className="space-y-4">
        {samplePosts.map(p => (
          <PostCard key={p.id} user={p.user} content={p.content} />
        ))}

        {sampleVideos.map(v => (
          <VideoCard key={v.id} title={v.title} />
        ))}
      </div>
    </div>
  )
}
