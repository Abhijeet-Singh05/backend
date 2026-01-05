import React from 'react'
import { Navigate } from 'react-router-dom'
import { useMe } from '../hooks'
import Spinner from './Spinner'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useMe()
  if (isLoading) return <div className="flex items-center justify-center py-8"><Spinner /></div>
  if (!data || !data.data) return <Navigate to="/login" replace />
  return <>{children}</>
}
