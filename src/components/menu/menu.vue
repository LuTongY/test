<!-- title:菜单
   auth:路通
   data:2021-06-30 -->
<template>
	<div class="muen_main">
		<div class="el-tabs-left">
			<div class="el-tabs-left_img  el-tabs_item ">
				<img src="@/assets/logo.png" alt="" style="width:32px;height: 32px;padding: 16px;">
			</div>
		  <template  v-for="(item,meun_index) in $store.state.MenuRoutes">
			<div :key="item.id" class="el-tabs_item" @mouseenter="tab(meun_index,item)" @mouseleave="leaveTab" :class="{active : meun_index===this.$store.state.curId}"  v-if="item.isShow=='0' || item.id == -1 ">
				<div class="el-tabs_item_ct">
					<p><i :class="'fa '+item.icon"></i></p>
					<p style="overflow: hidden;max-height: 18px;max-width: 100%;">{{item.title}}</p>
				</div>
			</div>
		  </template>
		</div>
		<div class="menu_itme_list" v-show="menu_itme_list" @mouseenter="menuItemMouseenter" @mouseleave="menu_itme_list=false">
			<el-scrollbar>
			<div v-for="(f_item,c_key,c_index) in menu_list[menu_curId].children">
				<p class="menu_itme_list_title">{{f_item.title}}</p>
				<ul>
					<li v-for="(c_item,c_key,c_index) in f_item.children" @click="go_tabs(c_item)" style="font-size: 14px;font-weight: 500;font-family: '微软雅黑';">{{c_item.title}}</li>
				</ul>
			</div>
			</el-scrollbar>
		</div>
	</div>
</template>
<script>
	import MenuTree from '@/components/menu/tree'
	export default {
		components: {
			MenuTree
		},
		data() {
			return {
				menu_itme_list:false,
				search_text: '',
				left_mune_name: '',
				menu_list: this.$store.state.MenuRoutes?this.$store.state.MenuRoutes:[],
				menu_curId:0,
				default_active:this.$store.state.tabsMenu_index,
				MenuSetTime:'',
				MenuItemSetTime:'',
				CurId:0,
			}
		},
		mounted() {
			this.storeMenu()
		},
		watch:{
			//不同分类切换
			"$store.state.curId":{
				deep: true,
				handler:function(newValue, oldValue){
					if(newValue != oldValue){
						this.menu_curId=newValue
						this.$nextTick(()=>{
							this.default_active="0"
							let _this=this
							setTimeout(()=>{
								_this.default_active=this.$store.state.tabsMenu_index
							},100)
						})
					}	
				}
			},
			//相同分类切换
			"$store.state.tabsMenu_index":{
				deep: true,
				handler:function(newValue, oldValue){
					if(this.menu_curId==this.$store.state.curId){
						this.default_active=newValue				
					}
				}
			}
		},
		methods: {
			tab: function(index, data) {
				this.CurId=index;
				this.menu_itme_list=true;
				this.MenuSetTime=window.setTimeout(()=>{
					this.$store.dispatch("updateCurId", index);
					this.left_mune_name = data.title;
				},100)	
			},
			leaveTab:function(){
				window.clearTimeout(this.MenuSetTime);
			},
			menuItemMouseenter:function(){
				window.clearTimeout(this.MenuSetTime);
			},
			storeMenu: function() {
				let menuList = []
				try {
					this.menu_list = JSON.parse(localStorage.getItem("menu_list"))?JSON.parse(localStorage.getItem("menu_list")):[];
				} catch (err) {
					this.menu_list = [];
				}
				this.$store.dispatch('changeMenuRoutes', this.menu_list)
				if (this.menu_list.length > 0) {
					this.left_mune_name = this.menu_list[0].title
				}
			},
			go_tabs:function(item){
				if(!item.path && !item.name){
					item.path='/home';
					item.name='home';
				}
				this.$store.dispatch('changeTabsMenu',{
					data:item,
					option:'add'
				});
				this.menu_itme_list=false;
				this.$router.push({'name':this.$store.state.tabsMenu_router})	
			},
		},
	}
</script>
<style>
	.muen_main,
	.el-tabs__item,
	.el-tabs-left {
		/* height: 100%; */
		min-height: 100%;
	}

	.muen_main {
		display: flex;
	}

	.el-tabs-left_svg {
		width: 36px;
		height: 36px;
		margin: 12px;
	}

	.vab-icon,
	.el-tabs_item,
	.el-tabs-left_img {
		height: 65px;
		text-align: center;
		/* line-height: 60px; */
	}

	.el-tabs_item_ct i {
		font-size: 20px;
		padding-bottom: 3px;
	}

	.el-tabs_item_ct p {
		color: #fff;
	}

	.el-tabs_item_ct {
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}

	.el-tabs-left {
		display: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		width: 65px;
		background: linear-gradient(90deg, #282c34, #000);
	}

	.el-tabs_item {
		color: #fff;
		text-align: center;
		cursor: pointer;
		font-family: "PingFang SC", Arial, "Microsoft YaHei", sans-serif;
		background: linear-gradient(90deg, #282c34, #000);
		font-size: 14px
	}

	.active {
		background: #1890ff;
		transition: all .3s cubic-bezier(.645, .045, .355, 1), border 0s, color .1s, font-size 0s;
	}

	.el-tabs-right {
		width: 200px;
		border-right: 1px solid #ccc;
		background-color: #FFFFFF;
		overflow: hidden;
		box-shadow: 10px 10px 5px #888888
	}

	.hidden_el-tabs-right_hidden {
		width: 0px;
		transition: all 0.3s ease;
		overflow: hidden;
	}

	.hidden_el-tabs-right_show {
		width: 200px;
		transition: all 0.3s ease;
		overflow: hidden;
	}

	.el-tabs-right_search {
		height: 59px;
	}

	.el-tabs-right_search_main {
		display: flex;
		text-align: center;
		position: relative;
		background-color: #FFFFFF;
	}

	.el-tabs-right_search_main p {
		margin: 0 auto;
		display: inline-block;
		vertical-align: middle;
		margin-top: 15px;
		font-size: 20px;
		color: #515a6e !important;
		letter-spacing: 2px;
	}

	.el-divider--horizontal {
		margin: 0;
	}
	a {
		text-decoration: none;
	}

	.el-menu-vertical-demo {
		border-right: 0;
	}
	.MenuTree{
		background-color: red;
	}
	.menu_itme_list{
		height: calc(100% - 30px);
		top:30px;
		bottom: 0;
		width: 380px;
		padding-left:20px;
		background-color: #fff;
		position: fixed;
		left: 65px;
		z-index: 100;
		box-shadow: 2px 0 5px rgb(0 0 0 / 30%);
		border-top: 1px solid #eee;
		border-right: 1px solid #eee;
		
	}
	.menu_itme_list li{
		list-style: none;
		cursor: pointer;
		padding: 5px 8px;
		color: #666;
		font-size: 12px;
	}
	.menu_itme_list ul{
		display: flex;
		flex-wrap: wrap;
	}
	.menu_itme_list li:hover{
		color: #1890FF;
	}
	.menu_itme_list_title{
		font-size: 17px;
		font-weight: 700;
		padding-top: 20px;
		padding-bottom: 10px;
	}
</style>
