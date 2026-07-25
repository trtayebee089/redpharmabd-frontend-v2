<template>
  <section
    v-if="!hidden"
    ref="root"
    :class="
      panelled
        ? 'relative overflow-hidden rounded-3xl bg-gradient-to-br p-5 ring-1 ring-slate-900/[0.06] sm:p-7 ' +
          panelTone
        : ''
    "
  >
    <component
      :is="watermark"
      v-if="panelled && watermark"
      class="pointer-events-none absolute -right-8 -top-10 h-44 w-44 text-ink opacity-[0.05]"
      :stroke-width="1"
      aria-hidden="true"
    />
    <div :class="panelled ? 'relative' : ''">
      <SectionHeader
        :eyebrow="eyebrow"
        :title="heading"
        :subtitle="caption"
        :to="link"
        :link-label="linkLabel"
        :tone="tone"
      />
      <ProductRail
        :products="items"
        :loading="pending"
        :ranked="ranked"
        :bleed="!panelled"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import SectionHeader from '../common/SectionHeader.vue'
import ProductRail from './ProductRail.vue'
import { categoryService } from '../../services/categoryService'
import { productService } from '../../services/productService'
import { categoryIcon } from '../../utils/categoryIcon'

/**
 * A lazily-loaded product shelf.
 *
 * Give it a `category` and it pulls that category's own products from
 * GET /categories/{slug}, titling itself with the real category name and
 * linking to the real category page. Give it `products` instead and it
 * renders them without making any request at all.
 *
 * The shelf removes itself when a category turns out to have no products,
 * so the homepage never shows an empty rail.
 */
const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  to: { type: String, default: '' },
  linkLabel: { type: String, default: 'View all' },
  tone: { type: String, default: 'default' },
  ranked: { type: Boolean, default: false },
  category: { type: Object, default: null },
  /** Catalogue page to pull when no category is given. */
  page: { type: Number, default: 0 },
  limit: { type: Number, default: 18 },
  products: { type: Array, default: null },
  /** 'panel' lifts the shelf onto a tinted card so rails never all look alike. */
  variant: { type: String, default: 'plain' },
  panelTone: { type: String, default: 'from-slate-100 to-white' },
})

/* Shared so a category is never requested twice, including after the user
   navigates away and comes back to the homepage. */
const cache = new Map()
const inflight = new Map()

function load(key, fetcher) {
  if (cache.has(key)) return Promise.resolve(cache.get(key))
  if (inflight.has(key)) return inflight.get(key)

  const request = fetcher()
    .then((response) => {
      const data = Array.isArray(response?.data) ? response.data : []
      cache.set(key, data)
      return data
    })
    .catch(() => [])
    .finally(() => inflight.delete(key))

  inflight.set(key, request)
  return request
}

/* A healthy IntersectionObserver reports on its first tick, even for targets
   far below the fold. If nothing reports shortly after the first shelf starts
   observing, treat lazy loading as unavailable and load every waiting shelf
   rather than stranding the page on skeletons. */
let ioReported = false
let healthCheck = null
const waiting = new Set()

function watchObserverHealth() {
  if (healthCheck || ioReported) return
  healthCheck = window.setTimeout(() => {
    healthCheck = null
    if (ioReported) return
    waiting.forEach((fn) => fn())
    waiting.clear()
  }, 2500)
}

const root = ref(null)
const fetched = ref([])
const settled = ref(false)
let observer = null

const preloaded = computed(() => Array.isArray(props.products))
const items = computed(() =>
  (preloaded.value ? props.products : fetched.value).slice(0, props.limit),
)
const pending = computed(() => !preloaded.value && !settled.value)
const hidden = computed(() => settled.value && !items.value.length)

const heading = computed(() => props.category?.name || props.title)
const link = computed(() => (props.category ? `/category/${props.category.slug}` : props.to))
const caption = computed(() => {
  if (props.subtitle) return props.subtitle
  const count = props.category?.product_count
  return count ? `${count} products available in this category` : ''
})

const panelled = computed(() => props.variant === 'panel')
const watermark = computed(() => (props.category ? categoryIcon(props.category.name) : null))

/** Either a category's own products, or a page of the general catalogue. */
const lazySource = computed(() => {
  if (props.category?.slug) {
    return {
      key: `cat:${props.category.slug}`,
      fetch: () => categoryService.products(props.category.slug),
    }
  }
  if (props.page > 0) {
    return {
      key: `page:${props.page}`,
      fetch: () => productService.list({ page: props.page, per_page: props.limit }),
    }
  }
  return null
})

async function fetchShelf() {
  const source = lazySource.value
  if (settled.value || !source) return
  fetched.value = await load(source.key, source.fetch)
  settled.value = true
}

function run() {
  waiting.delete(run)
  observer?.disconnect()
  observer = null
  fetchShelf()
}

onMounted(() => {
  if (preloaded.value || !lazySource.value) {
    settled.value = true
    return
  }

  if (typeof IntersectionObserver === 'undefined') {
    fetchShelf()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      ioReported = true
      if (entries.some((entry) => entry.isIntersecting)) run()
    },
    { rootMargin: '700px 0px' },
  )
  observer.observe(root.value)

  waiting.add(run)
  watchObserverHealth()
})

onBeforeUnmount(() => {
  waiting.delete(run)
  observer?.disconnect()
})
</script>
