<template>
<!-- title:外贸部周报表
   auth:路通
   data:2021-07-15 -->
	<div class="week_main">
		<el-row class="week_main_head">
			<el-col>
				<ul style="display: flex;list-style: none;height: 40px;margin-top: 13px;">
					<li>
						<el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期"
							end-placeholder="结束日期" :shortcuts="pickerOptions" size="small">
						</el-date-picker>
					</li>
					<li>
						<el-button type="primary" icon="el-icon-search" @click='load' size="small">搜索</el-button>
					</li>
				</ul>
			</el-col>
		</el-row>
		<el-row class="week_main_table">
			 <el-tabs :tab-position="tabPosition" >
			    <el-tab-pane label="U8">
					 <div style="overflow: auto;">
					<ul>
						<li style="min-width: 490px;">
							<el-table :data='contract_data' border  show-summary max-height="350px" height="350"
								v-loading='loading.contract_load'>
								<el-table-column label="基本情况，签单金额和数量">
									<el-table-column prop="customer" label="客户简称" width='170'>
									</el-table-column>
									<el-table-column label="合同号" prop="contractId">
									</el-table-column>
									<el-table-column prop="number" label="套数" width='140'>
									</el-table-column>
									<el-table-column label="金额($)" prop="Amount">
									</el-table-column>
								</el-table-column>
							</el-table>
						</li>
						<li style="min-width: 490px;">
							<el-table :data='shipment_data' border  show-summary max-height="350px" height="350"
								v-loading='loading.shipment_load'>
								<el-table-column label="出货金额和数量">
									<el-table-column prop="customer" label="客户简称" width='170' >
									</el-table-column>
									<el-table-column label="单据号">
										<template #default="scope" style="color: red;">
											{{scope.row.code}}
										</template>
									</el-table-column>
									<el-table-column prop="number" label="出货套数" width='130'>
									</el-table-column>
					
									<el-table-column prop="amount" label="金额($)">
									</el-table-column>
								</el-table-column>
							</el-table>
						</li>
						</ul>
					<ul>
						<li style="min-width: 490px;">
							<el-table :data='sales_data' border  show-summary v-loading='loading.sales_load' max-height="350px" height="350">
								<el-table-column label="订单评审数">
									<el-table-column prop="customer" label="客户简称" width='170'>
									</el-table-column>
									<el-table-column prop="orderNo" label="订单号">
									</el-table-column>
									<el-table-column prop="number" label="总套数">
									</el-table-column>
									<el-table-column prop="amount" label="总金额($)">
									</el-table-column>
								</el-table-column>
							</el-table>
						</li>
						<li style="min-width: 490px;">
							<el-table :data='receipt_data' border  show-summary max-height="350px" height="350"
								v-loading='loading.receipt_load'>
								<el-table-column label="收款金额">
									<el-table-column prop="customer" label="客户简称" width='170'>
									</el-table-column>
									<el-table-column prop="num" label="单据编号">
									</el-table-column>
									<el-table-column prop="amount" label="收款金额($)">
									</el-table-column>
								</el-table-column>
							</el-table>
						</li>
					</ul>
				  </div>
				</el-tab-pane>
			    <el-tab-pane label="OA">
					<div style="overflow: auto;">
					<ul>
					<li >
					        <el-table :data='cost_data' border max-height="350" :summary-method="cost_sum" show-summary height="350"
					            v-loading='loading.cost_load'>
					            <el-table-column label="成本核算">
					                <el-table-column prop="customer" label="客户简称" width='120'>
					                </el-table-column>
					                <el-table-column prop="number" label="核算个数">
					                </el-table-column>
					            </el-table-column>
					        </el-table>
					    </li>
					    <li >
					        <el-table :data="draw_data" border max-height="350" show-summary v-loading='loading.draw_load' height="350">
					            <el-table-column label="打样个数">
					                <el-table-column prop="customer" label="客户简称">
					                </el-table-column>
					                <el-table-column prop="number" label="核算个数">
					                </el-table-column>
									 </el-table-column>
					        </el-table>
					    </li>
					    <li >
					        <el-table :data="draws_data" border max-height="350" show-summary height="350"
					            v-loading='loading.draws_load'>
					            <el-table-column label="打样+成本核算">
					
					                <el-table-column prop="customer" label="客户简称">
					                </el-table-column>
					                <el-table-column prop="number" label="核算个数">
					                </el-table-column>
									 </el-table-column>
					        </el-table>
					    </li>
					</ul>
				  </div>
				</el-tab-pane>
				
			    <el-tab-pane label="部门">			  
				  <div style="overflow: auto;">
					<ul>
						<li style="flex: 2;min-width: 640px;" >
						    <el-table border :data='next_work_data' max-height="350" v-loading='loading.next_work_load' height="350">
						        <el-table-column>
						            <template #header>
						                <span>下周工作重点以及需协助事项</span>
						                <i class="el-icon-circle-plus-outline"
						                    style="float: right;font-size: 26px;cursor: pointer;"
						                    @click="dialog.next_work = true"></i>
						            </template>
						            <el-table-column prop="groupName" label="部门"  width='100'>
						            </el-table-column>
						            <el-table-column prop="date" label="登记时间" width='110'>
						            </el-table-column>
						            <el-table-column prop="type" label="事项" width='100'>
						            </el-table-column>
						            <el-table-column prop="customer" label="客户名称" width='100'>
						            </el-table-column>
						            <el-table-column prop="order" label="重要订单">
						            </el-table-column>
						            <el-table-column prop="matter" label="协助事项">
						            </el-table-column>
						            <!-- <el-table-column prop="DATA_1" label="打样个数" > -->
						        </el-table-column>
						    
						    </el-table>
						</li>
						<li style="flex: 1;min-width: 470px;">
						    <el-table :data='mail_data' border max-height="350" show-summary v-loading='loading.mail_load' height="350">
						        <el-table-column label="本组邮件情况">
						            <template #header>
						                <span>本组邮件情况</span>
						                <i class="el-icon-circle-plus-outline"
						                    style="float: right;font-size: 26px;cursor: pointer;"
						                    @click="dialog.mail = true"></i>
						            </template>
						            <el-table-column prop="groupName" label="组别" width='120'>
						            </el-table-column>
						            <el-table-column prop="exploitNum" label="开发信数量">
						            </el-table-column>
						            <el-table-column prop="customerNum" label="收到客户邮件数量">
						            </el-table-column>
						            <el-table-column prop="inquiryNum" label="老客户询盘">
						            </el-table-column>
						            <el-table-column prop="newInquiryNum" label="新客户询盘">
						            </el-table-column>
						        </el-table-column>
						    </el-table>
						</li>
					</ul>
					<ul>
						<li style="min-width: 600px;">
						    <el-table :data='overdue_data'   border max-height="350" show-summary v-loading='loading.overdue_load' height="350">
						        <el-table-column label="逾期回款情况">
						            <template  #header>            
										<span>逾期回款情况</span>
						                <i class="el-icon-circle-plus-outline"
						                    style="float: right;  font-size: 26px;cursor: pointer;"
						                    @click="dialog.overdue = true"></i>
						            </template>
						            <el-table-column prop="groupName" label="组别"  width='120'>
						            </el-table-column>
						            <el-table-column prop="customer" label="客户简称" width='90'>
						            </el-table-column>
						            <el-table-column prop="date" label="船期" width='130'>
						            </el-table-column>
						            <el-table-column prop="amount" label="应回款金额">
						            </el-table-column>
						            <el-table-column prop="remark" label="原因">
						            </el-table-column>
						            <el-table-column label="操作" width='60'>
						                <template  #default="scope">
						                    <el-button size="mini" type="danger" @click='del_overdue(scope.row.id)'>
						                        删除
						                    </el-button>
						                </template>
						            </el-table-column>
						        </el-table-column>
						    </el-table>
						</li>
						    <li style='min-width: 520px;margin-right: 25px;'>
						        <el-table :data="specimen_data" border max-height="350" show-summary
						            v-loading='loading.specimen_load'>
						            <el-table-column label="样品成交个数">
						                <template #header>
						                    <span>样品成交个数</span>
						                    <i class="el-icon-circle-plus-outline"
						                        style="float: right;font-size: 26px;cursor: pointer;"
						                        @click="dialog.specimen = true"></i>
						                </template>
						                <el-table-column prop="groupName" label="组别" width='120'>
						                </el-table-column>
						                <el-table-column prop="customName" label="客户简称">
						                </el-table-column>
						                <el-table-column prop="number" label="成交数" width='65'>
						                </el-table-column>
						                <el-table-column prop="date" label="日期" width='100'>
						                </el-table-column>
						                <el-table-column prop="remark" label="备注">
						                </el-table-column>
						                <el-table-column label="操作" width='60'>
						                    <template #default="scope">
						                        <el-button size="mini" type="danger" @click='del_specimen(scope.row.id)'>
						                            删除
						                        </el-button>
						                    </template>
						                </el-table-column>
						            </el-table-column>。
						        </el-table>
						    </li>
					   </ul>
					</div>
				</el-tab-pane>
			  </el-tabs>	
		</el-row>
		<!-- 逾期弹出框 -->
		<div v-dialogdrag>
		  <el-dialog    title="逾期回款情况录入" v-model="dialog.overdue" width="450px"  >
		    <el-form :label-position="labelPosition" label-width="120px" :model="overdue_form">
		        <el-form-item label="选择组别">
		            <el-select v-model="overdue_form.group_name">
		                <el-option value="业务一部">业务一部</el-option>
		                <el-option value="业务二部">业务二部</el-option>
		                <el-option value="业务三部">业务三部</el-option>
		                <el-option value="业务四部">业务四部</el-option>
		                <el-option value="业务五部">业务五部</el-option>
		                <el-option value="业务六部">业务六部</el-option>
		            </el-select>
		        </el-form-item>
		        <el-form-item label="客户简称">
		            <el-input v-model="overdue_form.name"></el-input>
		        </el-form-item>  
		        <el-form-item label="船期">
		            <el-date-picker v-model="overdue_form.date" type="date" placeholder="选择日期" >
		            </el-date-picker>
		        </el-form-item>
		        <el-form-item label="应回款金额">
		            <el-input type='number' v-model="overdue_form.je"></el-input>
		        </el-form-item>
		        <el-form-item label="原因">
		            <el-input v-model="overdue_form.remark"></el-input>
		        </el-form-item>
		    </el-form>
			<template #footer>
			    <el-button @click="dialog.overdue = false">取 消</el-button>
			    <el-button type="primary" @click='overdue_bt'>确 定</el-button>
			  </template>
		</el-dialog>
	  </div>
		<!-- 样品成交个数弹出框 -->
	<div v-dialogdrag>
		<el-dialog title="样品成交个数录入" v-model="dialog.specimen" width="450px" >
		    <el-form :label-position="labelPosition" label-width="80px" :model="form">
		        <el-form-item label="选择组别">
		            <el-select v-model="form.group_name">
		                <el-option value="业务一部">业务一部</el-option>
		                <el-option value="业务二部">业务二部</el-option>
		                <el-option value="业务三部">业务三部</el-option>
		                <el-option value="业务四部">业务四部</el-option>
		                <el-option value="业务五部">业务五部</el-option>
		                <el-option value="业务六部">业务六部</el-option>
		            </el-select>
		        </el-form-item>
		        <el-form-item label="客户简称">
		            <el-input v-model="form.name"></el-input>
		        </el-form-item>
		        <el-form-item label="成交个数">
		            <el-input type='number' v-model="form.number"></el-input>
		        </el-form-item>
		        <el-form-item label="日期">
		            <el-date-picker v-model="form.date" type="date" placeholder="选择日期" >
		            </el-date-picker>
		        </el-form-item>
		        <el-form-item label="备注">
		            <el-input v-model="form.remark"></el-input>
		        </el-form-item>
		    </el-form>
			<template #footer>
			     <el-button @click="dialog.specimen = false">取 消</el-button>
			     <el-button type="primary" @click='specimen_bt'>确 定</el-button>
			 </template>
		</el-dialog>
	 </div>
		<!-- 本组邮件弹出框 -->
	  <div v-dialogdrag>
		<el-dialog title="本组邮件情况录入" v-model="dialog.mail" width="450px">
		    <el-form :label-position="labelPosition" label-width="130px" :model="mail_form">
		        <el-form-item label="选择组别">
		            <el-select v-model="mail_form.group_name">
		                <el-option value="业务一部">业务一部</el-option>
		                <el-option value="业务二部">业务二部</el-option>
		                <el-option value="业务三部">业务三部</el-option>
		                <el-option value="业务四部">业务四部</el-option>
		                <el-option value="业务五部">业务五部</el-option>
		                <el-option value="业务六部">业务六部</el-option>
		            </el-select>
		        </el-form-item>
		        <el-form-item label="日期">
		            <el-date-picker v-model="mail_form.date" type="date" placeholder="选择日期" >
		            </el-date-picker>
		        </el-form-item>
		        <el-form-item label="开发信数量">
		            <el-input type='number' v-model="mail_form.exploit_number"></el-input>
		        </el-form-item>
		        <el-form-item label="收到客户邮件数量">
		            <el-input type='number' v-model="mail_form.customer_number"></el-input>
		        </el-form-item>
		        <el-form-item label="老客户询盘">
		            <el-input type='number' v-model="mail_form.inquiry"></el-input>
		        </el-form-item>
		        <el-form-item label="新客户询盘">
		            <el-input type='number' v-model="mail_form.new_inquiry"></el-input>
		        </el-form-item>
		    </el-form>
			<template #footer>
			     <el-button @click="dialog.mail = false">取 消</el-button>
			     <el-button type="primary" @click='mail_bt'>确 定</el-button>
			 </template>
		</el-dialog>
		</div>
		<!-- 下周业务 -->
		<div v-dialogdrag>
		<el-dialog title="下周工作重点以及需协助事项" v-model="dialog.next_work" width="480px">
		    <el-form :label-position="labelPosition" label-width="130px" :model="next_work_form">
		        <el-form-item label="选择组别">
		            <el-select v-model="next_work_form.group_name">
		                <el-option value="业务一部">业务一部</el-option>
		                <el-option value="业务二部">业务二部</el-option>
		                <el-option value="业务三部">业务三部</el-option>
		                <el-option value="业务四部">业务四部</el-option>
		                <el-option value="业务五部">业务五部</el-option>
		                <el-option value="业务六部">业务六部</el-option>
		            </el-select>
		        </el-form-item>
		        <el-form-item label="日期">
		            <el-date-picker v-model="next_work_form.date" type="date" placeholder="选择日期"></el-date-picker>
		        </el-form-item>
		        <el-form-item label="类别">
		            <el-select v-model="next_work_form.items" @change="clear()">
		                <el-option value="客户到访">客户到访</el-option>
		                <el-option value="重点订单">重点订单</el-option>
		                <el-option value="需协助事项">需协助事项</el-option>
		            </el-select>
		        </el-form-item>
		        <el-form-item label="客户" v-show="next_work_form.items=='客户到访'">
		            <el-input v-model="next_work_form.client"></el-input>
		        </el-form-item>
		        <el-form-item label="订单号" v-show="next_work_form.items=='重点订单'">
		            <el-input v-model="next_work_form.orders"></el-input>
		        </el-form-item>
		        <el-form-item label="需协助事项" v-show="next_work_form.items=='需协助事项'">
		            <el-input v-model="next_work_form.helps"></el-input>
		        </el-form-item>
		    </el-form>
			<template #footer>
		           <el-button @click="dialog.next_work = false">取 消</el-button>
		           <el-button type="primary" @click='next_work_bt'>确 定</el-button>
			 </template>
		</el-dialog>
	  </div>
	</div>
</template>
<script>
	export default {
		name:'weekReport',
		data() {
			return {
				tabPosition: 'left',
				contract: [],
				date: [],
				contract_data: [],
				sales_data: [],
				receipt_data: [],
				cost_data: [],
				draw_data: [],
				shipment_data: [],
				specimen_data: [],
				mail_data: [],
				draws_data: [],
				next_work_data: [],
				overdue_data: [],
				pickerOptions: [{
					text: '最近一周',
					value: (() => {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						return [start, end]
					})()
				}, {
					text: '最近一个月',
					value: (() => {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
						return [start, end]
					})()
				}, {
					text: '最近三个月',
					value: (() => {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						return [start, end]
					})()
				}],
				loading: {
					contract_load: false,
					sales_load: false,
					receipt_load: false,
					cost_load: false,
					draw_load: false,
					shipment_load: false,
					specimen_load: false,
					mail_load: false,
					draws_load: false,
					next_work_load: false,
					overdue_load: false,
				},
				dialog: {
					specimen: false,
					mail: false,
					next_work: false,
					overdue: false,
				},
				labelPosition: 'right',
				form: {
					name: '',
					number: '',
					date: '',
					remark: '',
					group_name: '',
				},
				mail_form: {
					group_name: '',
					date: '',
					exploit_number: '',
					customer_number: '',
					inquiry: '',
					new_inquiry: '',
				},
				overdue_form: {
					group_name: '',
					name: '',
					date: '',
					remark: '',
					je: '',
				},
				next_work_form: {
					group_name: '',
					date: '',
					items: '',
					orders: '',
					helps: '',
					client: '',
				},
				start_time:'',
				end_time:'',
			}

		},
		mounted() {

		},
		methods: {
			load: function() {
				if (this.date.length < 1) {
					this.$message.error('请选择日期');
				} else {
				    this.start_time = this.edit_date(this.date[0]);
				    this.end_time = this.edit_date(this.date[1]);
					this.get_data('Contract', 'contract_load', 'contract_data') // 基本情况，签单金额和数量
					this.get_data('Shipment', 'shipment_load', 'shipment_data') //出货金额/数量
					this.get_data('Sales', 'sales_load', 'sales_data'); // 订单评审数
					this.get_data('Receipt', 'receipt_load', 'receipt_data'); // 收款
					this.get_data('Cost', 'cost_load', 'cost_data'); // 成本核算
					this.get_data('ProofingCount', 'draw_load', 'draw_data'); // 打样个数
					this.get_data('ProofingCost', 'draws_load', 'draws_data'); // 打样+成本核算
					this.get_data('Specimen', 'specimen_load', 'specimen_data'); // 样品成交个数
					this.get_data('Mail', 'mail_load', 'mail_data') //本组邮件数量
					this.get_data('NextWork', 'next_work_load', 'next_work_data') //下周工作安排
					this.get_data('OverduePayment', 'overdue_load', 'overdue_data'); //逾期回款
				}

			},
			get_data(a, loading_name, data_list) { //(控制器a,加载动画名称,table表渲染的源数据数组)
			     this.loading[loading_name] = true
			     this.api.trade.week[a](this.start_time,this.end_time).then((res => {
				if (res.data.code == 200) {
			            this[data_list] = res.data.data.rows;
			            this.loading[loading_name] = false 
				}else{
					this.$message.error(res.date.message)
				}
			}))
			},
			specimen_bt() {
				this.api.Finance.week.AddSpecimen(this.form).then((res)=>{
					if(res.data.code==200){
						this.dialog.specimen = false
						this.$message.success('添加成功');
						this.get_data('Specimen', 'specimen_load', 'specimen_data');
						for (let index in this.form) {this.overdue_form[index]=''}
					}else{
						this.$message.error('添加失败');
					}
				})
			},
			del_specimen(id) {
				this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
				   this.api.Finance.week.DeleteSpecimen(id).then((res)=>{
					  if(res.data.code=='200'){
						  this.$message.success(res.data.message);
						  this.get_data('Specimen', 'specimen_load', 'specimen_data');
					  }else{
						  this.$message.error(res.data.message)
					  }
				})
				}).catch(() => {

				});
			},
			del_overdue(id) {
				this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.api.Finance.week.DeleteOverduePayment(id).then((res)=>{
						  if(res.data.code=='200'){
							  this.$message.success(res.data.message);
							  this.get_data('OverduePayment', 'overdue_load', 'overdue_data')
						  }else{
							  this.$message.error(res.data.message)
						  }
					})
				}).catch(() => {

				});
			},
			mail_bt() {
				this.api.Finance.week.AddMail(this.mail_form).then((res)=>{
					if(res.data.code==200){
						this.dialog.mail = false
						this.$message.success('添加成功');
						this.get_data('Mail', 'mail_load', 'mail_data')
						for (let index in this.mail_form) {this.mail_form[index]=''}
					}else{
						this.$message.error('添加失败');
					}
				})
			},
			clear() {
				this.next_work_form.orders = '';
				this.next_work_form.helps = '';
				this.next_work_form.client = '';
			},
			next_work_bt() {
				this.api.Finance.week.AddNextWorkInfo(this.next_work_form).then((res)=>{
					if(res.data.code==200){
						this.dialog.next_work = false
						this.$message.success('添加成功');
						this.get_data('NextWork', 'next_work_load', 'next_work_data')
						for (let index in this.next_work_form) {this.next_work_form[index]=''}
					}else{
						this.$message.error('添加失败');
					}
				})
			},
			overdue_bt() {
				this.api.Finance.week.AddOverduePayment(this.overdue_form).then((res)=>{
					if(res.data.code==200){
						this.dialog.overdue = false
						this.$message.success('添加成功');
						this.get_data('OverduePayment', 'overdue_load', 'overdue_data')
						for (let index in this.overdue_form) {this.overdue_form[index]=''}
					}else{
						this.$message.error('添加失败');
					}
				})
			},
			cost_sum(param) {
				let sums = [];
				sums[0] = '合计';
				sums[1] = param.data.length
				return sums;
			},
			edit_date(dateData) {
				let date = new Date(dateData)
				let y = date.getFullYear()
				let m = date.getMonth() + 1
				m = m < 10 ? ('0' + m) : m
				let d = date.getDate()
				d = d < 10 ? ('0' + d) : d
				const time = y + '-' + m + '-' + d;
				return time
			}
		},
	}
</script>
<style scoped="scoped">
	body{
		height: 100%;
		width: 100%;
	}
	.week_main {
		height: 100%;
		width: 100%;
		background-color: #fff;
		/* overflow:hidden; */
		overflow: auto;
	}

	.week_main_head {
		height: 90px;
		padding: 12px 20px;
	}

	input[type=number]::-webkit-inner-spin-button,
	input[type=number]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.week_main_table {
		padding: 0 20px;
		overflow: auto;
		
	}

	.week_main_table ul {
		display: flex;
		padding: 5px 20px;

	}

	.week_main_table li {
		display: inline-block;
		flex: 1;
		height: 350px;
		min-width: 390px;
		/* max-width: 700px; */
		border: 1px solid #ccc;
		margin-right: 15px;
		box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
		background-color: #fff;
		/* border-radius: 5px; */
		border-radius: 12px;
		overflow: hidden;
	}

	.is-leaf {
		border-top: 1px solid #fff !important;
	}

	.el-table {
		width: 100%;
	}

	.is-leaf {
		padding: 5px 0 !important;
	}

	.is-scrolling-none {
		overflow-y: overlay !important;
	}

	.el-input__inner {
		width: 220px;
	}

	.el-button--mini {
		padding: 7px 5px !important
	}

	.el-dialog {
		border-radius: 8px;
	}

	.el-table thead {
		color: #fff !important;
	}

	.el-table thead.is-group th {
		/* background: #F1777C !important; */
		background: #50AF58 !important;
	}

	.el-table__footer-wrapper tbody td {
		font-size: 13px;
		font-weight: 700;
	}

	.el-table--border th {
		border: none;
	}

	.el-table--border th.gutter:last-of-type {
		border: none;
	}

	.el-table--enable-row-hover .el-table__body tr:hover>td {
		background-color: #8DD092 !important;
	}

	.el-input {
		width: 220px;
	}
	.el-tabs .el-tabs--left{
		width:100%;
	}
	.el-tabs--left{
		width:100%;
	}
</style>
