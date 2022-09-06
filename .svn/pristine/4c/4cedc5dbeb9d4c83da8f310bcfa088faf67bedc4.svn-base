<template>
	<div v-dialogdrag v-if="SelectShow">
		<el-dialog :title='title' v-model="SelectShow" :width="width" destroy-on-close>
			<print v-model:SelectShow="SelectShow" :printCallback="print">
				<div style="padding-top:120px;position:relative;">
					<div style="text-align: center; font-size: 24px;line-height: 2;font-weight: normal;">产品标识卡</div>
					<div style="position: absolute;right: 10px;top: 10px;">
						<qr ref="qr" :value="info.currentQrcode" :width="120" />
						<div style="text-align:center;">{{ info.saleOrderNo }} {{ info.teamName }}</div>
					</div>
				</div>
				<el-scrollbar height="450px" id="form1">
					<table border="1" class="tbl-print" width="100%"
						style="border-collapse: collapse;border: 1px solid black;font-size: 16px;">
						<tr style="height: 20px;">
							<th style="padding: 10px;text-align: right;width: 250px">订单号：</th>
							<td style="padding: 10px;width:450px">{{ info.saleOrderNo }}</td>
							<th style="padding: 10px;text-align: right;width: 250px">产品型号：</th>
							<td style="padding: 10px;width:450px">XJ92114</td>
						</tr>
						<tr style="height: 20px;">
							<th style="padding: 10px;text-align: right;">包装日期：</th>
							<td style="padding: 10px;">{{ info.packDate }}</td>
							<th style="padding: 10px;text-align: right;">包装数量：</th>
							<td style="padding: 10px;">{{ info.quantity }}</td>
						</tr>
						<tr style="height: 20px;">
							<th style="padding: 10px;text-align: right;">每层：</th>
							<td style="padding: 10px;">{{ info.layerNum }}</td>
							<th style="padding: 10px;text-align: right;">层数：</th>
							<td style="padding: 10px;">{{ info.layerCount }}</td>
						</tr>
						<tr style="height: 20px;">
							<th style="padding: 10px;text-align: right;">此栈板(套)：</th>
							<td style="padding: 10px;">{{ info.currentQty }}</td>
							<th style="padding: 10px;text-align: right;">班组：</th>
							<td style="padding: 10px;">{{ info.teamName }}</td>
						</tr>
						<tr style="height: 20px;">
							<th style="padding: 10px;text-align: right;">栈板：</th>
							<td style="padding: 10px;">第{{ info.currentPage }}栈/共{{ info.pageCount }}栈</td>
							<th style="padding: 10px;text-align: right;">品管：</th>
							<td style="padding: 10px;"></td>
						</tr>
						<tr style="height: 20px;">
							<td style="padding: 10px;" colspan="4">
								<span style="width:100px">
									<span>（ ）</span><span>合格</span>
								</span>
								<span style="width:100px">
									<span>（ ）</span><span>不合格</span>
								</span>
								<span style="width:100px">
									<span>（ ）</span><span>检验中</span>
								</span>
								<span style="width:100px; margin-right: 10px;">
									<span>（ ）</span><span>待检</span>
								</span>
								<span style="width:100px">
									备注：
									<span style="width:100px; text-decoration: underline;">
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</span>
								</span>
							</td>
						</tr>
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
			info: {},
			table: ""
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
				this.CreateOneFormPage();
				if (s == 0) {
					LODOP.PRINT()
				} else {
					LODOP.PREVIEW()
				}
			} catch (err) {
				console.log(err)
				this.$message.error(err)
			};
		},
		CreateOneFormPage() {
			LODOP = getLodop();
			LODOP.GET_VALUE("PRINT_STATUS_OK", 0);
			LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS", true);
			LODOP.SET_PRINT_PAGESIZE(1, 2100, 1480, "");
			LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
			for (let i = 1; i <= this.info.pageCount; i++) {
				if (this.info.pageCount == i && this.info.lastQty > 0) {
					if (this.info.putRemainLast == 1) {
						this.info.currentQty = this.info.layerSum + this.info.lastQty;
					} else {
						this.info.currentQty = this.info.lastQty;
					}
				} else {
					this.info.currentQty = this.info.layerSum;
				}
				this.info.currentQrcode = this.info.taskNo + '-' + i;
				LODOP.ADD_PRINT_HTM(120, 20, "100%", "100%", document.getElementById("form1").innerHTML);
				LODOP.ADD_PRINT_BARCODE(25, 560, 150, 150, "QRCode", this.info.taskNo + '-' + i);
				LODOP.ADD_PRINT_HTM(175, 65, 235, 50, this.info.accountName + ': ' + this.moment().format('YYYY-MM-DD:HH:MM:SS'));
				LODOP.NEWPAGE();
			}
			this.info.currentQty = this.info.layerSum;
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


.tbl-print tr {
	height: 20px;
}

.tbl-print th,
.tbl-print td {
	padding: 10px;
}

.tbl-print th {
	text-align: right;
}
</style>

