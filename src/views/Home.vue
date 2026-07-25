<template>
  <div>
    <!-- ═══════════ HERO — contained ═══════════ -->
    <HeroBanner
      :products="products"
      :loading="loading"
      :categories="categories"
      :category-loading="categoryStore.loading"
      :suggestions="quickSearches"
      :drawer-open="drawerOpen"
      @close-sidebar="drawerOpen = false"
    />

    <!-- ═══════════ TRUST — full width ═══════════ -->
    <div :class="[PAGE, 'mt-14 sm:mt-16']">
      <TrustBadgeSection v-reveal />
    </div>

    <!-- ═══════════ SHOPPING FLOOR — sticky rail + shelves ═══════════ -->
    <div :class="[PAGE, 'mt-9']">
      <div class="min-w-0 space-y-11 sm:space-y-14">
        <!-- Mobile / tablet category access -->
        <section v-if="categories.length" class="xl:hidden">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p
                class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-600"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-primary-500"></span>
                Categories
              </p>
              <h2 class="mt-2 font-display text-[22px] font-extrabold text-ink">
                Shop by health need
              </h2>
            </div>
            <button
              type="button"
              class="inline-flex shrink-0 items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-bold text-white transition active:scale-95"
              @click="drawerOpen = true"
            >
              <LayoutGrid class="h-4 w-4" :stroke-width="2" />
              All
            </button>
          </div>
          <CategoryMenu :categories="categories" class="mt-4" />
        </section>

        <!-- Popular categories -->
        <PopularCategories v-if="categories.length" v-reveal :categories="popularCategories" />

        <!-- Featured products -->
        <ProductShelf
          v-reveal
          eyebrow="Handpicked"
          title="Featured products"
          subtitle="A curated slice of the catalogue to get you started."
          to="/categories"
          link-label="Browse all"
          variant="panel"
          panel-tone="from-primary-50 via-white to-accent-50"
          :page="2"
        />

        <!--
          Category-wise sliders, generated from the category API. Each shelf
          pulls its own products from /categories/{slug} lazily as it nears the
          viewport, and removes itself if the category comes back empty.
          Promotional bands are interleaved so no two shelves ever stack.
        -->
        <template v-for="block in blocks" :key="block.key">
          <ProductShelf
            v-if="block.type === 'category'"
            v-reveal
            :category="block.category"
            :eyebrow="block.eyebrow"
            :variant="block.variant"
            :panel-tone="block.panelTone"
          />
          <PromoWellness v-else-if="block.promo === 'wellness'" v-reveal />
          <PromoPrescription v-else-if="block.promo === 'prescription'" v-reveal />
          <HealthCollections
            v-else-if="block.promo === 'collections'"
            v-reveal
            :collections="collections"
          />
          <PromoDelivery v-else-if="block.promo === 'delivery'" v-reveal />
        </template>

        <!-- Featured brands -->
        <BrandStrip v-reveal :brands="brands" />

        <!-- Recommended: its own catalogue page, so it never repeats Featured -->
        <ProductShelf
          v-reveal
          eyebrow="Before you go"
          title="Recommended for your cabinet"
          subtitle="More everyday items worth keeping on hand."
          to="/categories"
          link-label="Browse all"
          variant="panel"
          panel-tone="from-accent-50 via-white to-primary-50"
          :page="3"
        />
      </div>
    </div>

    <!-- ═══════════ SUPPORT + NEWSLETTER — full width ═══════════ -->
    <div :class="[PAGE, 'mt-14 space-y-4 sm:mt-20']">
      <SupportBand v-reveal />
      <NewsletterBand v-reveal />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { LayoutGrid } from 'lucide-vue-next'
import HeroBanner from '../components/home/HeroBanner.vue'
import PopularCategories from '../components/home/PopularCategories.vue'
import PromoWellness from '../components/home/PromoWellness.vue'
import PromoPrescription from '../components/home/PromoPrescription.vue'
import PromoDelivery from '../components/home/PromoDelivery.vue'
import HealthCollections from '../components/home/HealthCollections.vue'
import BrandStrip from '../components/home/BrandStrip.vue'
import SupportBand from '../components/home/SupportBand.vue'
import NewsletterBand from '../components/home/NewsletterBand.vue'
import ProductShelf from '../components/product/ProductShelf.vue'
import CategoryMenu from '../components/category/CategoryMenu.vue'
import CategorySidebar from '../components/category/CategorySidebar.vue'
import TrustBadgeSection from '../components/layout/TrustBadgeSection.vue'
import { vReveal } from '../composables/useReveal'
import { productService } from '../services/productService'
import { useCategoryStore } from '../stores/categoryStore'

/** Full-bleed rhythm: 100% wide with breakpoint-scaled gutters. */
const PAGE = 'w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12'

const categoryStore = useCategoryStore()
const products = ref([])
const loading = ref(true)
const drawerOpen = ref(false)

onMounted(async () => {
  loading.value = true
  await categoryStore.fetch()
  const response = await productService.featured({ per_page: 24 })
  products.value = response.data
  loading.value = false
})

/**
 * The categories endpoint exposes real counts on `total_products`, which the
 * store's normaliser does not map. Read it from `raw` rather than changing the
 * service, and drop categories with nothing to show (and any missing a slug,
 * which would otherwise link nowhere).
 */
const categories = computed(() =>
  categoryStore.categories
    .map((category) => ({
      ...category,
      product_count: category.product_count || category.raw?.total_products || 0,
    }))
    .filter((category) => category.product_count > 0 && category.raw?.slug),
)

const popularCategories = computed(() => categories.value.slice(0, 12))

/** Smaller categories make the better "shop by concern" tiles. */
const collections = computed(() =>
  [...categories.value].sort((a, b) => a.product_count - b.product_count).slice(0, 8),
)

/**
 * Every category becomes a slider, with a different promotional band dropped
 * in after the given shelf index so the page never stacks identical sections.
 */
const PROMO_AFTER = {
  2: 'wellness',
  4: 'prescription',
  6: 'collections',
  9: 'delivery',
}

/* Rotated so consecutive sliders never share an eyebrow or a background. */
const EYEBROWS = ['Shop the shelf', 'Browse the range', 'Explore']
const PANEL_TONES = ['from-accent-50 to-white', 'from-primary-50 to-white', 'from-sky-50 to-white']

const blocks = computed(() => {
  const list = []
  categories.value.forEach((category, index) => {
    list.push({
      key: `cat-${category.id}`,
      type: 'category',
      category,
      eyebrow: EYEBROWS[index % EYEBROWS.length],
      /* Every third shelf sits on a tinted panel so the rails do not read as
         one repeated component down the whole page. */
      variant: index % 3 === 2 ? 'panel' : 'plain',
      panelTone: PANEL_TONES[Math.floor(index / 3) % PANEL_TONES.length],
    })
    const promo = PROMO_AFTER[index + 1]
    if (promo) list.push({ key: `promo-${promo}`, type: 'promo', promo })
  })
  return list
})

/*
 * Featured and Recommended each pull their own catalogue page rather than
 * slicing the page already in memory. Page 1 is entirely prescription
 * medicine, so reusing it made Featured a near-duplicate of the Prescription
 * Medicine slider, and Recommended (the same pool reversed) shared 16 of its
 * 18 products with Featured. The in-memory page now feeds only the hero
 * showcase, the brand strip and the search chips.
 */

/**
 * Popular-search chips built from the leading token of real product names, so
 * every chip matches the catalogue. Manufacturer names are deliberately not
 * used: search matches product names only, and an empty result set makes
 * productService fall back to its offline demo list.
 */
const quickSearches = computed(() => {
  const seen = new Set()
  const terms = []
  for (const product of products.value) {
    const token = String(product.name || '')
      .trim()
      .split(/\s+/)[0]
      .replace(/[^\w-]/g, '')
    const key = token.toLowerCase()
    if (token.length < 3 || token.length > 16 || seen.has(key)) continue
    seen.add(key)
    terms.push(token)
    if (terms.length === 5) break
  }
  return terms
})

const brands = computed(() => {
  const names = new Set()
  products.value.forEach((product) => {
    const name = String(product.manufacturer || '').trim()
    if (name) names.add(name)
  })
  return [...names].slice(0, 10)
})
</script>
