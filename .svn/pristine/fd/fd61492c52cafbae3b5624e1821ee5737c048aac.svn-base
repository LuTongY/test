<template>
  <el-container>
    <el-header>
      <vxe-toolbar>
        <template #buttons>
          <vxe-input v-model.trim="search.so_no" placeholder="完整销售订单号"></vxe-input>
		   <vxe-input v-model.trim="search.so_seq" placeholder="行号"></vxe-input>
          <vxe-button status="primary" @click="page_list">搜索</vxe-button>
        </template>
      </vxe-toolbar>
    </el-header>
    <el-main style="min-width: 1800px;">
		<el-row   class="row_title"  >
			<el-col :span="8">
				<label for="">U8销售订单数量:</label>
			</el-col>
			<el-col :span="8">
				<label for="">锁入预计划生产数量:</label>
			</el-col>
			<el-col :span="8">
				<label for="">U8累计入库数量:</label>	
			</el-col>
		</el-row>
		<el-row class="row_table_main">
			<el-col :span="6">
				<div class="grid-content ep-bg-purple" style="min-width:450px ;">
					<vxe-table
					   :data="ScheduleData"
					   highlight-current-row
					   highlight-hover-row
					   height="auto"
					   border="full"
					   :auto-resize="$store.state.autoResize"
					   @cell-click="ScheduleCell"
					   :tree-config="{accordion: lazy,children: 'childData'}"
					 >
					 <vxe-colgroup  title="排产计划" >
						 <vxe-table-column field="so_seq" title="行号" min-width="50" align="center"></vxe-table-column>
						 <vxe-table-column field="pack_date" title="包装日期" min-width="100"></vxe-table-column>
						 <vxe-table-column field="quantity" title="排单数量" min-width="80"></vxe-table-column>
						  <vxe-table-column  title="排产人" min-width="100">
							  <template #default="{ row }">
								  <span>{{row.update_user?row.update_user:row.create_user}}</span>
							  </template>
						  </vxe-table-column>
						 <vxe-table-column field="status" title="状态" width="120" align="center">
							  <template #default="{ row }">
								   <el-button size="mini" type="danger" v-if="row.status=='未知'">未知</el-button>
							  	   <el-button size="mini"  v-if="row.status=='未进行'">未进行</el-button>
							  	   <el-button size="mini" type="warning"  v-if="row.status=='进行中'">进行中</el-button>
								   <el-button size="mini" type="success" v-if="row.status=='已完成'">已完成</el-button>
								   <el-button size="mini" type="info" v-if="row.status=='已撤销'">已撤销</el-button>
							  </template>
						 </vxe-table-column>		  
					</vxe-colgroup>
				   </vxe-table>	
				</div>
			</el-col>
			<el-col :span="10">
				<div class="grid-content ep-bg-purple" style="margin: 0 12px;">
					<vxe-table
					   :data="partData"
					   highlight-current-row
					   highlight-hover-row
					   height="auto"
					   border="full"
					   :auto-resize="$store.state.autoResize"
					   @cell-click="partCell"
					   :tree-config="{accordion: lazy,children: 'childData'}"
					 >
					<vxe-colgroup  title="自制件">
					 <vxe-column type="seq" width="60" title="序号" align="center"></vxe-column>
					  <vxe-table-column field="inv_code" title="物料编码" width="120"></vxe-table-column>
					   <vxe-table-column field="inv_name" title="物料名称" min-width="150"></vxe-table-column>
					   <vxe-table-column field="order_rate" title="比例" width="60"  align="center" :formatter="({cellValue})=>{return T.floatRow(cellValue)}"></vxe-table-column>
					   <vxe-table-column field="quantity" title="生产数量" width="80" :formatter="({cellValue})=>{return T.floatRow(cellValue)}"></vxe-table-column>
					</vxe-colgroup>
					</vxe-table>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content ep-bg-purple" style="">
					<vxe-table
					   :data="tableData"
					   highlight-current-row
					   highlight-hover-row
					   height="auto"
					   border="full"
					   :auto-resize="$store.state.autoResize"
					   @cell-click="productionCell"
					   :tree-config="{accordion: lazy,children: 'childData'}"
					 >
					<vxe-colgroup  title="报工记录">
					  <vxe-table-column field="orderNo" title="序号" min-width="150"></vxe-table-column>
					  <vxe-table-column field="orderNo" title="物料编码" min-width="150"></vxe-table-column>
					   <vxe-table-column field="orderNo" title="物料名称" min-width="150"></vxe-table-column>
					</vxe-colgroup>
					</vxe-table>
				</div>
			</el-col>
		</el-row>
    </el-main>
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
	  ScheduleData:[],
	  partData:[],
      search: {so_no:'IY2204A01'},
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
	  this.ScheduleData=[];
      this.api.report.ReportOrderPlan.GetList(this.search).then(res => {
        if(res.data.code==200){
          this.ScheduleData = res.data.data.row;
        }
      });
    },
    ScheduleCell: function({row}) {
		this.api.report.ReportOrderPlan.GetPart({'schedule_id':row.id}).then(res=>{
			if(res.data.code==200){
				this.partData=res.data.data.row
			}
		})
      // this.select_id = item.row.id;
    },
	partCell:function({row}){
		// console.log(item);
		this.api.report.ReportOrderPlan.GetProduction({'schedule_id':row.schedule_id,'inv_code':row.inv_code}).then(res=>{
			if(res.data.code==200){
				// this.partData=res.data.data.row
			}
		})
	},
	productionCell:function(item){
		console.log(item);
	}
  }
};
</script>
<style lang="less" scoped>
.el-main {
  padding: 0 20px 20px 20px;
}
.row_title{
	padding: 12px 0;
	border: 1px solid #eee;
	border-bottom: none;
	background-color: #F8F8F9;
	font-size: 14px;
	.el-col{
		text-indent: 1em;
		label{
			font-family: "微软雅黑" !important;
			font-size: 14px;
			font-weight: 700;
			color: #606266;
		}
		
	}
}
.el-col{
	height: 100%;
}
.row_table_main{
	height: calc(100% - 44px);
	padding-top:8px ;
	border: 1px solid #eee;
	.grid-content{
		height: 100%;
	}
	
}
</style>