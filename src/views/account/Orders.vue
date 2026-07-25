<template>
  <AccountShell>
    <h1 class="text-3xl font-black text-ink">Orders</h1>
    <EmptyState v-if="!orders.orders.length" class="mt-6" title="No orders yet" message="Your completed orders will appear here." />
    <div v-else class="mt-6 space-y-3">
      <RouterLink v-for="order in orders.orders" :key="order.id" :to="`/account/orders/${order.id}`" class="block rounded-2xl bg-slate-50 p-4 hover:bg-primary-50">
        <p class="font-bold text-ink">Order #{{ order.id }}</p>
        <p class="text-sm text-slate-500">{{ order.status || 'Processing' }}</p>
      </RouterLink>
    </div>
  </AccountShell>
</template>

<script setup>
import { onMounted } from 'vue'
import AccountShell from './partials/AccountShell.vue'
import EmptyState from '../../components/common/EmptyState.vue'
import { useOrderStore } from '../../stores/orderStore'

const orders = useOrderStore()
onMounted(() => orders.fetch())
</script>
