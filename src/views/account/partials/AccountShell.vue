<template>
  <div class="mx-auto max-w-7xl px-4 py-8">
    <div class="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside class="h-fit rounded-3xl bg-white p-4 shadow-soft">
        <RouterLink v-for="item in items" :key="item.to" :to="item.to" class="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-primary-50" active-class="bg-primary-50 text-primary-800">
          {{ item.label }}
        </RouterLink>
      </aside>
      <section class="min-w-0 rounded-3xl bg-white p-6 shadow-soft">
        <slot />
      </section>
    </div>
  </div>
</template>

<script setup>
const items = [
  { label: 'Profile', to: '/account/profile' },
  { label: 'Orders', to: '/account/orders' },
  { label: 'Membership', to: '/account/membership' },
  { label: 'My Rewards', to: '/account/rewards' },
  { label: 'Recently Viewed', to: '/account/recently-viewed' },
  { label: 'Settings', to: '/account/settings' },
]
</script>
