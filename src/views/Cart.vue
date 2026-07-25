<template>
  <div class="mx-auto max-w-7xl px-4 py-8">
    <Breadcrumb :items="[{ label: 'Cart' }]" />
    <h1 class="mt-5 text-3xl font-black text-ink">Shopping cart</h1>
    <div class="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      <section class="space-y-4">
        <EmptyState v-if="!cart.items.length" title="Your cart is empty" message="Start with popular medicines or browse categories.">
          <RouterLink to="/categories" class="mt-5 inline-block rounded-full bg-primary-600 px-6 py-3 font-bold text-white">Browse products</RouterLink>
        </EmptyState>
        <div v-for="item in cart.items" v-else :key="item.product.id" class="flex gap-4 rounded-3xl bg-white p-4 shadow-soft">
          <div class="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-primary-50 font-bold text-primary-700">Rx</div>
          <div class="min-w-0 flex-1">
            <h2 class="line-clamp-2 font-bold text-ink">{{ item.product.name }}</h2>
            <p class="mt-1 text-sm text-slate-500">{{ item.product.generic_name || item.product.manufacturer }}</p>
            <p class="mt-2 font-black text-primary-700">{{ formatPrice((item.product.discount_price || item.product.price) * item.quantity) }}</p>
            <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
              <QuantitySelector :model-value="item.quantity" @update:model-value="cart.update(item.product.id, $event)" />
              <button type="button" class="text-sm font-bold text-red-600" @click="cart.remove(item.product.id)">Remove</button>
            </div>
          </div>
        </div>
      </section>
      <CartSummary />
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from '../components/common/Breadcrumb.vue'
import EmptyState from '../components/common/EmptyState.vue'
import QuantitySelector from '../components/common/QuantitySelector.vue'
import { useCartStore } from '../stores/cartStore'
import { formatPrice } from '../utils/formatPrice'
import CartSummary from './partials/CartSummary.vue'

const cart = useCartStore()
</script>
