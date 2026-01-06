import axios from 'axios'
import { getToken } from './auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/',
  headers: {
    'Content-Type': 'application/json'
  }
})

// send cookies (refresh token / access token cookies) to backend
api.defaults.withCredentials = true

api.interceptors.request.use(config => {
  const token = getToken()
  if (token && config.headers) {
    // eslint-disable-next-line no-param-reassign
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Response interceptor: if 401, try refresh token once then retry original request
let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config
    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token
            return axios(originalRequest)
          })
          .catch(e => Promise.reject(e))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshRes = await axios.post(`${import.meta.env.VITE_API_URL || ''}/users/refresh-token`, {}, { withCredentials: true })
        const newToken = refreshRes.data?.data?.accessToken
        if (newToken) {
          // update local token
          try { localStorage.setItem('socialapp_token', newToken) } catch (e) {}
        }
        processQueue(null, newToken)
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(err)
  }
)

export default api
