<template>
  <el-container>
    <el-header>
      <vxe-toolbar>
        <template #buttons>
          <vxe-input v-model.trim="search.invCode" placeholder="成品编码"></vxe-input>
          <vxe-input v-model.trim="search.invName" placeholder="成品名称"></vxe-input>
          <vxe-button status="primary" @click="page_list">搜索</vxe-button>
          <vxe-button v-has="['add']" @click="add">新增</vxe-button>
          <vxe-button v-has="['edit']" @click="edit">修改</vxe-button>
          <vxe-button v-has="['del']" @click="del">删除</vxe-button>
        </template>
      </vxe-toolbar>
    </el-header>
    <el-main>
      <vxe-table ref="DataList" :data="tableData" :highlight-current-row="row" :highlight-hover-row="row" height="auto"
        border="full" resizable show-overflow :auto-resize="$store.state.autoResize" @cell-click="selectId"
        header-align='center'
        :checkbox-config="{ checkField: 'checked', trigger: 'row', range: true, highlight: true, }">
        <vxe-column type="checkbox" width="60" align="center"></vxe-column>
        <vxe-table-column field="invCode" title="成品编码" width="130" align="center"></vxe-table-column>
        <vxe-table-column field="invName" title="成品名称" width="250"></vxe-table-column>
        <vxe-table-column field="invStd" title="成品规格" width="180"></vxe-table-column>
        <vxe-table-column field="price" title="包装工价" width="120" align="center"></vxe-table-column>
        <vxe-table-column field="createUser" title="创建人" width="100" align="center"></vxe-table-column>
        <vxe-table-column field="createTime" title="创建时间" width="170" align="center"></vxe-table-column>
        <vxe-table-column field="updateUser" title="更新人" width="100" align="center"></vxe-table-column>
        <vxe-table-column field="updateTime" title="更新时间" width="170" align="center"></vxe-table-column>
      </vxe-table>
    </el-main>
    <el-footer>
      <page ref="page_data" :totalCount="totalCount" @page_list='page_list' />
    </el-footer>
    <add ref='add' @page_list='page_list' />
    <edit ref='edit' @page_list='page_list' />
  </el-container>
</template>


<script>
import page from '@/components/page/page.vue';
import add from './add.vue';
import edit from './edit.vue';
export default {
  name: 'PackPrice',
  components: {
    page,
    add,
    edit,
  },
  data() {
    return {
      row: true,
      search: {},
      totalCount: 0,
      tableData: [],
      typeList: [],
      select_id: '',
    }
  },
  mounted() {
    this.page_list();
  },
  methods: {
    page_list: function () {
      let pagesize = this.$refs.page_data.page_size;
      let page = this.$refs.page_data.page;
      this.api.production.PackPrice.GetList(pagesize, page, this.search).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.rows
          this.totalCount = parseInt(res.data.data.totalCount)
          this.typeList = res.data.data.typeList
        }
      })
    },
    selectId: function (item) {
      this.select_id = item.row.id
    },
    add: function () {
      this.$refs.add.is_show = !this.$refs.add.is_show
      this.$refs.add.dataList = [];
    },
    edit: function () {
      let data = this.$refs.DataList.getCheckboxRecords();
      if (data.length != 1) {
        this.$message.error("请选择一条数据");
        return false;
      }
      let id = data[0].id;
      this.$refs.edit.form = {}
      this.$refs.edit.is_show = !this.$refs.edit.is_show;
      this.api.production.PackPrice.EditInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.$refs.edit.form = res.data.data.row;
        }
      })
    },
    del: function () {
      let data = this.$refs.DataList.getCheckboxRecords();
      if (data.length < 1) {
        this.$message.error("请先选择数据");
        return false;
      }
      let ids = [];
      data.forEach((i, v) => {
        ids.push(i.id);
      });
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.api.production.PackPrice.del(ids).then((res) => {
          if (res.data.code == 200) {
            this.$message.success("删除成功");
          }
          this.page_list();
        })
      })
    }
  },
}

</script>
<style lang="less" scoped="scoped">
.el-main {
  padding: 0 20px 20px 20px;
}

.vxe-input {
  margin-right: 18px;
}
</style>