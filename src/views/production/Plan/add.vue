<template>
	<div  v-dialogdrag>
		<el-dialog
		  title="销售订单录入"
		  v-model="is_show"
		  width="1200px"
		  >
	<el-container >
		<el-header>
			<vxe-toolbar>
				<template #buttons>
					<vxe-input v-model.trim="search.orderNo" placeholder="销售订单"></vxe-input>
					<vxe-button status="primary" @click="children_page_list">搜索</vxe-button>
				</template>
			</vxe-toolbar>
		</el-header>
		<el-main v-if="is_show">
			<el-row style="height: 500px;">
				<el-col >
					<vxe-table 
					     :data="tableData" 
					     highlight-current-row 
				         highlight-hover-row 
					     height="auto" 
					     border="full" 
					     ref="orderTable"
						:auto-resize="$store.state.autoResize" 
						 show-overflow="title"
						 :edit-config="{trigger: 'click', mode: 'cell'}">
						:checkbox-config="{checkField: 'checked', trigger: 'row',range: true,highlight: true}">
						<vxe-column type="checkbox" width="60" align="center"></vxe-column>
						<vxe-column field="orderNo" title="销售订单号" width="120px"></vxe-column>
						<vxe-column field="sortSeq" title="行号" width="60px" align="center"></vxe-column>
						<vxe-column field="series" title="系列" width="160px"></vxe-column>					
						<!-- <vxe-column field="invCode" title="存货编码" width="180px"></vxe-column> -->
						
						<vxe-column field="dueDate"  title="评审日期" width="150px" :edit-render="{name: '$input', props: {type: 'date', placeholder: '请选择日期'}}">
							<template #edit="{ row }">
							        <vxe-input v-model="row.dueDate" type="date" placeholder="请选择日期" ></vxe-input>
							</template>
						</vxe-column>
						<vxe-column field="quantity" title="数量" width="130px" :edit-render="{name: 'input', attrs: {type: 'number'}}"></vxe-column>
						<vxe-column field="invName" title="存货名称"></vxe-column>
					</vxe-table>
				</el-col>
				<el-col></el-col>
			</el-row>
		
		</el-main>
		<el-footer>
			<page ref="ipage_data" :totalCount="totalCount" @page_list="children_page_list" />
			<el-button type="primary" @click="submitForm" style="float: right;">确认</el-button>
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
		mounted() {
		},
		methods: {
			children_page_list: function() {
				let pagesize = this.$refs.ipage_data.page_size;
				let page = this.$refs.ipage_data.page;
				this.api.production.plan.GetSaleOrders(
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
				let data = this.$refs.orderTable.getCheckboxRecords();
				if (data.length < 1) {this.$message.error("请先选择订单");return false}
				 let ids = {};
				 data.forEach((i, v) => {
					 if(!ids[i.id]){ids[i.id]={}}
					 ids[i.id].quantity=i.quantity
					 ids[i.id].dueDate=i.dueDate
				 });
				 this.api.production.plan.add(ids).then(res=>{
					 if(res.data.code==200){
						 this.is_show=false;
						 this.$message.success(res.data.message)
						 this.$emit('page_list')
					 }else{
						 this.$message.error(res.data.data.errors.data)
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
