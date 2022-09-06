<template>
	<div v-dialogdrag>
		<el-dialog title="打印流转卡" v-model="PrintShow" destroy-on-close width="700px" top='5vh'>
			<el-container>
				<el-header class="el-dialog__header">
					<vxe-button @click="print(0)">打印</vxe-button>
					<span style="margin:0 10px;">订单总量：{{table.isComponent==1?table.quantity:table.orderQty}}</span>
					<span>当前可打数量:{{table.isComponent==1?parseInt(table.quantity)-parseInt(table.createQty)-parseInt(table.iquantity?table.iquantity:0):parseInt(table.orderQty)-parseInt(table.createQty)-parseInt(table.iquantity?table.iquantity:0)}}</span>
				</el-header>
				<el-scrollbar height="650px">
					<el-main>
						<form id="TaskTemplate" name="TaskTemplate" method="POST" class="layui-form" action>
							<table width="500" border="0" align="center" cellpadding="0" cellspacing="0">
								<tbody>
									<tr>
										<td width="80">
											<strong style="font-size: 35px;">{{table.customer_grade}}</strong>
										</td>
										<td width="500" height="70" align="center" valign="middle">
											<strong style="font-size: 24px;">冠达星生产订单流转卡</strong>
										</td>
										<td width="12%" height="76" colspan="-2" align="center" valign="top"></td>
									</tr>
									<tr>
										<td height="20" colspan="5" align="center" valign="middle">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tbody>
													<tr>
														<td width="12%" height="20" align="right" valign="middle"
															style="font-size:12px; ">制单人：</td>
														<td width="12%" height="20" valign="middle">{{table.createUser}}
														</td>
														<td width="12%" height="20" align="right" valign="middle"
															style="font-size:12px; ">制单日期：</td>
														<td width="15%" height="20" valign="middle">
															{{moment().format('yyyy-MM-DD')}}
														</td>
														<td width="12%" height="20" align="right" valign="middle"
															style="font-size:12px; ">流转卡ID：</td>
														<td width="15%" height="20" valign="middle">
															<input type="text" v-model="table.cardId"
																style="border: none;width: 20px;" readonly>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
							<table width="500" border="0" align="center"
								style="border:solid 1px black;border-collapse:collapse;">
								<tbody>
									<tr>
										<td width="100" height="25"
											style="border-bottom: solid 1px black; border-right:solid 1px black; border-collapse:collapse; font-size:12px;text-indent: 5px;">
											生产订单号&nbsp;</td>
										<td width="130" height="25"
											style="border-bottom: solid 1px black;border-right:solid 1px black;border-collapse:collapse;font-size:12px; text-align:left;text-indent: 5px;">
											&nbsp;{{table.productNo}}</td>
										<td width="70" height="25"
											style="border-bottom: solid 1px black;border-right:solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											客户名称&nbsp;</td>
										<td width="120" height="25"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											{{table.customer}}
										</td>
										<td width="100" rowspan="4"
											style="border-bottom: solid 1px black;border-collapse:collapse;font-size:12px;"
											valign="middle" align="center">
											<qr ref="qr" :value="table.code" />
										</td>
									</tr>
									<tr>
										<td width="80" height="25"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											制造令ID&nbsp;</td>
										<td width="150" height="25"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											&nbsp;{{table.taskId}}</td>
										<td width="50" height="25"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											订单数量&nbsp;</td>
										<td width="120" height="25"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											&nbsp;{{table.orderQty}} (套)</td>
									</tr>
									<tr>
										<td width="80" height="25"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											备注&nbsp;</td>
										<td width="150" height="25" colspan="3"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;overflow: hidden;">
											<input type="text" v-model="table.remark" placeholder="可不输入"
												style="border: none;width: 100%;">
										</td>
									</tr>
									<tr>
										<td width="80" height="25"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											成品名称&nbsp;</td>
										<td width="150" height="25" colspan="3"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											&nbsp;{{table.productName}}</td>
									</tr>
									<tr>
										<td width="80" height="25"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											物料名称&nbsp;</td>
										<td height="25" colspan="4"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											{{table.pInvName}}
										</td>
									</tr>
									<tr>
										<td height="25"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											物料需求数量</td>
										<td height="25" colspan="4"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:13px;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tbody>
													<tr>
														<td width="70" height="25"
															style="border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-align:center;">
															{{table.pQuantity}}
														</td>
														<td width="40" height="25"
															style="border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-align:center;">
															单位</td>
														<td width="40" height="25"
															style="border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-align:center;">
															{{table.pUnit}}
														</td>
														<td width="40" height="25"
															style="border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-align:center;">
															损耗率</td>
														<td width="50" height="25"
															style="border-right: solid 1px black;border-collapse:collapse;font-size:13px;text-align:center;">
															{{table.pScrap}}%
														</td>
														<td width="75" height="25"
															style="border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-align:center;">
															本卡计划数量</td>
														<td width="80" height="25"
															style="font-size:13px;text-align:center;">
															<input type="number" style="width: 60px;border: none;"
																v-model="table.iquantity" placeholder="子件数量"
																v-show="table.isComponent != 1" />
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
									<tr v-show="table.isComponent==1">
										<td width="80" height="25"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											子件物料名称&nbsp;</td>
										<td height="25" colspan="4"
											style="border-bottom: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											&nbsp{{table.invName}}</td>
									</tr>
									<tr v-show="table.isComponent==1">
										<td height="25"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											子件需求数量&nbsp;</td>
										<td height="25" colspan="4"
											style="border-bottom: solid 1px black;border-collapse:collapse;font-size:12px;">
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tbody>
													<tr>
														<td width="70" height="25"
															style="border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-align:center;">
															{{table.quantity}}
														</td>
														<td width="40" height="25"
															style="border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-align:center;">
															单位</td>
														<td width="40" height="25"
															style="border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-align:center;">
															{{table.unit}}
														</td>
														<td width="40" height="25"
															style="border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-align:center;">
															损耗率</td>
														<td width="50" height="25"
															style="border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-align:center;">
															&nbsp;{{table.scrap}}%</td>
														<td width="75" height="25"
															style="border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-align:center;">
															子件计划数量</td>
														<td width="80" height="25"
															style="font-size:12px;text-align:center;">
															<input type="number" style="width: 60px;border: none;"
																v-model="table.iquantity" placeholder="子件数量"
																v-bind:readonly='isReadOnly' />
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
									<tr>
										<td width="80" height="25"
											style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-indent: 5px;">
											工序路线&nbsp;</td>
										<td height="25" colspan="4"
											style="border-bottom: solid 1px black;border-collapse:collapse;font-size:12px;text-align:center;">
											{{table.routerShow}}
										</td>
									</tr>
								</tbody>
							</table>
							<table width="500" border="0" align="center" cellpadding="0" cellspacing="0"
								style="border-collapse:collapse;">
								<tbody>
									<tr>
										<td width="500" height="25" align="center" valign="middle">
											<table width="500" cellspacing="0" cellpadding="0"
												style="border-left:solid 1px black;border-right:solid 1px black;border-bottom:solid 1px black;border-collapse:collapse;"
												id="gxid">
												<thead>
													<tr
														style="text-align: center;background-color: #ccc;font-size: 14px;font-weight: 700;">
														<td width="150" height="25" valign="middle"
															style="border-right:1px solid black;border-bottom: 1px solid black;">
															生产工序</td>
														<td width="70" height="25" valign="middle"
															style="border-right:1px solid black;border-bottom: 1px solid black;">
															收单时间</td>
														<td width="70" height="25" valign="middle"
															style="border-right:1px solid black;border-bottom: 1px solid black;">
															发单时间</td>
														<td width="70" height="25" valign="middle"
															style="border-right:1px solid black;border-bottom: 1px solid black;">
															操作工</td>
														<td width="70" height="25" valign="middle"
															style="border-right:1px solid black;border-bottom: 1px solid black;">
															产量</td>
														<td width="70" height="25" valign="middle"
															style="border-bottom: 1px solid black;">品质判定</td>
													</tr>
												</thead>
												<tbody class="gx">
													<tr v-for="(item,index) in table.processList" :key="item.id">
														<td
															style="border-right:1px solid black;border-bottom:1px solid black;height:25px;text-indent: 5px;">
															{{item.name}}
														</td>
														<td
															style="border-right:1px solid black;border-bottom:1px solid black;">
														</td>
														<td
															style="border-right:1px solid black;border-bottom:1px solid black;">
														</td>
														<td
															style="border-right:1px solid black;border-bottom:1px solid black;">
														</td>
														<td
															style="border-right:1px solid black;border-bottom:1px solid black;">
														</td>
														<td style="border-bottom:1px solid black;">
															<span :style="{display:processListBtn}"
																style="border: 1px solid #ccc;cursor: pointer;margin: 0 2px;"
																@click="DelProcessList(index)">删除</span>
															<span :style="{display:processListBtn}"
																style="border: 1px solid #ccc;cursor: pointer;margin: 0 2px;"
																@click="AddProcessList(index)">增加</span>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
									<tr>
										<td width="500" height="25" align="center" valign="middle">
											<table width="500" border="0" cellspacing="0" cellpadding="0"
												style="border-left:solid 1px black;border-right:solid 1px black;border-bottom:solid 1px black;border-collapse:collapse;">
												<tbody>
													<tr>
														<td width="78" height="50" valign="middle"
															style="border-bottom: solid 1px black;border-right: solid 1px black;border-collapse:collapse;font-size:12px;text-align:center;">
															备注</td>
														<td height="50" valign="middle"
															style="border-bottom: solid 1px black;border-collapse:collapse;font-size:12px;text-align:left;">
															&nbsp;1、交接时必须班组长和下道工序交接；
															<br />&nbsp;2、所有物料需求的数量有加千分之三的损耗；
															<br />&nbsp;3、当损耗超过千分之三时，要报品管和车间主管确认；
															<br />&nbsp;4、交接过程中，收方不点数，出现数量差异由收方负责；
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
						</form>
					</el-main>
				</el-scrollbar>
			</el-container>
			<el-dialog v-model="innerVisible" width="500px" title="添加工序" append-to-body>
				<el-container style="height: 200px;">
					<el-main>
						<el-cascader v-model="addList" :options="table.processOptions" :props="props"
							ref="addProcessList" clearable filterable></el-cascader>
						<div style="width:calc(100% - 100px);position: absolute;bottom: 20px;">
							<el-button type="primary" @click="handleChange" style="float: right;">确认</el-button>
							<el-button @click="innerVisible = false" style="float: right;margin-right: 10px;">取消
							</el-button>
						</div>
					</el-main>
				</el-container>
			</el-dialog>
		</el-dialog>
	</div>
</template>
<script>
	import {
		getLodop
	} from '@/components/js/LodopFuncs.js'
	import qr from "@/components/qr/qr.vue";
	export default {
		components: {
			qr,
		},
		data() {
			return {
				PrintShow: false,
				table: {
					code:'',
				},
				data: {},
				dialogVisible: false,
				innerVisible: false,
				props: {
					expandTrigger: 'hover',
					children: 'children',
					label: 'name',
					value: 'id',
					emitPath: false
				},
				addList: "",
				addIndex: '',
				processListBtn: "inline",
				isReadOnly: false,
				idKey: ""
			};
		},
		mounted() {},
		methods: {
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
								setTimeout(function() {
									_that.CreateOneFormPage();
									LODOP.PRINT()
								})
								this.PrintShow = false
							}
						})
					}
					if (s == 1) {
						setTimeout(function() {
							_that.CreateOneFormPage();
							LODOP.PREVIEW()
						})
					}
				} catch (err) {
					// this.$message.error(err)
				};
			},
			CreateOneFormPage() {
				this.refreshData();
				LODOP = getLodop();
				LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A5");
				LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", document.getElementById("TaskTemplate").innerHTML);
			},
			refreshData() { //让innerHTML获取的内容包含input和select(option)的最新值
				var allInputObject = document.body.getElementsByTagName("input");
				for (let i = 0; i < allInputObject.length; i++) {
					if (allInputObject[i].type == "checkbox") {
						if (allInputObject[i].checked)
							allInputObject[i].setAttribute("checked", "checked");
						else
							allInputObject[i].removeAttribute("checked");
					} else if (allInputObject[i].type == "radio") {
						if (allInputObject[i].checked)
							allInputObject[i].setAttribute("checked", "checked");
						else
							allInputObject[i].removeAttribute("checked");
					} else allInputObject[i].setAttribute("value", allInputObject[i].value);
				};
				for (let i = 0; i < document.getElementsByTagName("select").length; i++) {
					var sl = document.getElementsByTagName("select")[i];
					for (let j = 0; j < sl.options.length; j++) {
						if (sl.options[j].selected)
							sl.options[j].setAttribute("selected", "selected");
						else sl.options[j] = new Option(sl.options[j].text, sl.options[j].value);
					};
				};
			},
			DelProcessList(index) {
				this.table.processList.splice(index, 1)
			},
			AddProcessList(index) {
				this.innerVisible = true
				this.addIndex = index
			},
			handleChange(row) {
				let data = this.$refs.addProcessList.getCheckedNodes()[0]
				data.data['code'] = data.data.id
				this.table.processList.splice(this.addIndex, 0, data.data)
				this.innerVisible = false
			}
		},
	}
</script>
<style lang="less" scoped>
	/deep/ .el-dialog__body {
		padding-top: 0;
	}

	/deep/.el-dialog__header {
		// display: none;
		padding-top: 5px;
	}

	.el-main {
		padding-top: 0;
	}

	.el-header {
		height: 40px;
	}

	form>table {
		margin: 0 auto
	}

	.gx tr {
		height: 35px;
	}

	.gx tr span:hover {
		color: #298B47;
		border: 1px solid #298B47;
	}
	.el-container{
		border: 1px solid #ccc;
		overflow: hidden;
	}
	.el-header{
		border-bottom: 1px solid #ccc;
		padding: 8px 20px;
		height: 50px;
	}
</style>
