<template>
  <el-container>
    <el-header>
      <vxe-toolbar>
        <template #buttons>
          <vxe-input v-model="search.orderNo" placeholder="销售订单号"></vxe-input>
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
            <vxe-grid show-overflow :columns="row.childCols" :data="row.childData" :auto-resize="$store.state.autoResize"  highlight-current-row highlight-hover-row></vxe-grid>
          </template>
        </vxe-column>
        <vxe-table-column field="orderNo" title="销售订单号" width="150" ></vxe-table-column>
        <vxe-table-column field="customer" title="客户名称"  min-width="300"></vxe-table-column>
        <vxe-table-column field="currency" title="币种" width="80" align="center" ></vxe-table-column>
        <vxe-table-column field="exchRate" title="汇率" width="80" align="center"></vxe-table-column>
        <vxe-table-column field="maker" title="制单人" width="120" align="center"></vxe-table-column>
        <vxe-table-column field="changer" title="修改人" width="120" align="center"></vxe-table-column>
        <vxe-table-column field="verifier" title="审核人" width="120" align="center"></vxe-table-column>
        <vxe-table-column field="closer" title="关闭人" width="120" align="center" ></vxe-table-column>
        <vxe-table-column field="createTime" title="单据日期" width="140" align="center"></vxe-table-column>
        <vxe-table-column
          field="status"
          title="状态"
          align="center"
          width="100"
        >
        <template #default="{ row }">
                   <el-button type="danger" round  v-if="row.status=='关闭'" size="mini">关闭</el-button>
                   <el-button type="success" round v-else-if="row.status=='审核'" size="mini">审核</el-button>
                   <el-button type="warning" round    v-else size="mini">{{row.status}}</el-button>
        </template>
        </vxe-table-column>
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
  name: "SaleOrder",
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
      auto: true,
      childTable: {}
    };
  },
  mounted() {
    this.page_list();
  },
  methods: {
    page_list: function() {
      let pagesize = this.$refs.page_data.page_size;
      let page = this.$refs.page_data.page;
      this.api.production.SaleOrder.GetList(pagesize, page, this.search).then(
        res => {
          this.tableData = res.data.data.rows;
          this.totalCount = parseInt(res.data.data.totalCount);
        }
      );
    },
    selectId: function(item) {
      this.select_id = item.row.id;
    },
    loadContentMethod({ row }) {
      let _this = this;
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          _this.api.production.SaleOrder.Detail(row.id).then(res => {
            if (res.data.code == 200) {
              row.childCols = [
                { field: "sortSeq", title: "行号", width: "50px",align:"center" },
                { field: "invCode", title: "存货编码" },
                { field: "invName", title: "存货名称" },
                { field: "invStd", title: "规格" },
                { field: "quantity", title: "数量" ,width: "90px",align:"center"},
                { field: "unit", title: "单位", width: "50px",align:"center"},
                { field: "unitPrice", title: "原币无税单价",width: "110px",align:"center" },
                { field: "taxUnitPrice", title: "原币含税单价",width: "110px",align:"center" },
                { field: "price", title: "原币无税金额",width: "120px",align:"center" },
                { field: "taxPrice", title: "原币价税合计",width: "120px",align:"center" },
                { field: "tax", title: "原币价税额",width: "120px",align:"center" },
                { field: "preSendDate", title: "预发货日期",width: "120px",align:"center" },
                { field: "contractNo", title: "合同号" },
                { field: "closer", title: "关闭人",width: "90px",align:"center" }
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