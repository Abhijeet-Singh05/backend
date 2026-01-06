import { useMutation } from '@tanstack/react-query'
import api from '../lib/api'
import { UploadPayload, UploadResponse } from '../type/upload'

export function useUpload() {
  return useMutation<UploadResponse, unknown, UploadPayload>({
    mutationFn: async (payload) => {
      const form = new FormData()
      form.append('file', payload.file)
      if (payload.title) form.append('title', payload.title)
      if (payload.description) form.append('description', payload.description)

      const res = await api.post('/uploads', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return res.data
    },
  })
}
