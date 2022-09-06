import { createApp } from 'vue'

import 'xe-utils'
//表格组件
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import store from './store';
import axios from 'axios'
axios.defaults.withCredentials = true
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
// import 'element-plus/lib/theme-chalk/index.css';
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'default-passive-events'
import "font-awesome/css/font-awesome.min.css"
// 日期插件
import Moment from 'moment';
import App from './App.vue'
//路由
import router from './router'
import api from '@/api/index.js'
// 拖拽组件
import dialogDrag from './utils/directives.js'
//自定义组件
import myMoudle from './utils/my_moudle.js'
import MyDialog from '@/components/Dialog/Dialog.vue' //弹出框
import T from './utils/T.js'
// 监听元素宽高变化插件
import elementResizeDetectorMaker from 'element-resize-detector'
//地图插件
import * as echarts from 'echarts'
//导出excel插件
import CsvExportor from "csv-exportor";
//vxe-table渲染器
import VxeTableRenderer from "/public/js/VxeTableRenderer.js";
//可视化插件
import dataV from '@jiaminghi/data-view'
//图片懒加载插件
import VueLazyLoad from 'vue3-lazyload'

const app = createApp(App);
//加载组件
app.component('MyDialog',MyDialog)



//权限验证
app.directive('has', {  
  created(el,binding) {
    el.style.display = 'none'
	try{
		if(store.state.buttons && store.state.buttons[store.state.tabsMenu_index].indexOf(binding.value[0])>-1){
		  el.style.display = 'inline-block'
		}else{
		 el.style.display = 'none'
		}
	}catch(e){
		el.style.display = 'none'
	}
  
    }
  })
app.use(ElementPlus,{ locale },axios,Moment,api)
app.use(Moment)
app.config.devtools = true
app.config.globalProperties.axios=axios
app.config.globalProperties.api=api
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.moment = Moment
app.config.globalProperties.T = T
app.config.globalProperties.$getDomSize = elementResizeDetectorMaker()
app.config.globalProperties.$XPrint = VXETable.print
app.config.globalProperties.CsvExportor = CsvExportor
Array.prototype.$remove  = T.arrRemove
app.use(router)
app.use(store)
app.use(VXETable)
app.use(dialogDrag)
app.use(myMoudle)
app.use(dataV)
app.use(VueLazyLoad, {
    loading: require("@/assets/loading-svg/loading-bars.svg"),
	error:   require('@/assets/loading-svg/not-available.svg')// 图片加载失败时默认图片
})
// app.config.errorHandler = (err, vm, info) => {
//     console.log('[全局异常]', err, vm, info)
// }
VXETable.setup({
	table:{
		 'resizable': true,
		 'border':"full",
		 'show-overflow':"tooltip",
		 'showHeaderOverflow':true,
		 'auto-resize':true,
		 'round':true,
		 'size':store.state.Configured.tableSize
	},
	exportConfig: {
	             modes: []
	           },
})
app.mount('#app')






// createApp(App).mount('#app')
