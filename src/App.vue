<template>
  <div class="flex min-h-screen flex-col overflow-x-clip bg-canvas text-ink">
    <AppHeader />

    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition
          mode="out-in"
          enter-active-class="transition duration-300 ease-premium"
          enter-from-class="opacity-0 translate-y-1"
          leave-active-class="transition duration-150"
          leave-to-class="opacity-0"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <Footer />
    <MobileBottomNav />
    <CartDrawer />

    <TransitionGroup
      tag="div"
      class="pointer-events-none fixed inset-x-4 bottom-24 z-[70] flex flex-col items-stretch gap-2 md:inset-x-auto md:bottom-auto md:right-6 md:top-28 md:w-80"
      enter-active-class="transition duration-300 ease-premium"
      enter-from-class="opacity-0 translate-y-3 md:translate-y-0 md:translate-x-4"
      leave-active-class="transition duration-200 absolute"
      leave-to-class="opacity-0 scale-95"
      move-class="transition duration-200"
    >
      <div
        v-for="toast in ui.toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift ring-1 ring-slate-900/[0.06]"
      >
        <span
          class="grid h-8 w-8 shrink-0 place-items-center rounded-full"
          :class="toast.type === 'info' ? 'bg-slate-100 text-slate-600' : 'bg-primary-50 text-primary-700'"
        >
          <component :is="toast.type === 'info' ? Info : Check" class="h-4 w-4" :stroke-width="2.6" />
        </span>
        <p class="min-w-0 flex-1 text-sm font-semibold text-ink">{{ toast.message }}</p>
        <button
          type="button"
          class="shrink-0 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Dismiss notification"
          @click="ui.dismissToast(toast.id)"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Check, Info, X } from 'lucide-vue-next'
import AppHeader from './components/layout/AppHeader.vue'
import Footer from './components/layout/Footer.vue'
import MobileBottomNav from './components/layout/MobileBottomNav.vue'
import CartDrawer from './components/cart/CartDrawer.vue'
import { useUiStore } from './stores/uiStore'
import { useAuthStore } from './stores/authStore'

const ui = useUiStore()
const auth = useAuthStore()

onMounted(() => {
  window.addEventListener('redpharma:unauthorized', () => auth.logout())
})
</script>
