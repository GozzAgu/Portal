import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import router from './routes/routes'
import ElementPlus from 'element-plus'
import App from './App.vue'
import 'remixicon/fonts/remixicon.css'
import 'dayjs/locale/es'

const pinia = createPinia();
createApp(App)
.use(pinia)
.use(router)
.use(ElementPlus)
.mount('#app')
