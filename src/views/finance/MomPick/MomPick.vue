<template>
	<div class="MomPick_main">
		<el-row class="MomPick_main_head" type="flex">
			<el-col>
				<ul style="display: flex;list-style: none;height: 40px;margin-top: 13px;">
					<li>
						<el-date-picker		
							  class="date"
						      v-model="date"
						      type="date"
						      placeholder="选择日期"
							  size="small">
						</el-date-picker>
					</li>
					<li>
						<el-button type="primary" icon="el-icon-search" size="small" @click="page_list()">搜索</el-button>
					</li>
					<li>
						<el-button type="primary" icon="el-icon-delete" size="small" @click="SetAudit"  v-has="['state']">还原(将关闭状态变成审核)</el-button>
					</li>
					<li>
						<el-button type="warning" icon="el-icon-delete" size="small" @click="excel" v-has="['export']">自定义日期导出</el-button>
					</li>
				</ul>
			</el-col>
		</el-row>
		<el-row class="MomPick_main_table">
			<el-table ref="table_selection" :data="tableData" border highlight-current-row  height="700"
				 style="width: 100%" max-height="720" @selection-change="get_all_id"
				 >
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column property="cDepName" label="生产部门" width="110"
				 :filters="cDepName_filters"
				 :filter-method="filterHandler"
				 >
				</el-table-column>
				<el-table-column property="MoCode" label="生产订单号" width="130" >	
				</el-table-column>
				<el-table-column property="cInvCode" label="成品编码" width="130" >
				</el-table-column>
				<el-table-column property="cInvName" label="产品名称"  width="300" align="left">
				</el-table-column>
				<el-table-column property="Qty" label="订单数量"  width="80" align="center" :formatter="(row)=>{if(row.Qty.indexOf('.')==0){return 0} return parseInt(row.Qty)}">
				</el-table-column>
				<el-table-column property="QualifiedInQty" label="入库数量"  width="80"  align="center" :formatter="(row)=>{if(row.QualifiedInQty.indexOf('.')==0){return 0} return parseInt(row.QualifiedInQty)}">
				</el-table-column>
			<!-- 	<el-table-column property="zcInvCode" label="材料编码"  align="center" >
				</el-table-column> -->
				<el-table-column property="zcInvName" label="材料名称" align="left"  >
				</el-table-column>
				<el-table-column property="zQty" label="需求数量" width="80" align="center" :formatter="(row)=>{if(row.zQty.indexOf('.')==0){return 0} return parseInt(row.zQty)}">
				</el-table-column>
				<el-table-column property="IssQty" label="已领" width="80" :formatter="(row)=>{if(row.IssQty.indexOf('.')==0){return 0} return parseInt(row.IssQty)}">
				</el-table-column>
				<el-table-column property="yQty" label="应领" width="80" :formatter="(row)=>{if(row.yQty.indexOf('.')==0){return 0} return parseInt(row.yQty)}" >
				</el-table-column>
				<el-table-column property="needQty" label="还需" width="80" :formatter="(row)=>{if(row.needQty.indexOf('.')==0){return 0} return parseInt(row.needQty)}">
				</el-table-column>
				<el-table-column property="stockQty" label="现存量" width="80" :formatter="(row)=>{if(row.stockQty==null || row.stockQty.indexOf('.')==0){return 0} return parseInt(row.stockQty)}">
				</el-table-column>
				<el-table-column  label="状态" align="center" width="100" >
					<template #default="scope">
						<el-button type="danger" round v-if="scope.row.Status=='审核'" size="mini">{{scope.row.Status}}</el-button>
						<el-button type="success" round v-if="scope.row.Status=='关闭'" size="mini">{{scope.row.Status}}</el-button>
					</template>
				</el-table-column>		
			</el-table>
		</el-row>
		<el-row>
			<!-- <div style="margin-top: 20px">
				<page ref="page_data"  :totalCount="totalCount" />
			</div> -->
		</el-row>
		<excel ref="excel"></excel>
	</div>
</template>
<script>
	import page  from '@/components/page/page.vue'
	import excel from '@/components/excel/excel.vue'
	export default {
		name:'MomPick',
		components: {
			page,
			excel,
		},
		data() {
			return {
				date: '',
				totalCount: 0,
				tableData: [],
				currentRow: null,
				selectID:[],
				selectName:'',
				cDepName_filters:[],
			}
		},
		activated(){
		},
		mounted() {
		},
		methods: {
			page_list: function(pagesize, page,user) {
				if(!this.date){this.$message.error('请先选择日期');return false}
				this.api.finance.MomPick.GetList(pagesize,page,this.moment(this.date).format('YYYY-MM-DD')).then((res) => {
					if(res.data.code==200){
						this.tableData = res.data.data.rows;
						this.cDepName_filters=this.T.el_table_filters(res.data.data.rows,'cDepName');
					}else{
						this.$message.error(res.data.message)
					}
				})
			},
           dateFormatter:function(row){
			   let data=row.dDate
			   return this.moment(data).format('YYYY-MM-DD')
		   },
		   IntFormatter:function(row){
			   let date=parseInt(row)
			   return parseInt(row);
		   },
		   SetAudit:function(){
			   this.api.finance.MomPick.SetAudit(this.selectID).then((res)=>{
				   if(res.data.code==200){
				   	  this.page_list();
				   }else{
				   	this.$message.error(res.data.message)
				   }
			   })
		   },
		   get_all_id:function(selection){
			   let arr=[]
			   selection.forEach((item,index)=>{
				   arr.push(item.MoDId)
			   })
			   this.selectID=arr
		   },
		   excel:function(){
			   this.$refs.excel.excel_Show=!this.$refs.excel.excel_Show; 
		   },
		   excel_download:function(){
			   let startDate=this.moment(this.$refs.excel.date[0]).format('YYYY-MM-DD')
			   let endDate=this.moment(this.$refs.excel.date[1]).format('YYYY-MM-DD')
			   this.api.finance.MomPick.Export(startDate,endDate).then((res)=>{
				   if(res.data.code==200){
					   this.$refs.excel.percentage=100
					   window.location.href=res.data.data.exportList[0].url
				   }else{
					   this.$message.error(res.data.message)
				   }
			   })
		   },
		   filterHandler:function(value, row, column) {
		           const property = column['property'];
		           return row[property] === value;
		         }
		},
	}
</script>
<style lang="less" scoped="scoped">
	.MomPick_main {
		height: 100%;
		width: 100%;
		background-color: #fff;
	
	}
	
	.MomPick_main_head {
		height: 90px;
		padding: 12px 20px;
	}
	.MomPick_main_table {
		padding: 0px 20px;
	}
	
	.MomPick_main_head li:not(:first-child) {
		padding: 0 8px;
	}
	.el-button--primary {
		background-color: #1D94FA;
		border-color: #1D94FA;
	}

	.el-button--danger {
		color: #fff;
		background-color: #ff4d4f;
		border-color: #ff4d4f;
	}
	.MomPick_main /deep/ .el-icon-date{
		 height: 32px !important 	
	}
	.MomPick_main /deep/ .el-input__suffix-inner i{
		 height: 32px !important 	
	}
	.MomPick_main /deep/ .el-table__column-filter-trigger i{
		font-size: 20px;
		.el-icon-arrow-down{
			i{
				font-size: 20px;
			}
		}
		 
	}
</style>

