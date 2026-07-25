<template>
  <article
    class="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-900/[0.07] transition duration-300 ease-premium hover:-translate-y-1 hover:shadow-hover hover:ring-primary-200"
  >
    <RouterLink class="block" :to="`/product/${product.slug}`" :aria-label="product.name">
      <div class="relative aspect-square overflow-hidden bg-white">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          loading="lazy"
          decoding="async"
          class="h-full w-full object-contain p-3 transition duration-500 ease-premium group-hover:scale-[1.08]"
        />
        <span v-else class="absolute inset-0 grid place-items-center bg-slate-50/70">
          <span
            class="grid h-14 w-14 place-items-center rounded-2xl bg-white text-accent-600 shadow-sm ring-1 ring-slate-900/5"
          >
            <Pill class="h-6 w-6" :stroke-width="1.6" />
          </span>
        </span>

        <OfferBadge
          class="absolute left-2 top-2"
          :price="product.price"
          :discount-price="product.discount_price"
        />

        <span
          v-if="product.prescription_required"
          class="absolute right-2 top-2 rounded-md bg-amber-100 px-1.5 py-1 text-[10px] font-bold uppercase leading-none tracking-wide text-amber-800 ring-1 ring-amber-200"
        >
          Rx
        </span>

        <span
          v-if="product.stock <= 0"
          class="absolute inset-x-0 bottom-0 bg-slate-900/75 py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-white"
        >
          Out of stock
        </span>
      </div>
    </RouterLink>

    <div class="flex flex-1 flex-col p-3">
      <RouterLink class="min-w-0" :to="`/product/${product.slug}`">
        <h3
          class="line-clamp-2 min-h-[36px] text-[13px] font-semibold leading-[18px] text-ink transition group-hover:text-primary-700"
        >
          {{ product.name }}
        </h3>
      </RouterLink>

      <p class="mt-1 truncate text-[11px] text-slate-500">
        {{ meta }}
      </p>

      <div class="mt-auto pt-2.5">
        <div class="flex flex-wrap items-baseline gap-x-1.5">
          <span class="font-display text-[15px] font-extrabold text-ink">
            {{ formatPrice(product.discount_price || product.price) }}
          </span>
          <span v-if="product.discount_price" class="text-[11px] text-slate-400 line-through">
            {{ formatPrice(product.price) }}
          </span>
        </div>

        <p v-if="lowStock" class="mt-1 text-[10px] font-semibold text-amber-600">
          Only {{ product.stock }} left
        </p>
        <p
          v-else-if="product.stock > 0"
          class="mt-1 flex items-center gap-1 text-[10px] font-semibold text-accent-700"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-accent-500"></span>
          In stock
        </p>
        <p v-else class="mt-1 text-[10px] font-semibold text-slate-400">Currently unavailable</p>

        <div class="mt-2.5">
          <QuantitySelector
            v-if="cartQty"
            block
            :model-value="cartQty"
            @update:model-value="cart.update(product.id, $event)"
          />
          <button
            v-else
            type="button"
            :disabled="product.stock <= 0"
            class="flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-accent-600 bg-white text-[12px] font-bold text-accent-700 transition duration-200 ease-premium hover:bg-accent-600 hover:text-white active:scale-[0.97] disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400"
            @click="cart.add(product)"
          >
            <ShoppingBag v-if="product.stock > 0" class="h-3.5 w-3.5" :stroke-width="2.2" />
            {{ product.stock > 0 ? 'Add to Cart' : 'Unavailable' }}
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { Pill, ShoppingBag } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cartStore'
import { formatPrice } from '../../utils/formatPrice'
import OfferBadge from '../common/OfferBadge.vue'
import QuantitySelector from '../common/QuantitySelector.vue'

const props = defineProps({
  product: { type: Object, required: true },
})

const cart = useCartStore()
const cartQty = computed(() => cart.quantityFor(props.product.id))
const lowStock = computed(() => props.product.stock > 0 && props.product.stock <= 10)

/** Strength/pack when the API supplies it, else the manufacturer. */
const meta = computed(() => {
  const spec = [props.product.strength, props.product.unit].filter(Boolean).join(' · ')
  return spec || props.product.generic_name || props.product.manufacturer || 'Healthcare essential'
})
</script>
