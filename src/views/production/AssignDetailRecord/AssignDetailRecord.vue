<template>
	<el-container>
		<el-header>
			<vxe-toolbar ref="AssignRecordToolbar" custom print export>
				<template #buttons>
					<el-row>
						<vxe-button status="primary" @click="searchDate">查询</vxe-button>
						<vxe-button @click="$refs.SearchPrint.SelectShow=true;SearchPrint={type:1}" v-has="['print']">打印人员派工单</vxe-button>
						<vxe-button @click="Entrust" v-has="['Entrust']">人员派工委托</vxe-button>
					</el-row>
				</template>
			</vxe-toolbar>
		</el-header>
		<el-main>
			<vxe-table :data="tableData" highlight-current-row highlight-hover-row height="auto" border="full"
				show-overflow :filter-config="{ 'remote': false }" ref="AssignRecord" :print-config="{}"
				:auto-resize="$store.state.autoResize"
				:radio-config="{ checkField: 'checked', trigger: 'row', highlight: true, }">
				<vxe-column type="radio" width="45" align="center"></vxe-column>
				<vxe-column field="productNo" title="生产订单号" width="140px"></vxe-column>
				<vxe-column field="produceDate" title="加工日期" width="100px"></vxe-column>
				<vxe-column field="pInvName" title="成品名称" width="150px" :filters="filters.pInvName"></vxe-column>
				<vxe-column field="invCode" title="物料编码" width="130px" :visible='false'></vxe-column>
				<vxe-column field="invName" title="物料名称" width="270px" :filters="filters.invName"></vxe-column>
				<vxe-column field="workcenterName" title="工作中心" width="120px"></vxe-column>
				<vxe-column field="quantity" title="加工数量" width="80px" align="right"></vxe-column>
				<vxe-column field="processName" title="工序名称" width="140px" :filters="filters.processName"></vxe-column>
				<vxe-column field="staffName" title="加工人" width="90px"></vxe-column>
				<vxe-column field="staffNo" title="工号" width="90px"></vxe-column>
				<vxe-column field="createUser" title="派工人" width="90px"></vxe-column>
				<vxe-column field="createTime" title="派工时间" width="170px"></vxe-column>
				<vxe-column field="type" title="类型" width="120px">
					<template #default="{ row }">
						<el-button type="success" size='mini' v-if="row.type == '直接派工'">{{ row.type }}</el-button>
						<el-button type="danger" size='mini' v-else>{{ row.type }}</el-button>
					</template>
				</vxe-column>
			</vxe-table>
		</el-main>
		<el-footer>
			<page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
		</el-footer>
		<search ref="search" @page_list="page_list">
			<el-form :model="search" label-width="120px" class="demo-ruleForm">
				<el-form-item label="工作中心">
					<el-cascader size="small" v-model="search.workcenterId" :options="options.WorkGetList"
						:props="{ expandTrigger: 'hover', label: 'name', value: 'id', emitPath: false }">
					</el-cascader>
				</el-form-item>
				<el-form-item label="派工类型">
					<el-select v-model="search.type" placeholder="请选择" size="small">
						<el-option v-for="(item, key, index) in assignTypes" :key="key" :label="item" :value="key">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="加工日期">
					<vxe-input v-model="search.produceDate[0]" placeholder="起始日期" type="date"></vxe-input>
					--
					<vxe-input v-model="search.produceDate[1]" placeholder="中止日期" type="date"></vxe-input>

				</el-form-item>
				<el-form-item label="生产订单号">
					<vxe-input v-model="search.productNo" placeholder="生产订单号" type="text" class="data"></vxe-input>
				</el-form-item>
				<el-form-item label="物料编码">
					<vxe-input v-model="search.invCode" placeholder="物料编码" type="text" class="data"></vxe-input>
				</el-form-item>
				<el-form-item label="物料名称">
					<vxe-input v-model="search.invName" placeholder="物料名称" type="text" class="data"></vxe-input>
				</el-form-item>
				<el-form-item label="加工人工号">
					<vxe-input v-model="search.workNo" placeholder="加工人工号" type="text" class="data"></vxe-input>
				</el-form-item>
			</el-form>
		</search>
		<Entrust-Dialog width="450px" title="委托派工" :FootBtn='false' ref="Entrust">
			<el-form :model="EntrustForm" :rules="EntrustRules" label-width="120px" ref="EntrustForm">
				<el-form-item label="选择人员" prop="staffNo">
					<el-select v-model="EntrustForm.staffNo" filterable placeholder="请选择" size="small">
						<el-option v-for="(item, index) in EntrustInfo.staffs" :key="index" :label="item"
							:value="index">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择日期" prop="date">
					<vxe-input v-model="EntrustForm.date" placeholder="加工日期" type="date" class="data" width="200px">
					</vxe-input>
				</el-form-item>
				<el-form-item label="数量" prop="quantity">
					<vxe-input v-model="EntrustForm.quantity" placeholder="数量" type="text" class="data" width="200px">
					</vxe-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="EntrustSubmit('EntrustForm')">确认</el-button>
				</el-form-item>
			</el-form>
		</Entrust-Dialog>
		<!-- 打印 -->
		<search ref="SearchPrint" title="打印"  :FootBtn='false' width='600px'>
			<el-form :model="SearchPrint" label-width="120px" class="demo-ruleForm">
				<el-form-item label="加工日期">
					<vxe-input v-model="SearchPrint.date" placeholder="加工日期" type="date"></vxe-input>
				</el-form-item>
				<el-form-item label="工作中心">
					<el-cascader size="small" v-model="SearchPrint.workcenterId" :options="options.WorkGetList"
						:props="{ expandTrigger: 'hover', label: 'name', value: 'id', emitPath: false }">
					</el-cascader>
				</el-form-item>
				<el-form-item label="员工工号">
					<vxe-input v-model="SearchPrint.staffNo" placeholder="员工工号" type="text" class="data" ></vxe-input>
				</el-form-item>
				<el-form-item algin='center'>
					<el-button type="primary" icon="el-icon-search" class="load_bt" size="mini" @click='PrintView'>确认</el-button>
				</el-form-item>
			</el-form>
		</search>
		<print ref='PrintViewUser' :data='SearchPrint.data'  :workcenterName='SearchPrint.workcenterId'/>
	</el-container>
</template>
<script>
import page from "@/components/page/page.vue";
import TitleDate from "@/components/TitleDate/TitleDate.vue"
import search from "@/components/TitleSearch/TitleSearch.vue";
import EntrustDialog from "@/components/TitleSearch/TitleSearch.vue";
import print from "./printUser.vue";
export default {
	name: "AssignDetailRecord",
	components: {
		page,
		TitleDate,
		search,
		EntrustDialog,
		print,
	},
	data() {
		return {
			search: {
			},
			SearchPrint:{},
			totalCount: 0,
			tableData: [],
			assignTypes: {},
			select_id: "",
			auto: true,
			EntrustInfo: {},
			EntrustForm: {},
			options: {},
			EntrustRules: {
				staffNo: [{ required: true, message: '请选择委派人员', trigger: 'change' }],
				date: [{ required: true, message: '请选择时间', trigger: 'change' }],
				quantity: [{ required: true, message: '请输入数量', trigger: 'blur' }]

			},
			filters: {
				workshopName: [],
				invName: [],
				processName: [],
				pInvName: [],
			}
		};
	},
	created() {
		this.$nextTick(() => { this.$refs.AssignRecord.connect(this.$refs.AssignRecordToolbar) })
	},
	mounted() {
		this.getWorkshopWorkcenters();
		this.page_list();
	},
	methods: {
		getWorkshopWorkcenters: function () {
			this.api.production.Assign.getWorkshopWorkcenters().then(res => {
				if (res.data.code == 200) {
					this.options.WorkGetList = res.data.data.workcenters;
				} else {
					this.$message.error(res.data.message)
				}
			});
		},
		page_list: function () {
			let pagesize = this.$refs.page_data.page_size;
			let page = this.$refs.page_data.page;
			this.api.production.AssignDetailRecord.GetDetailRecordList(pagesize, page, this.search).then(res => {
				if (res.data.code == 200) {
					this.assignTypes = res.data.data.assignTypes;
					this.tableData = res.data.data.rows;
					this.totalCount = parseInt(res.data.data.totalCount);
				} else {
					this.$message.error(res.data.message)
				}
			});
		},
		searchDate: function () {
			this.$refs.search.SelectShow = true;
		},
		Entrust: function () {
			let data = this.$refs.AssignRecord.getRadioRecord();
			if (!data) { this.$message.error("请选择一条数据"); return false }
			this.$refs.Entrust.SelectShow = true;
			this.EntrustForm = {};
			this.EntrustForm.id = data.id;
			this.api.production.AssignRecord.GetDetailEntrustInfo(data.id).then(res => {
				if (res.data.code == 200) {
					this.EntrustInfo = res.data.data;
				} else {

				}
			})
		},
		EntrustSubmit: function (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.api.production.AssignRecord.DetailEntrust(this.EntrustForm).then(res => {
						if (res.data.code == 200) {
							this.$refs.Entrust.SelectShow = false;
							this.page_list();
							this.$message.success(res.data.message);
						} else {
							this.$message.error(res.data.message);
						}
					})
				}
			});
		},
		PrintView:function(){
			this.api.production.AssignDetailRecord.getDetailPrintRecord(this.SearchPrint).then((res)=>{
				if(res.data.code==200){
					this.$refs.SearchPrint.SelectShow=false;
				
					this.$refs.PrintViewUser.isShow();
					this.SearchPrint.data=res.data.data.dataList;
						console.log(this.SearchPrint.data);
				}
			})   
			
		}
	}
};
</script>
<style lang="less" scoped>
.el-main {
	padding: 0 20px 20px 20px;
}

.demo-ruleForm .data {
	width: 350px;
}

/deep/.el-input__suffix-inner i {
	height: 32px;
}
</style>
