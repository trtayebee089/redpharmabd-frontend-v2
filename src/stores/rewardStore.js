import { defineStore } from 'pinia'
import { rewardService } from '../services/rewardService'

export const useRewardStore = defineStore('rewards', {
  state: () => ({ profile: null, transactions: [], loading: false, error: '' }),
  getters: { wallet: (state) => state.profile?.wallet || {}, campaigns: (state) => state.profile?.campaigns || [] },
  actions: {
    async load() {
      this.loading = true; this.error = ''
      try { const [profile, transactions] = await Promise.all([rewardService.profile(), rewardService.transactions()]); this.profile = profile; this.transactions = transactions.data; return profile }
      catch (error) { this.error = error.message || 'Unable to load rewards.'; throw error }
      finally { this.loading = false }
    },
    async quote(points, orderTotal) { return rewardService.redeem(points, orderTotal) },
  },
})
