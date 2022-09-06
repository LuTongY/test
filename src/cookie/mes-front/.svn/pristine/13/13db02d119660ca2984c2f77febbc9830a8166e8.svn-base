<template>
		<el-container>
			<el-aside width="265px">
				<menu-Left></menu-Left>
			</el-aside>
			  <el-container>
			    <el-header>
					<Header></Header>
				</el-header>
			    <el-main>Main</el-main>
			  </el-container>
		</el-container>
</template>
<script>
import  menuLeft from '@/components/menu/menu.vue'
import  Header   from '@/components/header/header.vue'
import api from '@/api/index.js'
import axios from 'axios'
	export default{
		components:{
			menuLeft,
			Header,
		},
		data(){
			return{}
		},
		mounted() {
			this.menu_list();
		},
		methods:{
			menu_list :function (){
				// api.menu_list(this.user_accout,this.user_pw).then((res) => {
				//   if (res.data.code == '200') {
				// 	  this.$message.success('登陆成功')
				// 	  this.$router.push({name:'main'})
				// 	  sessionStorage.clickcount ='65456456'
				//   } else {
				// 	  this.$message.error(res.data.message);
				//   }
				// })
				axios.post("http://192.168.60.153:8000/auth/menu/get-menu-left",{},{'emulateJSON': true, 'credentials': true})
			}
			
		},
	}
</script>
<style>
.el-container{
	height: 100%
}
</style>
