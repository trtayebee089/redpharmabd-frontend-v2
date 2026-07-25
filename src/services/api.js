import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://redpharma-api.techrajshahi.com/api/'

export const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 20000,
})

export function unwrap(response) {
  const data = response?.data
  if (Array.isArray(data)) return data
  return data?.data ?? data?.result ?? data?.items ?? data
}

export function normalizeList(payload) {
  const source = unwrap({ data: payload })
  const list = Array.isArray(source)
    ? source
    : source?.data || source?.items || source?.products || source?.categories || []

  return {
    data: Array.isArray(list) ? list : [],
    meta: source?.meta || {
      current_page: source?.current_page || 1,
      last_page: source?.last_page || 1,
      total: source?.total || (Array.isArray(list) ? list.length : 0),
    },
  }
}

export function normalizeError(error) {
  const status = error?.response?.status
  const data = error?.response?.data
  const message =
    data?.message ||
    data?.error ||
    (status === 401 ? 'Please log in again to continue.' : 'Something went wrong. Please try again.')

  return {
    status,
    message,
    errors: data?.errors || {},
  }
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('redpharma_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = normalizeError(error)
    if (normalized.status === 401) {
      localStorage.removeItem('redpharma_token')
      localStorage.removeItem('redpharma_user')
      window.dispatchEvent(new CustomEvent('redpharma:unauthorized'))
    }
    return Promise.reject(normalized)
  },
)

export default api
