import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button } from '../components'
import { useLogin } from '../hooks'

import { useToast } from '../components/Toast'

export default function Login() {
  const navigate = useNavigate()
  const toast = useToast()
  const login = useLogin()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      0: { value: string }
      1: { value: string }
    }
    const usernameOrEmail = (target[0].value || '').trim()
    const password = (target[1].value || '').trim()

    login.mutate({ username: usernameOrEmail, email: usernameOrEmail, password }, {
      onSuccess() {
        toast.push('Signed in')
        navigate('/')
      },
      onError(err: any) {
        toast.push(err?.response?.data?.message || 'Sign in failed')
      }
    })
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <Input placeholder="Email or username" />
        <Input placeholder="Password" type="password" />
        <Button type="submit" className="w-full" variant="primary">Sign in</Button>
        <div className="text-center text-sm">
          <Link to="/register" className="text-primary">Create account</Link>
        </div>
      </form>
    </div>
  )
}
