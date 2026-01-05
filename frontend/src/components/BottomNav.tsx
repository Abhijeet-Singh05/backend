import React from 'react'
import { Link } from 'react-router-dom'

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 flex justify-around lg:hidden">
      <Link to="/" className="flex flex-col items-center text-xs text-gray-700">
        <span>🏠</span>
        <span>Home</span>
      </Link>
      <Link to="/search" className="flex flex-col items-center text-xs text-gray-700">
        <span>🔍</span>
        <span>Search</span>
      </Link>
      <Link to="/upload" className="flex flex-col items-center text-xs text-gray-700">
        <span>➕</span>
        <span>Upload</span>
      </Link>
      <Link to="/activity" className="flex flex-col items-center text-xs text-gray-700">
        <span>🔔</span>
        <span>Activity</span>
      </Link>
      <Link to="/profile/1" className="flex flex-col items-center text-xs text-gray-700">
        <span>👤</span>
        <span>Me</span>
      </Link>
    </nav>
  )
}
