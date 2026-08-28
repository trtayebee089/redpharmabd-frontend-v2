<template>
  <div class="contents">
    <!-- Announcement rail: scrolls away, never eats sticky height -->
    <div class="bg-ink text-slate-300">
      <div
        class="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-2 text-[11px] font-medium tracking-wide sm:px-6 lg:px-8"
      >
        <span class="flex items-center gap-1.5">
          <ShieldCheck class="h-3.5 w-3.5 text-accent-400" />
          Genuine medicines from licensed suppliers
        </span>
        <span class="hidden items-center gap-1.5 sm:flex">
          <Truck class="h-3.5 w-3.5 text-accent-400" />
          Fast delivery across supported areas
        </span>
        <RouterLink
          to="/track-order"
          class="hidden items-center gap-1.5 text-white underline-offset-4 hover:underline lg:flex"
        >
          Track your order
          <ArrowRight class="h-3.5 w-3.5" />
        </RouterLink>
      </div>
    </div>

    <header
      class="sticky top-0 z-40 border-b border-slate-900/[0.07] bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/75"
    >
      <div
        class="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-[76px] lg:gap-6 lg:px-8"
      >
        <RouterLink to="/" class="flex shrink-0 items-center gap-2.5" aria-label="RedPharma home">
          <BrandMark size="sm" class="lg:hidden" />
          <BrandMark class="hidden lg:inline-grid" />
          <span class="hidden leading-none sm:block">
            <span class="block font-display text-lg font-extrabold tracking-tight text-ink">
              Red<span class="text-primary-600">Pharma</span>
            </span>
            <span class="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Your health, our priority
            </span>
          </span>
        </RouterLink>

        <div class="min-w-0 flex-1 lg:mx-2 lg:max-w-2xl">
          <LiveSearch />
        </div>

        <div class="ml-auto flex shrink-0 items-center gap-1 lg:gap-2">
          <RouterLink
            v-for="action in actions"
            :key="action.to"
            :to="action.to"
            class="hidden flex-col items-center rounded-xl px-3 py-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-ink lg:flex"
          >
            <component :is="action.icon" class="h-[22px] w-[22px]" :stroke-width="1.7" />
            <span class="mt-1 text-[11px] font-semibold leading-none">{{ action.label }}</span>
          </RouterLink>

          <RouterLink
            :to="auth.isAuthenticated ? '/account/profile' : '/login'"
            class="hidden flex-col items-center rounded-xl px-3 py-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-ink lg:flex"
          >
            <UserRound class="h-[22px] w-[22px]" :stroke-width="1.7" />
            <span class="mt-1 text-[11px] font-semibold leading-none">
              {{ auth.isAuthenticated ? 'Account' : 'Login' }}
            </span>
          </RouterLink>

          <button
            type="button"
            class="relative flex flex-col items-center rounded-xl px-3 py-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-ink active:scale-95"
            aria-label="Cart"
            @click="ui.openCart"
          >
            <span class="relative">
              <ShoppingBag class="h-[22px] w-[22px]" :stroke-width="1.7" />
              <span
                v-if="cart.count"
                class="absolute -right-2 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary-600 px-1 text-[10px] font-bold text-white ring-2 ring-white"
              >
                {{ cart.count }}
              </span>
            </span>
            <span class="mt-1 hidden text-[11px] font-semibold leading-none lg:block">Cart</span>
          </button>
        </div>
      </div>

      <!-- Desktop quick nav -->
      <nav class="hidden border-t border-slate-900/[0.06] lg:block">
        <div
          class="mx-auto flex h-11 max-w-7xl items-center gap-1 px-4 text-[13px] font-semibold text-slate-600 sm:px-6 lg:px-8"
        >
          <RouterLink
            v-for="link in quickLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-lg px-3 py-1.5 transition hover:bg-primary-50 hover:text-primary-700"
            active-class="bg-primary-50 text-primary-700"
          >
            {{ link.label }}
          </RouterLink>
          <RouterLink
            to="/request-order"
            class="ml-auto flex items-center gap-2 rounded-lg bg-accent-50 px-3.5 py-1.5 text-accent-700 ring-1 ring-accent-200 transition hover:bg-accent-100"
          >
            <FileText class="h-4 w-4" />
            Upload prescription
          </RouterLink>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import {
  ArrowRight,
  FileText,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserRound,
} from 'lucide-vue-next'
import LiveSearch from './LiveSearch.vue'
import BrandMark from '../common/BrandMark.vue'
import { useCartStore } from '../../stores/cartStore'
import { useUiStore } from '../../stores/uiStore'
import { useAuthStore } from '../../stores/authStore'

const cart = useCartStore()
const ui = useUiStore()
const auth = useAuthStore()

const actions = [
  { label: 'Track', to: '/track-order', icon: Truck },
  { label: 'Delivery', to: '/delivery-coverage', icon: MapPin },
]

const quickLinks = [
  { label: 'All categories', to: '/categories' },
  { label: 'Request order', to: '/request-order' },
  { label: 'Track order', to: '/track-order' },
  { label: 'Delivery coverage', to: '/delivery-coverage' },
  { label: 'Help center', to: '/help-center' },
]
</script>
