<template>
	<el-container>
		<el-header>
			<vxe-toolbar ref="TaskToolbar" custom print export>
				<template #buttons>
					<vxe-input v-model.trim="search.productNo" placeholder="生产订单号"></vxe-input>
					<vxe-input v-model.trim="search.invName" placeholder="子件名称"></vxe-input>
					<vxe-button status="primary" @click="page_list">搜索</vxe-button>
					<vxe-button v-has="['print']" @click="GetFlowcard">流转卡</vxe-button>
				</template>
			</vxe-toolbar>
		</el-header>
		<el-main>
			<vxe-table :data="tableData" highlight-current-row highlight-hover-row height="auto" border="full"
				ref="Task" :print-config="{}" resizable show-overflow
				:expand-config="{ lazy: true, loadMethod: loadContentMethod }" :auto-resize="$store.state.autoResize"
				:radio-config="{ labelField: 'name', trigger: 'row' }"
				:tree-config="{ transform: true }">
				<vxe-column type="expand" width="40">
					<template #content="{ row }">
						<vxe-grid :columns="row.childCols" :data="row.childData" :auto-resize="$store.state.autoResize"
							highlight-current-row highlight-hover-row></vxe-grid>
					</template>
				</vxe-column>
				<vxe-column type="radio" title="操作" width="50" align="center"></vxe-column>
				<vxe-table-column field="id" title="ID" width="80px" align="center"></vxe-table-column>
				<vxe-table-column field="productNo" title="生产订单号" width="150px"></vxe-table-column>
				<vxe-table-column field="pInvCode" title="成品编码" width="120px"></vxe-table-column>
				<vxe-table-column field="pInvName" title="成品名称"></vxe-table-column>
				<vxe-table-column field="planQty" title="成品数量" width="100px"></vxe-table-column>
				<vxe-table-column field="invCode" title="子件编码" width="120px"></vxe-table-column>
				<vxe-table-column field="invName" title="子件名称"></vxe-table-column>
				<vxe-table-column field="quantity" title="子件数量" width="100px"></vxe-table-column>
				<vxe-table-column field="routeShow" title="工序" width="180px"></vxe-table-column>
				<vxe-table-column field="packDate" title="包装日期" width="120px"></vxe-table-column>
				<vxe-table-column field="status" title="状态" align="center" fixed="right" width="90px">
					<template #default="{ row }">
						<el-button type="success" size='mini' v-if="row.status == '已生成'">{{ row.status }}</el-button>
						<el-button type="warning" size='mini' v-else>{{ row.status }}</el-button>
					</template>
				</vxe-table-column>
			</vxe-table>
		</el-main>
		<el-footer>
			<page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
		</el-footer>
		<card-log ref="flowCardLog" />
	</el-container>

</template>
<script>
import page from "@/components/page/page.vue";
import cardLog from "../FlowCard/log.vue";
export default {
	name: "Task",
	components: {
		page,
		cardLog
	},
	data() {
		return {
			search: {},
			totalCount: 0,
			tableData: [],
			select_id: "",
			auto: true,
			lazy: true,
		};
	},
	mounted() {
		this.page_list();
	},
	created() {
		this.$nextTick(() => {
			// 手动将表格和工具栏进行关联
			this.$refs.Task.connect(this.$refs.TaskToolbar)
		})
	},
	methods: {
		page_list: function () {
			let pagesize = this.$refs.page_data.page_size;
			let page = this.$refs.page_data.page;
			this.api.production.Task.GetList(pagesize, page, this.search).then(res => {
				if (res.data.code == 200) {
					this.tableData = res.data.data.rows;
					this.totalCount = parseInt(res.data.data.totalCount);
				} else {
					this.$message.error(res.data.message)
				}

			});
		},
		GetFlowcard: function () {
			let data = this.$refs.Task.getRadioRecord();
			if (!data) {
				this.$message.error("请选择订单");
				return false;
			}
			this.$refs.flowCardLog.tableData = []
			this.$refs.flowCardLog.is_show = true
			this.$refs.flowCardLog.search.taskId = data.id;
			this.$nextTick(() => {
				this.$refs.flowCardLog.page_list();
			})
		},
		selectId: function (item) {
			this.select_id = item.row.id;
		},
		add: function () {
			this.$refs.add.is_show = !this.$refs.add.is_show;
			this.$refs.add.addForm.name = '';
		},
		edit: function () {
			let data = this.$refs.Task.getCheckboxRecords();
			if (data.length < 1) {
				this.$message.error("请先选择工艺");
				return false
			} else if (data.length > 1) {
				this.$message.error("修改只能单选");
				return false
			}
			this.api.production.Task.EditInfo(data[0].id).then((res) => {
				if (res.data.code == 200) {
					this.$refs.edit.is_show = !this.$refs.edit.is_show;
					this.$refs.edit.addForm = res.data.data.row
				}
			})
		},
		del: function () {
			let data = this.$refs.Task.getCheckboxRecords();
			if (data.length < 1) {
				this.$message.error("请先选择工艺");
				return false
			}
			let ids = [];
			data.forEach((i, v) => {
				ids.push(i.id)
			});
			this.$confirm("此操作将删除该工艺, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				this.api.production.Task.del(ids).then(res => {
					this.page_list();
					this.$message.success("删除成功");
				});
			});
		},
		loadContentMethod({ row }) {
			let _this = this;
			return new Promise(function (resolve, reject) {
				setTimeout(function () {
					_this.api.production.Task.GetProcessList(row.id).then(res => {
						if (res.data.code == 200) {
							row.childCols = [
								{ field: "processId", title: "工序ID", width: "80px", align: "center" },
								{ field: "processName", title: "工序名称", width: "230px" },
								{ field: "workshopName", title: "所属车间", width: "150px" },
								{ field: "produceDate", title: "开工日期", width: "150px" },
								{ field: "assignStatusName", title: "派工状态", width: "150px" },
								{ field: "reportStatusName", title: "报工状态", width: "150px" },
							];
							row.childData = res.data.data.dataList;
						}
						resolve();
					});
				});
			});
		}
	}
};
</script>
<style lang="less" scoped="scoped">
.el-main {
	padding: 0 20px 20px 20px;
}

.vxe-input {
	margin-right: 8px;
}
</style>
