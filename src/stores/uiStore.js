import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    cartOpen: false,
    searchOpen: false,
    filterOpen: false,
    toasts: [],
  }),
  actions: {
    openCart() {
      this.cartOpen = true
    },
    closeCart() {
      this.cartOpen = false
    },
    toggleSearch(value) {
      this.searchOpen = value ?? !this.searchOpen
    },
    toggleFilter(value) {
      this.filterOpen = value ?? !this.filterOpen
    },
    toast(message, type = 'success') {
      const id = Date.now()
      this.toasts.push({ id, message, type })
      window.setTimeout(() => this.dismissToast(id), 3200)
    },
    dismissToast(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id)
    },
  },
})
