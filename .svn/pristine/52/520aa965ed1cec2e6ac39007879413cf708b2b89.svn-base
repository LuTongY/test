<template>
	<div v-dialogdrag>
		<el-dialog title="上级菜单" v-model="is_tree_show" width="500px">
			<div style="max-height: 500px;height:500px">
				<el-input placeholder="请输入名称" v-model="filterText"></el-input>
				
			<div style="height: calc(100% - 52px);border: 1px solid #ccc;margin-top: 10px;">
				<el-scrollbar height="446px">
				 <el-tree :default-checked-keys="checked" 
				     class="filter-tree" 
				    :data="data" 
				     :props="defaultProps"
					 @check-change="handleNodeClick"
					show-checkbox 
					node-key="id" 
					:filter-node-method="filterNode" 
					:check-strictly="check_strictly"
					ref="tree1">
				</el-tree>
				</el-scrollbar>
			</div>
			 
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click.stop="is_tree_show = false">取 消</el-button>
					<el-button type="primary" @click.stop="affirm_bt">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		props:['tree_options','parent_id','edit_form','parent_id_title'],
			watch: {
				filterText(val) {
					this.$refs.tree1.filter(val);
				}
			},
			data() {
				return {
					check_strictly:true,
					id: '',
					is_tree_show: false,
					filterText: '',
					data: [],
					defaultProps: {
						children: 'children',
						label: 'title'
					},
					checked: [362],
					checkedId:'',
				};
			},
			mounted() {
			},
			methods: {
				get_auth: function() {
					console.log(this.tree_options)
					this.data=this.tree_options		
					this.checked=[this.parent_id]
				},
				filterNode: function(value, data) {
					if (!value) return true;
					return data.title.indexOf(value) !== -1;
				},
				handleNodeClick:function(data, checked, node) {
				    if(checked === true) {
				        this.checkedId = data.id;
				        this.$refs.tree1.setCheckedKeys([data.id]);
				    } else {
				        if (this.checkedId == data.id) {
				        this.$refs.tree1.setCheckedKeys([data.id]);
				        }
				    }
				},
				affirm_bt:function(){
					this.is_tree_show=!this.is_tree_show
					let check=this.$refs.tree1.getCheckedNodes()
					this.$emit('updateTreeDate',check)
				},
				get_title:function(){
					let check=this.$refs.tree1.getCheckedNodes()
					return check[0].title;
				}
			},
		}
	</script>
	<style scoped>
		/deep/.el-dialog__body {
			padding: 10px 20px 0px 20px;
			border-top: 1px solid #ccc;
		}
	
		/deep/.filter-tree {
			margin-top: 12px;
		}
		
	</style>
	
