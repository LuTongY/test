<template>
	<div v-dialogdrag>
		<el-dialog title="修改工艺路线" v-model="isShow" width="900px">
			<el-container>
				<el-main>
					<el-row style="height: 300px;">
						<el-col>
							<vxe-table :data="dataList" highlight-current-row highlight-hover-row height="auto"
								border="full" ref="TaskRouteEditForm" :auto-resize="$store.state.autoResize"
								show-overflow resizable :span-method="colspanMethod" :radio-config="{ trigger: 'row' }">
								<vxe-column type="radio" width="50" align="center"></vxe-column>
								<vxe-column field="materialCode" title="物料编码" width="120px"></vxe-column>
								<vxe-column field="name" title="物料名称" width="200px"></vxe-column>
								<vxe-column field="routeShow" title="工艺路线" width="320px"></vxe-column>
								<vxe-column field="version" title="版本号" width="80px" align="center"></vxe-column>
							</vxe-table>
						</el-col>
					</el-row>
				</el-main>
				<el-footer>
					<el-row>
						<el-col :span="24">
							<el-button type="primary" @click="submitForm" style="float: right;">确认</el-button>
						</el-col>
					</el-row>
				</el-footer>
			</el-container>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: "TaskRouteEdit",
	components: {

	},
	data() {
		return {
			isShow: false,
			scheduleId: 0,
			invcode: '',
			routeId: 0,
			dataList: []
		};
	},
	methods: {
		children_page_list: function () {
			let search = {
				materialCode: this.invcode,
				auditStatus: 1
			};
			this.api.production.ProcessRoute.GetList(100, 1, search).then(res => {
				if (res.data.code == 200) {
					let dataList = res.data.data.rows;
					dataList.push({
						id: 0,
						materialCode: '不使用工艺路线'
					});
					let checkedIndex = 0;
					for(let i in dataList) {
						if(dataList[i].id == this.routeId) {
							checkedIndex = i;
						}
					}
					this.dataList = dataList;
					this.isShow = true;
					let that = this;
					this.$nextTick(() => {
						this.$refs.TaskRouteEditForm.setRadioRow(this.dataList[checkedIndex])
					})
				}
			});
		},
		colspanMethod({ _rowIndex, columnIndex }) {
			if (_rowIndex == this.dataList.length - 1) {
				if (columnIndex === 1) {
					return { rowspan: 1, colspan: 4 }
				}
			}
		},
		submitForm() {
			let data = this.$refs.TaskRouteEditForm.getRadioRecord();
			if (!data) {
				this.$message.error("请选择订单");
				return false;
			}
			this.api.production.Schedule.SetTaskRoute(this.scheduleId, this.invcode, data.id).then(res => {
				if (res.data.code == 200) {
					this.$message.success(res.data.message);
					this.$emit('page_list');
					this.isShow = false;
				}
			});
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
