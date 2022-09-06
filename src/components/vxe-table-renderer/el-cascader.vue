<template>
	<el-cascader
	    size="mini"
		:show-all-levels="false"
		v-model="row[column.property]"
	    :options="column.editRender.options"
		@change="clearActived"
	    :props="{ expandTrigger: 'hover',label:'name',value:'id',emitPath:false}">
	</el-cascader>
</template>
<script>
import { VXETable } from 'vxe-table'
export default {
	props:{
		params:{
			type: Object,
			default:{},
		},
	},
	data(){
		return{
			row:null,
			column:null,
			text:111,
			props: { expandTrigger: 'hover',label:'name',value:'id',emitPath:false,},
			TableEvent:'',
		};	
	},
	created () {
	    this.load()
		//事件拦截  兼容element ui
		VXETable.interceptor.add('event.clearActived', (params, event) => {
					  return false
				   })	 
		},
	methods:{
		  load () {
		        const { row, column } = this.params
		        this.row = row
		        this.column = column
		     },
			//即时保存，清除单元格选中状态
		  clearActived(){
			  this.params.$table.clearActived()
		  }
	  }
}
 </script>
 <style scoped>
	/deep/ .el-input__suffix-inner i{
		height: 32px;
	}
 </style>