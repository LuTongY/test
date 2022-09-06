import axios from 'axios'

import qs from 'qs'
import store from './store/index.js'
import router from './router/index.js'
axios.defaults.baseURL = 'http://192.168.60.190:8087'

// if (window.location.host.indexOf('192.168.') == 0) { // 内网
// 	axios.defaults.baseURL = 'http://www.mes.com:8000'
// } else { // 外网
// 	axios.defaults.baseURL = 'http://www.mes.com:8000'
// }
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ElMessage } from 'element-plus'
// 状态码错误信息
const codeMessage = {
	STATUS_SUCCESS: 200, // 操作成功
	// ------------------------------------------------
	PARAM_ERROR: 10100, // 参数错误 
	VALIDATE_FAILED: 10101,   // 表单验证失败
	STATUS_SUCCESS_PART: 10102,  // 部分操作成功
	// ------------------------------------------------
	USER_UNAUTHORIZED: 10200,   // 用户未授权登录
	USER_LOGINED: 10201,        // 用户已登录
	USER_LOGIN_FAILED: 10202,   // 用户登录失败
	USER_ACCESS_DENY: 10203,    // 用户权限不足
	FACTORY_ACCESS_DENY: 10204, // 用户权限不足
	// ------------------------------------------------
	DATA_NOT_EXISTS: 10301,   // 数据不存在
	DATA_EXISTS: 10302,       // 数据已存在
	DATA_ERROR: 10303,        // 数据错误
	DATA_NOT_PROVIDE: 10304, // 暂不供数据
};

// 请求拦截器
axios.interceptors.request.use(function (config) {
	NProgress.start();
	let instance = axios.create({
		timeout: 6000,
		withCredentials: true,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
	
	if (!config.data) { config.data = {} }
	//删掉空值
	
	if (config.data.hasOwnProperty('search')) {
		for (let i in config.data.search) {
			if (!config.data.search[i]) {
				delete config.data.search[i]
			}
		}
	}
	
	try {
		config.data['factoryId'] = localStorage.getItem('factory')
		config.data['accessToken'] = localStorage.getItem('accessToken')
		axios.defaults.withCredentials = true
		config.data = qs.stringify(config.data) // 转为formdata数据格式
		return config
	} catch (err) {
		console.log(err);
		store.dispatch("logout");
		router.push({ path: "/login" });
		ElMessage.error("accessToken丢失")
	}

}, function (error) {
	// 请求错误
	return Promise.reject(error)
});

//响应拦截器
axios.interceptors.response.use((response) => {
	NProgress.done(true);
	try {
		if (response.data.code == 10200) {
			store.dispatch("logout");
			router.push({ path: "/login" });
			if (response.data.data.isSessionExpired == 1) {
				ElMessage.error("会话已过期")
			}
		} else if (response.data.code != 200) {
			ElMessage.error(response.data.message)
		}
	} catch (err) {
		console.log(err)
	}
	return response
}, (error) => {
	ElMessage.error("服务器发生错误")
	NProgress.done(true);
	Promise.reject(error)
}
);
export default axios



