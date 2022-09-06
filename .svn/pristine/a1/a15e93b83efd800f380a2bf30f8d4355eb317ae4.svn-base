<template>
	<div class="ContractCheck_main">
		 <el-form :inline="true" :model="ContractCheck_form" class="demo-form-inline">
		  <el-form-item label="合同编码">
		    <el-input v-model="ContractCheck_form.contractId" placeholder="合同编码" size="small"></el-input>
		  </el-form-item>
		  <el-form-item label="合同类型">
                 <el-input v-model="ContractCheck_form.contractKind" placeholder="合同类型" size="small"></el-input>
		  </el-form-item>
		  <el-form-item label="生效日期">
			  <el-date-picker
			      v-model="ContractCheck_form.inureDate"
			      type="date"
			  	  size="small"
			      placeholder="登记日期">
			    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="生效人">
		         <el-input v-model="ContractCheck_form.inurePerson" placeholder="生效人" size="small"></el-input>
		  </el-form-item>
		  <el-form-item label="登记日期" >
			    <el-date-picker
			        v-model="ContractCheck_form.date"
			        type="date"
					size="small"
			        placeholder="登记日期"
					>
			      </el-date-picker>
		  </el-form-item>
		  <el-form-item >
		         <el-button type="primary" icon="el-icon-search" size="small" @click="page_list()">搜索</el-button>
		  </el-form-item>
		  

		</el-form>
		
		<el-row class="ContractCheck_main_table">
			<el-table ref="table_selection" :data="tableData" border highlight-current-row  height="700"
				 style="width: 100%" max-height="670" 
				 >
				<el-table-column property="contactId" label="合同编码" width="130" >	
				</el-table-column>
				<el-table-column property="contractKind" label="合同类型" width="120" >
				</el-table-column>
				<el-table-column property="inureDate" label="生效日期" width="130" >
				</el-table-column>
				<el-table-column property="inurePerson" label="生效人" width="130" >
				</el-table-column>
				<el-table-column  label="登记日期"  width="180" align="center">
				   <template #default="scope">
					         <el-date-picker
						      v-if="!scope.row.date"
					         v-model="register_data[scope.row.contactId]"
					         type="date"
					         placeholder="选择日期"
							  size="small"
							 @change='register_submit(scope.row.contactId)'>
					       </el-date-picker>
					   <span v-else>{{moment(scope.row.date).format('YYYY-MM-DD')}}</span>
				   </template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row>
			<div style="margin-top: 20px">
				<page ref="page_data"  :totalCount="totalCount" @page_list='page_list'/>
			</div>
		</el-row>
	</div>
</template>
<script>
	import page  from '@/components/page/page.vue'
	import excel from '@/components/excel/excel.vue'
	export default {
		name:'ContractCheck',
		components: {
			page,
			excel,
		},
		data() {
			return {
				ContractCheck_form:{},
				date: '',
				totalCount: 0,
				tableData: [],
				currentRow: null,
				selectID:[],
				selectName:'',
				register_data:{},
			}
		},
		activated(){
		},
		mounted() {
			this.page_list();
		},
		methods: {
			page_list: function() {
				this.ContractCheck_form.inureDate?this.ContractCheck_form.inureDate=this.moment(this.ContractCheck_form.inureDate).format('YYYY-MM-DD'):this.ContractCheck_form.inureDate='';
				this.ContractCheck_form.date?this.ContractCheck_form.date=this.moment(this.ContractCheck_form.date).format('YYYY-MM-DD'):this.ContractCheck_form.date='';
				let pagesize=this.$refs.page_data.page_size;
				let page=this.$refs.page_data.page;
				this.api.finance.ContractCheck.GetList(pagesize,page,this.ContractCheck_form).then((res) => {
					if(res.data.code==200){
						this.tableData = res.data.data.rows
						this.totalCount = parseInt(res.data.data.totalCount)
					}else{
						this.$message.error(res.data.message)
					}
				})
			},
          register_submit:function(id){
			 // console.log(Object.values(this.register_data)[0])
			 let odata=this.moment(Object.values(this.register_data)[0]).format('YYYY-MM-DD')
			  this.api.finance.ContractCheck.Register(id,odata).then((res)=>{
				  if(res.data.code==200){
					  this.$message.success(res.data.message)
					  this.register_data={};
					   this.tableData[this.tableData.findIndex((v)=>v.contactId==id)].date=odata
				  }else{
					   this.$message.error(res.data.message)
				  }
			  })
		  }
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
	.el-input__suffix-inner i, .el-input__prefix i{
		height: 32px 
	}
	.ContractCheck_main /deep/ .el-input__prefix i{
		 height: 32px !important 	
	}
	.demo-form-inline{
		padding: 12px 20px;
		
	}
	.demo-form-inline /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner{
		width:150px
	}
	.ContractCheck_main_table /deep/ .el-input__inner{
		width:150px
	}
	.el-form-item{
		margin-bottom: 0px;
	}
</style>
