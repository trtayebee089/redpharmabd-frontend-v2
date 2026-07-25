<template>
  <div class="group/rail relative">
    <div
      ref="track"
      class="rail gap-3 pb-2 xl:gap-4"
      :class="bleed ? '-mx-4 px-4 sm:mx-0 sm:px-0' : ''"
      @scroll.passive="syncEdges"
    >
      <template v-if="loading">
        <div v-for="item in 8" :key="`s-${item}`" :class="ITEM_WIDTH">
          <LoadingSkeleton />
        </div>
      </template>

      <template v-else>
        <div
          v-for="(product, index) in products"
          :key="product.id"
          class="relative"
          :class="ITEM_WIDTH"
        >
          <span
            v-if="ranked"
            class="pointer-events-none absolute -left-1 -top-2 z-10 font-display text-[40px] font-extrabold leading-none text-ink/[0.14]"
            aria-hidden="true"
          >
            {{ index + 1 }}
          </span>
          <ProductCard :product="product" />
        </div>
      </template>
    </div>

    <!-- Desktop controls: revealed on hover, and on keyboard focus for a11y -->
    <button
      v-show="canPrev"
      type="button"
      class="absolute -left-4 top-[38%] hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink opacity-0 shadow-lift ring-1 ring-slate-900/5 transition duration-200 ease-premium hover:bg-slate-50 focus-visible:opacity-100 active:scale-95 group-hover/rail:opacity-100 lg:grid"
      aria-label="Scroll left"
      @click="scrollBy(-1)"
    >
      <ChevronLeft class="h-5 w-5" />
    </button>
    <button
      v-show="canNext"
      type="button"
      class="absolute -right-4 top-[38%] hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink opacity-0 shadow-lift ring-1 ring-slate-900/5 transition duration-200 ease-premium hover:bg-slate-50 focus-visible:opacity-100 active:scale-95 group-hover/rail:opacity-100 lg:grid"
      aria-label="Scroll right"
      @click="scrollBy(1)"
    >
      <ChevronRight class="h-5 w-5" />
    </button>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import ProductCard from './ProductCard.vue'
import LoadingSkeleton from '../common/LoadingSkeleton.vue'

/**
 * Visible-per-view density: 2 (+peek) on mobile, 4 on tablet, 5 at lg,
 * 6 on desktop and 7 on large desktop. Widths subtract the gutters at each
 * breakpoint so a whole number of cards lands flush with the rail edge.
 */
const ITEM_WIDTH =
  'w-[46%] sm:w-[calc((100%-2.25rem)/4)] lg:w-[calc((100%-3rem)/5)] xl:w-[calc((100%-5rem)/6)] 2xl:w-[calc((100%-6rem)/7)]'

const props = defineProps({
  products: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  ranked: { type: Boolean, default: false },
  /** Edge-to-edge on mobile. Disabled inside padded panels so the first card
      stays aligned with the section heading above it. */
  bleed: { type: Boolean, default: true },
})

const track = ref(null)
const canPrev = ref(false)
const canNext = ref(false)

function syncEdges() {
  const el = track.value
  if (!el) return
  canPrev.value = el.scrollLeft > 8
  canNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 8
}

function scrollBy(direction) {
  const el = track.value
  if (!el) return
  el.scrollBy({ left: direction * el.clientWidth * 0.82, behavior: 'smooth' })
}

watch(
  () => [props.products.length, props.loading],
  () => nextTick(syncEdges),
)

onMounted(() => nextTick(syncEdges))
</script>
