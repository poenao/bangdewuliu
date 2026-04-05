import { createSSRApp } from 'vue'
// 引入 Pinia
import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { piniaPluginPersistedstate } from '@/stores/persist'
import App from './App'
import '@/utils/utils'

export function createApp() {
  const app = createSSRApp(App)

  // 实例化Pinia
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  // 传递给项目应用
  app.use(pinia)

  return { app }
}
