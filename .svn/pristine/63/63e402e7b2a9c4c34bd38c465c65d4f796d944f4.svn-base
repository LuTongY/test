<template>
	<div v-dialogdrag v-if="excel_Show">
		<el-dialog 
		title='导出'
		v-model="excel_Show"
		width="500px"
		@close='clear_data'
		
		>
		<div style="height: 300px;" class="excel_main" >
		<template :v-if="pickerShow">		
	      <el-date-picker	       
		       class="picker"
	           v-model="date"
	           type="daterange"
	           range-separator="至"
	           start-placeholder="开始日期"
	           end-placeholder="结束日期"
			   @change="download">
	      </el-date-picker>
		</template>
			 <div class="load" v-show="load_show">
			    <el-progress type="circle" :percentage="percentage"></el-progress>
			</div>
			<el-button type="primary" icon="el-icon-download" class="load_bt" v-if='load_bt_show'>下载</el-button>
		</div>
		</el-dialog>
	 
	</div>
</template>
<script>
	export default{
		components:{},
		props:{
			'pickerShow':{
				type:Boolean,
				default:true,
			}
		},
		data(){
			return{
				excel_Show:false,
				date:'',
				percentage:0,
				load_show:false,
				load_bt_show:false
			}
		},
		mounted() {
			
		},
		methods:{
			download(){
				this.percentage=0;
				this.load_show=true
				this.$parent.excel_download();
			},
			clear_data:function(){
				this.date=[];
				this.load_show=false;
			}
			
		},
	}
</script>
<style scoped="scoped" lang="less">
	.excel_main /deep/{
		width: 350px;
		margin:0 auto;
		.el-progress{
			margin-left: calc(50% - 63px);
			margin-top: 45px;
		}
		.load_bt{
			margin-left: calc(50% - 45px);
		    margin-top: 50px;
		}
	}
</style>
