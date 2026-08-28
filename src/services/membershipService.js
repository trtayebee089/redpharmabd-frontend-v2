import api, { unwrap } from './api'

export const membershipService = {
  async current() { return unwrap(await api.get('/v1/customer/membership')) },
  async history(params = {}) { return unwrap(await api.get('/v1/customer/membership/history', { params })) },
  async refreshProgress() { return unwrap(await api.get('/v1/customer/membership/progress')) },
  async renew() { return unwrap(await api.post('/v1/customer/membership/renew', {})) },
}
