<template>
  <div ref="root" class="relative">
    <label class="sr-only" :for="inputId">Search medicines</label>

    <div
      class="flex items-center gap-3 transition duration-300 ease-premium"
      :class="
        hero
          ? 'h-14 rounded-full bg-white px-4 shadow-glow ring-1 ring-primary-900/5 focus-within:ring-2 focus-within:ring-primary-500 sm:h-16 sm:px-5'
          : 'h-12 rounded-full bg-slate-50/90 px-4 ring-1 ring-slate-200/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-500'
      "
    >
      <Search
        class="shrink-0"
        :class="hero ? 'h-5 w-5 text-primary-600 sm:h-6 sm:w-6' : 'h-5 w-5 text-slate-400'"
      />
      <input
        :id="inputId"
        ref="input"
        v-model="query"
        type="search"
        autocomplete="off"
        role="combobox"
        aria-autocomplete="list"
        :aria-expanded="open"
        :aria-controls="listboxId"
        :placeholder="placeholder"
        class="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400"
        :class="hero ? 'text-sm sm:text-base' : 'text-sm'"
        @keydown.down.prevent="move(1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter="choose"
        @keydown.esc="reset"
      />

      <button
        v-if="query"
        type="button"
        class="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        aria-label="Clear search"
        @click="reset"
      >
        <X class="h-4 w-4" />
      </button>

      <span
        v-if="hero"
        class="hidden shrink-0 rounded-full bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-sm sm:block"
      >
        Search
      </span>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-premium"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        :id="listboxId"
        role="listbox"
        class="absolute left-0 right-0 z-50 mt-3 overflow-hidden rounded-3xl bg-white p-2 shadow-lift ring-1 ring-slate-900/5"
      >
        <div v-if="loading" class="flex items-center gap-3 p-4 text-sm text-slate-500">
          <span
            class="h-4 w-4 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600"
          ></span>
          Searching medicines…
        </div>

        <template v-else-if="results.length">
          <RouterLink
            v-for="(product, index) in results"
            :key="product.id"
            role="option"
            :aria-selected="index === cursor"
            :to="`/product/${product.slug}`"
            class="flex items-center gap-3 rounded-2xl p-2.5 transition"
            :class="index === cursor ? 'bg-primary-50' : 'hover:bg-slate-50'"
            @mouseenter="cursor = index"
            @click="reset"
          >
            <span
              class="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary-50 to-sky-50 ring-1 ring-slate-900/5"
            >
              <img
                v-if="product.image"
                :src="product.image"
                :alt="product.name"
                loading="lazy"
                class="h-full w-full object-contain"
              />
              <Pill v-else class="h-5 w-5 text-primary-600" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block truncate text-sm font-semibold text-ink">{{ product.name }}</span>
              <span class="block truncate text-xs text-slate-500">
                {{ product.generic_name || product.manufacturer || 'Healthcare essential' }}
              </span>
            </span>
            <span class="shrink-0 text-sm font-bold text-primary-700">
              {{ formatPrice(product.discount_price || product.price) }}
            </span>
          </RouterLink>
        </template>

        <div v-else class="p-5 text-center">
          <p class="text-sm font-semibold text-ink">No match for “{{ query }}”</p>
          <p class="mt-1 text-xs text-slate-500">We can source it for you.</p>
          <RouterLink
            to="/request-order"
            class="mt-3 inline-flex rounded-full bg-primary-600 px-4 py-2 text-xs font-bold text-white"
            @click="reset"
          >
            Request this medicine
          </RouterLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Pill, Search, X } from 'lucide-vue-next'
import { productService } from '../../services/productService'
import { useDebounce } from '../../composables/useDebounce'
import { formatPrice } from '../../utils/formatPrice'

const props = defineProps({
  variant: { type: String, default: 'bar' },
  placeholder: { type: String, default: 'Search medicines, brands, health products...' },
})

const router = useRouter()
const uid = useId().replace(/[^a-zA-Z0-9-]/g, '')
const inputId = `live-search-${uid}`
const listboxId = `live-search-list-${uid}`
const hero = computed(() => props.variant === 'hero')

const root = ref(null)
const input = ref(null)
const query = ref('')
const debounced = useDebounce(query)
const results = ref([])
const loading = ref(false)
const cursor = ref(-1)
const dismissed = ref(false)

const open = computed(() => query.value.length > 1 && !dismissed.value)

/* Search responses take 1-3s, so a slow earlier request could otherwise land
   after a newer one and show stale results. Only the latest request wins. */
let requestId = 0

watch(debounced, async (value) => {
  cursor.value = -1
  const ticket = ++requestId
  if (!value || value.length < 2) {
    results.value = []
    loading.value = false
    return
  }
  loading.value = true
  try {
    const response = await productService.search(value)
    if (ticket !== requestId) return
    results.value = response.data.slice(0, 6)
  } finally {
    if (ticket === requestId) loading.value = false
  }
})

watch(query, () => {
  dismissed.value = false
})

function reset() {
  query.value = ''
  results.value = []
  cursor.value = -1
}

function move(step) {
  if (!results.value.length) return
  cursor.value = (cursor.value + step + results.value.length) % results.value.length
}

function choose() {
  const product = results.value[cursor.value]
  if (!product) return
  router.push(`/product/${product.slug}`)
  reset()
}

function onDocumentClick(event) {
  if (root.value && !root.value.contains(event.target)) dismissed.value = true
}

/** Exposed so the hero quick-search chips can drive this field. */
function focus() {
  input.value?.focus()
}

function search(term) {
  query.value = term
  dismissed.value = false
  focus()
}

defineExpose({ focus, search })

onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))
</script>
