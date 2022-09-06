<template>
	<div v-dialogdrag v-if="SelectShow">
		<el-dialog 
		title='查询'
		v-model="SelectShow"
		width="600px"
		>
		<el-form   :model="form"  ref="form"  label-width="120px" class="demo-ruleForm" >
			<el-form-item label="生产订单号">
			    <vxe-input v-model.trim="form.saleOrderNo" placeholder="生产订单号" clearable></vxe-input>
			</el-form-item>
			<el-form-item label="打印人">
				<vxe-input v-model.trim="form.createUser" placeholder="打印人" clearable></vxe-input>
			</el-form-item>
			<el-form-item label="成品名称">
				<vxe-input v-model.trim="form.pInvName" placeholder="成品名称" clearable></vxe-input>
			</el-form-item>
			<el-form-item label="子件名称">
				<vxe-input v-model.trim="form.invName" placeholder="子件名称" clearable></vxe-input>
			</el-form-item>
			<el-form-item label="打印日期">
				<vxe-input v-model="form.createTime[0]" placeholder="起始日期" type="date" parse-format="yyyy-dd-MM" clearable></vxe-input>
				<span style="padding: 0 10px;">至</span>
				<vxe-input v-model="form.createTime[1]" placeholder="结束日期" type="date" parse-format="yyyy-dd-MM" clearable></vxe-input>
			</el-form-item>
		</el-form>
		<p style="text-align: center;" >
			<el-button type="primary" icon="el-icon-search" class="load_bt" @click="SearchBtn">查询</el-button>
		</p>
		</el-dialog>
	 
	</div>
</template>
<script>
	export default{
		components:{},
		data(){
			return{
				form:{
					createTime:[],
				},	
				SelectShow:false,
			}
		},
		mounted() {
			
		},
		methods:{
			SearchBtn:function(){
				this.$emit("SonSearch")
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
	/deep/.el-form-item{
		border-bottom: 15px;
	}
</style>
