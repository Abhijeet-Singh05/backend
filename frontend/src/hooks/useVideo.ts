import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'

/* ---------------- VIDEO ---------------- */

export function useVideo(id?: string) {
  return useQuery({
    queryKey: ['video', id],
    queryFn: async () => {
      if (!id) return null
      const res = await api.get(`/videos/${id}`)
      return res.data
    },
    enabled: !!id,
  })
}

/* ---------------- POST COMMENT ---------------- */

interface CommentPayload {
  text: string
}

export function usePostComment(videoId: string) {
  const qc = useQueryClient()

  return useMutation<unknown, unknown, CommentPayload>({
    mutationFn: async (payload) => {
      const res = await api.post(`/videos/${videoId}/comments`, payload)
      return res.data
    },
    onSuccess() {
      qc.invalidateQueries({ queryKey: ['video', videoId] })
    },
  })
}
