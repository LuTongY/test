import axios from '@/axios.js';

var api={
	login(user,pw){
		return axios.post('api/login',{'username':user,'password':pw},{'emulateJSON': true, 'credentials': true})
	},
	menu_list(){
		return axios.post('auth/menu/get-menu-left',{'emulateJSON': true, 'credentials': true})
	}
    
}
export default api