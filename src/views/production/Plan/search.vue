<template>
	<div v-dialogdrag v-if="SelectShow">
		<el-dialog 
		title='查询'
		v-model="SelectShow"
		width="600px"
		>
		<el-form   :model="form"  ref="form"  label-width="120px" class="demo-ruleForm" >
			<el-form-item label="销售订单号">
			    <vxe-input v-model.trim="form.saleOrderNo" placeholder="销售订单号"></vxe-input>
			</el-form-item>
			<el-form-item label="系列">
				<vxe-input v-model.trim="form.series" placeholder="系列"></vxe-input>
			</el-form-item>
			<el-form-item label="制造令状态">
			     <vxe-select v-model="form.isCreateTask" placeholder="请选择">
					<vxe-option label="全部"  value=""></vxe-option>
			        <vxe-option  label="未生成"  value="0"></vxe-option>
					<vxe-option  label="已生成"  value="1"></vxe-option>
			     </vxe-select>
			</el-form-item>
			<el-form-item label="包装日期">
				<vxe-input v-model="form.packDate[0]" placeholder="起始日期" type="date" parse-format="yyyy-dd-MM" clearable></vxe-input>
				<span style="padding: 0 10px;">至</span>
				<vxe-input v-model="form.packDate[1]" placeholder="结束日期" type="date" parse-format="yyyy-dd-MM" clearable></vxe-input>
			</el-form-item>
			<el-form-item label="评审日期">
				<vxe-input v-model="form.dueDate[0]" placeholder="起始日期" type="date" parse-format="yyyy-dd-MM" clearable></vxe-input>
				<span style="padding: 0 10px;">至</span>
				<vxe-input v-model="form.dueDate[1]" placeholder="结束日期" type="date" parse-format="yyyy-dd-MM" clearable></vxe-input>
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
					packDate:[],
					dueDate:[],
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
</style>
