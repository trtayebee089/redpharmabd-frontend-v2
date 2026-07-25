import api, { unwrap } from './api'

export const cartService = {
  async get() {
    const response = await api.get('/cart')
    return unwrap(response)
  },
  async add(productId, quantity = 1) {
    const response = await api.post('/cart', { product_id: productId, quantity })
    return unwrap(response)
  },
  async update(itemId, quantity) {
    const response = await api.put(`/cart/${itemId}`, { quantity })
    return unwrap(response)
  },
  async remove(itemId) {
    const response = await api.delete(`/cart/${itemId}`)
    return unwrap(response)
  },
}
