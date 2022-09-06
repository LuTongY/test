<template>
  <el-container>
    <el-header>
      <vxe-toolbar>
        <template #buttons>
          <vxe-input v-model.trim="search.orderNo" placeholder="生产订单号"></vxe-input>
          <vxe-button status="primary" @click="page_list">搜索</vxe-button>
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
        :tree-config="{accordion: lazy,children: 'childData'}"
        :expand-config="{lazy: true, loadMethod: loadContentMethod}"
      >
        <vxe-column type="expand" width="40">
          <template #content="{ row }">
            <vxe-grid
              :columns="row.childCols"
              :data="row.childData"
              :auto-resize="$store.state.autoResize"
              highlight-current-row
              highlight-hover-row
            >
              <template v-slot:status="{ row }">
                <el-button type="danger" round v-if="row.status=='未审核'" size="mini">未审核</el-button>
                <el-button type="warning" round v-else-if="row.status=='锁定'" size="mini">锁定</el-button>
                <el-button type="success" round v-else-if="row.status=='审核'" size="mini">审核</el-button>
                <el-button type="info" round v-else-if="row.status=='关闭'" size="mini">关闭</el-button>
                <el-button type="info" round v-else size="mini">row.status</el-button>
              </template>
            </vxe-grid>
          </template>
        </vxe-column>
        <vxe-table-column field="orderNo" title="生产订单号" min-width="150"></vxe-table-column>
        <vxe-table-column field="createUser" title="创建人" min-width="110" align="center"></vxe-table-column>
        <vxe-table-column field="createTime" title="创建时间" min-width="150" align="center"></vxe-table-column>
        <vxe-table-column field="updateUser" title="更新人" min-width="110" align="center"></vxe-table-column>
        <vxe-table-column field="updateTime" title="更新时间" min-width="150" align="center"></vxe-table-column>
      </vxe-table>
    </el-main>
    <el-footer>
      <page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
    </el-footer>
  </el-container>
</template>
<script>
import page from "@/components/page/page.vue";
import XEUtils from "xe-utils";
import { defineComponent, ref } from "vue";
import { VxeTablePropTypes } from "vxe-table";
export default {
  name: "orderPlan",
  components: {
    page
  },
  data() {
    return {
      lazy: true,
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
      this.api.production.ProductionOrder.GetList(pagesize,page,this.search).then(res => {
        if(res.data.code==200){
          this.tableData = res.data.data.rows;
          this.totalCount = parseInt(res.data.data.totalCount);
        }else{
              this.$message.error(res.data.message);
        }
      });
    },
    selectId: function(item) {
      this.select_id = item.row.id;
    },
    loadContentMethod({ row }) {
      let _this = this;
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          _this.api.production.ProductionOrder.Detail(row.id).then(res => {
            if (res.data.code == 200) {
              row.childCols = [
                {
                  field: "sortSeq",
                  title: "行号",
                  width: "50px",
                  align: "center"
                },
                {
                  field: "invCode",
                  title: "存货编码",
                  width: "190px",
                  align: "center"
                },
                { field: "invName", title: "存货名称", "min-width": "360px" },
                {
                  field: "quantity",
                  title: "数量",
                  width: "120px",
                  align: "center"
                },
                {
                  field: "qualifyQty",
                  title: "入库数量",
                  width: "120px",
                  align: "center"
                },
                {
                  field: "unit",
                  title: "单位",
                  width: "80px",
                  align: "center"
                },
                { field: "whName", title: "仓库名称", width: "230px" },
                {
                  field: "status",
                  title: "状态",
                  width: "90px",
                  align: "center",
                  slots: { default: "status" }
                }
              ];
              row.childData = res.data.data.row.items;
            } else {
              _this.$message.error(res.data.message);
            }
            resolve();
          });
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.el-main {
  padding: 0 20px 20px 20px;
}
</style>