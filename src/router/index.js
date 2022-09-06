import {createRouter,createWebHistory} from 'vue-router'
import login from '@/login/index';
import store from '@/store';
import axios from 'axios'
import api from '@/api/index.js'
const routerHistory = createWebHistory()
import { ElMessage } from 'element-plus'

const router = createRouter({
	mode: 'history',
	history: routerHistory,
	routes: [
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/index',
			name: 'index',
			component: () => import('@/layout/default')
		},
		{
			path:'/salary',
			name: 'salary',
			component:() => import('@/notLoginViews/salary/salary'),
		},
		{
			path:'/home',
			name: 'home',
			redirect:'/home/home_404',
			component:() => import('@/layout/default'),
			children:[{
				path:'home_404',
				name:'home_404',
				component:() => import('@/err/404'),
			}]
		},
		{
			path: '/:catchAll(.*)',
			name: '404',
			component: ()=>import('@/err/404')
		}
	]
})
router.beforeEach((to, from, next) => {
	let permitThrough=['/login','/salary']  //通行白名单   路由path
	try{
		if(to.meta.id && Object.keys(menu).length>0 && menu[to.meta.id].length>0)
		 require('@/'+menu[to.meta.id]);
	}catch(e){
		  ElMessage.error("前端文件中没有找到此组件,请联系管理员查看")
		return next({path:'/home'})	
	}
	if(to.meta.id){localStorage.setItem('router_id',to.meta.id)}
	if (permitThrough.indexOf(to.path)<0) {
		if (store.state.user.user_name && store.state.user.user_work) {
			if(!store.state.isAddRoutes){	
				let getRouter=localStorage.getItem("menu_list")?JSON.parse(localStorage.getItem("menu_list")):[];
				for(let i=0;i<getRouter.length;i++){
						var i_routers=getMenuRoutes(getRouter[i]);
						i_routers.children=[];
						arrRouters.forEach((i,v)=>{
							if(i.name !=i_routers.name){
								i_routers.children.push(i)
							}	
						})
						router.addRoute(i_routers);
						arrRouters=[];							
				}	
				store.dispatch('changeisAddRoutes',{is:true})
				if (from.path === '/' && from.matched && from.matched.length === 0) {
					return next({path: "/index"})
				  }
				router.push({ path: to.path })
			}else{	
					return next()	
				}	
		}else{
			return next({path: "/login"});
		}
	}
	  next();
})
let arrRouters=[];
let menu={};
function getMenuRoutes(localStorageRouter,parent_id) {
	let item = localStorageRouter
	let type=Array.isArray(item)

	if(type && item.length>0){
		item.forEach((i,index)=>{
			getMenuRoutes(i)
		})
	}else{
		item.meta={
			id:item.id,
			title:item.title,
			icon:item.icon,	
		}
		delete item.icon
		delete item.id
		delete item.routeName
		delete item.parentId
		delete item.title
		if(item.redirect){
			item.redirect=item.redirect
		}
		if(item.component){
			menu[item.meta.id]=item.component;
			item.component= loadView(item.component)
		}
		if(item.name){
			arrRouters.push(item);
		}
		if(item.children){
			getMenuRoutes(item.children,item.meta.id)
		}
		
	}
	return item;
	}
 function loadView(file){
     return ()=>import(`@/${file}`)
}

export default router
