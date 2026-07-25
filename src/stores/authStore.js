import { defineStore } from 'pinia'
import { authService } from '../services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('redpharma_user') || 'null'),
    token: localStorage.getItem('redpharma_token') || '',
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },
  actions: {
    persist(auth) {
      this.token = auth.token
      this.user = auth.user
      if (auth.token) localStorage.setItem('redpharma_token', auth.token)
      localStorage.setItem('redpharma_user', JSON.stringify(auth.user || {}))
    },
    async login(credentials) {
      this.loading = true
      try {
        const auth = await authService.login(credentials)
        this.persist(auth)
        return auth
      } finally {
        this.loading = false
      }
    },
    async register(payload) {
      this.loading = true
      try {
        const auth = await authService.register(payload)
        this.persist(auth)
        return auth
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.user = null
      this.token = ''
      localStorage.removeItem('redpharma_token')
      localStorage.removeItem('redpharma_user')
    },
  },
})
