<template>
	<print-dialog ref='dialog' title='打印派工单' width='1200px' :FootBtn='false'>
	   <div class="IntendPrint_wapper">
	   	<div class="IntendPrint_header" style="display: flex;">
	   		<vxe-button @click="print(0)">打印</vxe-button>
	   		<vxe-button @click="print(1)">预览</vxe-button>
	   	</div>
	   	<div class="IntendPrint_main" id="print" style="padding: 0 20px;height: 500px;">
			 <el-empty :image-size="200" v-if="data.length<1"/>
	   		<form v-for="(item,index) in data" :id="step(index)" v-else>
				  <table   width='100%' style='border-collapse:collapse; border:1px solid black;font-size:12px;table-layout: fixed;'>
				        	<caption style='position:relative;'>
				            	<div style='font-size:20px; margin:auto; width:350px;margin-bottom: 10px;'>派工单</div>
				           </caption>
				           <thead style='border: none;'>
				                <tr style='border: none;height: 40px;font-size: 13px;'>
				                  <th colspan='3'>{{'日期:'+item.info.date}}</th>
									<th colspan='3'>{{'组别:'+item.info.workcenterName}}</th>
									<th colspan='3'>{{'员工:'+item.info.staffName}}</th>
									<th colspan='2'>派总:<span class='num'></span></th>
									<th colspan='2'>确总:</th>
									<th ></th>
				                </tr>
				            </thead>
				           <tbody style='border:1px solid #000'>
				              <tr v-for="(list_item,list_index) in item.list">
								<th style='text-align:left;border:1px solid #000'  colspan='2'>订:<span>{{list_item.productNo}}</span></th>
								<th style='text-align:left;border:1px solid #000' colspan='2'>型:<span>{{list_item.productName}}</span></th>
								<th style='text-align:left;border:1px solid #000'>序:<span>{{list_item.processName}}</span></th>
								<th style='text-align:left;border:1px solid #000' colspan='4'>规:<span>{{list_item.invName}}</span></th>
								<th style='text-align:left;border:1px solid #000' >时:<span></span></th>
								<th style='text-align:left;border:1px solid #000'>派:<span class='pgsl'>{{list_item.quantity}}</span></th>
								<th style='text-align:left;border:1px solid #000'>确:<span></span></th>
								<th style='text-align:left;border:1px solid #000' colspan='2'>验:<span></span></th>
							   </tr>
							 </tbody>
				           <tfoot></tfoot>
				        </table>
	   		    </form>
	   	</div>
	   </div>
	</print-dialog>
</template>
<script>
	import printDialog from "@/components/TitleSearch/TitleSearch.vue";
	import { getLodop } from '@/components/js/LodopFuncs.js'
	import print from "@/components/print/print.vue"
	export default{
		components:{
			print,
			printDialog,
		},
		props:{
			data:{
				default:[],
			},
			workcenterName:{
				type:String,
				default:'',
			}
		},
		data(){
			return{
				
			}
		},
		computed: {
		
		},
		mounted() {
		},
		methods:{
			isShow(){
				this.$refs.dialog.SelectShow=true;
			},
			step(index){
				return 'form'+index;
			},
			print(s) {
				try{
					this.CreateOneFormPage();
					if(s==0){			
						 LODOP.PRINT();
						 this.$message.success("打印成功")
						 this.$refs.dialog.SelectShow=false;
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
					LODOP.SET_PRINT_PAGESIZE(2, 0, 0,"A5");
					for(let i=0;i<this.data.length;i++){
					LODOP.ADD_PRINT_HTM('95%','85%','95%',54,'<caption style=\'position:relative\'><span style=\'font-size:12px\'>页号: </span><span style=\'font-size:12px\' tdata=\'pageNO\'>第##页</span>/<span style=\'font-size:12px\' tdata=\'pageCount\'>共##页</span></caption>');	
					LODOP.ADD_PRINT_HTM(30,'2%',"96%","92%",document.getElementById("form"+i+"").innerHTML);
					LODOP.NewPageA();
			       };
				   }
		},
		
	}
</script>
<style scoped>
	.IntendPrint_wapper{
		height: 100%;
	}
	.IntendPrint_main{
		height: calc(100% - 70px);
		overflow: auto;
	}
	
</style>
