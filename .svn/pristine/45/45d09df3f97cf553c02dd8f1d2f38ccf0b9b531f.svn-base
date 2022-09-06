<template>
	<el-container>
		<el-header>
			<vxe-toolbar ref="WageToolbar" custom print export>
				<template #buttons>
					<el-row>
						<vxe-button status="primary" @click="searchDate">查询</vxe-button>
						<vxe-button @click="DownExcel">导出</vxe-button>
						<title-date ref="TitleDate" @page_list="page_list" v-model:Pdata="search.date" days="M"
							format="YYYY-MM" type='month' />
					</el-row>
				</template>
			</vxe-toolbar>
		</el-header>
		<el-main>
			<vxe-table :data="tableData" highlight-current-row highlight-hover-row height="auto" border="full"
				ref="Wage" show-footer show-footer-overflow show-overflow :footer-method="GetfooterData"
				:print-config="{}" :auto-resize="$store.state.autoResize">
				<vxe-table-column field="month" title="月份" width="130px" align="center"></vxe-table-column>
				<vxe-table-column field="staffNo" title="包装人员工号" width="120px"></vxe-table-column>
				<vxe-table-column field="staffName" title="包装人员姓名" width="120px"></vxe-table-column>
				<vxe-table-column field="workcenterName" title="工作中心" width="150px"></vxe-table-column>
				<vxe-table-column field="totalPrice" title="工资" width="100px" align="right"></vxe-table-column>
			</vxe-table>
		</el-main>
		<el-footer>
			<page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
		</el-footer>
		<Search-Dialog width="600px" title="查询" ref="search" @page_list="page_list">
			<el-form label-width="120px">
				<el-form-item label="包装人员工号">
					<vxe-input v-model="search.staffNo"></vxe-input>
				</el-form-item>
				<el-form-item label="包装人员姓名">
					<vxe-input v-model="search.staffName"></vxe-input>
				</el-form-item>
				<el-form-item label="工作中心">
					<vxe-input v-model="search.workcenterName"></vxe-input>
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
	name: "PackWageStat",
	components: {
		page,
		TitleDate,
		SearchDialog,
	},
	data() {
		return {
			search: {
				date: this.moment().format("YYYY-MM")
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
			this.$refs.Wage.connect(this.$refs.WageToolbar)
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
			this.api.finance.PackWage.GetStatList(pagesize, page, this.search).then(res => {
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
			this.api.finance.PackWage.ExportStatList(this.search).then(res => {
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
