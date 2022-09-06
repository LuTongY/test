<template>
	<router-view/>
</template>

<script>
import login from './login/index.vue'
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
export default {
  name: 'App',
  components: {
    login
  }
}
</script>

<style>
:root,
html,
body{
	width:100%;
	height:100%;
	overflow:hidden;
	background-color: #F6F8F9;
}
*{
	margin:0;
	padding:0
}
#app {
  height:100%;
}
 #nprogress .bar {
      background: #1D94FA !important; 
    }
</style>
