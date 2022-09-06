<template>
	<div v-dialogdrag>
		<el-dialog :title="title" v-model="is_show" width="520px">
			<el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm"
				size="small" :inline-message='inline_message'>
				<el-form-item label="姓名" prop="trueName">
					<el-input v-model="addForm.trueName"></el-input>
				</el-form-item>
				<el-form-item label="工号" prop="username">
					<el-input v-model="addForm.username"></el-input>
				</el-form-item>
					<el-form-item label="工厂" prop="factorys">
					<el-select v-model="addForm.factorys" placeholder="请选择" multiple>
						<el-option v-for="(item,key) in options.factorys" :label="item" :value="key">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<template v-for="(item,key) in options.sex" :key="item.id" >
						<el-radio v-model="addForm.sex" :label="key" >{{item}}</el-radio>
					</template>
				</el-form-item>
				<el-form-item label="角色" >
					<el-select v-model="addForm.roles" multiple placeholder="请选择">
						<el-option v-for="(item,key) in options.roles" :label="item" :value="key" >
						</el-option>
					</el-select>
				</el-form-item>
			
				<el-form-item label="部门" >
					<el-select v-model="addForm.departments" placeholder="请选择">
						<el-option v-for="(item,key) in options.departments" :label="item" :value="key" >
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="岗位">
					<el-select v-model="addForm.jobs" placeholder="请选择">
						<el-option v-for="(item,key) in options.jobs" :label="item" :value="key">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="手机">
					<el-input v-model="addForm.mobile"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="addForm.email"></el-input>
				</el-form-item>
				<el-form-item label="账户状态" prop="status">
					<template v-for="(item,key) in options.status">
						<el-radio v-model="addForm.status" :label="key" >{{item}}</el-radio>
					</template>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="addForm.password"></el-input>
				</el-form-item>
				<el-form-item size="large" style="padding-top: 20px;">
					<el-button type="primary" @click="submitForm('addForm')" style="float: right;margin-right: 30px;">保存
					</el-button>
					<el-button @click="is_show=!is_show" style="float: right;margin-right: 15px;">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				is_show: false,			
				inline_message: true,
				type: '',
				title: "",
				addForm: {
					trueName: '',
					username:'',
					offices: '',
					departments: '',
					jobs: '',
					sex: '1',
					mobile: '',
					email: '',
					status: '1',
					password: 'gdxcn123',
					roles: [],
					id:'',
				},
				options: [],
				departments_options: [],
				rules: {
					offices: [{
						required: true,
						message: '请选择地点',
						trigger: 'change'
					}],
					roles: [{
						required: true,
						message: '请选择角色',
						trigger: 'change'
					}],
					status: [{
						required: true,
						message: '请设置账户状态',
						trigger: 'change'
					}],
					trueName: [{
						required: true,
						message: '请输入工号',
						trigger: 'blur'
					}],
					departments: [{
						required: true,
						message: '请选择部门',
						trigger: 'change'
					}],
					username: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				},
			}

		},

		methods: {
			get_info: function(id) {
				this.options=[];
				if(this.type=='add'){
					this.addForm={password: 'gdxcn123',}
					this.rules.password=[{required: true,message: '请输入密码',trigger: 'blur'}]}
				else if(this.type=='edit'){this.rules.password=[]}
				this.api.user_list.EditInfo(id).then((res) => {	
					if (res.data.code == 200) {
						this.options = res.data.data
						if(res.data.data.row.id){
							this.addForm.trueName=res.data.data.row.truename;
							this.addForm.username=res.data.data.row.username;
							this.addForm.departments=res.data.data.row.department?String(res.data.data.row.department):'';
							this.addForm.email=res.data.data.row.email;
							this.addForm.sex=String(res.data.data.row.sex);
							this.addForm.jobs=res.data.data.row.job_id?String(res.data.data.row.job_id):'';
							this.addForm.mobile=res.data.data.row.mobile;
							this.addForm.status=String(res.data.data.row.status);
							this.addForm.roles=res.data.data.row.role_id;
							this.addForm.factorys=res.data.data.row.factorys;
							this.addForm.password=res.data.data.row.password;
							this.addForm.factorys=res.data.data.row.factorys;
							this.addForm.password='gdxcn123';
						}
					} else {
						this.$message.error(res.data.message);
					}
				})
			},
			submitForm: function(addForm) {
				this.$refs[addForm].validate((valid) => {
					if (valid) {
						if (this.type == 'add') {
							this.api.user_list.add(this.addForm).then((res) => {
								if (res.data.code == 200) {
									this.$emit('page_list');
									this.$message.success(res.data.message)
									this.is_show = !this.is_show
								} else {
									this.$message.error(res.data.message)
								}
							})
						} else if (this.type == 'edit') {
							this.api.user_list.edit(this.addForm).then((res) => {
								if (res.data.code == 200) {
									this.$emit('page_list');
									this.$message.success(res.data.message)
									this.is_show = !this.is_show
								} else {
									this.$message.error(res.data.message)
								}
							})
						}

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
	}
</script>
<style scoped lang='less'>
	.el-input {
		width: 218px;
	}

	.el-form-item {
		margin-bottom: 12px;
	}

	.el-input__icon {
		height: 32px !important;
	}
	/deep/.el-select .el-input .el-select__caret{
		height: 32px;
	}
</style>
<style>

</style>
