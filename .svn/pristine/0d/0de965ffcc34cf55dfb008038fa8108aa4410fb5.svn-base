<template>
	<div v-dialogdrag>
		<el-dialog title="设置工艺路线" v-model="isShow" width="1200px">
			<el-container>
				<el-main>
					<el-row>
						<el-col>
							<el-alert show-icon title="已生成制造令的订单不能设置工艺路线，如需设置，请先删除制造令" type="warning"
								:closable="false" />
						</el-col>
					</el-row>
					<el-row style="height: 500px; margin-top: 10px;">
						<el-col>
							<vxe-table :data="dataList" highlight-current-row highlight-hover-row height="auto"
								border="full" ref="Add" :auto-resize="$store.state.autoResize" show-overflow resizable>
								<vxe-column field="productNo" title="生产订单号" width="130px"></vxe-column>
								<!-- <vxe-column field="productName" title="成品编码" width="150px"></vxe-column> -->
								<vxe-column field="pInvCode" title="母件编码" width="120px"></vxe-column>
								<vxe-column field="pInvName" title="母件名称" width="150px"></vxe-column>
								<vxe-column field="invCode" title="子件编码" width="120px"></vxe-column>
								<vxe-column field="invName" title="子件名称" width="150px"></vxe-column>
								<!-- 
								<vxe-column field="orderQty" title="订单数量" width="80px" align="right"></vxe-column>
								<vxe-column field="quantity" title="生产数量" width="80px" align="right"></vxe-column>
								-->
								<vxe-column field="routeShow" title="工艺路线" width="280px"></vxe-column>
								<vxe-column field="routeShow" title="操作" width="120px" align="center">
									<template #default="{ row }">
										<el-button size='mini' v-if="!canEdit" disabled>修改</el-button>
										<el-button type="primary" size='mini'
											@click="setRoute(row.invCode, row.routeId)" v-else>修改
										</el-button>
									</template>
								</vxe-column>
							</vxe-table>
						</el-col>
					</el-row>
				</el-main>
			</el-container>
		</el-dialog>
		<task-route-edit ref='taskRouteEdit' @page_list="children_page_list" />
	</div>
</template>
<script>
import taskRouteEdit from "./TaskRouteEdit.vue";
export default {
	name: "TaskRoute",
	components: {
		taskRouteEdit
	},
	data() {
		return {
			scheduleId: 0,
			isShow: false,
			dataList: []
		};
	},
	methods: {
		children_page_list: function () {
			this.api.production.Task.GetScheduleTaskList(this.scheduleId).then(res => {
				if (res.data.code == 200) {
					this.dataList = res.data.data.dataList;
					this.canEdit = res.data.data.canEdit;
					this.isShow = true;
				}
			});
		},
		setRoute(invCode, routeId) {
			this.$refs.taskRouteEdit.scheduleId = this.scheduleId;
			this.$refs.taskRouteEdit.invcode = invCode;
			this.$refs.taskRouteEdit.routeId = routeId.toString();
			this.$refs.taskRouteEdit.children_page_list();
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
