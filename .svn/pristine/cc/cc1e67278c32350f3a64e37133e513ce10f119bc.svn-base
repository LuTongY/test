<template>
	<div v-dialogdrag v-if="SelectShow">
		<el-dialog 
		title='查询'
		v-model="SelectShow"
		width="600px"
		>
		<el-form   :model="form"  ref="form"  label-width="120px" class="demo-ruleForm" >
			<el-form-item label="状态">
			     <vxe-select v-model="form.status" placeholder="请选择" multiple>
					<vxe-option label="请购已关闭"  value="请购已关闭"></vxe-option>
			        <vxe-option  label="未下合同"  value="未下合同"></vxe-option>
					<vxe-option  label="未下订单"  value="未下订单"></vxe-option>
					<vxe-option  label="未送货"  value="未送货"></vxe-option>
					<vxe-option  label="部分送货"  value="部分送货"></vxe-option>
					<vxe-option  label="完成"  value="完成"></vxe-option>
			     </vxe-select>
			</el-form-item>
			<el-form-item label="销售订单号">
			    <vxe-input v-model.trim="form.cSoCode" placeholder="销售订单号"></vxe-input>
			</el-form-item>
			<el-form-item label="采购员">
				<vxe-input v-model.trim="form.cg_name" placeholder="请购单号"></vxe-input>
			</el-form-item>
			<el-form-item label="请购单号">
				<vxe-input v-model.trim="form.cCode" placeholder="请购单号"></vxe-input>
			</el-form-item>
			<el-form-item label="存货名称">
				<vxe-input v-model.trim="form.cInvName" placeholder="存货名称"></vxe-input>
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
					status:[],
				},	
				SelectShow:false,
			}
		},
		mounted() {
			
		},
		methods:{
			SearchBtn:function(){
				this.$emit("page_list")
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
