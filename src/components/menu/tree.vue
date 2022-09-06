<template>
		<!-- 菜单有下级 -->
	<template v-for="(item,index) in MenuTree" :key="item.id">
		<el-sub-menu :index="item.id.toString()" v-if="item.children && item.isShow==0" >
			<template #title >
				<i :class="'fa '+ item.icon" style="margin-right: 5px"></i>
					<span >{{item.title}}</span>		
			</template>
			  <MenuTree :MenuTree="item.children"></MenuTree>
		</el-sub-menu>
		<!-- 渲染菜单时 -->
			<el-menu-item :index="item.id.toString()" v-else-if="!item.children && item.isShow==0" @click="getTabsList(item)">
				<i :class="'fa-lg fa '+ item.icon" style="margin-right: 5px"></i>
			  <template #title>{{item.title}}</template>
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
		},
		methods:{
			getTabsList:function(item){
				if(!item.path && !item.name){
					item.path='/home';
					item.name='home';
				}
				this.$store.dispatch('changeTabsMenu',{
					data:item,
					option:'add'
				});
				this.$router.push({'name':this.$store.state.tabsMenu_router})	
			},
		},
	}
</script>
<style scoped="scoped" lang='less'>
	a{
		display: block;
		text-decoration: none;
	}
	.el-sub-menu__title:hover  i,
	.el-sub-menu__title:hover  span,{
		color: #1D94FA;
	}
	.el-menu-item:hover,
    .el-menu-item:hover i{
		color: #1D94FA;
	}
</style>
