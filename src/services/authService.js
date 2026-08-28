import api, { unwrap } from './api'

function normalizeAuth(payload) {
  const data = unwrap({ data: payload }) || payload
  return {
    token: data?.token || data?.access_token || data?.authorization?.token || '',
    user: data?.user || data?.customer || data,
  }
}

export const authService = {
  async login(credentials) {
    const response = await api.post('/v1/customer/login', credentials)
    return normalizeAuth(response.data)
  },
  async register(payload) {
    const response = await api.post('/v1/customer/register', payload)
    return normalizeAuth(response.data)
  },
  async forgotPassword(payload) {
    const response = await api.post('/v1/customer/forgot-password', payload)
    return unwrap(response)
  },
  async resetPassword(payload) {
    const response = await api.post('/v1/customer/reset-password', payload)
    return unwrap(response)
  },
  async profile() {
    const response = await api.get('/v1/customer/profile')
    return unwrap(response)
  },
  async updateProfile(payload) {
    const response = await api.put('/v1/customer/profile', payload)
    return unwrap(response)
  },
  async logout() {
    try {
      await api.post('/v1/customer/logout')
    } finally {
      localStorage.removeItem('redpharma_token')
      localStorage.removeItem('redpharma_user')
    }
  },
}
