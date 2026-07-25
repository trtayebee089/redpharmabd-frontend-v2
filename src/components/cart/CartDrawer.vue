<template>
  <Teleport to="body">
    <!-- Backdrop and panel transition as siblings: nesting them leaves the
         wrapper mounted at opacity 0, covering the page and eating clicks. -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200"
      leave-to-class="opacity-0"
    >
      <button
        v-if="ui.cartOpen"
        class="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-[2px]"
        type="button"
        aria-label="Close cart"
        @click="ui.closeCart"
      ></button>
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-premium"
      enter-from-class="translate-x-full"
      leave-active-class="transition-transform duration-200 ease-premium"
      leave-to-class="translate-x-full"
    >
      <aside
        v-if="ui.cartOpen"
        class="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-canvas shadow-lift"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <header
          class="flex items-center justify-between gap-3 border-b border-slate-900/[0.06] bg-white px-5 py-4"
        >
          <div>
            <h2 class="font-display text-lg font-extrabold text-ink">Your cart</h2>
            <p class="mt-0.5 text-xs text-slate-500">
              {{ cart.count }} {{ cart.count === 1 ? 'item' : 'items' }}
            </p>
          </div>
          <button
            type="button"
            class="grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"
            aria-label="Close cart"
            @click="ui.closeCart"
          >
            <X class="h-5 w-5" />
          </button>
        </header>

        <div class="flex-1 overflow-y-auto p-4">
          <EmptyState
            v-if="!cart.items.length"
            title="Your cart is empty"
            message="Add medicines and health essentials to continue."
          >
            <RouterLink
              to="/categories"
              class="mt-5 inline-flex rounded-full bg-primary-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-700"
              @click="ui.closeCart"
            >
              Start shopping
            </RouterLink>
          </EmptyState>

          <div v-else class="space-y-3">
            <div
              v-for="item in cart.items"
              :key="item.product.id"
              class="flex gap-3 rounded-2xl bg-white p-3 ring-1 ring-slate-900/[0.06]"
            >
              <RouterLink
                :to="`/product/${item.product.slug}`"
                class="grid h-[68px] w-[68px] shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-primary-50/60 ring-1 ring-slate-900/5"
                @click="ui.closeCart"
              >
                <img
                  v-if="item.product.image"
                  :src="item.product.image"
                  :alt="item.product.name"
                  loading="lazy"
                  class="h-full w-full object-contain p-1.5"
                />
                <Pill v-else class="h-6 w-6 text-primary-600" :stroke-width="1.6" />
              </RouterLink>

              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-2">
                  <RouterLink
                    :to="`/product/${item.product.slug}`"
                    class="line-clamp-2 text-[13px] font-bold leading-5 text-ink hover:text-primary-700"
                    @click="ui.closeCart"
                  >
                    {{ item.product.name }}
                  </RouterLink>
                  <button
                    type="button"
                    class="grid h-7 w-7 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                    :aria-label="`Remove ${item.product.name}`"
                    @click="cart.remove(item.product.id)"
                  >
                    <Trash2 class="h-4 w-4" />
                  </button>
                </div>
                <p class="mt-2 font-display text-sm font-extrabold text-ink">
                  {{ formatPrice((item.product.discount_price || item.product.price) * item.quantity) }}
                </p>
                <div class="mt-2">
                  <QuantitySelector
                    :model-value="item.quantity"
                    @update:model-value="cart.update(item.product.id, $event)"
                  />
                </div>
              </div>
            </div>

            <div
              v-if="cart.hasPrescription"
              class="flex items-start gap-3 rounded-2xl bg-accent-50 p-4 text-xs leading-5 text-accent-800 ring-1 ring-accent-200"
            >
              <FileText class="h-4 w-4 shrink-0" />
              <p>
                One or more items require a prescription. Keep a valid copy ready — our team may
                review it before dispatch.
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="cart.items.length"
          class="border-t border-slate-900/[0.06] bg-white p-5"
          style="padding-bottom: max(1.25rem, env(safe-area-inset-bottom))"
        >
          <div class="space-y-2 text-sm text-slate-600">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <strong class="text-ink">{{ formatPrice(cart.subtotal) }}</strong>
            </div>
            <div v-if="cart.discount" class="flex justify-between">
              <span>You save</span>
              <strong class="text-primary-700">−{{ formatPrice(cart.discount) }}</strong>
            </div>
            <div class="flex justify-between">
              <span>Delivery</span>
              <strong class="text-ink">
                {{ cart.deliveryCharge ? formatPrice(cart.deliveryCharge) : 'Free' }}
              </strong>
            </div>
            <div
              class="flex items-baseline justify-between border-t border-dashed border-slate-200 pt-3 text-base"
            >
              <span class="font-semibold text-ink">Total</span>
              <strong class="font-display text-xl font-extrabold text-ink">
                {{ formatPrice(cart.total) }}
              </strong>
            </div>
          </div>
          <RouterLink
            to="/checkout"
            class="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-center font-bold text-white transition duration-200 hover:bg-primary-700 active:scale-[0.98]"
            @click="ui.closeCart"
          >
            Proceed to checkout
            <ArrowRight class="h-4 w-4" />
          </RouterLink>
          <button
            type="button"
            class="mt-2 w-full rounded-full py-2.5 text-sm font-semibold text-slate-500 transition hover:text-ink"
            @click="ui.closeCart"
          >
            Continue shopping
          </button>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ArrowRight, FileText, Pill, Trash2, X } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cartStore'
import { useUiStore } from '../../stores/uiStore'
import { formatPrice } from '../../utils/formatPrice'
import QuantitySelector from '../common/QuantitySelector.vue'
import EmptyState from '../common/EmptyState.vue'

const cart = useCartStore()
const ui = useUiStore()
</script>
