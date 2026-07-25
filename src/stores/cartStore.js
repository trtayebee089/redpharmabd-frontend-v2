import { defineStore } from 'pinia'
import { useUiStore } from './uiStore'

const STORAGE_KEY = 'redpharma_guest_cart'

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function linePrice(item) {
  return Number(item.product.discount_price || item.product.price || 0) * item.quantity
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: readCart(),
  }),
  getters: {
    count: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, item) => sum + linePrice(item), 0),
    discount: (state) =>
      state.items.reduce((sum, item) => {
        const regular = Number(item.product.price || 0)
        const offer = Number(item.product.discount_price || regular)
        return sum + Math.max(regular - offer, 0) * item.quantity
      }, 0),
    deliveryCharge() {
      return this.subtotal > 999 || this.subtotal === 0 ? 0 : 60
    },
    total() {
      return this.subtotal + this.deliveryCharge
    },
    hasPrescription() {
      return this.items.some((item) => item.product.prescription_required)
    },
  },
  actions: {
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },
    quantityFor(productId) {
      return this.items.find((item) => item.product.id === productId)?.quantity || 0
    },
    add(product, quantity = 1) {
      const existing = this.items.find((item) => item.product.id === product.id)
      const max = product.stock || 999
      if (existing) existing.quantity = Math.min(existing.quantity + quantity, max)
      else this.items.push({ id: `${product.id}`, product, quantity: Math.min(quantity, max) })
      this.persist()
      useUiStore().toast('Added to cart')
    },
    update(productId, quantity) {
      if (quantity < 1) return this.remove(productId)
      const item = this.items.find((entry) => entry.product.id === productId)
      if (!item) return
      item.quantity = Math.min(quantity, item.product.stock || 999)
      this.persist()
    },
    remove(productId) {
      this.items = this.items.filter((item) => item.product.id !== productId)
      this.persist()
      useUiStore().toast('Removed from cart', 'info')
    },
    clear() {
      this.items = []
      this.persist()
    },
  },
})
