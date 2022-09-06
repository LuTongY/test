<template>
	<div class="Wip_main">
		<el-row class="Wip_main_head" type="flex">
			<el-col>
				<ul style="display: flex;list-style: none;height: 40px;margin-top: 13px;">
					<li>
						<el-date-picker					     
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
						<el-button type="warning" icon="el-icon-delete" size="small" @click="excel"  v-has="['export']">自定义日期导出</el-button>
					</li>
				</ul>
			</el-col>
		</el-row>
		<el-row class="Wip_main_table">
			<el-table ref="table_selection" :data="tableData" border highlight-current-row  height="700"
				 style="width: 100%" max-height="720" @selection-change="get_all_id"
				 >
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column property="MoCode" label="生产订单号" width="130" >	
				</el-table-column>
				<el-table-column property="cDepName" label="生产部门" width="120" >
				</el-table-column>
				<el-table-column property="InvCode" label="存货编码" width="130" >
				</el-table-column>
				<el-table-column property="cInvName" label="存货名称"  width="420">
				</el-table-column>
				<el-table-column property="todayStoreNum" label="当日成品入库数"  width="120" align="center" :formatter="(row)=>{if(row.iQuantity && row.iQuantity.indexOf('.')==0){return 0} return parseInt(row.iQuantity)}">
				</el-table-column>
				<el-table-column property="orderNum" label="订单数量"  align="center" :formatter="(row)=>{if(row.Qty && row.Qty.indexOf('.')==0){return 0} return parseInt(row.Qty)}">
				</el-table-column>
				<el-table-column property="totalStoreNum" label="累计入库"  align="center" :formatter="(row)=>{if(row.QualifiedInQty && row.QualifiedInQty.indexOf('.')==0){return 0} return parseInt(row.QualifiedInQty)}">
				</el-table-column>
				<el-table-column property="yrk_qty" label="本次应入库需求" align="center" width="120" :formatter="(row)=>{if(row.yrk_qty && row.yrk_qty.indexOf('.')==0){return 0} return parseInt(row.yrk_qty)}">
				</el-table-column>
				<el-table-column property="BaseQtyN" label="单耗" align="center" :formatter="(row)=>{if(row.BaseQtyN && row.BaseQtyN.indexOf('.')==0){return 0} return parseInt(row.BaseQtyN)}">
				</el-table-column>
				<el-table-column property="dDate" label="日期" width="140" :formatter="dateFormatter">
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
			}
		},
		activated(){
		},
		mounted() {
			
		},
		methods: {
			page_list: function(pagesize, page,user) {
				if(!this.date){this.$message.error('请先选择日期');return false}
				this.api.finance.wip.GetList(pagesize,page,this.moment(this.date).format('YYYY-MM-DD')).then((res) => {
					if(res.data.code==200){
						this.tableData = res.data.data.rows
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
			   this.api.finance.wip.SetAudit(this.selectID).then((res)=>{
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
			   this.api.finance.wip.Export(startDate,endDate).then((res)=>{
				   if(res.data.code==200){
					   this.$refs.excel.percentage=100
					   window.location.href=res.data.data.exportList[0].url
				   }else{
					   this.$message.error(res.data.message)
				   }
			   })
		   }
		},
	}
</script>

<style scoped="scoped">
	.Wip_main {
		height: 100%;
		width: 100%;
		background-color: #fff;

	}

	.Wip_main_head {
		height: 90px;
		padding: 12px 20px;
	}

	.Wip_main_table {
		padding: 0px 20px;
	}

	.Wip_main_head li:not(:first-child) {
		padding: 0 8px;
	}
	
</style>
<style lang="less">
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
</style>
