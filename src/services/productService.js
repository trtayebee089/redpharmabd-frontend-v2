import api, { normalizeList, unwrap } from './api'

const productFallback = [
  {
    id: 1,
    name: 'Napa Extra 500mg Tablet',
    slug: 'napa-extra-500mg-tablet',
    generic_name: 'Paracetamol + Caffeine',
    manufacturer: 'Beximco Pharmaceuticals',
    strength: '500mg',
    unit: '10 tablets',
    price: 25,
    discount_price: 22,
    stock: 80,
    prescription_required: false,
    image: '',
    category_slug: 'pain-relief',
  },
  {
    id: 2,
    name: 'Seclo 20 Capsule',
    slug: 'seclo-20-capsule',
    generic_name: 'Omeprazole',
    manufacturer: 'Square Pharmaceuticals',
    strength: '20mg',
    unit: '10 capsules',
    price: 70,
    stock: 44,
    prescription_required: true,
    image: '',
    category_slug: 'digestive-care',
  },
  {
    id: 3,
    name: 'Ceevit 250mg Chewable Tablet',
    slug: 'ceevit-250mg-chewable-tablet',
    generic_name: 'Vitamin C',
    manufacturer: 'Square Pharmaceuticals',
    strength: '250mg',
    unit: '20 tablets',
    price: 38,
    discount_price: 34,
    stock: 120,
    prescription_required: false,
    image: '',
    category_slug: 'vitamins',
  },
  {
    id: 4,
    name: 'DP 10mg Tablet',
    slug: 'dp-10mg-tablet',
    generic_name: 'Domperidone',
    manufacturer: 'Renata PLC',
    strength: '10mg',
    unit: '10 tablets',
    price: 30,
    stock: 18,
    prescription_required: true,
    image: '',
    category_slug: 'digestive-care',
  },
]

export function normalizeProduct(product = {}) {
  const manufacturer =
    product.manufacturer?.title ||
    product.manufacturer?.name ||
    product.company_name?.title ||
    product.company_name?.name ||
    product.company?.title ||
    product.company?.name ||
    product.brand?.title ||
    product.brand?.name ||
    product.manufacturer ||
    product.company_name ||
    product.company ||
    product.brand ||
    ''

  return {
    id: product.id || product.product_id || product.slug || product.name,
    name: product.name || product.product_name || product.title || 'Medicine',
    slug: product.slug || product.url_slug || product.id,
    generic_name: product.generic_name || product.generic || product.genericName || '',
    manufacturer: typeof manufacturer === 'object' ? '' : manufacturer,
    strength: product.strength || product.size || product.weight || '',
    unit: product.unit || product.pack_size || product.pack || product.quantity_unit || '',
    price: Number(product.price || product.sale_price || product.regular_price || 0),
    discount_price: product.discount_price || product.offer_price || product.special_price || null,
    stock: Number(product.stock ?? product.quantity ?? product.qty ?? 0),
    prescription_required: Boolean(product.prescription_required || product.is_prescription_required || product.rx_required),
    image: product.image || product.thumbnail || product.photo || product.image_url || '',
    description: product.description || product.details || '',
    usage: product.usage || product.dosage || product.direction || '',
    warning: product.warning || product.precaution || '',
    category_slug: product.category_slug || product.category?.slug || product.category_id || '',
    raw: product,
  }
}

async function tryEndpoints(endpoints, params) {
  let lastError
  for (const endpoint of endpoints) {
    try {
      const response = await api.get(endpoint, { params })
      return response.data
    } catch (error) {
      lastError = error
    }
  }
  throw lastError
}

export const productService = {
  async list(params = {}) {
    try {
      const payload = await tryEndpoints(['/products', '/product', '/shop/products'], params)
      const normalized = normalizeList(payload)
      const data = normalized.data.length ? normalized.data : productFallback
      return {
        ...normalized,
        data: data.map(normalizeProduct),
        meta: normalized.data.length
          ? normalized.meta
          : { current_page: 1, last_page: 1, total: productFallback.length },
      }
    } catch {
      return {
        data: productFallback.map(normalizeProduct),
        meta: { current_page: 1, last_page: 1, total: productFallback.length },
        offline: true,
      }
    }
  },

  async featured(params = {}) {
    return this.list({ per_page: 24, ...params })
  },

  async find(slug) {
    try {
      const payload = await tryEndpoints([`/products/${slug}`, `/product/${slug}`, `/shop/products/${slug}`])
      return normalizeProduct(unwrap({ data: payload }))
    } catch {
      return normalizeProduct(productFallback.find((item) => item.slug === slug) || productFallback[0])
    }
  },

  async search(query) {
    return this.list({ search: query, q: query, per_page: 12 })
  },
}
