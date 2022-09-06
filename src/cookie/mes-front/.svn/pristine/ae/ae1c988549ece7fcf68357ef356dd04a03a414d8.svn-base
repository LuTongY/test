import {createRouter,createWebHistory} from 'vue-router'
import login from '@/login/index';
import main from '@/layout/default';
const routerHistory = createWebHistory()

const router = createRouter({
	history:routerHistory,
	routes:[
		{
			path:'/',
			name:'login',
			component:login
		},
		{
			path:'/main',
			name:'main',
			component: () => import('@/layout/default'),
		},
		{
			path:'/:catchAll(.*)',
			name:'login',
			component:login
		}
	]
})

export default router