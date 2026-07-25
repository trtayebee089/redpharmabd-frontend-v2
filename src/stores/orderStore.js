import { defineStore } from 'pinia'
import { orderService } from '../services/orderService'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [],
    loading: false,
  }),
  actions: {
    async fetch() {
      this.loading = true
      try {
        const result = await orderService.list()
        this.orders = result.data
        return result
      } finally {
        this.loading = false
      }
    },
  },
})
