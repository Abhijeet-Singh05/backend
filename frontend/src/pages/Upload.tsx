import React, { useState } from 'react'
import { Input, Button } from '../components'
import { useUpload } from '../hooks'
import { useToast } from '../components/Toast'
import { useNavigate } from 'react-router-dom'

export default function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0]
    if (f) setFile(f)
  }

  const upload = useUpload()
  const toast = useToast()
  const navigate = useNavigate()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return toast.push('Please select a file')
    upload.mutate({ file, title, description }, {
      onSuccess() {
        toast.push('Uploaded')
        navigate('/')
      },
      onError(err: any) {
        toast.push(err?.response?.data?.message || 'Upload failed')
      }
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Upload</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div className="border-dashed border-2 border-gray-200 rounded p-6 text-center">
          <input type="file" accept="video/*,image/*" onChange={onFile} />
          {file && <div className="mt-2 text-sm">Selected: {file.name}</div>}
        </div>
        <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <Button variant="primary">Upload</Button>
      </form>
    </div>
  )
}
