<template>
  <div v-dialogdrag>
    <el-dialog title="查看Bom" v-model="is_show" width="400px">
			<el-form ref='searchForm' :model="searchForm" :rules="rules" >
			  <el-form-item label="物料编码" prop="invcode">
				  <vxe-input v-model="searchForm.invcode" placeholder="请输入物料编码"></vxe-input>
			  </el-form-item>
			  <el-form-item label="有效日期" prop="date">
				    <vxe-input v-model="searchForm.date" placeholder="日期选择" type="date" parse-format="yyyy-dd-MM"></vxe-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('searchForm')" style="float: right;">确认</el-button>
			    <el-button @click="is_show=false" style="float: right;margin:0 10px">取消</el-button>
			  </el-form-item>
			</el-form >
    </el-dialog>
  </div>
</template>
<script>
	export default{
		components:{},
		data(){
			return{
				is_show: false,
				searchForm:{
					invcode: 'HZ2106A02-01'
				},
				rules:{
					invcode: [{ required: true, message: '请输入内容', trigger: 'blur' },],
					date:[{ required: true, message: '请选择日期', trigger: 'select' }]
				}
			}
		},
		mounted() {
		
		},
		methods:{
			submitForm(formName){
			        this.$refs[formName].validate((valid) => {
			          if (valid) {
			              this.$emit('page_list')
			          } else {
			            console.log('error submit!!');
			            return false;
			          }
			        });
				  },
		},
	}
</script>
