<template>
  <nav
    class="fixed inset-x-3 bottom-3 z-40 rounded-[26px] border border-white/60 bg-white/90 p-1.5 shadow-[0_18px_44px_-16px_rgba(18,33,31,0.35)] backdrop-blur-xl md:hidden"
    style="padding-bottom: max(0.375rem, env(safe-area-inset-bottom))"
    aria-label="Primary"
  >
    <div class="grid grid-cols-5">
      <RouterLink
        v-for="item in items"
        :key="item.label"
        :to="item.to"
        class="group relative flex flex-col items-center gap-1 rounded-[20px] px-1 py-2 text-[10px] font-semibold text-slate-500 transition duration-200 [&.router-link-active]:text-primary-800"
      >
        <span
          class="absolute inset-0 scale-90 rounded-[20px] bg-primary-50 opacity-0 transition duration-200 ease-premium group-[.router-link-active]:scale-100 group-[.router-link-active]:opacity-100"
        ></span>
        <span class="relative grid place-items-center">
          <component :is="item.icon" class="h-[22px] w-[22px]" :stroke-width="1.9" />
          <span
            v-if="item.badge && cart.count"
            class="absolute -right-2 -top-1.5 grid h-4 min-w-[16px] place-items-center rounded-full bg-accent-500 px-1 text-[9px] font-bold text-white ring-2 ring-white"
          >
            {{ cart.count }}
          </span>
        </span>
        <span class="relative">{{ item.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { Home, LayoutGrid, Search, ShoppingBag, UserRound } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cartStore'

const cart = useCartStore()

const items = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Categories', to: '/categories', icon: LayoutGrid },
  { label: 'Search', to: '/categories', icon: Search },
  { label: 'Cart', to: '/cart', icon: ShoppingBag, badge: true },
  { label: 'Account', to: '/account/profile', icon: UserRound },
]
</script>
