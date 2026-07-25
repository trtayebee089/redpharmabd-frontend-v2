import { ref, watch } from 'vue'

export function useDebounce(source, delay = 350) {
  const debounced = ref(source.value)
  let timer
  watch(source, (value) => {
    window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      debounced.value = value
    }, delay)
  })
  return debounced
}
