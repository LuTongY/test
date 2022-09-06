<template>
<div  v-dialogdrag>
<el-dialog
	title="沟通记录"
	v-model="is_show"
	width="800px"
	>
	<el-container >
		<el-header>
			<vxe-toolbar>
				<template #buttons>
					<vxe-button status="primary" @click="save(false)">添加</vxe-button>
					<vxe-button status="default" @click="save(true)">修改</vxe-button>
					<vxe-button status="default" @click="del">删除</vxe-button>
				</template>
			</vxe-toolbar>
		</el-header>
		<el-main v-if="is_show">
			<el-row style="height: 500px;">
				<el-col >
					<vxe-table 
						:data="tableData" 
						highlight-current-row 
						highlight-hover-row 
						height="auto" 
						border="full" 
						ref="DataList2"
						:auto-resize="$store.state.autoResize" 
						:edit-config="{trigger: 'click', mode: 'cell'}"
						:checkbox-config="{checkField: 'checked', trigger: 'row',range: true,highlight: true}">
						<vxe-column type="checkbox" width="40" align="center"></vxe-column>
						<vxe-column field="contactTime" title="沟通时间" width="150px"></vxe-column>
						<vxe-column field="type" title="类别" width="60px" align="center"></vxe-column>
						<vxe-column field="duration" title="时长(分钟)" align="right" width="90px"></vxe-column>
						<vxe-column field="pictures"  title="截图凭证" width="120px">
							<template #default="{ row }">
								<a :href="item" target="_blank" v-for="(item,key) in row.pictures.split(';')" :key="key" v-if="row.pictures">
									<img :src="item" width="20" height="30" class="pic-list-item"/>
								</a>
							</template>
						</vxe-column>
						<vxe-column field="remark" title="沟通结果"></vxe-column>
					</vxe-table>
				</el-col>
				<el-col></el-col>
			</el-row>
		</el-main>
		<contactLogSave ref="contactLogSave" @page_list="children_page_list" />
	</el-container>
</el-dialog>
</div>
</template>
<script>
	import page from "@/components/page/page.vue";
	import contactLogSave from "@/views/hr/candidate/contactLogSave.vue";
	export default {
		components: {
			page,
			contactLogSave,
		},
		data() {
			return {
				is_show:false,
				candidateId:0,
				search: {},
				totalCount: 0,
				tableData: [],
				select_id: "",
				auto: true
			};
		},
		mounted() {
		},
		methods: {
			children_page_list: function() {
				this.api.hr.Candidate.GetContactList(
					this.candidateId,
					this.search
				).then(res => {
					this.tableData = res.data.data || [];
					this.totalCount = parseInt(res.data.data.length);
				});
			},
			selectId: function(item) {
				this.select_id = item.row.id;
			},
			save: function (isEdit) {
				let id = 0;
				let data = this.$refs.DataList2.getCheckboxRecords();
				if(isEdit) {
					if (data.length < 1) {
						this.$message.error("请先选择数据");
						return false;
					} else if (data.length > 1) {
						this.$message.error("修改只能选择一条数据");
						return false;
					}
					id = data[0].id;
				}
				this.api.hr.Candidate.EditContactInfo(this.candidateId,id).then((res) => {
					if (res.data.code == 200) {
						var row = res.data.data.row;
						row.type = row.type.toString();
						row.pictures = row.pictures ? row.pictures.split(';') : [];
						this.$refs.contactLogSave.is_edit = id ? true:false;
						this.$refs.contactLogSave.is_show = !this.$refs.contactLogSave.is_show;
						this.$refs.contactLogSave.candidateId = this.candidateId;
						this.$refs.contactLogSave.logSaveForm = row;
						this.$refs.contactLogSave.typeOption = res.data.data.typeOption;
					}
				});
			},
			del: function () {
				let data = this.$refs.DataList2.getCheckboxRecords();
				if (data.length < 1) {
					this.$message.error("请先选择数据");
					return false;
				}
				let ids = [];
				data.forEach((i, v) => {
					ids.push(i.id);
				});
				this.$confirm("确定要删除吗?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}).then(() => {
					this.api.hr.Candidate.DelContact(this.candidateId,ids).then((res) => {
						if(res.data.code == 200) {
							this.$message.success("删除成功");
						}
						this.children_page_list();
					});
				});
			},
		}
	};
</script>
<style lang="less" scoped="scoped">
	.el-main {
		padding: 0 20px 20px 20px;
	}
	/deep/.el-dialog__body{
		padding: 10px 20px 20px 20px;
	}
	.pic-list-item{
		border: 1px solid #bbb;
		margin: 2px 3px 2px 0;
		cursor:pointer;
	}
	
</style>