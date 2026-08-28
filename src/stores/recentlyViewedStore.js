import { defineStore } from 'pinia'
import { recentlyViewedService } from '../services/recentlyViewedService'

export const useRecentlyViewedStore = defineStore('recentlyViewed', {
  state: () => ({ items: recentlyViewedService.list() }),
  actions: { record(product) { this.items = recentlyViewedService.record(product) }, clear() { recentlyViewedService.clear(); this.items = [] }, syncPayload() { return recentlyViewedService.syncPayload() } },
})
