import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMe, useLogout } from '../hooks'
import Avatar from './Avatar'

export default function Header() {
  const { data } = useMe()
  const user = data?.data || null
  const logout = useLogout()
  const navigate = useNavigate()

  function handleLogout() {
    logout.mutate(null, {
      onSuccess() {
        navigate('/login')
      }
    })
  }

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">SocialApp</Link>
        <nav className="space-x-4 flex items-center">
          <Link to="/" className="text-sm text-gray-700">Home</Link>
          <Link to="/upload" className="text-sm text-gray-700">Upload</Link>
          {user ? (
            <div className="flex items-center gap-3">
              <Link to={`/profile/${user._id}`} className="flex items-center gap-2">
                <Avatar src={user.avatar} />
                <span className="text-sm">{user.fullname}</span>
              </Link>
              <button onClick={handleLogout} className="text-sm text-gray-700">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="text-sm text-gray-700">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
