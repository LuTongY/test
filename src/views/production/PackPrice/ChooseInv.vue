<template>
  <div v-dialogdrag>
    <el-dialog v-model="is_show" width="700px" title="选择成品" destroy-on-close top='7vh'>
      <el-row>
        <el-container>
          <el-header style="min-width:auto;">
            <vxe-toolbar>
              <template #buttons>
                <vxe-input v-model="search.code" placeholder="成品编码"></vxe-input>
                <vxe-input v-model="search.name" placeholder="成品名称" style="margin-left: 15px;"></vxe-input>
                <vxe-button status="primary" @click="page_list">搜索</vxe-button>
              </template>
            </vxe-toolbar>
          </el-header>
          <el-main>
            <vxe-table ref="inventory" :data="dataList" height="490" border="full" show-overflow header-align="center"
              highlight-hover-row highlight-current-row
              :checkbox-config="{ checkField: 'checked', trigger: 'row', range: true, highlight: true, }">
              <vxe-column type="checkbox" width="50" align="center"></vxe-column>
              <vxe-table-column field="code" title="成品编码" width="140" align="center"></vxe-table-column>
              <vxe-table-column field="name" title="成品名称" align="left"></vxe-table-column>
              <vxe-table-column field="standard" title="成品规格" align="left"></vxe-table-column>
            </vxe-table>
          </el-main>
          <el-footer>
            <page ref="pageNav" :totalCount="totalCount" @page_list="page_list" />
          </el-footer>
        </el-container>
      </el-row>
      <div style="height:40px;margin-top:8px">
        <el-button type="primary" @click="submitForm()" style="float:right;margin:0 8px">确认</el-button>
        <el-button @click="is_show = false" style="float:right">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import page from "@/components/page/page.vue";
export default {
  components: {
    page
  },
  data() {
    return {
      is_show: false,
      search: {},
      dataList: [],
      totalCount: 0,
    };
  },
  mounted() {
    // this.page_list();
  },
  methods: {
    page_list() {
      let pagesize = this.$refs.pageNav.page_size;
      let page = this.$refs.pageNav.page;
      this.$refs.pageNav.layout = "total,  pager, next";
      this.api.production.PackPrice.GetMaterialList(
        pagesize,
        page,
        this.search
      ).then(res => {
        if (res.data.code == 200) {
          this.dataList = res.data.data.rows;
          this.totalCount = parseInt(res.data.data.totalCount);
        }
      });
    },
    submitForm() {
      let data = this.$refs.inventory.getCheckboxRecords();
      if (data.length <= 0) {
        this.$message.error("请选择数据");
        return false;
      }
      let array = [];
      data.forEach((i, v) => {
        array.push({
          invCode: i.code,
          invName: i.name,
          invStd: i.standard,
        });
      })
      this.$emit('callback', array);
      this.is_show = false;
    },
  }
};
</script>
<style lang='less' scoped="scoped">
.el-main {
  padding-top: 0;
  padding-bottom: 5px;
}

.el-footer {
  height: 35px;
  overflow: hidden;
}

#searchInv {
  border-right: 1px solid #ccc;
  margin-right: 20px;
}

#pipeInfo .el-form-item {
  margin-bottom: 10px;
}

/deep/ #pipeInfo .el-form-item__error {
  padding-top: 0;
}

.w_px_320 {
  width: 320px;
}
</style>