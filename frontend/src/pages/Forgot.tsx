import React from 'react'
import { Input, Button } from '../components'

export default function Forgot() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
      <form className="space-y-4 bg-white p-6 rounded shadow">
        <Input placeholder="Email" />
        <Button className="w-full" variant="primary">Send reset link</Button>
      </form>
    </div>
  )
}
