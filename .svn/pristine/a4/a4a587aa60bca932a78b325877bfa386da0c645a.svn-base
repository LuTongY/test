<template>
	<div v-dialogdrag v-if="SelectShow">
		<el-dialog 
		title='查询'
		v-model="SelectShow"
		width="600px"
		>
		<slot></slot>
		<p style="text-align: center;" >
			<el-button type="primary" icon="el-icon-search" class="load_bt" @click="SearchBtn">查询</el-button>
		</p>
		</el-dialog>
	 
	</div>
</template>
<script>
	export default{
		components:{},
		props:{
			search:Object
		},
		data(){
			return{
				form:{},	
				SelectShow:false,
			}
		},
		mounted() {
		},
		methods:{
			SearchBtn:function(){
				this.$emit("SonSearch")
			},
			updateSearch:function(value,$name){
				this.form.searchName=$name
				this.$emit("updateSearch",this.form)
			}
		},
	}
</script>
<style scoped="scoped" lang="less">
	.load{
		line-height: 175px
	}
	.el-progress{
		margin-left: calc(50% - 63px);
		margin-top: 45px;
	}
	/deep/.el-dialog__body{
		padding: 0px 10px 10px 10px;
	}
</style>
