<template>
	<el-container style="padding: 15px;min-height: 800px;">
		<el-aside width="550px" style="background: #ccc;overflow: hidden;">
			<el-row style="height: 52px;">
				<el-col>
					<vxe-toolbar perfect>
						<template #buttons>
							<vxe-button type="text" icon="vxe-icon--search" content="查看" @click="searchShow">
							</vxe-button>
						</template>
					</vxe-toolbar>
				</el-col>
			</el-row>
			<el-row style="height: calc(100% - 52px);">
				<el-col>
					<vxe-table highlight-current-row highlight-hover-row resizable show-overflow height="auto"
						:auto-resize="$store.state.autoResize" ref="treeData" border="full" @cell-click="cellClickEvent"
						:tree-config="{lazy: true, children: 'children', hasChild: 'hasChild', loadMethod: loadChildrenMethod,line: false}"
						:data="treeData">
						<vxe-column field="inv_code" title="物料编码" tree-node width="200"></vxe-column>
						<vxe-column field="inv_name" title="物料名称"></vxe-column>
					</vxe-table>
				</el-col>
			</el-row>
		</el-aside>
		<el-main style="margin: 0 10px;border: 1px solid #E8EAEC;padding: 0;min-width: 1018px;min-height: 780px;">
			<el-row style="min-width: 1018px;">
				<el-col style="background-color:#f8f8f9;text-align: center;padding: 15px 0;">
					<div style="position: absolute;">
						<template v-if="tableHeader.status && tableHeader.status=='审核'">
							<i class="fa fa-check-circle-o fa-lg"
								style="color:#5EB703 ;margin-left:8px;margin-right: 5px;"></i>
							<span style="color:#5EB703">{{tableHeader.status?tableHeader.status:''}}</span>
						</template>
						<template v-else-if="tableHeader.status && tableHeader.status !='审核'">
							<i class="fa fa-times-circle-o fa-lg"
								style="color:red ;margin-left:8px;margin-right: 5px;"></i>
							<span style="color:red">{{tableHeader.status?tableHeader.status:''}}</span>
						</template>
						<template v-else>
							<span style="color:red">{{tableHeader.status?tableHeader.status:''}}</span>
						</template>

					</div>
					<span style="font-size: 18px;font-weight: 500;font-family:'微软雅黑'">物料清单全阶维护</span>
				</el-col>
			</el-row>
			<el-row>
				<el-row>
					<el-form :inline="true" :model="tableHeader" class="demo-form-inline" size="mini">

						<el-form-item label="母件编码">
							<el-input v-model="tableHeader.invCode" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="母件名称">
							<el-input v-model="tableHeader.invName" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="规格型号">
							<el-input v-model="tableHeader.invStd" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="计量单位">
							<el-input v-model="tableHeader.unit" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="版本代号">
							<el-input v-model="tableHeader.version" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="版本说明">
							<el-input v-model="tableHeader.versionDesc" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="版本日期">
							<el-input v-model="tableHeader.versionEffDate" :disabled="true"></el-input>
						</el-form-item>

						<el-form-item label="BOM类别">
							<el-input v-model="tableHeader.versionDesc" :disabled="true"></el-input>
						</el-form-item>
					</el-form>
				</el-row>
			</el-row>
			<el-row style="margin-top: 5px;height: calc(100% - 200px);">
				<el-col :span="24" style="padding: 3px;">
					<vxe-table :data="componentsTable" resizable show-overflow highlight-current-row highlight-hover-row
						height="auto" border="full" :auto-resize="$store.state.autoResize">
						<vxe-column type="seq" width="50" align="center" title="序号"></vxe-column>
						<vxe-column field="invCode" title="子件编码" width="110"></vxe-column>
						<vxe-column field="invName" title="子件名称"></vxe-column>
						<vxe-column field="invStd" title="子件规格" width="100"></vxe-column>
						<!-- <vxe-column field="auxBaseQtyN" title="辅助基本用量" width="120"></vxe-column> -->
						<vxe-column field="unit" title="计量单位" width="80"></vxe-column>
						<vxe-column field="baseQtyN" title="基本用量" width="80"></vxe-column>
						<vxe-column field="baseQtyD" title="基础用量" width="80"></vxe-column>
						<vxe-column field="scrap" title="子件损耗率%" width="105"></vxe-column>	
						<vxe-column field="effBeginDate" title="生效日期" width="100"></vxe-column>
						<vxe-column field="effEndDate" title="失效日期" width="100"></vxe-column>
					</vxe-table>
				</el-col>
			</el-row>
			<el-row class="footer">
				<el-form :inline="true" :model="tableHeader" class="demo-form-inline" size="mini">
					<el-form-item label="建档人">
						<el-input v-model="tableHeader.createUser" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="建档时间">
						<el-input v-model="tableHeader.createTime" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="审核人">
						<el-input v-model="tableHeader.verifyUser" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="审核时间">
						<el-input v-model="tableHeader.verifyTime" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="修改人">
						<el-input v-model="tableHeader.updateUser" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="修改时间">
						<el-input v-model="tableHeader.updateTime" :disabled="true"></el-input>
					</el-form-item>
				</el-form>
			</el-row>
		</el-main>
		<search ref='search' @page_list='page_list' />
	</el-container>
</template>
<script>
	import search from './search.vue'
	export default {
		name: "bom",
		components: {
			search,
		},
		data() {
			return {
				componentsTable: [],
				tableHeader: {},
				treeData: [],
				childs: '',
			}
		},
		mounted() {},
		methods: {
			page_list: function(type, callbackSome) {
				this.api.production.bom.GetList(this.$refs.search.searchForm).then(res => {
					if (res.data.data.bomList.length < 1) {
						this.$message.error("未查询到数据");
					} else if (res.data.code == 200 && res.data.data.bomList) {
						let data
						data = [res.data.data.bomList];
						data[0].children.forEach((i, v) => {
							i.hasChild = true
						})
						this.treeData = data
						this.$refs.search.is_show = !this.$refs.search.is_show
					} else {
						this.$message.error(res.data.message);
					}
				});

			},
			cellClickEvent: function(row) {
				this.api.production.bom.GetInfo(row.row.inv_code).then(res => {
					if (res.data.code == 200) {
						this.tableHeader = res.data.data.bomInfo ? res.data.data.bomInfo : {}
						this.componentsTable = res.data.data.components
					} else {
						this.$message.error(res.data.message);
					}
				})
			},
			loadChildrenMethod({
				row
			}) {
				// 异步加载子节点
				return new Promise(resolve => {
					setTimeout(() => {
						const childs = this.api.production.bom.GetList({
							'invcode': row.inv_code,
							'date': this.$refs.search.searchForm.date
						}).then(res => {
							let data = []
							if (res.data.code == 200) {
								if (res.data.data.bomList && res.data.data.bomList.children) {
									data = res.data.data.bomList.children;
								}
								if (data.length == 0) {
									row.hasChild = false
								}
								if (data.length > 0) {
									data.forEach((i, v) => {
										i.hasChild = true
									})
								}

								return data
							} else {
								this.$message.error(res.data.message);
							}
						})
						resolve(childs)
					}, 0)
				})
			},
			searchShow: function() {
				this.$refs.search.searchForm = {};
				this.$refs.search.is_show = !this.$refs.search.is_show;
			}
		},
	}
</script>
<style lang='less' scoped>
	/deep/.el-container {
		padding: 5px 20px;
	}

	.el-form-item {
		margin: 3px;
	}

	/deep/.el-input.is-disabled .el-input__inner {
		color: #868687;
	}

	@media screen and (max-height: 930px) {
		.footer /deep/ {
			display: none;
		}
	}
</style>
