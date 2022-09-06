<template>
	 <el-container>
       <el-header>
      <vxe-toolbar>
          <template #buttons>
            <vxe-button v-has="['add']" @click="add_role">添加角色</vxe-button>
            <vxe-button v-has="['edit']" @click="edit">修改</vxe-button>
            <vxe-button v-has="['del']" @click="del">删除</vxe-button>
			<vxe-button v-has="['auth']" @click="auth">权限</vxe-button>
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
		  <vxe-table-column field="id" title="id" width="60"></vxe-table-column>
          <vxe-table-column field="roleName" title="角色名称" width="260"></vxe-table-column>
        </vxe-table>	
       </el-main>
      <el-footer>
        <page ref="page_data"  :totalCount="totalCount" @page_list='page_list'/>
      </el-footer>
        <add ref='add'  @page_list='page_list'/>
	<edit ref='edit'/>
	<auth ref='auth'    :select_id="selectID" />
   </el-container>
</template>
<script>
	import page from '@/components/page/page.vue'
	import add from './add.vue'
	import edit from './edit.vue'
	import auth from './auth.vue'
	export default {
		name: "role",
		components: {
			page,
			edit,
			add,
			auth,
		},
		data() {
			return {
				user: '',
				totalCount: 0,
				tableData: [],
				currentRow: null,
				selectID:'',
				selectName:'',
			}
		},
		activated(){
			// this.page_list();
		},
		mounted() {
			this.page_list();
		},
		methods: {
			page_list: function() {
					let pagesize=this.$refs.page_data.page_size;
				    let page=this.$refs.page_data.page;
				this.api.user_role.get_GetList(pagesize,page,this.user).then((res) => {
					this.tableData = res.data.data.roles.rows
					this.totalCount = parseInt(res.data.data.roles.totalCount)
				})
			},
			setCurrent: function(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange: function(val) {
				this.currentRow = val;
			},
			add_role:function(){
				this.$refs.add.roleForm.role_name='';
				this.$refs.add.is_show=!this.$refs.add.is_show;
			},
			edit:function(){
				if(!this.selectID){this.$message.error("请先选择角色"); return false}
				this.$refs.edit.roleForm.role_name=this.selectName;
				this.$refs.edit.is_show=!this.$refs.edit.is_show
				
			},
			selectId:function(item){
				this.selectName=item.row.roleName
				this.selectID=item.row.id
				this.$refs.edit.id=item.row.id
			},
			del: function() {
				if(!this.selectID){this.$message.error("请先选择角色"); return false}
				this.$confirm('此操作将删除此角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
                   
					this.api.user_role.delete(this.selectID).then((res) => {
						this.page_list()
						this.$message.success('删除成功')
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
			
				})
			},
			auth:function(){
				if(!this.selectID){this.$message.error("请先选择角色"); return false}
				this.$refs.auth.id=this.selectID
				this.$refs.auth.is_tree_show=!this.$refs.auth.is_tree_show
				this.$refs.auth.get_auth(this.selectID);
			}
		},
	}
</script>
<style scoped="scoped">
	.role_main {
		height: 100%;
		width: 100%;
		background-color: #fff;

	}

	.role_main_head {
		height: 90px;
		padding: 12px 20px;
	}

	.role_main_table {
		padding: 0px 20px;
	}

	.role_main_head li:not(:first-child) {
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
