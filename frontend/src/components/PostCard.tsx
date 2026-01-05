import React from 'react'
import Avatar from './Avatar'
import Card from './Card'
import { Button } from './index'

export default function PostCard({ user, content }: { user: { name: string; avatar?: string }; content: string }) {
  return (
    <Card>
      <div className="flex gap-3">
        <Avatar src={user.avatar} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-gray-500">@username</div>
            </div>
          </div>
          <div className="mt-2 text-sm">{content}</div>
          <div className="mt-3 flex gap-2">
            <Button variant="ghost">Like</Button>
            <Button variant="ghost">Comment</Button>
            <Button variant="ghost">Share</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
