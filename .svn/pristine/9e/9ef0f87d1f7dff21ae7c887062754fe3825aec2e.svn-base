<template>
  <el-container>
    <el-header>
      <vxe-toolbar>
        <template #buttons>
          <vxe-input v-model="search.name" placeholder="搜索"></vxe-input>
          <vxe-button status="primary" @click="page_list">搜索</vxe-button>
            
             <vxe-button @click="print(0)">打印</vxe-button>
             <vxe-button @click="print(1)">预览</vxe-button>
            <vxe-button @click="print(2)">预览</vxe-button>
            <vxe-button @click="print(3)">预览</vxe-button>
			
        </template>
      </vxe-toolbar>
    </el-header>
    <el-main>
        <print id="printMe" /> 
      <vxe-table  
        :data="tableData"
        highlight-current-row
        highlight-hover-row
        height="auto"
        border="full"
        :auto-resize="$store.state.autoResize"
        @cell-click="selectId"
      >
        <vxe-table-column field="name" title="工厂名称"></vxe-table-column>
      </vxe-table> 
    </el-main>
    <el-footer>
      <page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
    </el-footer>
  </el-container>
</template>

 
<script>
import { getLodop } from '@/components/js/LodopFuncs.js'
import page from "@/components/page/page.vue";
import print from "./print";


export default {
  name: "metalsProductionOrder",
  components: {
    page,
    print,
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
    // this.page_list();
  },
  methods: {
    page_list: function() {
      let pagesize = this.$refs.page_data.page_size;
      let page = this.$refs.page_data.page;
      this.api.production.Workshop.GetList(
        pagesize,
        page,
        this.searchName
      ).then(res => {
        this.tableData = res.data.data.rows;
        this.totalCount = parseInt(res.data.data.totalCount);
      });
    },
    selectId: function(item) {
      this.select_id = item.row.id;
    },
    add: function() {
      this.$refs.add.is_show = !this.$refs.add.is_show;
    },
    del: function() {
      if (!this.select_id) {
        this.message.error("请先选择XXX");
        return false;
      }
      this.confirm("此操作将删除XXX, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.api.production.Workshop.del(this.select_id).then(res => {
          this.page_list();
          this.message.success("删除成功");
        });
      });
    },
    print(s){
        this.CreateOneFormPage();
     if (s == 0) {
        LODOP.PRINT() //直接打印
      }
      if (s == 1) {
        LODOP.PREVIEW() //打印预览
      }
        if (s == 2) {
        LODOP.PRINT_SETUP() //打印维护
      }
      if (s == 3) {
        LODOP.PRINT_DESIGN() //打印设计
      }
    },
    CreateOneFormPage(){
        LODOP=getLodop()
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0,"A5");
        LODOP.ADD_PRINT_HTM(0,0,"100%","100%",document.getElementById("printMe").innerHTML);
    }
  }
};
</script>
<style lang="less" scoped="scoped">
.el-main {
  padding: 0 20px 20px 20px;
}
</style>