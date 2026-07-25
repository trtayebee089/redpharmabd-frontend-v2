import api, { normalizeList } from './api'
import { normalizeProduct } from './productService'

const fallback = [
  { id: 1, name: 'Pain Relief', slug: 'pain-relief', product_count: 128 },
  { id: 2, name: 'Digestive Care', slug: 'digestive-care', product_count: 94 },
  { id: 3, name: 'Vitamins', slug: 'vitamins', product_count: 76 },
  { id: 4, name: 'Baby Care', slug: 'baby-care', product_count: 52 },
  { id: 5, name: 'Diabetes Care', slug: 'diabetes-care', product_count: 68 },
  { id: 6, name: 'Personal Care', slug: 'personal-care', product_count: 88 },
]

export function normalizeCategory(category = {}) {
  return {
    id: category.id || category.category_id || category.slug || category.name,
    name: category.name || category.category_name || category.title || 'Category',
    slug: category.slug || category.url_slug || category.id,
    image: category.image || category.icon || category.thumbnail || '',
    product_count: category.product_count || category.products_count || category.count || 0,
    description: category.description || '',
    raw: category,
  }
}

export const categoryService = {
  async list(params = {}) {
    try {
      const response = await api.get('/categories', { params })
      const normalized = normalizeList(response.data)
      const data = normalized.data.length ? normalized.data : fallback
      return {
        ...normalized,
        data: data.map(normalizeCategory),
        meta: normalized.data.length
          ? normalized.meta
          : { total: fallback.length, current_page: 1, last_page: 1 },
      }
    } catch {
      return {
        data: fallback.map(normalizeCategory),
        meta: { total: fallback.length, current_page: 1, last_page: 1 },
        offline: true,
      }
    }
  },

  /**
   * Products belonging to one category.
   *
   * GET /categories/{slug} returns the category on `data` and its products on
   * a sibling `products` key. Unlike /products this genuinely scopes to the
   * category, which is what makes category-wise merchandising possible.
   * Returns an empty list rather than throwing so a single failing shelf can
   * never take the page down.
   */
  async products(slug, params = {}) {
    if (!slug) return { category: null, data: [] }
    try {
      const response = await api.get(`/categories/${slug}`, { params })
      const payload = response?.data || {}
      const list = Array.isArray(payload.products)
        ? payload.products
        : payload.products?.data || []

      return {
        category: payload.data ? normalizeCategory(payload.data) : null,
        data: list.map(normalizeProduct),
      }
    } catch {
      return { category: null, data: [] }
    }
  },
}
