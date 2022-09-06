<template>
	<div class="drawerMain">
	<el-drawer v-model="this.$store.state.Drawer" title="参数配置" :before-close="closeDrawer" direction="rtl" size="20%" >
		<el-container>
			<el-main>
			<el-scrollbar height="calc(100vh - 50px)">
		   <el-form ref="form" class="drawerForm">
			<el-form-item >
				<label   slot="label">表格的尺寸
				  <el-tooltip content="修改会刷新页面" placement="bottom">
				    <i  class="fa fa-question-circle-o" />
				  </el-tooltip>
				</label>	
				<vxe-select v-model="form.tableSize" placeholder="默认尺寸" @change="updateConfigured('tableSize')">	
					<vxe-option value="medium" label="偏大"></vxe-option>
					<vxe-option value="small" label="适中"></vxe-option>
					<vxe-option value="mini" label="偏小"></vxe-option>
				</vxe-select>
		 </el-form-item>	  
		</el-form>
		 </el-scrollbar >
		</el-main>
		<el-footer>
			foot
		</el-footer>
		</el-container>
	</el-drawer>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				form: {
					tableSize: this.$store.state.Configured.tableSize
				}
			}
		},
		methods: {
			closeDrawer: function() {
				this.$store.dispatch("changeDrawer")
			},
			updateConfigured: function(key) {
				localStorage.setItem("Configured", JSON.stringify(this.form))
				this.$store.dispatch("updateConfigured", {
					'key': key,
					'value': this.form[key]
				})
				location.reload();
			}
		}
	}
</script>
<style >
	.drawerMain .el-container{
		height: calc(100vh - 50px);
	}
	.drawerMain .el-footer{
		border-top: 1px solid #ccc;
	}
	.drawerMain /deep/.el-drawer__header{
		margin-bottom: 0 !important;
	}
	.drawerForm label{
		margin-right: 30px;
	}
</style>

