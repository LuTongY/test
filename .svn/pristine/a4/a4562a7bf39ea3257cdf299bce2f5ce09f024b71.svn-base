<template>
<!-- title:采购发票钩稽(股份)
   auth:路通
   data:2021-07-15 -->
	<div class="ContractCheck_main">
		<el-form :inline="true" :model="ContractCheck_form" class="demo-form-inline">
			<el-form-item label="税号">
				<el-input v-model="ContractCheck_form.taxNo" placeholder="税号" size="small"></el-input>
			</el-form-item>
			<el-form-item label="发票日期">
				<el-date-picker v-model="ContractCheck_form.vouchDate" type="date" size="small" placeholder="发票日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="发票号">
				<el-input v-model="ContractCheck_form.vouchCode" placeholder="发票号" size="small"></el-input>
			</el-form-item>
			<el-form-item label="供应商名称">
				<el-input v-model="ContractCheck_form.vendorName" placeholder="供应商名称" size="small"></el-input>
			</el-form-item>
			<el-form-item label="采购员">
				<el-input v-model="ContractCheck_form.personName" placeholder="采购员" size="small"></el-input>
			</el-form-item>
			<el-row>			
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" size="small" @click="page_list()" >搜索</el-button>
				<el-button type="success" icon="el-icon-edit" size="small" @click="register_bt()" v-has="['register']">登记</el-button>
				<el-button type="danger" icon="el-icon-delete" size="small" @click="del_register" v-has="['del']">删除输入框的税号登记</el-button>
			</el-form-item>
		   </el-row>
		</el-form>

		<el-row class="ContractCheck_main_table">
			<el-table ref="table_selection" :data="tableData" border highlight-current-row height="650" show-summary
				style="width: 100%" max-height="650" @expand-change="get_expand"  @row-click="selectId">
				<el-table-column label="" width="50" type="expand">
					<template #default="scope">
						<el-table border :data="register_list[scope.row.id]">
							<el-table-column label="税票日期"  property="date"></el-table-column>
							<el-table-column label="税号"      property="taxNo"></el-table-column>
							<el-table-column label="税票金额"  property="amount"></el-table-column>
							<el-table-column label="勾稽人"    property="person"></el-table-column>
							<el-table-column label="时间戳"    property="updateTime"></el-table-column>
						</el-table>
					</template>
				</el-table-column>
				<el-table-column property="vouchDate" label="发票日期" width="130">
				</el-table-column>
				<el-table-column  label="发票号" width="120">
					<template #default="scope">
						{{scope.row.vouchCode}}
					</template>
				</el-table-column>
				<el-table-column property="vendorName" label="供应商名称" width="430">
				</el-table-column>
				<el-table-column property="personName" label="采购员" width="130">
				</el-table-column>
				<el-table-column property="amount" label="发票金额" width="130" align="center">
				</el-table-column>
				<el-table-column property="taxAmount" label="到票金额" width="130" align="center">
				</el-table-column>
				<el-table-column property="oweAmount" label="欠票金额" width="130" align="center">
				</el-table-column>
			</el-table>
		</el-row>
		<el-row>
			<div style="margin-top: 20px">
				<page ref="page_data" :totalCount="totalCount" @page_list='page_list'/>
			</div>
		</el-row>
		<div v-dialogdrag class="register_dialog">
			<el-dialog
			 title="登记"
			 v-model="register_dialog"	 
			 width="400px">
			 <el-form :model="ContractCheck_form">
				 <el-form-item label="日期" label-width='100px'>
					 <el-date-picker v-model="register_form.date" type="date" size="small" placeholder="日期">		 
					 </el-date-picker>
				 </el-form-item>
				 <el-form-item label="税票号"  label-width='100px'>
				 	<el-input v-model="register_form.taxNo" placeholder="税票号" size="small"></el-input>
				 </el-form-item>
				 <el-form-item label="金额"  label-width='100px'>
				 	<el-input v-model="register_form.amount" placeholder="金额" size="small"></el-input>
				 </el-form-item>
			 </el-form>
				 <template #footer>
				     <span class="dialog-footer">
				       <el-button @click="register_dialog = false">取 消</el-button>
				       <el-button type="primary" @click="SaveRegister">确 定</el-button>
				     </span>
				   </template>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import page from '@/components/page/page.vue'
	import excel from '@/components/excel/excel.vue'
	export default {
		name:'PurVouchTax',
		components: {
			page,
			excel,
		},
		data() {
			return {
				register_dialog:false,
				register_form:{},
				ContractCheck_form: {},
				date: '',
				totalCount: 0,
				tableData: [],
				currentRow: null,
				selectID: [],
				selectName: '',
				register_data: {},
				register_list:{},
				selectID:'',
			}
		},
		mounted() {
			this.page_list();
		},
		methods: {
			page_list: function() {
				this.ContractCheck_form.vouchDate ? this.ContractCheck_form.vouchDate = this.moment(this.ContractCheck_form.vouchDate).format('YYYY-MM-DD') : this.ContractCheck_form.vouchDate = '';
				let pagesize=this.$refs.page_data.page_size;
				let page=this.$refs.page_data.page;
				this.api.finance.PurVouchTax.GetList(pagesize, page, this.ContractCheck_form).then((res) => {
					if (res.data.code == 200) {
						for (let key in res.data.data.rows) {
							res.data.data.rows[key].hasChildren = true;
						}
						this.tableData = res.data.data.rows

						this.totalCount = parseInt(res.data.data.totalCount)
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			get_expand: function(row, expandedRows) {
				this.register_list[row.id]=[];
				this.api.finance.PurVouchTax.GetRegisterList(row.id).then((res)=>{
					if(res.data.code = 200){
						this.register_list[row.id]=res.data.data
					}else{
						this.$message.error(res.data.message)
					}
				})
			},
			register_bt:function(){
				if(!this.selectID){this.$message.error("请先选择发票"); return false}
				this.register_dialog=!this.register_dialog
			},
			selectId:function(item){
				this.selectID=item.id
			},
			SaveRegister:function(){
				this.register_form.ids=this.selectID
				this.register_form.date=this.moment(this.register_form.date).format('YYYY-MM-DD')
				this.api.finance.PurVouchTax.Register(this.register_form).then((res)=>{
					if(res.data.code==200){
						this.$message.success(res.data.message)
						this.register_dialog=false
						this.register_list[this.selectID].push(this.register_form);
						this.register_form={}
						
					}else{
						this.$message.error(res.data.message)
					}
				})
			},
			del_register:function(){
				this.$confirm('是否确定删除', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {			   
					this.api.finance.PurVouchTax.DeleteRegister(this.ContractCheck_form.taxNo).then((res)=>{
						if(res.data.code==200){
							this.page_list();
							this.$message.success(res.data.message)			
						}else{
							this.$message.error(res.data.message)
						}
					})
				 })					
			},
		},
	}
</script>

<style scoped="scoped">
	.ContractCheck_main {
		height: 100%;
		width: 100%;
		background-color: #fff;

	}

	.ContractCheck_main_head {
		height: 90px;
		padding: 12px 20px;
	}

	.ContractCheck_main_table {
		padding: 0px 20px;
	}

	.ContractCheck_main_head li:not(:first-child) {
		padding: 0 8px;
	}
</style>
<style lang="less" scoped="scoped">
	.el-button--primary {
		background-color: #1D94FA;
		border-color: #1D94FA;
	}

	.el-button--danger {
		color: #fff;
		background-color: #ff4d4f;
		border-color: #ff4d4f;
	}

	.el-input__suffix-inner i,
	.el-input__prefix i {
		height: 32px
	}

	.ContractCheck_main /deep/ .el-input__prefix i {
		height: 32px !important
	}

	.demo-form-inline {
		padding: 12px 20px;

	}

	.demo-form-inline /deep/ .el-date-editor.el-input,
	.el-date-editor.el-input__inner {
		width: 150px
	}

	.ContractCheck_main_table /deep/ .el-input__inner {
		width: 150px
	}

	.el-form-item {
		margin-bottom: 0px;
	}
	 .register_dialog /deep/ .el-dialog__body   .el-input__inner{
		width: 220px;
	}
	.register_dialog /deep/ .el-form-item {
		margin: 12px 0;
	}
</style>
