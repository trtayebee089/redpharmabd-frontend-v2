const STORAGE_KEY = 'redpharma_recently_viewed_v1'
const LIMIT = 30

function read() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

export const recentlyViewedService = {
  list() { return read().sort((a, b) => new Date(b.last_viewed) - new Date(a.last_viewed)).slice(0, LIMIT) },
  record(product) {
    if (!product?.id) return this.list()
    const now = new Date().toISOString()
    const items = read().filter((item) => String(item.product_id) !== String(product.id))
    const previous = read().find((item) => String(item.product_id) === String(product.id))
    items.unshift({ product_id: product.id, slug: product.slug, viewed_time: previous?.viewed_time || now, last_viewed: now })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, LIMIT)))
    return items.slice(0, LIMIT)
  },
  clear() { localStorage.removeItem(STORAGE_KEY) },
  syncPayload() { return { version: 1, items: this.list().map(({ product_id, viewed_time, last_viewed }) => ({ product_id, viewed_time, last_viewed })) } },
}
