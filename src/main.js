import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import 'unfonts.css'
import '@/styles/main.css'

const app = createApp(App)
app.use(router)

Object.values(import.meta.glob('./modules/*.js', { eager: true }))
  .forEach(i => i.install?.(app, { router }))

app.mount('#app')
