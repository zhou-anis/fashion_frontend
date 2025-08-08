import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import {createPinia} from "pinia";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
createApp(App).use(ElementPlus).use(router).use(pinia).mount('#app')























