<template>

		<!-- 菜单有下级 -->
	<template v-for="(item,index) in MenuTree" :key="item.id">
		<el-submenu :index="item.id" v-if="item.children">
			<template #title>
				<i class="el-icon-location"></i>
					<span>{{item.name}}</span>		
			</template>
			  <MenuTree :MenuTree="item.children"></MenuTree>
		</el-submenu>
		<!-- 渲染菜单时 -->
			<el-menu-item :index="item.id" v-else>
				<i :class="item.icon"></i>
			  <template #title>{{item.name}}</template>
			</el-menu-item>
		</template>
</template>
<script>
	export default{
		props:['MenuTree'],
		name:'MenuTree',
		components:{},
		data(){
			return{}
		},
		mounted() {
			console.log(this.MenuTree)
		},
		methods:{
			handleOpen:function(key, keyPath){
			       console.log(key, keyPath);
			     },
			handleClose:function(key, keyPath){
			       console.log(key, keyPath);
			     },
		    select:function(key, keyPath){
			       console.log(key, keyPath);
			     }
		},
	}
</script>
