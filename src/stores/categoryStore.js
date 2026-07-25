import { defineStore } from 'pinia'
import { categoryService } from '../services/categoryService'

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [],
    loading: false,
  }),
  actions: {
    async fetch() {
      if (this.categories.length) return this.categories
      this.loading = true
      try {
        const result = await categoryService.list()
        this.categories = result.data
        return this.categories
      } finally {
        this.loading = false
      }
    },
  },
})
