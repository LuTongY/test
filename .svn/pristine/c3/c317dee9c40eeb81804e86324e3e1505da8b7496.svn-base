<!-- title:用户列表
   auth:路通
   data:2021-07-15 -->
<template>
	  <el-container>
       <el-header>
      <vxe-toolbar>
          <template #buttons>
            <vxe-input v-model="user" placeholder="搜索"></vxe-input>
            <vxe-button status="primary" @click="page_list()"  >搜索</vxe-button>
            <vxe-button v-has="['add']" @click="isAddShow">新增</vxe-button>
            <vxe-button v-has="['edit']" @click="edit">修改</vxe-button>
            <vxe-button v-has="['del']" @click="del">删除</vxe-button>
			<vxe-button v-has="['auth']" @click="is_tree">权限</vxe-button>
          </template>
        </vxe-toolbar>
          </el-header>
       <el-main>
        <vxe-table
          :data="tableData"
           highlight-current-row
          highlight-hover-row
		  ref="singleTable"
          height="auto"
		   border="full"
		  :auto-resize="$store.state.autoResize"
           @cell-click="selectId"
          >
          <vxe-table-column field="username" title="工号" width="120"></vxe-table-column>
          <vxe-table-column field="trueName" title="姓名" width="120"></vxe-table-column>
          <vxe-table-column field="department" title="部门"  ></vxe-table-column>
		  <vxe-table-column field="jobName" title="岗位"  ></vxe-table-column>
		  <vxe-table-column field="sex" title="性别"  width="60"></vxe-table-column>
		  <vxe-table-column field="lastLoginTime" title="最后一次登录时间"  ></vxe-table-column>
		  <vxe-table-column field="lastLoginIp" title="最后一次登录IP"  ></vxe-table-column>
		  <vxe-table-column field="status" title="账户状态"  ></vxe-table-column>
        </vxe-table>		
       </el-main>
      <el-footer>
        <page ref="page_data"  :totalCount="totalCount" @page_list='page_list'/>
      </el-footer>
   </el-container>
</template>
<script>
	import page from '@/components/page/page.vue'
	export default {
		name: "dingding_userList",
		components: {
			page,
		},
		data() {
			return {
				api:this.api.system.dingding_userList,
				user: '',
				totalCount: 0,
				tableData: [],
				currentRow: null,
				select_id:'',
				auto:true
			}
		},
		// activated(){
		// 	this.page_list();
		// },
		mounted() {
			this.page_list();
		},
		methods: {
			page_list: function() {
				let pagesize=this.$refs.page_data.page_size;
				let page=this.$refs.page_data.page;
				this.api.GetList(pagesize,page,this.user).then((res) => {
					this.tableData = res.data.data.rows
					this.totalCount = parseInt(res.data.data.totalCount)
				})
			},
			setCurrent: function(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange: function(val) {
				this.currentRow = val;
			},
			isAddShow:function(){
				this.$refs.add.is_show=!this.$refs.add.is_show
				this.$refs.add.title="增加人员"
				this.$refs.add.type="add"
				this.$refs.add.get_info();
			},
			selectId:function(item){
				this.select_id=item.row.id
			},
			del: function() {
				if(!this.select_id){this.$message.error("请先选择人员"); return false}
				this.$confirm('此操作将删除该账户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {   
					this.api.user_list.delete(this.select_id).then((res) => {
						this.page_list()
						this.$message.success('删除成功')
						this.select_id='';
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
			
				})
			},
		   edit:function(){
			   if(!this.select_id){this.$message.error("请先选择人员");return false}
			   this.$refs.add.is_show=!this.$refs.add.is_show
			   this.$refs.add.title="修改人员资料"
			   this.$refs.add.type="edit"
			   this.$refs.add.addForm.id=this.select_id;
			   this.$refs.add.get_info(this.select_id);
		   },
		   is_tree:function(){
			   if(!this.select_id){this.$message.error("请先选择人员");return false}
			   this.$refs.tree.is_tree_show=!this.$refs.tree.is_tree_show
			   this.$refs.tree.get_auth(this.select_id)
		   }
		},
	}
</script>
<style scoped="scoped">
	.user_main {
		height: 100%;
		width: 100%;
		background-color: #fff;
	}
	.user_main_head {
		height: 90px;
		padding: 12px 20px;
	}

	.user_main_table {
		padding: 0px 20px;
	}

	.user_main_head li:not(:first-child) {
		padding: 0 8px;
	}
	.el-main{
    padding: 0 20px 20px 20px;
}
</style>
<style>
	.el-button--primary {
		background-color: #1D94FA;
		border-color: #1D94FA;
	}

	.el-button--danger {
		color: #fff;
		background-color: #ff4d4f;
		border-color: #ff4d4f;
	}
</style>
