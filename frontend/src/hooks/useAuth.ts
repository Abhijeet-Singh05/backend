import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'
import { setToken, clearToken, getToken } from '../lib/auth'
import { RegisterPayload, RegisterResponse } from '../type/auth'

type Credentials = {
  email: string
  password: string
}

interface LoginResponse {
  data?: {
    accessToken?: string
    token?: string
  }
}

/* ---------------- LOGIN ---------------- */

export function useLogin() {
  const qc = useQueryClient()

  return useMutation<LoginResponse, unknown, Credentials>({
    mutationFn: async (creds) => {
      const res = await api.post('/users/login', creds)
      return res.data
    },
    onSuccess(data) {
      const token = data?.data?.accessToken || data?.data?.token
      if (token) setToken(token)
      qc.invalidateQueries({ queryKey: ['me'] })
    },
  })
}

/* ---------------- REGISTER ---------------- */

export function useRegister() {
  const qc = useQueryClient()

  return useMutation<RegisterResponse, unknown, RegisterPayload>({
    mutationFn: async (payload) => {
      const res = await api.post('/users/register', payload)
      return res.data
    },
    onSuccess(data) {
      const token = data?.data?.accessToken || data?.data?.token
      if (token) setToken(token)
      qc.invalidateQueries({ queryKey: ['me'] })
    },
  })
}

/* ---------------- LOGOUT ---------------- */

export function useLogout() {
  const qc = useQueryClient()

  return useMutation<void, unknown, void>({
    mutationFn: async () => {
      try {
        await api.post('/users/logout')
      } catch {
        // ignore
      }
      clearToken()
    },
    onSuccess() {
      qc.clear()
    },
  })
}

/* ---------------- CURRENT USER ---------------- */

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const token = getToken()
      if (!token) return null
      const res = await api.get('/users/getCurrentUser')
      return res.data
    },
    staleTime: 1000 * 60 * 5,
  })
}
