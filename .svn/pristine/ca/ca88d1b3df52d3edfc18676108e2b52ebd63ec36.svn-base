<template>
	<el-container>
		<el-aside width="auto">
			<menu-Left></menu-Left>
		</el-aside>
		<el-container>
			<el-header >
				<Header></Header>
				<div class="tabs">
					<tabs></tabs>
				</div>
			</el-header>

			<el-main class="home-container">
				<router-view v-slot="{ Component }">
					<transition name="el-fade-in-linear">
						<keep-alive :include="$store.state.KeepaliveList">
							<component :is="Component"></component>
						</keep-alive>
					</transition>
				</router-view>
			</el-main>
		</el-container>
		<drawer />
	</el-container>
</template>
<script>
	import menuLeft from '@/components/menu/menu.vue'
	import Header from '@/components/header/header.vue'
	import tabs from '@/components/header/tabs.vue'
	import drawer from '@/components/Drawer/Drawer.vue'
	export default {
		components: {
			menuLeft,
			Header,
			tabs,
			drawer
		},
		data() {
			return {
			}
		},
		mounted() {
		},
		methods: {
          
		},
	}
</script>
<style scoped>
	.el-container {
		height: 100%
	}

	.el-header {
		border-bottom: 1px solid #ccc;
		height: 110px;
		background-color: #fff;
		/* padding: 0; */
	}

	.tabs {
		height: 48px;
		background-color: #fff;
		border-top: 1px solid #F6F6F6;
		line-height: 48px;
		width: 100%;
		overflow: hidden;
	}

	Header {
		/* border-bottom: 1px solid #ccc; */
		padding: 0 20px;
	}

	.slide-fade-enter-active {
		transition: all 0.1s  cubic-bezier(0,.54,.82,1)

	}

	.slide-fade-leave-active {
		
		 transition: all 0.1s cubic-bezier(0,.54,.82,1)

	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		opacity: 0;
	}

	.el-main {
		background-color: #FFF;
		padding: 0;
	}
	.transition-box {
	    margin-bottom: 10px;
	    width: 200px;
	    height: 100px;
	    border-radius: 4px;
	    background-color: #409eff;
	    text-align: center;
	    color: #fff;
	    padding: 40px 20px;
	    box-sizing: border-box;
	    margin-right: 20px;
	  }
	  /deep/.el-drawer__header{
	  	margin-bottom: 0 !important;
	  }
</style>
