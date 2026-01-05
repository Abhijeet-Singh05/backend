import React from 'react'
import { Link } from 'react-router-dom'

export default function LeftRail() {
  return (
    <nav className="space-y-3 p-4">
      <div className="bg-white rounded shadow-sm p-3">
        <Link to="/" className="block text-primary font-semibold mb-2">Home</Link>
        <Link to="/subscriptions" className="block text-sm text-gray-700 mb-1">Subscriptions</Link>
        <Link to="/playlists" className="block text-sm text-gray-700 mb-1">Playlists</Link>
        <Link to="/upload" className="block text-sm text-gray-700">Upload</Link>
      </div>
      <div className="bg-white rounded shadow-sm p-3">
        <h4 className="text-sm font-medium mb-2">Explore</h4>
        <Link to="/trending" className="block text-sm text-gray-700">Trending</Link>
        <Link to="/discover" className="block text-sm text-gray-700">Discover</Link>
      </div>
    </nav>
  )
}
