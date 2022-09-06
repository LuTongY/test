<template>
  <el-container>
    <el-header>
      <vxe-toolbar>
        <template #buttons>
          <vxe-input v-model="search.name" placeholder="搜索"></vxe-input>
          <vxe-button status="primary" @click="page_list">搜索</vxe-button>
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
        ref="Team"
        :auto-resize="$store.state.autoResize"
        @cell-click="selectId"
        :checkbox-config="{checkField: 'checked', trigger: 'row',range: true,highlight: true,}"
      >
        <vxe-column type="checkbox" width="60" align="center"></vxe-column>
        <vxe-table-column field="rowNum" title="序号" width="80px" align="center"></vxe-table-column>
        <vxe-table-column field="name" title="班组名称"></vxe-table-column>
        <vxe-table-column field="leader" title="组长"></vxe-table-column>
        <vxe-table-column field="workshop" title="车间"></vxe-table-column>
        <vxe-table-column field="creatUser" title="创建人"></vxe-table-column>
        <vxe-table-column field="creatTime" title="创建时间"></vxe-table-column>
        <vxe-table-column    field="auditStatus" title="状态" width="130" align="center">
           <template #default="{ row }">
                 <el-button type="success"  size='mini' v-if="row.status=='正常'">{{row.status}}</el-button>
                 <el-button type="danger"   size='mini' v-else >{{row.status}}</el-button>
            </template>
           </vxe-table-column>
      </vxe-table>
    </el-main>
    <el-footer>
      <page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
    </el-footer>
    <add ref="add" @page_list="page_list" />
    <edit ref="edit" @page_list="page_list" />
  </el-container>
</template>
<script>
import page from "@/components/page/page.vue";
import add from "./add.vue";
import edit from "./edit.vue";
export default {
  name: "Team",
  components: {
    page,
    add,
    edit,
  },
  data() {
    return {
      search: {},
      totalCount: 0,
      tableData: [],
      select_id: "",
      auto: true
    };
  },
  mounted() {
    this.page_list();
  },
  methods: {
    page_list: function() {
      let pagesize = this.$refs.page_data.page_size;
      let page = this.$refs.page_data.page;
      this.api.production.Team.GetList(pagesize, page, this.search).then(
        res => {
          this.tableData = res.data.data.rows;
          this.totalCount = parseInt(res.data.data.totalCount);
        }
      );
    },
    selectId: function(item) {
      this.select_id = item.row.id;
    },
    add: function() {
        this.$refs.edit.form={}
        this.$refs.edit.options={}
      this.api.production.Team.EditInfo().then((res)=>{
            this.$refs.add.options=res.data.data
      })
      this.$refs.add.is_show = !this.$refs.add.is_show;
    },
     edit:function(){
         let len = this.$refs.Team.getCheckboxRecords();
          this.$refs.edit.is_show=!this.$refs.edit.is_show;
      if (len.length > 1) {this.$message.error("修改只能单选");return false;}
        this.api.production.Team.EditInfo(this.select_id).then((res)=>{
          if(res.data.code==200){
           
              this.$refs.edit.form=res.data.data.row
              this.$refs.edit.options=res.data.data
              this.$refs.edit.form.id=this.select_id
              this.$refs.edit.form.workshopId=String(this.$refs.edit.form.workshopId)
          }
        })
      },
    del: function() {
      let data = this.$refs.Team.getCheckboxRecords();
      if (data.length < 1) {
        this.$message.error("请先选择人员工序");
        return false;
      }
      let ids = [];
      data.forEach((i, v) => {
        ids.push(i.id);
      });
      this.$confirm("此操作将删除该人员工序, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.api.production.Team.del(ids).then(res => {
          if(res.data.code==200){
             this.page_list();
             this.$message.success("删除成功");
          }else{
             this.$message.error(res.data.message);
          }
            
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
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
</style>