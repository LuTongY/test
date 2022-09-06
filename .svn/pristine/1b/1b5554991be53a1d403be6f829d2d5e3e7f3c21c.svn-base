<template>
  <el-container>
    <el-header>
      <vxe-toolbar ref="ReportingRecordToolbar" custom print export>
        <template #buttons>
        <vxe-button status="primary"   @click="searchDate">查询</vxe-button>
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
		show-overflow
		:edit-config="{trigger: 'click', mode: 'row', showStatus: true, icon: 'fa fa-pencil'}" 
        ref="ReportingRecord"
        :print-config="{}"
        :auto-resize="$store.state.autoResize"
         :checkbox-config="{checkField: 'checked', trigger: 'row',range: true,highlight: true,}"
      >
       <vxe-column type="checkbox" width="60" align="center"></vxe-column>
        <vxe-table-column field="flowcardId" title="流转卡ID" width="90px" align="center"></vxe-table-column>
        <vxe-table-column field="taskId" title="制造令ID"  width="90px"></vxe-table-column>
		<vxe-table-column field="workshopName" title="加工车间"  width="120px"></vxe-table-column>
		<vxe-table-column field="productNo" title="生产订单号"  width="140px"></vxe-table-column>
        <vxe-table-column field="productName" title="成品名称"   width="180px"></vxe-table-column>
        <vxe-table-column field="invName" title="子件名称"  width="280px"></vxe-table-column>
		<vxe-table-column field="processName" title="工序名称"  width="120px"></vxe-table-column>
		<vxe-table-column field="staffName" title="加工人"  width="100px"></vxe-table-column>
		<vxe-table-column field="quantity" title="报工数量"  width="90px"></vxe-table-column>
		<vxe-table-column field="createUser" title="报工人"  width="90px"></vxe-table-column>
		<vxe-table-column field="createTime" title="报工时间"  width="180px"></vxe-table-column>
		 
      </vxe-table>
    </el-main>
    <el-footer>
      <page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
    </el-footer>
	<search ref="search" @page_list="page_list" class="search">
		<el-form label-width="120px">
			<el-form-item label="流转卡ID">
				<vxe-input v-model="search.flowcardId"></vxe-input>
			</el-form-item>
			<el-form-item label="制造令ID">
				<vxe-input v-model="search.taskId"></vxe-input>
			</el-form-item>
			<el-form-item label="生产订单号">
				<vxe-input v-model="search.productNo"></vxe-input>
			</el-form-item>
			<el-form-item label="子件名称">
				<vxe-input v-model="search.invName"></vxe-input>
			</el-form-item>
			<el-form-item label="报工时间">
				  <vxe-input v-model="search.date" placeholder="日期选择" type="date" parse-format="yyyy-dd-MM"></vxe-input>
			</el-form-item>
			<!-- <el-form-item label="">
				<vxe-input v-model="productNo"></vxe-input>
			</el-form-item> -->
		</el-form>
	</search>
  </el-container>
 
</template>
<script>
import page from "@/components/page/page.vue";
import search from "@/components/TitleSearch/TitleSearch.vue";
export default {
  name: "ReportingRecord",
  components: {
    page,
	search,
  },
  data() {
    return {
      search: {},
      totalCount: 0,
      tableData: [],
    };
  },
created () {
         this.$nextTick(() => {this.$refs.ReportingRecord.connect(this.$refs.ReportingRecordToolbar)})
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
      this.api.production.ReportingRecord.GetList(
        pagesize,
        page,
        this.search
      ).then(res => {
        if(res.data.code==200){
        this.tableData = res.data.data.rows;
        this.totalCount = parseInt(res.data.data.totalCount);
        }else{
        this.$message.error(res.data.message)}
        
      });
    },
    del: function() {
     let data = this.$refs.ReportingRecord.getCheckboxRecords();
     if (data.length < 1) {this.$message.error("至少选择一条数据");return false}
      let ids = [];
      data.forEach((i, v) => {ids.push(i.id)});
      this.$confirm("此操作将删除这条报工记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.api.production.ReportingRecord.Delete(ids).then(res => {
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
.search .vxe-input{
	width: 350px;
}
</style>
