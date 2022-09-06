<template>
	<div  v-dialogdrag>
		<el-dialog
		  title="生产计划"
		  v-model="is_show"
		  width="1200px"
		  @open="open"
		  >
	<el-container>
		<el-header>
			<vxe-toolbar  ref="AddToolbar" custom>
				<template #buttons>
					<vxe-input v-model.trim="search.saleOrderNo" placeholder="销售订单"></vxe-input>
					<vxe-button status="primary" @click="children_page_list">搜索</vxe-button>
				</template>
			</vxe-toolbar>
		</el-header>
		<el-main>
			<el-row style="height: 500px;">
				<el-col >
					<vxe-table 
					     :data="tableData" 
					     highlight-current-row 
				         highlight-hover-row 
					     height="auto" 
					     border="full" 
					     ref="Add"
						:auto-resize="$store.state.autoResize" 
						 show-overflow="title"
						 :edit-config="{trigger: 'click', mode: 'row'}"
						:checkbox-config="{checkField: 'checked', trigger: 'row',range: true,highlight: true}">
						<vxe-column type="checkbox" width="60" align="center"></vxe-column>
						<vxe-column field="saleOrderNo" title="销售订单号" width="120px"></vxe-column>
						<vxe-column field="saleOrderSeq" title="行号" width="60px" align="center"></vxe-column>
						<vxe-column field="series" title="系列" width="100px"></vxe-column>					
						<vxe-column field="invCode" title="存货编码" width="180px" :visible='false'></vxe-column>
						<vxe-column field="invName" title="存货名称"></vxe-column>
						<vxe-column field="dueDate"  title="评审日期" width="120px" :visible='false'></vxe-column>
						<vxe-column field="packDate"  title="包装日期" width="130px"></vxe-column>
						<vxe-column field="quantity" title="生产计划数量" width="120px" ></vxe-column>
						<vxe-column title="已排产数量" width="120px" >
							<template #default="{ row }">
								<span>{{row.quantity-row.scheduleQty}}</span>
							</template>
						</vxe-column>
						<vxe-column field="scheduleQty"  title="剩余可排程数量" width="145px" :edit-render="{name: 'input', attrs: {type: 'number'}}"></vxe-column>
					</vxe-table>
				</el-col>
				<el-col></el-col>
			</el-row>
		
		</el-main>
		<el-footer>
			<el-row>
				<el-col :span="18">
					<page ref="ipage_data" :totalCount="totalCount" @page_list="children_page_list" />
				</el-col>
				<el-col :span="6">
					<el-button type="primary" @click="submitForm" style="float: right;">确认</el-button>
				</el-col>
			</el-row>
			
			
		</el-footer>
	</el-container>
</el-dialog>
</div>
</template>
<script>
	import page from "@/components/page/page.vue";
	// import add from "./add.vue";
	// import edit from "./edit.vue";
	export default {
		components: {
			page,
			// add,
			// edit,
		},
		data() {
			return {
				is_show:false,
				search: {},
				totalCount: 0,
				tableData: [],
				select_id: "",
				auto: true
			};
		},
		created() {
			
		},
		mounted() {
		},
		methods: {
			open(){
				this.$nextTick(() => {
				  // 手动将表格和工具栏进行关联
				  console.log(this)
				  this.$refs.Add.connect(this.$refs.AddToolbar)
				})
			},
			children_page_list: function() {
				let pagesize = this.$refs.ipage_data.page_size;
				let page = this.$refs.ipage_data.page;
				this.api.production.Schedule.GetPlanList(
					pagesize,
					page,
					this.search
				).then(res => {
					this.tableData = res.data.data.rows;
					this.totalCount = parseInt(res.data.data.totalCount);
				});
			},
			selectId: function(item) {
				this.select_id = item.row.id;
			},
			submitForm:function(){
				let data = this.$refs.Add.getCheckboxRecords();
				if (data.length < 1) {this.$message.error("请先选择订单");return false}
				 let ids = [];
				 data.forEach((i, v) => {
					 let obj={}
					 obj.quantity=i.scheduleQty
					 obj.id=i.id
					 ids.push(obj)
				 });
				 this.api.production.Schedule.Add(ids).then(res=>{
					 if(res.data.code==200){
						 this.is_show=false;
						 this.$message.success(res.data.message)
						 this.$emit('page_list')
					 }else{
						 this.$message.error(res.data.message)
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
	/deep/.el-dialog__body{
		padding: 10px 20px 20px 20px;
	}
</style>
