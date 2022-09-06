<template>
  <el-container>
    <el-header>
      <vxe-toolbar ref="ReportDailyTimeTableToolbar" custom print export>
		  <template #buttons>
		  </template>
      </vxe-toolbar>
    </el-header>
    <el-main>
     <vxe-table
     :data="tableData"
     highlight-current-row
     highlight-hover-row
     border="full"
     ref="ReportDailyTimeTable"
     :print-config="{}"
     :auto-resize="$store.state.autoResize">
     	 <vxe-column field="orderNo" title="生产订单号"  width="140px"></vxe-column>
		 <vxe-column field="productName" title="成品名称"  width="230px"></vxe-column>
     	 <vxe-column field="orderQty" title="成品数量"  width="130px"></vxe-column>
     	 <vxe-column field="invCode" title="物料编码"     width="140px" ></vxe-column>
     	 <vxe-column field="invName" title="物料名称"      min-width="280px"></vxe-column>
     	 <vxe-column field="processName" title="工序名称"      width="150px"></vxe-column>
     	  <vxe-column field="componentQty" title="订单部件需加工数量" width="180px"></vxe-column>	
     	 <vxe-column field="usageQty" title="报工数量"     width="120px" ></vxe-column>
     </vxe-table>
    </el-main>
  </el-container>
 
</template>
<script>
export default {
  name: "ReportDailyTimeTable",
  props:{
	  tableData:{
	  	// type:'Array',
	  	default:[],
	  }
  },
  data() {
    return {
      auto: true
    };
  },
created () {
           this.$nextTick(() => {this.$refs.ReportDailyTimeTable.connect(this.$refs.ReportDailyTimeTableToolbar)})
            },
  mounted() {
   
  },
  methods: {
    
  }
};
</script>
<style lang="less" scoped="scoped">
.el-main {
  padding: 0 20px 20px 20px;
}
</style>