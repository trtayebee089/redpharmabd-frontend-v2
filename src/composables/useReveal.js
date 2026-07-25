/**
 * Scroll-reveal directive backed by a single shared IntersectionObserver.
 *
 * Usage: <section v-reveal>  or  <section v-reveal="120">  (delay in ms)
 *
 * Safety first: a decoration must never be able to hide content permanently.
 * If the observer never reports (background tab, throttled webview, missing
 * API, reduced motion) a watchdog reveals everything. The watchdog cancels
 * itself the first time the observer fires, so working browsers keep the
 * full effect.
 */
const REVEALED = 'reveal-in'
const WATCHDOG_MS = 2500

let observer = null
let watchdog = null
let observerFired = false
const pending = new Set()

function revealNow(el) {
  pending.delete(el)
  el.classList.add(REVEALED)
}

function startWatchdog() {
  if (watchdog || observerFired) return
  watchdog = window.setTimeout(() => {
    // Cleared first so sections that mount later (data-gated ones) can re-arm it.
    watchdog = null
    if (observerFired) return
    pending.forEach((el) => {
      el.classList.add(REVEALED)
      observer?.unobserve(el)
    })
    pending.clear()
  }, WATCHDOG_MS)
}

function ensureObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer

  observer = new IntersectionObserver(
    (entries) => {
      observerFired = true
      if (watchdog) {
        window.clearTimeout(watchdog)
        watchdog = null
      }
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target
        const delay = Number(el.dataset.revealDelay || 0)
        if (delay) el.style.transitionDelay = `${delay}ms`
        revealNow(el)
        observer.unobserve(el)
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
  )

  return observer
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const vReveal = {
  mounted(el, binding) {
    const io = typeof IntersectionObserver === 'undefined' ? null : ensureObserver()

    if (prefersReducedMotion() || !io) {
      el.classList.add('reveal', REVEALED)
      return
    }

    el.classList.add('reveal')
    if (binding.value) el.dataset.revealDelay = String(binding.value)
    pending.add(el)
    io.observe(el)
    startWatchdog()
  },
  unmounted(el) {
    pending.delete(el)
    observer?.unobserve(el)
  },
}

export default vReveal
