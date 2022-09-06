<template>
	<div v-dialogdrag>
		<el-dialog title="流转卡" v-model="is_show" width="950px" @open="open">
			<el-container>
				<el-header>
					<vxe-toolbar>
						<template #buttons>
							<vxe-button status="primary" @click="printNewCard">打印新卡</vxe-button>
							<vxe-button @click="printOldCard">补打</vxe-button>
						</template>
					</vxe-toolbar>
				</el-header>
				<el-main>
					<el-row style="height: 500px;">
						<el-col>
							<vxe-table :data="tableData" highlight-current-row highlight-hover-row height="auto"
								border="full" ref="logTable" :auto-resize="$store.state.autoResize" show-overflow
								:edit-config="{ trigger: 'click', mode: 'row' }"
								:checkbox-config="{ checkField: 'checked', trigger: 'row', range: true, highlight: true }">
								<vxe-column type="checkbox" width="60" align="center"></vxe-column>
								<!-- <vxe-table-column field="id" title="id" width="60px" align="center" /> -->
								<vxe-table-column field="barcode" title="条码" width="150px" />
								<vxe-table-column field="productNo" title="生产订单号" width="150px" />
								<vxe-table-column field="pInvCode" title="成品编码" width="120px" :visible='false' />
								<vxe-table-column field="pInvName" title="成品名称" min-width="200px" :visible='false' />
								<vxe-table-column field="orderQty" title="订单数量" width="80px" />
								<vxe-table-column field="invCode" title="子件编码" width="120px" :visible='false' />
								<vxe-table-column field="invName" title="子件名称" min-width="320px" :visible='false' />
								<vxe-table-column field="quantity" title="本卡数量" width="80px" />
								<vxe-table-column field="createUser" title="打印人" width="70px" />
								<vxe-table-column field="createTime" title="打印时间" width="170px" />
								<vxe-table-column field="printTimes" title="打印次数" width="80px" />
							</vxe-table>
						</el-col>
						<el-col></el-col>
					</el-row>
				</el-main>
				<el-footer>
					<page ref="sub_page_data" :totalCount="totalCount" @page_list="page_list" />
				</el-footer>
			</el-container>
		</el-dialog>
		<print ref="print" @reload_list="page_list" />
	</div>
</template>
<script>
import page from "@/components/page/page.vue";
import print from "./print.vue";
// import add from "./add.vue";
// import edit from "./edit.vue";
export default {
	components: {
		page,
		print,
		// add,
		// edit,
	},
	data() {
		return {
			is_show: false,
			search: {
				taskId: 0
			},
			totalCount: 0,
			tableData: [],
			select_id: "",
			auto: true
		};
	},
	methods: {
		page_list: function () {
			let pagesize = this.$refs.sub_page_data.page_size;
			let page = this.$refs.sub_page_data.page;
			this.api.production.FlowCard.GetList(pagesize, page, this.search).then(res => {
				if (res.data.code == 200) {
					this.tableData = res.data.data.rows;
					this.totalCount = parseInt(res.data.data.totalCount);
				}
			});
		},
		selectId: function (item) {
			this.select_id = item.row.id;
		},
		printNewCard: function () {
			let taskId = this.search.taskId;
			if (!taskId) {
				this.$message.error("缺少参数");
				return false
			}
			this.$refs.print.PrintShow = true
			this.$refs.print.table = {}
			this.$refs.print.isReprint = false
			this.$refs.print.idKey = "taskId"
			this.api.production.Task.GetPrintData({ "taskId": this.search.taskId }).then(res => {
				if (res.data.code == 200) {
					this.$nextTick(() => {
						this.$refs.print.table = res.data.data;
						this.$refs.print.processListBtn = 'inline'
					})
				}
			})
		},
		printOldCard: function () {
			let data = this.$refs.logTable.getCheckboxRecords();
			if (!data || data.length != 1) {
				this.$message.error("请选择一张流转卡");
				return false
			}
			this.$refs.print.PrintShow = true
			this.$refs.print.processListBtn = "none"
			this.$refs.print.table = {}
			this.$refs.print.isReprint = true
			this.$refs.print.idKey = "id"
			this.api.production.Task.GetPrintData({ "id": data[0].id }).then(res => {
				if (res.data.code == 200) {
					this.$nextTick(() => {
						this.$refs.print.table = res.data.data;
						this.$refs.print.table.iquantity = this.$refs.print.table.quantity;
					})
				}
			})
		},
		submitForm: function () {
			let data = this.$refs.logTable.getCheckboxRecords();
			if (data.length < 1) { this.$message.error("请先选择订单"); return false }
			let ids = [];
			data.forEach((i, v) => {
				let obj = {}
				obj.quantity = i.scheduleQty
				obj.id = i.id
				ids.push(obj)
			});
			this.api.production.Schedule.Add(ids).then(res => {
				if (res.data.code == 200) {
					this.is_show = false;
					this.$message.success(res.data.message)
					this.$emit('page_list')
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

/deep/.el-dialog__body {
	padding: 10px 20px 20px 20px;
}
</style>
