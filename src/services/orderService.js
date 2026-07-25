import api, { normalizeList, unwrap } from './api'

export const orderService = {
  async list(params = {}) {
    try {
      const response = await api.get('/orders', { params })
      return normalizeList(response.data)
    } catch {
      return { data: [], meta: { total: 0, current_page: 1, last_page: 1 } }
    }
  },
  async find(id) {
    const response = await api.get(`/orders/${id}`)
    return unwrap(response)
  },
  async checkout(payload) {
    const response = await api.post('/orders', payload)
    return unwrap(response)
  },
  async track(payload) {
    const response = await api.post('/track-order', payload)
    return unwrap(response)
  },
  async requestOrder(payload) {
    const response = await api.post('/request-order', payload)
    return unwrap(response)
  },
}
