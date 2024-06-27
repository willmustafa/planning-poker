import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
import "vue-toastification/dist/index.css";

import Toast from "vue-toastification";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(Toast)

app.mount('#app')
