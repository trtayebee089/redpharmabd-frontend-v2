<template>
  <div class="mx-auto max-w-7xl px-4 py-8">
    <Breadcrumb :items="[{ label: 'Product' }, { label: product?.name || 'Loading' }]" />
    <div v-if="loading" class="mt-6 grid gap-6 lg:grid-cols-2">
      <LoadingSkeleton class="min-h-96" />
      <LoadingSkeleton class="min-h-96" />
    </div>
    <div v-else class="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section class="rounded-[2rem] bg-white p-6 shadow-soft">
        <div class="grid aspect-square place-items-center rounded-3xl bg-gradient-to-br from-primary-50 via-white to-sky-50">
          <img v-if="product.image" :src="product.image" :alt="product.name" class="h-full w-full object-contain p-6" />
          <div v-else class="grid h-32 w-32 place-items-center rounded-[2rem] bg-white text-4xl font-black text-primary-700 shadow-soft">Rx</div>
        </div>
      </section>
      <section class="min-w-0">
        <p class="text-sm font-bold uppercase text-primary-700">{{ product.manufacturer || 'RedPharma product' }}</p>
        <h1 class="mt-2 text-3xl font-black leading-tight text-ink md:text-5xl">{{ product.name }}</h1>
        <p class="mt-3 text-slate-500">{{ product.generic_name }}</p>
        <div class="mt-5 flex flex-wrap items-center gap-3">
          <span class="text-3xl font-black text-primary-700">{{ formatPrice(product.discount_price || product.price) }}</span>
          <span v-if="product.discount_price" class="text-lg text-slate-400 line-through">{{ formatPrice(product.price) }}</span>
          <OfferBadge :price="product.price" :discount-price="product.discount_price" />
        </div>
        <p class="mt-3 text-sm font-bold" :class="product.stock > 0 ? 'text-primary-700' : 'text-red-600'">
          {{ product.stock > 0 ? `${product.stock} available` : 'Out of stock' }}
        </p>
        <div class="mt-6 flex flex-wrap items-center gap-3">
          <QuantitySelector v-model="quantity" />
          <button type="button" class="rounded-full bg-primary-600 px-7 py-3 font-bold text-white hover:bg-primary-700" @click="addToCart">Add to cart</button>
          <button type="button" class="rounded-full bg-ink px-7 py-3 font-bold text-white hover:bg-slate-800" @click="buyNow">Buy now</button>
        </div>
        <div class="mt-6 grid gap-3">
          <PrescriptionNotice v-if="product.prescription_required" />
          <div class="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-soft">
            Fast delivery is available in covered areas. Delivery charge is calculated at checkout.
          </div>
        </div>
      </section>
    </div>
    <div v-if="!loading" class="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
      <MedicineInfoBlock :product="product" />
      <section class="rounded-3xl bg-white p-6 shadow-soft">
        <h2 class="text-xl font-bold text-ink">Description</h2>
        <p class="mt-3 text-sm leading-7 text-slate-600">{{ product.description || 'Product details will be updated soon. Please verify dosage, suitability, and use instructions with a registered physician or pharmacist.' }}</p>
      </section>
    </div>
    <ProductSection v-if="related.length" class="mt-12" title="Similar products" eyebrow="You may also need" :products="related" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Breadcrumb from '../components/common/Breadcrumb.vue'
import LoadingSkeleton from '../components/common/LoadingSkeleton.vue'
import QuantitySelector from '../components/common/QuantitySelector.vue'
import PrescriptionNotice from '../components/common/PrescriptionNotice.vue'
import OfferBadge from '../components/common/OfferBadge.vue'
import MedicineInfoBlock from '../components/product/MedicineInfoBlock.vue'
import ProductSection from '../components/product/ProductSection.vue'
import { productService } from '../services/productService'
import { useCartStore } from '../stores/cartStore'
import { formatPrice } from '../utils/formatPrice'
import { useRecentlyViewedStore } from '../stores/recentlyViewedStore'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const recentlyViewed = useRecentlyViewedStore()
const product = ref({})
const related = ref([])
const quantity = ref(1)
const loading = ref(true)

async function load() {
  loading.value = true
  product.value = await productService.find(route.params.slug)
  recentlyViewed.record(product.value)
  const response = await productService.list({ category: product.value.category_slug, per_page: 12 })
  related.value = response.data.filter((item) => item.id !== product.value.id).slice(0, 6)
  loading.value = false
}

function addToCart() {
  cart.add(product.value, quantity.value)
}

function buyNow() {
  addToCart()
  router.push('/checkout')
}

watch(() => route.params.slug, load)
onMounted(load)
</script>
