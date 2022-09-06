<template>
	<el-container>
		<el-header>
			<vxe-toolbar ref="RequisitionToolbar" custom print>
				<template #buttons>
					<vxe-button status="primary" @click="searchDate">查询</vxe-button>
					<vxe-button  @click="Export">导出</vxe-button>
				</template>
			</vxe-toolbar>
		</el-header>
		<el-main>
			<vxe-table 
			:data="tableData" 
			highlight-current-row 
			highlight-hover-row 
			height="auto" 
			border="full"
			show-overflow
			ref="Requisition" 
			:print-config="{}" 
			:auto-resize="$store.state.autoResize">
				<vxe-table-column field="cSoCode" title="销售订单" width="110px"></vxe-table-column>
				<vxe-table-column field="SoSeq" title="行号" width="50px" align="center"></vxe-table-column>
				<vxe-table-column field="cg_name" title="采购员" width="80px"></vxe-table-column>
				<vxe-table-column field="status" title="状态" width="110px"></vxe-table-column>
				<vxe-table-column field="shdz" title="送货地址" width="180px"></vxe-table-column>
				<vxe-table-column field="xl" title="系列" width="80px"></vxe-table-column>
				<vxe-table-column field="cCode" title="请购单号" width="110px"></vxe-table-column>
				<vxe-table-column field="cInvCName" title="分类" width="90px"></vxe-table-column>
				<vxe-table-column field="cInvCode" title="存货编码" width="120px"></vxe-table-column>
				<vxe-table-column field="cInvName" title="存货名称" width="230px"></vxe-table-column>
				<vxe-table-column field="cComUnitName" title="单位" width="50px"></vxe-table-column>			
				<vxe-table-column field="fQuantity" title="请购数量" width="100px" :formatter="({cellValue})=>{return T.floatRow(cellValue)}" ></vxe-table-column>
				<vxe-table-column field="dRequirDate" title="需求日期" width="80px"></vxe-table-column>
				<vxe-table-column field="DueDate" title="锁定日期" width="80px"></vxe-table-column>
				<vxe-table-column field="strContractID" title="合同号" width="120px"></vxe-table-column>
				<vxe-table-column field="cVenName" title="供应商" width="180px"></vxe-table-column>
				<vxe-table-column field="cPOID" title="采购订单" width="110px"></vxe-table-column>
				<vxe-table-column field="freceivedqty" title="采购数量" width="110px" :formatter="({cellValue})=>{return T.floatRow(cellValue)}" ></vxe-table-column>
				<vxe-table-column field="updateUser" title="入库" width="90px" :formatter="({cellValue})=>{return T.floatRow(cellValue)}"></vxe-table-column>
				<vxe-table-column field="nQty" title="未入" width="90px" :formatter="({cellValue})=>{return T.floatRow(cellValue)}"></vxe-table-column>
				<vxe-table-column field="cAuditDate" title="请购单审核" width="120px"></vxe-table-column>
			</vxe-table>
		</el-main>
		<el-footer>
			<page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
		</el-footer>
		<search ref="search" @page_list="page_list" />
	</el-container>

</template>
<script>
	import page from "@/components/page/page.vue";
	import search from "./search.vue";
	export default {
		name: "Requisition",
		components: {
			page,
			search,
		},
		data() {
			return {
				totalCount: 0,
				tableData: [],
				select_id: "",
				auto: true
			};
		},
		created() {
			this.$nextTick(() => {
				this.$refs.Requisition.connect(this.$refs.RequisitionToolbar)
			})
		},
		mounted() {
			this.page_list();
		},
		methods: {
			searchDate:function(){
				this.$refs.search.SelectShow=true;
			},
			page_list: function() {
				let pagesize = this.$refs.page_data.page_size;
				let page = this.$refs.page_data.page;
				this.api.purchase.Requisition.GetList(
					pagesize,
					page,
					this.$refs.search.form
				).then(res => {
					if (res.data.code == 200) {
						this.tableData = res.data.data.rows;
						this.totalCount = parseInt(res.data.data.totalCount);
						this.$refs.search.SelectShow=false;
					}

				});
			},
			Export:function(){
				this.api.purchase.Requisition.Export(this.$refs.search.form).then((res)=>{
					if (res.data.code == 200) {
						 window.location.href=res.data.data.exportList[0].url
					}
				})
			}
		}
	};
</script>
<style lang="less" scoped="scoped">
	.el-main {
		padding: 0 20px 20px 20px;
	}
</style>
