import api, { normalizeList, unwrap } from './api'

export const rewardService = {
  async profile() { return unwrap(await api.get('/reward/profile')) },
  async wallet() { return unwrap(await api.get('/reward/wallet')) },
  async transactions(params = {}) { return normalizeList((await api.get('/reward/transactions', { params })).data) },
  async history(params = {}) { return normalizeList((await api.get('/reward/history', { params })).data) },
  async campaigns() { return normalizeList((await api.get('/reward/campaigns')).data).data },
  async settings() { return unwrap(await api.get('/reward/settings')) },
  async redeem(points, orderTotal) { return unwrap(await api.post('/reward/redeem', { points, order_total: orderTotal })) },
}
