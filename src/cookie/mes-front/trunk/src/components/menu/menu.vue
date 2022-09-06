<template>
	<div class="muen_main">
		<div class="el-tabs-left">
			<div class="el-tabs-left_img  el-tabs_item ">
				<svg t="1622016171172" class="icon el-tabs-left_svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17676" width="200" height="200"><path d="M615.6 123.6h165.5L512 589.7 242.9 123.6H63.5L512 900.4l448.5-776.9z" fill="#41B883" p-id="17677"></path><path d="M781.1 123.6H615.6L512 303 408.4 123.6H242.9L512 589.7z" fill="#34495E" p-id="17678"></path></svg>
			</div>
			
			<div v-for="(menu_list,meun_index) in menu_list" :key="menu_list.id" 
			      class="el-tabs_item" 
				  :class="{active : meun_index===curId}"
				  @click="tab(meun_index,menu_list.name)">
				<div class="el-tabs_item_ct">
					<p><i :class="menu_list.icon"></i></p>
					<p>{{menu_list.name}}</p>
				</div>
			</div>
		</div>
		<div class="el-tabs-right">
			<div class="el-tabs-right_search">
				<div class="el-tabs-right_search_main">
                     <p> Admin Plus</p>
			 </div>
			</div>
			<el-divider>{{left_mune_name}}</el-divider>
			<div class="el-tabs-right_main">
			  <el-row class="tac">
				<el-col :span="24">
				  <el-menu
				    class="el-menu-vertical-demo"
				    @open="handleOpen"
				    @close="handleClose"
						  @select="select"
						>
				     <MenuTree :MenuTree="menu_list[curId].children"></MenuTree>
					  </el-menu>
					 </el-col>
					 </el-row>
			</div>
			
		</div>
	</div>
</template>
<script>
	import NProgress from 'nprogress';
	import MenuTree from '@/components/menu/tree'
	import 'nprogress/nprogress.css'
	export default{
		components:{
			MenuTree
		},
		data(){
			return{
				curId: 0,
				search_text:'',
				left_mune_name:'',
				menu_list:[
					{
						id:0,
						icon:'el-icon-setting',
						name:'系统',
						children:[{
							id:1,
							icon:'el-icon-setting',
							name:'菜单设置',
							children:[{
								id:11,
								icon:'el-icon-setting',
								name:'菜单列表',
								children:[{
									id:'1-1-1',
									icon:'el-icon-setting',
									name:'系统日志',
								}]
							},
							{
								id:12,
								icon:'el-icon-setting',
								name:'角色列表',
							},
							{
								id:13,
								icon:'el-icon-setting',
								name:'用户列表',
							}]
						}]
					},{
					id:9,
					icon:'el-icon-s-home',
					name:'生产',
					children:[{
						id:91,
						icon:'el-icon-setting',
						name:'生产日计划',
					},{
							id:92,
							icon:'el-icon-setting',
							name:'生产月计划',
						}]
				    },
					{
					id:2,
					icon:'el-icon-s-home',
					name:'计划',
					},
					{
					id:3,
					icon:'el-icon-s-home',
					name:'采购'
					},
					{
					id:4,
					icon:'el-icon-s-home',
					name:'财务'
					},{
					id:5,
					icon:'el-icon-s-home',
					name:'技术'
					},{
					id:6,
					icon:'el-icon-s-custom',
					name:'人资'
					},{
					id:7,
					icon:'el-icon-s-custom',
					name:'工程'
					},
					{
					id:8,
					icon:'el-icon-s-custom',
					name:'品管'
					},
					
					]
			}
		},
		mounted() {
			this.left_mune_name=this.menu_list[0].name
		},
		methods:{
		   tab:function(index,name){
			   this.curId=index;
			   NProgress.done();
			   NProgress.start();
			   console.log(NProgress)
			   this.left_mune_name=name
		   }
		},
	}
</script>
<style>
	.muen_main,
	.el-tabs__item,
	.el-tabs-left{
		height: 100%;
	}
	.muen_main{
		display: flex;
	}
	.el-tabs-left_svg{
		width: 36px;
		height: 36px;
		margin: 12px;
	}
	.vab-icon,
	.el-tabs_item,
	.el-tabs-left_img{
		height: 65px;
		text-align: center;
		/* line-height: 60px; */
	}
	.el-tabs_item_ct i{
		font-size: 20px;
		padding-bottom: 3px;
	}
	.el-tabs_item_ct{
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
	.el-tabs-left{
		display:fixed ;
		bottom: 0;
		width: 65px;
		background: linear-gradient(90deg,#282c34,#000);
	}
	.el-tabs_item{
		color: #fff;
		text-align: center;
		cursor: pointer;
		font-family: "PingFang SC", Arial, "Microsoft YaHei", sans-serif;
		font-size:14px
	}
	.active{
		background: #1890ff;
		transition: all .3s cubic-bezier(.645,.045,.355,1),border 0s,color .1s,font-size 0s;
	}
	.el-tabs-right{
		width: calc(100% - 66px);
		border-right: 1px solid #ccc;
		background-color: #FFFFFF;
	}
	.el-tabs-right_search{
		height: 64px;
	}
	.el-tabs-right_search_main{
		display: flex;
		text-align: center;
		position: relative;
	}
	.el-tabs-right_search_main p{
		margin: 0 auto;
		display: inline-block;
		vertical-align:middle;
		margin-top:15px;
		font-size: 20px;
		color:#515a6e!important;
		letter-spacing:2px
		
		/* margin-top: 17px; */
	}
	.el-divider--horizontal{
		margin: 0;
	}
	.el-tabs-right_main{
		margin-top:15px ;
	}
</style>
