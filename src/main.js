import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// 引入全局样式
import './assets/styles/index.css'

// 引入 Vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'

// 创建 Vue 应用实例
const app = createApp(App)

// 使用 Pinia 状态管理
app.use(createPinia())

// 使用 Vue Router
app.use(router)

// 使用 Vant 组件库
app.use(Vant)

// 挂载应用
app.mount('#app')
