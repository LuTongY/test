<template>
  <el-container>
    <el-header>
      <vxe-toolbar ref="ReportToolbar" custom print export>
        <template #buttons>
				<vxe-button @click="searchDate"  status="primary" >查询</vxe-button>
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
        ref="Report"
		keep-source
		show-overflow
        :print-config="{}"
        :auto-resize="$store.state.autoResize"
      >
        <vxe-column field="id" title="流转卡ID"  align="center" width="80px"></vxe-column>
		<vxe-column field="taskId" title="制造令ID"  align="center" width="80px"></vxe-column>
		<vxe-column field="productNo" title="生产订单号"  align="center" width="140px"></vxe-column>
		<vxe-column field="pInvCode" title="成品编码"   width="120px"></vxe-column>
        <vxe-column field="pInvName" title="成品名称"  min-width="280px"></vxe-column>
		<vxe-column field="invCode" title="子件编码"   width="120px"></vxe-column>
		<vxe-column field="invName" title="子件名称"  min-width="280px"></vxe-column>
        <vxe-column field="quantity" title="本卡数量"  width="120px"></vxe-column>
		<vxe-column  title="状态[点击报工]"  width="120px" fixed="right"  align="center">
			<template #default="{ row }">
				<el-button   size='mini'  v-if="row.reportStatus==0"  @click="GetInfo(row.id)">未报工</el-button>
				<el-button type="danger"  size='mini' v-else="row.reportStatus==1" @click="GetInfo(row.id)">已完成报工</el-button>
			</template>
		</vxe-column>
      </vxe-table>
    </el-main>
    <el-footer>
      <page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
    </el-footer>
	<Transfer-Card-Reporting @page_list="page_list" ref='TransferCardReporting' @GetInfo='GetInfo'/>
	<search ref='search' @page_list="page_list" class="search">
		<el-form label-width="120px">
			<el-form-item label="流转卡ID">
				<vxe-input v-model="search.id"></vxe-input>
			</el-form-item>
			<el-form-item label="制造令ID">
				<vxe-input v-model="search.taskId"></vxe-input>
			</el-form-item>
			<el-form-item label="生产订单号">
				<vxe-input v-model="search.productNo"></vxe-input>
			</el-form-item>
			<el-form-item label="成品名称">
				<vxe-input v-model="search.pInvName"></vxe-input>
			</el-form-item>
			<el-form-item label="子件名称">
				<vxe-input v-model="search.invName"></vxe-input>
			</el-form-item>	
		</el-form>
	</search>
  </el-container>
 
</template>
<script>
import page from "@/components/page/page.vue";
import TransferCardReporting from "./TransferCardReporting";
import search from "@/components/TitleSearch/TitleSearch.vue";
export default {
  name: "Report",
  components: {
    page,
	TransferCardReporting,
	search,
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
created () {
           this.$nextTick(() => {this.$refs.Report.connect(this.$refs.ReportToolbar)})
            },
  mounted() {
    this.page_list();
  },
  methods: {
	  searchDate:function(){
	  	this.$refs.search.SelectShow=true;
	  },
    page_list: function() {
      let pagesize = this.$refs.page_data.page_size;
      let page = this.$refs.page_data.page;
      this.api.production.Report.GetList(pagesize,page,this.search).then(res => {
        if(res.data.code==200){
              this.tableData = res.data.data.rows;
              this.totalCount = parseInt(res.data.data.totalCount);
        }
      });
    },
    GetInfo:function(id){
	  this.$refs.TransferCardReporting.is_show=true;
	  this.$refs.TransferCardReporting.id=id;
	  this.$refs.TransferCardReporting.initialize();
	  this.api.production.Report.GetInfo(id).then(res=>{
		  if(res.data.code==200){  
			 this.$refs.TransferCardReporting.getData=res.data.data
		  }
	     })
     }
  }
};
</script>
<style lang="less" scoped="scoped">
.el-main {
  padding: 0 20px 20px 20px;
}
/deep/.search .vxe-input--inner{
	width: 360px;
}
</style>
