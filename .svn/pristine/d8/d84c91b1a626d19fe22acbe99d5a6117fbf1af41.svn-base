<template>
  <el-container>
    <el-header>
      <vxe-toolbar ref="ReportDailyTimeToolbar" >
        <template #buttons>
		  <TitleDate @page_list='page_list' v-model:Pdata="Pdata" />
         <el-select v-model="workShopId" class="m-2" placeholder="Select" size="small" filterable @change="page_list">
             <el-option
               v-for="(item,keys) in workshopList"
               :key="keys"
               :label="item"
               :value="keys"
             />
           </el-select>
          <vxe-button status="primary" @click="page_list" style="margin-left: 10px;">搜索</vxe-button>
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
     	    ref="ReportDailyTime"
     	    :auto-resize="$store.state.autoResize"
     	  >
     	<vxe-column type="expand" width="40">
     	  <template #content="{ row }">
					<Rtable    :tableData='row.children' />
     	  </template>
     	</vxe-column>
     	<vxe-column type="seq" width="60" title="序号" align="center"></vxe-column>
     	<vxe-table-column  title="时间段">
     			<template #default="{ row,index }">
     			 <div style="display: flex;">
     				<div style="width: 320px;">
     				   <span>{{row.periodName}}</span>
     			    </div>
     			 </div>
     			</template>
     	</vxe-table-column>
     </vxe-table>
    </el-main>
  </el-container>
 
</template>
<script>
import TitleDate from "@/components/TitleDate/TitleDate.vue"
import Rtable from "./ReportDailyTimeTable"
export default {
  name: "ReportDailyTime",
  components: {
	TitleDate,
	Rtable,
  },
  data() {
    return {
      search: {},
      totalCount: 0,
	  workShopId:'100',
	  workshopList:[],
      tableData: [],
      auto: true,
	  Pdata:this.moment().format('YYYY-MM-DD'),
    };
  },
  mounted() {
    this.page_list();
  },
  created () {
           // this.$nextTick(() => {this.$refs.i_Requisition.connect(this.$refs.i_RequisitionToolbar)})
            },
  methods: {
    page_list: function(data) {
		console.log(this.$refs)
      this.api.report.ReportDailyTime.GetTimePeriodReportList(this.Pdata,this.workShopId,).then(res => {
        if(res.data.code==200){
        this.tableData = res.data.data.listData;
		this.workshopList = res.data.data.workshopList
		// console.log(typeof(parseInt(Object.keys(this.workshopList)[0])))
		// this.workShopId=parseInt(Object.keys(this.workshopList)[0])
        this.totalCount = parseInt(res.data.data.totalCount);
        }
      });
    },

  }
};
</script>
<style lang="less" scoped="scoped">
.el-main {
  padding: 0 20px 20px 20px;
}
/deep/.vxe-body--expanded-cell{
	padding: 10px;
	padding-left: 10px;
}
.vxe-button{
	margin-left: 10px;
}
</style>
