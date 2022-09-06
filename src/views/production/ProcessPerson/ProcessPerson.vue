<template>
  <el-container>
    <el-header>
      <vxe-toolbar>
        <template #buttons>
          <vxe-input v-model="search.staffName" placeholder="姓名"></vxe-input>
          <vxe-input v-model="search.processName" placeholder="工序" style="margin-left:8px"></vxe-input>
          <vxe-button status="primary" @click="page_list">搜索</vxe-button>
          <vxe-button v-has="['add']" @click="add">新增</vxe-button>
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
        ref="ProcessPerson"
        border="full"
        :auto-resize="$store.state.autoResize"
        @cell-click="selectId"
        :checkbox-config="{checkField: 'checked', trigger: 'row',range: true,highlight: true,}"
      >
        <vxe-column type="checkbox" width="60" align="center"></vxe-column>
        <vxe-table-column field="staffNo" title="人员编码" width="120"></vxe-table-column>
        <vxe-table-column field="staffName" title="人员名称" width="150"></vxe-table-column>
        <vxe-table-column field="processName" title="工序" width="240"></vxe-table-column>
        <vxe-table-column field="updateTime" title="维护时间" width="260"></vxe-table-column>
        <vxe-table-column field="updateUser" title="维护人" width="120"></vxe-table-column>
      </vxe-table>
    </el-main>
    <el-footer>
      <page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
    </el-footer>
    <add ref="add" @page_list="page_list" />
  </el-container>
</template>


<script>
import page from "@/components/page/page.vue";
import add from "./add.vue";
export default {
  name: "ProcessPerson",
  components: {
    page,
    add
  },
  data() {
    return {
      search: { staffName: "", processName: "" },
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
      this.api.production.ProcessPerson.GetList(
        pagesize,
        page,
        this.search
      ).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.rows;
          this.totalCount = parseInt(res.data.data.totalCount);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    selectId: function(item) {
      this.select_id = item.row.id;
    },
    add: function() {
      this.$refs.add.is_show = !this.$refs.add.is_show;
      this.api.production.ProcessPerson.EditInfo().then(res => {
        if (res.data.code == 200) {
          this.$refs.add.options.processList = res.data.data.processList;
          this.$refs.add.options.user = res.data.data.staffs;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    del: function() {
      let data = this.$refs.ProcessPerson.getCheckboxRecords();
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
        this.api.production.ProcessPerson.del(ids).then(res => {
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