<template>
	<el-container>
		<el-header>
			<vxe-toolbar ref="TaskPipeToolbar" custom print export>
				<template #buttons>
					<vxe-button status="primary" @click="popSearch">查询</vxe-button>
					<vxe-button v-has="['add']" @click="add">添加</vxe-button>
					<vxe-button v-has="['edit']" @click="edit">修改</vxe-button>
					<vxe-button v-has="['delete']" @click="del">删除</vxe-button>
				</template>
			</vxe-toolbar>
		</el-header>
		<el-main>
			<vxe-table :data="tableData" highlight-current-row highlight-hover-row height="auto" keep-source
				border="full" :print-config="{}" show-overflow
				:edit-config="{ trigger: 'click', mode: 'cell', showStatus: true, icon: 'fa fa-pencil' }"
				ref="TaskPipe" :auto-resize="$store.state.autoResize" resizable show-footer
				:checkbox-config="{ checkField: 'checked', trigger: 'row', range: true, highlight: true, }">
				<vxe-column type="checkbox" width="60" align="center"></vxe-column>
				<vxe-column field="produceDate" title="排程日期" width="90px" align="center"></vxe-column>
				<vxe-column field="workcenterName" title="工作中心" width="90px" align="center"></vxe-column>
				<vxe-column field="machineName" title="机台" width="110px" align="center"></vxe-column>
				<vxe-column field="productNo" title="生产订单号" width="140px"></vxe-column>
				<vxe-column field="productName" title="成品名称" width="200px"></vxe-column>
				<vxe-column field="invCode" title="物料编码" width="120px"></vxe-column>
				<vxe-column field="invName" title="物料名称" width="180px"></vxe-column>
				<vxe-column field="standard" title="规格" width="90px" align="center"></vxe-column>
				<vxe-column field="type" title="形状" width="70px" align="center"></vxe-column>
				<vxe-column field="length" title="长管管长" width="80px" align="right"></vxe-column>
				<vxe-column field="diameter" title="长管管径" width="80px" align="right"></vxe-column>
				<vxe-column field="thickness" title="长管管厚" width="80px" align="right"></vxe-column>
				<vxe-column field="pitchNumber" title="短管节数" width="80px" align="right"></vxe-column>
				<vxe-column field="shortLength" title="短管长度" width="80px" align="right"></vxe-column>
				<vxe-column field="quantity" title="加工数量(短管)" width="120px" align="right"></vxe-column>
				<vxe-column field="createUser" title="排程人员" width="80px" align="center"></vxe-column>
				<vxe-column field="createTime" title="添加时间" width="180px" align="center"></vxe-column>
			</vxe-table>
		</el-main>
		<el-footer>
			<page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
		</el-footer>
		<add ref='add' @page_list="page_list" />
		<edit ref='edit' @page_list="page_list" />

		<div v-dialogdrag v-if="searchShow">
			<el-dialog title='查询' v-model="searchShow" width="600px">
				<el-form :model="search" ref="searchForm" label-width="120px" class="demo-ruleForm">
					<el-form-item label="排程日期">
						<el-date-picker v-model="search.produceDate" type="daterange" range-separator="至"
							start-placeholder="开始日期" end-placeholder="结束日期" size="medium" format="YYYY-MM-DD"
							value-format="YYYY-MM-DD" />
					</el-form-item>
					<el-form-item label="生产订单号">
						<vxe-input v-model.trim="search.productNo" placeholder="生产订单号"></vxe-input>
					</el-form-item>
					<el-form-item label="成品名称">
						<vxe-input v-model.trim="search.productName" placeholder="成品名称"></vxe-input>
					</el-form-item>
					<el-form-item label="形状">
						<el-radio-group v-model="search.type">
							<el-radio label="">全部</el-radio>
							<el-radio :label="index" v-for="(item, index) in types" :key="index">{{ item }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>
				<p style="text-align: center;">
					<el-button type="primary" icon="el-icon-search" class="load_bt" @click="doSearch">查询</el-button>
				</p>
			</el-dialog>

		</div>
	</el-container>

</template>
<script>
import page from "@/components/page/page.vue";
import add from "./TaskPipeAdd.vue";
import edit from "./TaskPipeEdit.vue";
export default {
	name: "TaskPipe",
	components: {
		page,
		add,
		edit,
	},
	data() {
		return {
			totalCount: 0,
			tableData: [],
			types: [],
			select_id: "",
			auto: true,
			footerData: [],
			footerSumName: ['quantity', 'qualifiedQty'], //需要合计的列
			searchShow: false,
			search: {}
		};
	},
	mounted() {
		this.page_list();
	},
	created() {
		this.$nextTick(() => {
			// 手动将表格和工具栏进行关联
			this.$refs.TaskPipe.connect(this.$refs.TaskPipeToolbar)
		})
	},
	methods: {
		popSearch: function () {
			this.searchShow = true;
		},
		doSearch: function () {
			this.searchShow = !this.searchShow;
			this.page_list()
		},
		page_list: function () {
			let pagesize = this.$refs.page_data.page_size;
			let page = this.$refs.page_data.page;
			this.api.production.TaskPipe.GetList(pagesize, page, this.search).then(res => {
				if (res.data.code == 200) {
					this.tableData = res.data.data.rows;
					this.types = res.data.data.types;
					this.totalCount = parseInt(res.data.data.totalCount);
				}
			});
		},
		add: function () {
			this.$refs.add.is_show = !this.$refs.add.is_show;
			this.$refs.add.resetData();
			this.$refs.add.init();
		},
		edit: function () {
			let data = this.$refs.TaskPipe.getCheckboxRecords();
			if (data.length < 1) {
				this.$message.error("请选择数据");
				return false
			}
			let arr = [];
			for (let i in data) {
				if (data[i].id) {
					arr.push(data[i].id);
				}
			}
			this.$refs.edit.form.id = arr;
			this.$refs.edit.is_show = !this.$refs.edit.is_show;
			this.$refs.edit.init();
		},
		del: function () {
			let data = this.$refs.TaskPipe.getCheckboxRecords();
			if (data.length < 1) {
				this.$message.error("请选择数据");
				return false
			}
			let ids = [];
			data.forEach((i, v) => {
				ids.push(i.id)
			});
			this.$confirm("此操作将删除改排成, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				this.api.production.TaskPipe.Delete(ids).then(res => {
					if (res.data.code == 200) {
						this.$message.success(res.data.message);
						this.page_list()
					}
				});
			});
		},
	},
};
</script>
<style lang="less" scoped="scoped">
.el-main {
	padding: 0 20px 20px 20px;
}
</style>
