import { createApp } from 'vue'

import axios from 'axios'
axios.defaults.withCredentials = true
// import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
// 日期插件
// import Moment from 'moment';
import App from './App.vue'
import router from './router'


const app = createApp(App)
app.use(ElementPlus,axios,Moment)
app.config.globalProperties.axios=axios
app.use(router)
app.mount('#app')




// createApp(App).mount('#app')
