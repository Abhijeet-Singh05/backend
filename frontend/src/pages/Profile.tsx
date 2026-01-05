import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '../components/Avatar'
import VideoCard from '../components/VideoCard'

export default function Profile() {
  const { id } = useParams()
  const [tab, setTab] = useState<'posts' | 'videos' | 'playlists'>('posts')

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Avatar size={80} />
        <div>
          <h2 className="text-xl font-semibold">User {id}</h2>
          <p className="text-sm text-gray-600">@username</p>
        </div>
      </div>

      <div className="mb-4">
        <nav className="flex gap-3">
          <button onClick={() => setTab('posts')} className={`px-3 py-1 rounded ${tab === 'posts' ? 'bg-primary text-white' : 'bg-white'}`}>
            Posts
          </button>
          <button onClick={() => setTab('videos')} className={`px-3 py-1 rounded ${tab === 'videos' ? 'bg-primary text-white' : 'bg-white'}`}>
            Videos
          </button>
          <button onClick={() => setTab('playlists')} className={`px-3 py-1 rounded ${tab === 'playlists' ? 'bg-primary text-white' : 'bg-white'}`}>
            Playlists
          </button>
        </nav>
      </div>

      <div className="space-y-4">
        {tab === 'posts' && <div className="p-4 bg-white rounded shadow">User posts placeholder</div>}
        {tab === 'videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <VideoCard title="My video 1" />
            <VideoCard title="My video 2" />
          </div>
        )}
        {tab === 'playlists' && <div className="p-4 bg-white rounded shadow">Playlists placeholder</div>}
      </div>
    </div>
  )
}
