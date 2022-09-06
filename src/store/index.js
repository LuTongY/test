import {createApp} from 'vue'
import {createStore} from 'vuex'
import {setCookie,getUserCookie,removeUserCookie,updateTabIndex,Configured} from '@/cookie/user';
import T from '@/utils/T.js';
import router from '../router';

 const store = createStore({
	state() {
		return {
			 // 导航的收放状态 false为展开  true为收起来
			 collapsed: false,
			 //抽屉收放状态 false为收起来 true为展开
			 Drawer: false,
			 //用户信息
			user: getUserCookie(),
			//系统左侧菜单	
			MenuRoutes: JSON.parse(localStorage.getItem("menu_list")),
			//当前选择的工厂
			 factory:localStorage.getItem('factory'),
			//工厂列表
			 factory_list:JSON.parse(localStorage.getItem('factory_list')),
			//选项卡菜单
			tabsMenu: [{'path':'/statistics','name':'statistics','title':'首页','id':'-2'}],
			//一级菜单index
			curId:0,
			//当前选项卡索引  //左侧激活二级菜单ID
			tabsMenu_index: '-2',
			//当前选项卡路由
			tabsMenu_router: '' ,
			//页面按钮权限
			buttons:JSON.parse(localStorage.getItem('buttons')),
			//需要缓存的组件
			KeepaliveList:[],
			// 自动监听父元素的变化去重新计算表格高度（对于父元素可能存在动态变化、显示隐藏的容器中、列宽异常等场景中的可能会用到）
			autoResize:true,
			//动态路由加载
			isAddRoutes:false,
			//系统全局参数配置
			Configured:{
				tableSize:Configured('tableSize'),
			}
		}
	},
	mutations: {
		setUserInfo(state, userInfo) {
			state.user = getUserCookie()
		},
		logout(state,option) {
			if(!option){
				state.user = {'user_name': '','user_work': ''}
				T.delLocalStorage(['isSavePw','accout'])
			}		
			state.tabsMenu=[{'path':'/statistics',
			'name':'statistics',
			'title':'首页',
			'id':'-2',
			}];
			removeUserCookie();
			state.tabsMenu_router='';
			state.activeMenuIdex='';
			state.isBtShow=[];
			state.MenuRoutes=[];
			state.isAddRoutes=false;
			state.curId=0;
			state.user='';
			state.tabsMenu_index=-2;
			
		},
		changeMenuRoutes(state, routes) {
			try{
				state.MenuRoutes=JSON.parse(localStorage.getItem("menu_list"))
			}catch(err){
				state.MenuRoutes=[]
			}
		},
		changeTabsMenu(state, data) {
			const obj = data.data;
			if (data.option == 'add') {
				if (state.tabsMenu.findIndex((v) => {return v.id == obj.id}) < 0) {
					state.tabsMenu.push(obj);
					
				}
				    state.curId=updateTabIndex(state.MenuRoutes,obj.id)
				    state.tabsMenu_index = obj.id
					state.tabsMenu_router = obj.name;
				
			} else if (data.option == 'del') {			
				let index = state.tabsMenu.findIndex((v) => {return v.id == obj});
				if(state.tabsMenu_index == obj){
				if (index >=1) {
					    state.curId=updateTabIndex(state.MenuRoutes,state.tabsMenu[index - 1].id)
						state.tabsMenu_index = state.tabsMenu[index - 1].id;
						state.tabsMenu_router = state.tabsMenu[index - 1].name;
					
				} else if (index < 1) {
					if (state.tabsMenu.length > 1) {
						state.curId=updateTabIndex(state.MenuRoutes,state.tabsMenu[index + 1].id)
						state.tabsMenu_index = state.tabsMenu[index + 1].id;
						state.tabsMenu_router = state.tabsMenu[index + 1].name;
					}
				}
				}
				state.tabsMenu.splice(state.tabsMenu.findIndex((v) => { return v.id == obj}), 1)
				if(state.tabsMenu.length<1){state.tabsMenu_index = -2;state.tabsMenu_router = 'index';return false}}
			
			//keep-alive缓存组件
			state.KeepaliveList=[]
			   state.tabsMenu.forEach((item,index)=>{		   
				   if(state.KeepaliveList.indexOf(item.name)== -1 && index>0){
					   state.KeepaliveList.push(item.name)
				   }            
				})
		},
		changeCollapsed(state) {
		      state.collapsed = !state.collapsed;
		    },
		changefactory(state,data){
			localStorage.setItem("factory_list",JSON.stringify(data));
			if(data['option'] !='edit'){
				state.factory_list=data
			}
			state.factory=localStorage.getItem('factory')
			
		},
		factorysList(state,data){
			state.factorysList=true
		},
		changeisAddRoutes(state,data){
			state.isAddRoutes=data.is
		},
		close_tabs(state,option){
			if(state.tabsMenu.length<2){return false}
			if(option=='all'){
				state.tabsMenu=[{'path':'/statistics','name':'statistics','title':'首页','id':'-1'}];
				state.curId=0;
				state.tabsMenu_index='-1'
				state.KeepaliveList=[];
				router.push({'path':'/index'})
			}else if(option=='rests'){
				state.tabsMenu.push(state.tabsMenu[state.tabsMenu.findIndex((v)=>{return v.id==state.tabsMenu_index})]);
				state.KeepaliveList=[state.tabsMenu[state.tabsMenu.findIndex((v)=>{return v.id==state.tabsMenu_index})].id];
				state.tabsMenu.splice(1,state.tabsMenu.length-2)	
				state.tabsMenu_index=state.tabsMenu[1].id;
			}
		},
		changeButtons(state){
			state.buttons=JSON.parse(localStorage.getItem('buttons'))
		},
		updateCurId(state,index){
            state.curId=index;
		},
		changeDrawer(state){
			state.Drawer = !state.Drawer;
		},
		//修改全局配置
		updateConfigured(state,data){
			state.Configured[data.key]=data.value
		}
	},
	actions: {
		setUserInfo({commit}, userInfo) {
			setCookie(userInfo);
			commit('setUserInfo', userInfo);
		},
		logout({commit},option) {
			commit('logout',option);
			if(!option){removeUserCookie()}
			
		},
		changeMenuRoutes({commit}, routes) {
			commit('changeMenuRoutes', routes);
		},
		changeTabsMenu({commit}, data) {
			commit('changeTabsMenu', data);
		},
		changeCollapsed({commit}){
			commit('changeCollapsed')
		},
		changefactory({commit},data){
			commit('changefactory',data);
		},
		changeisAddRoutes({commit},data){
			commit('changeisAddRoutes',data)
		},
		close_tabs({commit},option){
            commit('close_tabs',option)
		},
		changeButtons({commit}){
            commit('changeButtons')
		},
		updateCurId({commit},index){
			commit('updateCurId',index)
		},
		changeDrawer({commit}){
		    commit('changeDrawer')
		},
		updateConfigured({commit},data){
			commit('updateConfigured',data)
		}
	},
})


export default store
