import React from 'react'
import { Input } from './index'
import Button from './Button'

export default function Composer() {
  return (
    <div className="bg-white rounded p-4 shadow-sm">
      <div className="flex gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <Input placeholder="What's happening?" />
          <div className="mt-3 flex justify-between items-center">
            <div className="text-sm text-gray-500">Add media</div>
            <Button variant="primary">Post</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
