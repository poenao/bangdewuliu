import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  // 定义一个方法来修改状态
  const increment = () => {
    count.value++
  }

  const decrement = () => {
    count.value--
  }

  return { count, increment, decrement }
})
