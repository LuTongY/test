<template>
   <el-container>
       <el-header>
      <vxe-toolbar>
          <template #buttons>
            <vxe-input v-model="searchName" placeholder="搜索"></vxe-input>
            <vxe-button status="primary" @click="page_list"  >搜索</vxe-button>
            <vxe-button v-has="['add']" @click="add">新增</vxe-button>
            <vxe-button v-has="['edit']" @click="edit">修改</vxe-button>
            <vxe-button v-has="['del']" @click="del">删除</vxe-button>
          </template>
        </vxe-toolbar>
          </el-header>
       <el-main>
        <vxe-table
          :data="tableData"
           highlight-current-row
          highlight-hover-row
          height="auto"
           border="full"
          :auto-resize="$store.state.autoResize"
           @cell-click="selectId"
          >
          <vxe-table-column field="name" title="工厂名称" ></vxe-table-column>
          <vxe-table-column field="place" title="地点" ></vxe-table-column>
          <vxe-table-column field="status" title="状态"  ></vxe-table-column>
        </vxe-table>
       </el-main>
      <el-footer>
        <page ref="page_data"  :totalCount="totalCount" />
      </el-footer>
      <add ref='add'  @page_list='page_list'/>
      <edit ref='edit' @page_list='page_list'/>
   </el-container>
</template>


<script>
import page from '@/components/page/page.vue';
import add from './add.vue';
import edit from './edit.vue';
export default {
  name:'Factory',
  components:{
    page,
    add,
    edit,
  },
  data(){
    return{
        auto:true,
        searchName:'',
        totalCount: 0,
        tableData: [],
        select_id:'',
    }
   
  },
  mounted(){
      this.page_list();
  },
   methods:{
       page_list: function() {
         let pagesize=this.$refs.page_data.page_size;
				 let page=this.$refs.page_data.page;
				this.api.production.Factory.GetList(pagesize, page,this.searchName).then((res) => {
					this.tableData = res.data.data.rows
					this.totalCount = parseInt(res.data.data.totalCount)
				})
      },
      selectId:function(item){
				this.select_id=item.row.id
			},
      add:function(){
        console.log('sdaf')
				this.$refs.add.is_show=!this.$refs.add.is_show
				this.$refs.add.title="增加人员"
				this.$refs.add.type="add"
      },
      edit:function(){
        if(!this.select_id){this.$message.error("请先选择工厂"); return false}
        this.$refs.edit.is_show=!this.$refs.edit.is_show;
        this.$refs.edit.select_id=this.select_id;
        this.$refs.edit.title="编辑工厂";
        this.api.production.Factory.EditInfo(this.select_id).then((res)=>{
          if(res.data.code==200){
              this.$refs.edit.roleForm=res.data.data.row;
          }
        })
      },
      	del: function() {
				if(!this.select_id){this.$message.error("请先选择工厂"); return false}
				this.$confirm('此操作将删除该工厂, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {   
					this.api.production.Factory.del(this.select_id).then((res) => {
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
   },
}

</script>
<style lang="less" scoped="scoped">
.el-main{
    padding: 0 20px 20px 20px;
}
</style>