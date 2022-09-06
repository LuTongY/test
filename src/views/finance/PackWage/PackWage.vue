<template>
	<el-container>
		<el-header>
			<vxe-toolbar ref="WagesToolbar" custom print export>
				<template #buttons>
					<el-row>
						<vxe-button status="primary" @click="searchDate">查询</vxe-button>
						<vxe-button @click="DownExcel">导出</vxe-button>
						<title-date ref="TitleDate" @page_list="page_list" v-model:Pdata="search.month" days="M"
							format="YYYY-MM" type='month' />
					</el-row>
				</template>
			</vxe-toolbar>
		</el-header>
		<el-main>
			<vxe-table :data="tableData" highlight-current-row highlight-hover-row height="auto" border="full"
				ref="Wages" show-footer show-footer-overflow show-overflow :footer-method="GetfooterData"
				:print-config="{}" :auto-resize="$store.state.autoResize">
				<vxe-table-column field="productNo" title="生产订单号" width="140px"></vxe-table-column>
				<vxe-table-column field="productCode" title="成品编码" width="130px"></vxe-table-column>
				<vxe-table-column field="productName" title="成品名称" width="150px"></vxe-table-column>
				<vxe-table-column field="invCode" title="物料编码" width="130px"></vxe-table-column>
				<vxe-table-column field="invName" title="物料名称"></vxe-table-column>
				<vxe-table-column field="staffNo" title="包装人员工号" width="120px" align="center"></vxe-table-column>
				<vxe-table-column field="staffName" title="包装人员姓名" width="120px" align="center"></vxe-table-column>
				<vxe-table-column field="quantity" title="派工数量" width="80px" align="right"></vxe-table-column>
				<vxe-table-column field="price" title="单价" width="85px" align="right"></vxe-table-column>
				<vxe-table-column field="sumPrice" title="包装工资" width="85px" align="right"></vxe-table-column>
				<vxe-table-column field="produceDate" title="包装日期" width="120px" align="center"></vxe-table-column>
			</vxe-table>
		</el-main>
		<el-footer>
			<page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
		</el-footer>
		<Search-Dialog width="600px" title="查询" ref="search" @page_list="page_list">
			<el-form label-width="120px">
				<el-form-item label="生产订单号">
					<vxe-input v-model="search.productNo"></vxe-input>
				</el-form-item>
				<el-form-item label="成品编码">
					<vxe-input v-model="search.productCode"></vxe-input>
				</el-form-item>
				<el-form-item label="成品名称">
					<vxe-input v-model="search.productName"></vxe-input>
				</el-form-item>
				<el-form-item label="物料编码">
					<vxe-input v-model="search.invCode"></vxe-input>
				</el-form-item>
				<el-form-item label="物料名称">
					<vxe-input v-model="search.invName"></vxe-input>
				</el-form-item>
				<el-form-item label="员工工号">
					<vxe-input v-model="search.staffNo"></vxe-input>
				</el-form-item>
				<el-form-item label="员工姓名">
					<vxe-input v-model="search.staffName"></vxe-input>
				</el-form-item>
				<el-form-item label="派工日期">
					<vxe-input v-model="search.produceDate"></vxe-input>
				</el-form-item>
			</el-form>
		</Search-Dialog>
	</el-container>

</template>
<script>
import page from "@/components/page/page.vue";
import TitleDate from "@/components/TitleDate/TitleDate.vue"
import SearchDialog from "@/components/TitleSearch/TitleSearch.vue";
export default {
	name: "PackWage",
	components: {
		page,
		TitleDate,
		SearchDialog,
	},
	data() {
		return {
			search: {
				month: this.moment().format("YYYY-MM")
			},
			totalCount: 0,
			tableData: [],
			select_id: "",
			auto: true,
			footerSumName: ['totalPrice'],
		};
	},
	created() {
		this.$nextTick(() => {
			this.$refs.Wages.connect(this.$refs.WagesToolbar)
		})
	},
	mounted() {
		this.page_list();
	},
	methods: {
		searchDate: function () {
			this.$refs.search.SelectShow = true;
		},
		page_list: function () {
			let pagesize = this.$refs.page_data.page_size;
			let page = this.$refs.page_data.page;
			this.api.finance.PackWage.GetDetailList(pagesize, page, this.search).then(res => {
				if (res.data.code == 200) {
					this.tableData = res.data.data.rows;
					this.totalCount = parseInt(res.data.data.totalCount);
				} else {
					this.$message.error(res.data.message)
				}

			});
		},
		GetfooterData: function ({ columns, data }) {
			this.footerData = []
			let sumObj = {}
			let arr = []
			for (let i = 0; i < this.footerSumName.length; i++) {
				sumObj[this.footerSumName[i]] = 0;
			}
			data.forEach((item, index) => {
				for (let obj in sumObj) {
					if (!isNaN(item[obj]) && item.hasOwnProperty(obj)) {
						sumObj[obj] += parseFloat(item[obj])
					}
				}
			})
			columns.forEach((item, index) => {
				if (index == 0) {
					arr.push('合计')
				} else if (this.footerSumName.indexOf(item.property) > -1) {
					arr.push(sumObj[item.property].toFixed(4))
				} else {
					arr.push("-")
				}
			})
			this.footerData.push(arr)
			return this.footerData
		},
		DownExcel: function () {
			this.api.finance.PackWage.ExportDetailList(this.search).then(res => {
				if (res.data.code == 200) {
					this.$message.success(res.data.message)
					window.location.href = res.data.data.exportList[0].url
				} else {
					this.$message.error(res.data.message)
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
