<template>
	<div v-dialogdrag v-if="SelectShow">
		<el-dialog :title='title' v-model="SelectShow" :width="width" destroy-on-close>
			<print v-model:SelectShow="SelectShow">
				<div>
					<h1 style="text-align: center;">备料清单</h1>
					<ul>
						<li style="list-style: none;margin:5px 0">
							<span style="font-size:12px; margin-right:1em;">生产订单号:</span>
							<span
								style="text-decoration:underline; font-size:16px; font-weight:bold; margin-right:1em;">{{
										table.productNo
								}}</span>
							<span style="font-size:12px; margin-right:1em;">系列:</span>
							<span
								style="text-decoration:underline; font-size:16px; font-weight:bold; margin-right:1em;">{{
										table.series
								}}</span>
							<span style="font-size:12px; margin-right:1em;">成品编码:</span>
							<span
								style="text-decoration:underline; font-size:16px; font-weight:bold; margin-right:1em;">{{
										table.invCode
								}}</span>
							<span style="font-size:12px; margin-right:1em;">成品名称:</span>
							<span
								style="text-decoration:underline; font-size:16px; font-weight:bold; margin-right:1em;">{{
										table.invName
								}}</span>
						</li>
						<li style="list-style: none;margin:5px 0">
							<span style="font-size:12px; margin-right:1em;">订单数量:</span>
							<span
								style="text-decoration:underline; font-size:16px; font-weight:bold; margin-right:1em;">{{
										table.orderQty
								}}</span>
							<span style="font-size:12px; margin-right:1em;">计划数量:</span>
							<span
								style="text-decoration:underline; font-size:16px; font-weight:bold; margin-right:1em;">{{
										table.quantity
								}}</span>
							<span style="font-size:12px; margin-right:1em;">入库数量:</span>
							<span
								style="text-decoration:underline; font-size:16px; font-weight:bold; margin-right:1em;">{{
										table.orderQualifyQty
								}}</span>
							<span style="font-size:12px; margin-right:1em;">单位:</span>
							<span
								style="text-decoration:underline; font-size:16px; font-weight:bold; margin-right:1em;">{{
										table.unit
								}}</span>
							<span style="font-size:12px; margin-right:1em;">装束:</span>
							<span
								style="text-decoration:underline; font-size:16px; font-weight:bold; margin-right:1em;">{{
										table.unitStorage
								}}</span>
						</li>
						<li style="list-style: none;margin:5px 0">
							<span style="font-size:12px; margin-right:1em;">计划包装日期:</span>
							<span
								style="text-decoration:underline; font-size:16px; font-weight:bold; margin-right:1em;">{{
										table.produceDate
								}}</span>
							<span style="font-size:12px; margin-right:1em;">包装组:</span>
							<span
								style="text-decoration:underline; font-size:16px; font-weight:bold; margin-right:1em;">{{
										table.workcenterName
								}}</span>
						</li>
					</ul>
					<qr ref="qr" :value="table.taskNo" style="position: absolute;right: 10px;top: 10px;" />
				</div>
				<el-scrollbar height="450px">
					<table border="1"
						style="border-collapse:collapse; border:1px solid black; font-size:11px;width:100%">
						<thead>
							<tr style="height: 30px;">
								<td style="padding: 0 3px;text-align: center;">序号</td>
								<td style="padding: 0 3px;text-align: center;">材料编码</td>
								<td style="padding: 0 3px;text-align: center;">材料名称</td>
								<td style="padding: 0 3px;text-align: center;">仓库</td>
								<td style="padding: 0 3px;text-align: center;">库位</td>
								<td style="padding: 0 3px;text-align: center;">单位</td>
								<td style="padding: 0 3px;text-align: center;">数量</td>
								<td style="padding: 0 3px;min-width:75px;text-align: center;">批次</td>
								<td style="padding: 0 3px;min-width:75px;text-align: center;">实发</td>
								<td style="padding: 0 3px;min-width:75px;text-align: center;">仓管发料签字</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in table.allocateList" :key="item.invCode" style="height: 30px;">
								<td style="padding: 0 3px;text-align: center;">{{ index + 1 }}</td>
								<td style="padding: 0 3px;">{{ item.invCode }}</td>
								<td style="padding: 0 3px;">{{ item.invName }}</td>
								<td style="padding: 0 3px;">{{ item.whName }}</td>
								<td style="padding: 0 3px;">{{ item.posName }}</td>
								<td style="padding: 0 3px;text-align: center;">{{ item.unit }}</td>
								<td style="padding: 0 3px;text-align: right;">{{ item.quantity }}</td>
								<td style="padding: 0 3px;"></td>
								<td style="padding: 0 3px;"></td>
								<td style="padding: 0 3px;"></td>
							</tr>
						</tbody>
					</table>
				</el-scrollbar>
			</print>
		</el-dialog>

	</div>
</template>
<script>
import { getLodop } from '@/components/js/LodopFuncs.js'
import print from "@/components/print/print.vue";
import qr from "@/components/qr/qr.vue";
export default {
	props: {
		width: {
			type: String,
			default: "600px",
		},
		FootBtn: {
			type: Boolean,
			default: true
		},
		title: {
			type: String,
			default: "查询"
		}
	},
	components: {
		qr,
		print,
	},
	data() {
		return {
			SelectShow: false,
			table: '',
		}
	},
	mounted() {
	},
	methods: {
		SearchBtn: function () {
			this.$emit("page_list")
			this.SelectShow = false
		},
		print(s) {
			try {
				this.processListBtn = "none"
				let _that = this
				if (s == 0) {
					let data = {
						'code': this.table.code,
						'quantity': this.table.iquantity,
						'processList': [],
					};
					if (this.idKey == "id") {
						data[this.idKey] = this.table.cardId
					} else if (this.idKey == "taskId") {
						data[this.idKey] = this.table.taskId
					}
					this.table.processList.forEach((item) => {
						data.processList.push(item.id)
					})
					this.api.production.Task.PrintInfo(data).then(res => {
						if (res.data.code == 200) {
							this.table.cardId = res.data.data.cardId;
							setTimeout(function () {
								_that.CreateOneFormPage();
								LODOP.PRINT()
							})
							this.PrintShow = false
						} else {
							this.processListBtn = "inline"
							this.$message.error(res.data.data.errors[Object.keys(res.data.data.errors)])
						}
					})
				}
				if (s == 1) {
					setTimeout(function () {
						_that.CreateOneFormPage();
						LODOP.PREVIEW()
					})
				}
			} catch (err) {
				this.$message.error(err)
			};
		},
		CreateOneFormPage() {
			this.refreshData();
			LODOP = getLodop();
			LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A5");
			LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", document.getElementById("TaskTemplate").innerHTML);
		},
	},
}
</script>
<style scoped="scoped" lang="less">
.load {
	line-height: 175px
}

.el-progress {
	margin-left: calc(50% - 63px);
	margin-top: 45px;
}

/deep/.el-dialog__body {
	padding: 0px 10px 10px 10px;
}
</style>

