<template>
	<div v-dialogdrag v-if="excel_Show">
		<el-dialog 
		title='导出'
		v-model="excel_Show"
		width="600px"
		@close='clear_data'
		>
		<el-form   :model="form"  ref="form"  label-width="120px" class="demo-ruleForm" v-if="!load_show">
			<el-form-item label="包装日期">
				     <el-date-picker
				         v-model="form.packDate"
				         type="daterange"
				         start-placeholder="开始日期"
				         end-placeholder="结束日期"
				         value-format="YYYY-MM-DD"
				       ></el-date-picker>
			</el-form-item>
			<el-form-item label="评审日期">
				<el-date-picker
				     v-model="form.dueDate"
				     type="daterange"
				     range-separator="至"
				     start-placeholder="开始日期"
				     end-placeholder="结束日期"
					 value-format="YYYY-MM-DD"
				     >
				   </el-date-picker>
			</el-form-item>
		</el-form>
		<p style="text-align: center;" v-if="!load_show">
			<el-button type="primary" icon="el-icon-download" class="load_bt" @click="download">下载</el-button>
		</p>
			 <div class="load" v-show="load_show">
			    <el-progress type="circle" :percentage="percentage" status="success">
				<template v-if="percentage==100" class="downSuccess">
					<el-button type="success" icon="el-icon-check" circle  class="downSuccess"/>
					<p class="percentage-value downSuccess" style="margin-top: 8px;">导出成功</p>
				</template>
				<template v-if="percentage!=100">
					<span class="percentage-value">{{ percentage }}%</span>
					<span class="percentage-label">当前进度</span>
				</template>
				</el-progress>
			</div>
		</el-dialog>
	 
	</div>
</template>
<script>
	export default{
		components:{},
		data(){
			return{
				form:{},	
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
				this.api.production.plan.Export(this.form).then(res=>{
					if(res.data.code==200){
						window.location.href=res.data.data.exportList[0].url
						this.percentage=100;
					}else{
						this.$message.error(res.data.message)
					}
				})
			},
			clear_data:function(){
				this.date=[];
				this.load_show=false;
			}
			
		},
	}
</script>
<style scoped="scoped" lang="less">
	.load{
		line-height: 175px
	}
	.el-progress{
		margin-left: calc(50% - 63px);
		margin-top: 45px;
	}
	/deep/.el-dialog__body{
		padding: 30px 20px;
	}
</style>
