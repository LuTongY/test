<template>
<div  v-dialogdrag>
	<el-dialog
	  title="编辑车间"
	  v-model="is_show"
	  width="500px"
	  >
	<el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
			 <el-form-item label="工厂名称" prop="name">
			     <el-input v-model="roleForm.name"></el-input>
			   </el-form-item>
			   <el-form-item label="排序" prop="name">
			     <el-input v-model="roleForm.sorts"></el-input>
			   </el-form-item>
			   <el-form-item label="状态" >
			      <el-radio-group v-model="roleForm.status">
                    <el-radio :label="1">正常</el-radio>
					<el-radio :label="0">关闭</el-radio>
              </el-radio-group>
			   </el-form-item>
			    <el-form-item>
			       <el-button type="primary" @click="submitForm('roleForm')">确认</el-button>
			       <el-button @click="is_show=false">取消</el-button>
			     </el-form-item>
	</el-form>
	</el-dialog>
</div>
</template>
<script>
	export default{
		components:{
			
		},
		data(){
			return{
                is_show:false,
                select_id:"",
				roleForm:{
					name:'',
					place:'',
					status:1},
				id:0,
				rules:{
					name: [{ required: true, message: '请输入内容', trigger: 'blur' },],
				}
				
			}
		},
		mounted() {
			
		},
		methods:{
			submitForm(formName) {
               
			        this.$refs[formName].validate((valid) => {
                         console.log(valid)
			          if (valid) {
			             this.api.production.Workshop.edit(this.roleForm,this.select_id).then((res)=>{
							 if(res.data.code==200){
								 this.is_show=!this.is_show
								 this.$message.success('修改成功')
								 console.log(this.$parent);
								 this.$emit('page_list');
								
							 }else{
								 this.$message.error(res.data.message)
							 }
							
						 })
			          } else {
			            console.log('error submit!!');
			            return false;
			          }
			        });
				  },
			
		},
	}
</script>
