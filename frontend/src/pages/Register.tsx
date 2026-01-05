import React from 'react'
import { Input, Button } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import { useRegister } from '../hooks'
import { useToast } from '../components/Toast'

export default function Register() {
  const register = useRegister()
  const navigate = useNavigate()
  const toast = useToast()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      0: { value: string }
      1: { value: string }
      2: { value: string }
    }
    const fullname = target[0].value
    const email = target[1].value
    const password = target[2].value

    register.mutate({ fullname, email, username: email.split('@')[0], password }, {
      onSuccess() {
        toast.push('Account created')
        navigate('/')
      },
      onError(err: any) {
        toast.push(err?.response?.data?.message || 'Registration failed')
      }
    })
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <Button type="submit" className="w-full" variant="primary">Sign up</Button>
        <div className="text-center text-sm">
          <Link to="/login" className="text-primary">Already have an account?</Link>
        </div>
      </form>
    </div>
  )
}
