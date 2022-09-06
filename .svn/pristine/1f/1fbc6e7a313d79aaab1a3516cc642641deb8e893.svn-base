<template>
	<div v-dialogdrag>
		<el-dialog title="修改" v-model="is_show" width="400px" destroy-on-close>
			<el-form :model="form" :rules="rules" ref="saveForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="排程时间" prop="produceDate">
					<vxe-input v-model="form.produceDate" placeholder="选择日期" type="date"></vxe-input>
				</el-form-item>
				<el-form-item label="加工机台" prop="machineId">
					<el-cascader :options="machineOptions"
						:props="{ expandTrigger: 'hover', value: 'id', label: 'name' }" @change="changeMachineId" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm()">确认</el-button>
					<el-button @click="is_show = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			is_show: false,
			form: {
				id: [],
				produceDate: '',
				workcenterId: '',
				machineId: '',
			},
			rules: {
				produceDate: [{ required: true, message: '请选择', trigger: 'blur' }],
				machineId: [{ required: true, message: '请选择', trigger: 'blur' }],
			},
			machineOptions: [],
		};
	},
	methods: {
		init() {
			this.api.production.TaskPipe.GetInfo().then(res => {
				if (res.data.code == 200) {
					this.machineOptions = res.data.data.machineOptions;
				}
			});
		},
		changeMachineId(e) {
			this.form.workcenterId = e[0];
			this.form.machineId = e[1];
		},
		submitForm: function () {
			this.$refs.saveForm.validate((valid) => {
				if (valid) {
					this.api.production.TaskPipe.Edit(this.form).then(res => {
						if (res.data.code == 200) {
							this.is_show = false;
							this.$message.success(res.data.message)
							this.$emit('page_list')
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
	}
};
</script>
<style lang="less" scoped="scoped">
.el-main {
	padding: 0 20px 20px 20px;
}

/deep/.el-dialog__body {
	padding: 10px 20px 20px 20px;
}

/deep/.is-error input {
	border: 1px solid #f56c6c;
}
</style>
