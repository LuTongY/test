import axios from 'axios'

import qs from 'qs'
axios.defaults.baseURL = 'http://192.168.60.153:8000'
import NProgress from 'nprogress';
// 状态码错误信息
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  1000: '用户未授权',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};


// 请求拦截器
axios.interceptors.request.use(function (config) {
	 NProgress.start();
	let instance = axios.create({
	  timeout: 6000,
	  withCredentials:true,
	  headers: {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  }
	})
	axios.defaults.withCredentials = true
	  config.data = qs.stringify(config.data) // 转为formdata数据格式
  // 在发送请求之前做些什么
  // console.log(config)
  // config.params = {
  //   ...config.params,
  //   appkey: 'asdf_1572851470835'
  // }
  return config
}, function (error) {
// 对请求错误做些什么
  console.log("56879864")
  return Promise.reject(error)
})

export default axios



