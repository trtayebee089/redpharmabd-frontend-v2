<template>
  <aside class="h-fit rounded-3xl bg-white p-6 shadow-soft">
    <h2 class="text-xl font-black text-ink">Order summary</h2>
    <div class="mt-5 space-y-3 text-sm">
      <div class="flex justify-between"><span>Subtotal</span><strong>{{ formatPrice(cart.subtotal) }}</strong></div>
      <div class="flex justify-between"><span>Discount saved</span><strong>{{ formatPrice(cart.discount) }}</strong></div>
      <div class="flex justify-between"><span>Delivery charge</span><strong>{{ formatPrice(cart.deliveryCharge) }}</strong></div>
      <div class="border-t border-slate-100 pt-3 flex justify-between text-lg"><span>Total</span><strong>{{ formatPrice(cart.total) }}</strong></div>
    </div>
    <PrescriptionNotice v-if="cart.hasPrescription" class="mt-5" />
    <RouterLink
      to="/checkout"
      class="mt-5 block rounded-full bg-primary-600 px-5 py-3 text-center font-bold text-white hover:bg-primary-700"
      :class="{ 'pointer-events-none opacity-50': !cart.items.length }"
    >
      Proceed to checkout
    </RouterLink>
  </aside>
</template>

<script setup>
import { useCartStore } from '../../stores/cartStore'
import { formatPrice } from '../../utils/formatPrice'
import PrescriptionNotice from '../../components/common/PrescriptionNotice.vue'

const cart = useCartStore()
</script>
