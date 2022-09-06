<template>
	<MyDialog ref='dialog' title='打印标识卡' width='450px'>
	   <div class="IntendPrint_wapper">
	   	<div class="IntendPrint_header" style="display: flex;">
	   		<vxe-button @click="print(0)">打印</vxe-button>
	   		<vxe-button @click="print(1)">预览</vxe-button>
	   	</div>
	   	<div class="IntendPrint_main" id="print" style="padding: 0 20px;">
	   		<form id="form1">    
	   		    	<table id="form2" border="1" width="90%" style="margin:20px auto;border-collapse:collapse; font-size:16px;">
	   		        	<caption style="position:relative">
	   		            	<div style="font-size:30px; font-weight:blod; margin:20px auto; width:200px;">物料标识卡</div>
	   		            </caption>
	   		          <tbody>
	   						<tr>
	   							<th style="text-align:right; padding: 10px;width: 120px">订单号：</th>
	   							<td style="padding:10px; width:300px">{{rowData.cSoCode +'-'+ rowData.SoSeq}}</td>
	   							<th style="text-align:right; padding: 10px;width: 120px">供应商：</th>
	   							<td style="padding:10px; width:300px">厦门欣源荣工贸有限公司</td>
	   						</tr>
	   						<tr>
	   							<th style="text-align:right; padding: 10px;">物料编码：</th>
	   							<td colspan="3" style="padding:10px;">{{rowData.cInvCode}}</td>
	   						</tr>
	   						<tr>
	   							<th style="text-align:right; padding: 10px;">物料名称：</th>
	   							<td colspan="3" style="padding:10px;">{{rowData.cInvName}}</td>
	   						</tr>
	   						<tr>
	   							<th style="text-align:right; padding: 10px">数量：</th>
	   							<td id="qty" colspan="3" style="padding:10px">{{Qty}}</td>
	   						</tr>
	   						<tr>
	   							<th style="text-align:right; padding: 10px;">栈板：</th>
	   							<td style="padding:10px;">
	   								<span tdata='pageNO' id="pageNO">第{{page}}栈</span>/<span tdata='pageCount'>共{{total}}栈</span>
	   							</td>
	   							<th style="text-align:right; padding: 10px;;">品管：</th>
	   							<td style="padding:10px;"></td>
	   						</tr>
	   							<td colspan="4" style="padding:10px">
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
	   						<!-- </tr> -->
	   		        </tbody>
	   		            <tfoot>
	   		            </tfoot>
	   		        </table>
	   		    </form>
	   	</div>
	   </div>
	</MyDialog>
</template>
<script>
	import { getLodop } from '@/components/js/LodopFuncs.js'
	import print from "@/components/print/print.vue"
	export default{
		components:{
			print,
		},
		data(){
			return{
				rowData:'',
				total:0,
				Qty:0,
				page:1,
			}
		},
		computed: {
		
		},
		mounted() {
		},
		methods:{
			isShow:function(){
				this.$refs.dialog.isShow=true;
			},
			Panels() { //展板数计算
			     let number = 0;
				 this.Qty=parseInt(this.rowData.iQuantity)>=parseInt(this.rowData.MyDialogForm.number)?parseInt(this.rowData.MyDialogForm.number):parseInt(this.rowData.iQuantity);
				if(!this.rowData.MyDialogForm.is_include){
					this.total=Math.ceil(parseInt(this.rowData.iQuantity)/parseInt(this.rowData.MyDialogForm.number))
				}else{
					this.total=Math.floor(parseInt(this.rowData.iQuantity)/parseInt(this.rowData.MyDialogForm.number))
				}	
			},
			print(s) {
				try{
					this.CreateOneFormPage();
					if(s==0){			
						 LODOP.PRINT();
						 this.$message.success("打印成功")
						 this.$refs.dialog.isShow=false;
						 this.$emit('page_list')
					}
					if(s==1){
						 LODOP.PREVIEW();
					}
				}catch(err){
					this.$message.error(err)
				}
				
			},
			CreateOneFormPage() {
					        LODOP=getLodop();
					        this.page=1;
							LODOP.GET_VALUE("PRINT_STATUS_OK",0);
							LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);  		
							LODOP.SET_PRINT_PAGESIZE(1, 2100, 1480,"");
							LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
							var  pageNO=document.getElementById('pageNO');
							var  Qty=document.getElementById('qty');
							console.log(pageNO)
							for(let i = 1; i <= this.total; i++){									
								pageNO.innerText="第"+i+"栈";//栈板数
								console.log(this.total)
								if(this.total==1){Qty.innerText=parseInt(this.rowData.iQuantity)}
								else if(i==this.total){						
									if(this.rowData.MyDialogForm.is_include){
										Qty.innerText=parseInt(this.rowData.MyDialogForm.number)+(parseInt(this.rowData.iQuantity)-i*parseInt(this.rowData.MyDialogForm.number))
									}else{
										Qty.innerText=parseInt(this.rowData.iQuantity) % parseInt(this.rowData.MyDialogForm.number)
									}
								}
								
								LODOP.ADD_PRINT_HTM(0,20,"100%","100%",document.getElementById("form1").innerHTML);
								LODOP.ADD_PRINT_BARCODE(375,50,150,150,"QRCode",this.rowData.id + '-' + i);
								LODOP.ADD_PRINT_HTM(505,55,235,50,this.rowData.cSoCode +'-'+ this.rowData.SoSeq);
								LODOP.ADD_PRINT_HTM(55,65,235,50,this.$store.state.user.user_name + ': ' + this.moment().format('YYYY-MM-DD HH:mm:ss'));
								LODOP.NEWPAGE();
							}
			},
		},
	}
</script>
