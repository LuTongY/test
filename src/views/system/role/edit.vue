<template>
<div  v-dialogdrag>
	<el-dialog
	  title="修改角色"
	  v-model="is_show"
	  width="500px"
	  >
	<el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
			 <el-form-item label="角色名称" prop="role_name">
			     <el-input v-model="roleForm.role_name"></el-input>
			   </el-form-item>
			    <el-form-item>
			       <el-button type="primary" @click="submitForm('roleForm')">立即修改</el-button>
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
		props:[],
		data(){
			return{
				is_show:false,
				roleForm:{
				    role_name:'',
					
				},
				id:0,
				rules:{
					role_name: [
					  { required: true, message: '请输入名称', trigger: 'blur' },
					],
				}
				
			}
		},
		mounted() {
		},
		methods:{
			submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
			          if (valid) {
			             this.api.user_role.edit(this.id,this.roleForm.role_name).then((res)=>{
							 if(res.data.code==200){
								 this.is_show=!this.is_show
								 this.$emit('page_list');
								 this.$message.success('修改成功')
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
