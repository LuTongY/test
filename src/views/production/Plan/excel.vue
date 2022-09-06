<template>
		<div v-dialogdrag>
		  <el-dialog title="导入订单" v-model="is_show" width="550px" @close="close">
			  
			  <el-container>
				  <el-header>
					  <el-button size="small" type="primary"   @click="download('生产计划导入模板.xlsx','生产计划导入模板.xlsx')">下载模板</el-button>
				  </el-header>
				  <el-main>
					   <el-upload 
					    v-show="upload"
					    class="upload-demo"
					    drag
						ref="upload"
						:on-progress="load"
						:on-success="success"
					    :action=url
						:with-credentials="credentials"
					    multiple
						:data="data"
					  >
					    <i class="fa  fa-4x" :class="upload_icon" style="color: #42A2FA;margin-top: 52px;"></i>
					    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					    <template #tip>
					      <div class="el-upload__tip" style="color: red;">提示:请按照模板格式填写</div>
					    </template>
					  </el-upload>
					  <div class="download" v-show="!upload">
					  		<p style="height: 30px;line-height: 30px;font-size: 15px;text-indent: 1em;">注:共有{{listError}}条订单有误</p>
							<p class="p_bt">
								<el-button type="danger" @click="downLoadErr">点击下载</el-button>
								<el-button type="success" @click="upload=true">返回导入</el-button>
							</p>
							
					  </div>
				  </el-main>
				
			  </el-container>
		  </el-dialog>
		</div>
</template>
<script>
	export default{
		components:{},
		data(){
			return{
				upload:true,
				credentials:true,
				is_show:false,
				upload_icon:"fa-cloud-upload",
				url:this.axios.defaults.baseURL+"\\production\\plan\\import?factoryId="+localStorage.getItem('factory'),
				data:{'factoryId':localStorage.getItem('factory')},
				listError:'',
				DownExcelTable:'',
			}
		},
		mounted() {
		},
		methods:{
			download(filename,name){
			    let a = document.createElement('a');
			    a.href ='/static/download/'+filename;   //路径中'/'为根目录，即index.html所在的目录
			    a.download = name;
			    a.click();
			  },
			 load:function(){
				 this.upload_icon="fa-refresh fa-spin"
			 },
			 success:function(response, file, fileList){
				 this.upload_icon="fa-cloud-upload"
				 if(response.code==200){
					 this.is_show=false;
					 this.$message.success(response.code.message)
					 
				 }else if(response.code==10303){
					 this.$message.error(response.message)
				 }else{
					 this.upload=false
					 this.listError=response.data.listError
					 this.DownExcelTable=response.data
					 
				 }
			 },
			 close:function(){
				 this.$refs.upload.clearFiles();
				 this.upload=true;
			 },
			 downLoadErr:function(){
				  let tableData = this.DownExcelTable.errors;
				  let header = this.DownExcelTable.errors[0];
				  this.CsvExportor.downloadCsv(tableData, {  }, "生产订单校正"+this.moment().format("YYYY-MM-DD")+".xlsx");
			 }
		},
	}
</script>
<style lang='less' scoped>
	/deep/ .el-dialog__body{
		padding: 3px 20px;
		padding: 0;
	}
	/deep/ .el-header{
		height: 30px !important;
	}
	/deep/.el-upload{
		width: 100%;
		height: 200px;
	}
	/deep/.el-upload-dragger,
	.download{
		width: 100%;
		height: 200px;
	}	
	.download{
		border: 1px solid #ccc;
	}
	.download p{
		color: red;
	}
	 .p_bt {
		text-align: center;
		margin-top: 40px;
	}
</style>
