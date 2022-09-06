<template>
	<div class="LocalCharge_main">
		<el-form :inline="true" :model="LocalCharge_form" class="demo-form-inline">
			<el-form-item label="发票号">
				<el-input v-model="LocalCharge_form.vouchCode" placeholder="发票号" size="small"></el-input>
			</el-form-item>
			<el-form-item label="发票日期">
				<el-date-picker v-model="LocalCharge_form.vouchDate" type="date" size="small" placeholder="发票日期"></el-date-picker>
				
			</el-form-item>
			<el-form-item label="客户名称">
				<el-input v-model="LocalCharge_form.customName" placeholder="客户名称" size="small"></el-input>
			</el-form-item>
			<el-form-item label="登记日期">
				<el-date-picker v-model="LocalCharge_form.date" type="date" size="small" placeholder="登记日期">
				</el-date-picker>
			</el-form-item>
			<el-row>			
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" size="small" @click="page_list()">搜索</el-button>
				<el-button type="success" icon="el-icon-plus" size="small" @click="register_bt('gzf_dialog')" v-has="['gzf']">登记港杂费</el-button>
				<el-button type="danger"  icon="el-icon-plus" size="small" @click="register_bt('tcf_dialog')" v-has="['tcf']">登记拖车费</el-button>
			</el-form-item>
		   </el-row>
		</el-form>

		<el-row class="LocalCharge_main_table">
			<el-table ref="table_selection" :data="tableData" border highlight-current-row height="650" show-summary
				style="width: 100%" max-height="650" @expand-change="get_expand"  @row-click="selectId">
				<el-table-column property="vouchDate" label="发票日期" width="130">
				</el-table-column>
				<el-table-column  label="发票号" width="120">
					<template #default="scope">
						{{scope.row.vouchCode}}
					</template>
				</el-table-column>
				<el-table-column property="customCode" label="客户编码" width="200">
				</el-table-column>
				<el-table-column property="customName" label="客户名称" width="220">
				</el-table-column>
				<el-table-column property="amount" label="发票含税金额(本位币)" width="180" align="left">
				</el-table-column>
				<el-table-column property="date" label="登记日期" width="130" align="center">
				</el-table-column>
				<el-table-column property="gzf" label="港杂费" width="130" align="center">
				</el-table-column>
				<el-table-column property="tcf" label="拖车费" width="130" align="center">
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
			 title="登记港杂费"
			 v-model="gzf_dialog"	 
			 width="400px">
			 <el-form :model="LocalCharge_form">
				 <el-form-item label="日期" label-width='100px'>
					 <el-date-picker v-model="gzf_dialog_form.date" type="date" size="small" placeholder="日期">		 
					 </el-date-picker>
				 </el-form-item>
				 <el-form-item label="港杂费"  label-width='100px'>
				 	<el-input v-model="gzf_dialog_form.amount" placeholder="港杂费" size="small"></el-input>
				 </el-form-item>
			 </el-form>
				 <template #footer>
				     <span class="dialog-footer">
				       <el-button @click="gzf_dialog = false">取 消</el-button>
				       <el-button type="primary" @click="SaveRegister('gzf','1')">确 定</el-button>
				     </span>
				   </template>
			</el-dialog>
		</div>
		<div v-dialogdrag class="register_dialog">
			<el-dialog
			 title="登记拖车费"
			 v-model="tcf_dialog"	 
			 width="400px">
			 <el-form :model="LocalCharge_form">
				 <el-form-item label="日期" label-width='100px'>
					 <el-date-picker v-model="tcf_dialog_form.date" type="date" size="small" placeholder="日期">		 
					 </el-date-picker>
				 </el-form-item>
				 <el-form-item label="拖车费"  label-width='100px'>
				 	<el-input v-model="tcf_dialog_form.amount" placeholder="拖车费" size="small"></el-input>
				 </el-form-item>
			 </el-form>
				 <template #footer>
				     <span class="dialog-footer">
				       <el-button @click="tcf_dialog = false">取 消</el-button>
				       <el-button type="primary" @click="SaveRegister('tcf','2')">确 定</el-button>
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
		name:'LocalCharge',
		components: {
			page,
			excel,
		},
		data() {
			return {
				register_dialog:false,
				register_form:{},
				LocalCharge_form: {},
				date: '',
				totalCount: 0,
				tableData: [],
				currentRow: null,
				selectID: [],
				selectName: '',
				register_data: {},
				register_list:{},
				selectID:'',
				gzf_dialog:false,
				gzf_dialog_form:{},
				tcf_dialog:false,
				tcf_dialog_form:{},	
			}
		},
		activated() {},
		mounted() {
			this.page_list();
		},
		methods: {
			page_list: function() {
				this.LocalCharge_form.vouchDate ? this.LocalCharge_form.vouchDate = this.moment(this.LocalCharge_form.vouchDate).format('YYYY-MM-DD') : this.LocalCharge_form.vouchDate = '';
				this.LocalCharge_form.date ? this.LocalCharge_form.date = this.moment(this.LocalCharge_form.date).format('YYYY-MM-DD') : this.LocalCharge_form.date = '';
				let pagesize=this.$refs.page_data.page_size;
				let page=this.$refs.page_data.page;
				this.api.finance.LocalCharge.GetList(pagesize, page, this.LocalCharge_form).then((res) => {
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
						this.register_list[row.id]=res.data.data.rows
					}else{
						this.$message.error(res.data.message)
					}
				})
			},
			register_bt:function(name){
				if(!this.selectID){this.$message.error("请先选择发票"); return false}
				this[name]=!this[name]
			},
			selectId:function(item){
				this.selectID=item.id
			},
			SaveRegister:function(option,type){
				if(!this.selectID){this.$message.error("请先选择发票"); return false}
				let form = option=='gzf'?this.gzf_dialog_form:this.tcf_dialog_form
				form.id=this.selectID;
				form.type=type
				form.date=this.moment(form.date).format('YYYY-MM-DD')
				this.api.finance.LocalCharge.Register(form).then((res)=>{
					if(res.data.code==200){
						this.$message.success(res.data.message)
						this.gzf_dialog=this.tcf_dialog=false;
						this.gzf_dialog_form=this.tcf_dialog_form={};
						this.page_list();
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
					this.api.finance.PurVouchTax.DeleteRegister(this.LocalCharge_form.taxNo).then((res)=>{
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
	.LocalCharge_main {
		height: 100%;
		width: 100%;
		background-color: #fff;

	}

	.LocalCharge_main_head {
		height: 90px;
		padding: 12px 20px;
	}

	.LocalCharge_main_table {
		padding: 0px 20px;
	}

	.LocalCharge_main_head li:not(:first-child) {
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

	.LocalCharge_main /deep/ .el-input__prefix i {
		height: 32px !important
	}

	.demo-form-inline {
		padding: 12px 20px;

	}

	.demo-form-inline /deep/ .el-date-editor.el-input,
	.el-date-editor.el-input__inner {
		width: 150px
	}

	.LocalCharge_main_table /deep/ .el-input__inner {
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
