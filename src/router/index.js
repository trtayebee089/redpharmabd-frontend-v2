import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/Home.vue') },
  { path: '/categories', name: 'categories', component: () => import('../views/CategoryGrid.vue') },
  { path: '/category/:slug', name: 'category', component: () => import('../views/Category.vue') },
  { path: '/product/:slug', name: 'product', component: () => import('../views/ProductDetail.vue') },
  { path: '/cart', name: 'cart', component: () => import('../views/Cart.vue') },
  { path: '/checkout', name: 'checkout', component: () => import('../views/Checkout.vue') },
  { path: '/order-confirmation/:id', name: 'order-confirmation', component: () => import('../views/OrderConfirmation.vue') },
  { path: '/track-order', name: 'track-order', component: () => import('../views/OrderTracking.vue') },
  { path: '/request-order', name: 'request-order', component: () => import('../views/RequestOrder.vue') },
  { path: '/delivery-coverage', name: 'delivery-coverage', component: () => import('../views/DeliveryCoverage.vue') },
  { path: '/about', name: 'about', component: () => import('../views/info/About.vue') },
  { path: '/contact', name: 'contact', component: () => import('../views/info/Contact.vue') },
  { path: '/help-center', name: 'help-center', component: () => import('../views/info/HelpCenter.vue') },
  { path: '/privacy-policy', name: 'privacy-policy', component: () => import('../views/info/PrivacyPolicy.vue') },
  { path: '/refund-return', name: 'refund-return', component: () => import('../views/info/RefundReturn.vue') },
  { path: '/terms-conditions', name: 'terms-conditions', component: () => import('../views/info/TermsConditions.vue') },
  { path: '/remove-account', name: 'remove-account', component: () => import('../views/info/RemoveAccount.vue') },
  { path: '/login', name: 'login', component: () => import('../views/auth/LoginPage.vue') },
  { path: '/register', name: 'register', component: () => import('../views/auth/RegisterPage.vue') },
  { path: '/forgot-password', name: 'forgot-password', component: () => import('../views/auth/ForgotPassword.vue') },
  { path: '/account/profile', name: 'profile', component: () => import('../views/account/Profile.vue'), meta: { requiresAuth: true } },
  { path: '/account/orders', name: 'orders', component: () => import('../views/account/Orders.vue'), meta: { requiresAuth: true } },
  { path: '/account/orders/:id', name: 'order-detail', component: () => import('../views/account/OrderDetail.vue'), meta: { requiresAuth: true } },
  { path: '/account/membership', name: 'membership', component: () => import('../views/account/Membership.vue'), meta: { requiresAuth: true } },
  { path: '/account/settings', name: 'settings', component: () => import('../views/account/Settings.vue'), meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
