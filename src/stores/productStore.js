import { defineStore } from 'pinia'
import { productService } from '../services/productService'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    meta: {},
    loading: false,
    error: '',
  }),
  actions: {
    async fetch(params = {}) {
      this.loading = true
      this.error = ''
      try {
        const result = await productService.list(params)
        this.products = result.data
        this.meta = result.meta
        return result
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
