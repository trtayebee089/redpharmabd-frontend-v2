<template>
  <div class="mx-auto max-w-7xl px-4 py-8">
    <Breadcrumb :items="[{ label: 'Checkout' }]" />
    <h1 class="mt-5 text-3xl font-black text-ink">Checkout</h1>
    <div class="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      <form class="rounded-3xl bg-white p-6 shadow-soft" @submit.prevent="submit">
        <div class="grid gap-4 md:grid-cols-2">
          <label class="text-sm font-bold text-slate-700">Full name <input v-model="form.name" required class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" /></label>
          <label class="text-sm font-bold text-slate-700">Phone number <input v-model="form.phone" required class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" /></label>
          <label class="md:col-span-2 text-sm font-bold text-slate-700">Delivery address <textarea v-model="form.address" required rows="3" class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500"></textarea></label>
          <label class="text-sm font-bold text-slate-700">Payment method <select v-model="form.payment_method" class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500"><option value="cod">Cash on delivery</option><option value="online">Online payment</option></select></label>
          <label class="text-sm font-bold text-slate-700">Prescription upload <input type="file" class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm" /></label>
          <label class="md:col-span-2 text-sm font-bold text-slate-700">Order notes <textarea v-model="form.notes" rows="3" class="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500"></textarea></label>
        </div>
        <ErrorState v-if="error" class="mt-5" title="Checkout failed" :message="error" />
        <button :disabled="submitting || !cart.items.length" class="mt-6 rounded-full bg-primary-600 px-7 py-3 font-bold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-slate-300">
          {{ submitting ? 'Placing order...' : 'Place order' }}
        </button>
      </form>
      <CartSummary />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Breadcrumb from '../components/common/Breadcrumb.vue'
import ErrorState from '../components/common/ErrorState.vue'
import CartSummary from './partials/CartSummary.vue'
import { useCartStore } from '../stores/cartStore'
import { orderService } from '../services/orderService'

const cart = useCartStore()
const router = useRouter()
const submitting = ref(false)
const error = ref('')
const form = reactive({ name: '', phone: '', address: '', payment_method: 'cod', notes: '' })

async function submit() {
  if (!cart.items.length) return
  submitting.value = true
  error.value = ''
  try {
    const order = await orderService.checkout({
      ...form,
      items: cart.items.map((item) => ({ product_id: item.product.id, quantity: item.quantity })),
      subtotal: cart.subtotal,
      delivery_charge: cart.deliveryCharge,
      total: cart.total,
    })
    const id = order?.id || order?.order_id || Date.now()
    cart.clear()
    router.push(`/order-confirmation/${id}`)
  } catch (exception) {
    error.value = exception.message || 'Please check your information and try again.'
  } finally {
    submitting.value = false
  }
}
</script>
