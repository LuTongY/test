<template>
  <el-container>
    <el-header>
      <vxe-toolbar>
        <template #buttons>
          <vxe-button status="primary" v-has="['add']" @click="add">新增</vxe-button>
          <vxe-button v-has="['edit']" @click="edit">修改</vxe-button>
          <vxe-button v-has="['delete']" @click="del">删除</vxe-button>
        </template>
      </vxe-toolbar>
    </el-header>
    <el-main>
      <vxe-table :data="tableData" highlight-current-row highlight-hover-row height="auto" border="full" ref="Recruiter"
        :auto-resize="$store.state.autoResize" @cell-click="selectId"
        :checkbox-config="{ checkField: 'checked', trigger: 'row', range: true, highlight: true, }">
        <vxe-column type="checkbox" width="60" align="center"></vxe-column>
        <vxe-table-column field="staffNo" title="工号" width="150px"></vxe-table-column>
        <vxe-table-column field="name" title="招聘人员" width="120px"></vxe-table-column>
        <vxe-table-column field="createUser" title="创建人" width="180px"></vxe-table-column>
        <vxe-table-column field="createTime" title="创建日期" width="220px"></vxe-table-column>
      </vxe-table>
    </el-main>
    <el-footer>
      <page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
    </el-footer>
    <add ref='add' @page_list="page_list" />
  </el-container>

</template>
<script>
import page from "@/components/page/page.vue";
import add from "./add.vue";
export default {
  name: "recruiter",
  components: {
    page,
    add,
  },
  data() {
    return {
      search: {},
      totalCount: 0,
      tableData: [],
      select_id: "",
      auto: true,
      option: {}
    };
  },
  mounted() {
    this.page_list();
  },
  methods: {
    page_list: function () {
      let pagesize = this.$refs.page_data.page_size;
      let page = this.$refs.page_data.page;
      this.api.hr.Recruiter.GetList(
        pagesize,
        page,
        this.search
      ).then(res => {
        this.tableData = res.data.data.rows;
        this.totalCount = parseInt(res.data.data.totalCount);
      });
    },
    selectId: function (item) {
      this.select_id = item.row.id;
    },
    add: function () {
      this.$refs.add.is_show = !this.$refs.add.is_show;
      this.$refs.add.options = this.option
      this.$refs.add.Form = {};
      this.api.hr.Recruiter.EditInfo(0).then((res) => {
        if (res.data.code == 200) {
          this.$refs.add.options.users = res.data.data.users
        } else {
          this.$message.error("获取数据失败")
        }
      })
    },
    del: function () {
      let data = this.$refs.Recruiter.getCheckboxRecords();
      if (data.length < 1) { this.$message.error("请先选择数据"); return false }
      let ids = [];
      data.forEach((i, v) => { ids.push(i.id) });
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.api.hr.Recruiter.del(ids).then(res => {
          this.page_list();
          this.$message.success("删除成功");
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
