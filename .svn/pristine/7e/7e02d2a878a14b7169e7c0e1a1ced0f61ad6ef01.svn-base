<template>
   <el-container>
       <el-header>
      <vxe-toolbar  >
          <template #buttons>
            <vxe-input v-model.trim="search.materialCode" placeholder="物料编码"></vxe-input>
            <vxe-input v-model.trim="search.name" placeholder="工序路线名称"></vxe-input>
            <vxe-button status="primary" @click="page_list"  >搜索</vxe-button>
            <vxe-button v-has="['add']" @click="add">新增</vxe-button>
            <vxe-button v-has="['edit']" @click="edit">修改</vxe-button>
            <vxe-button v-has="['del']" @click="del">删除</vxe-button>
             <vxe-button v-has="['clone']" @click="clone">复制</vxe-button>
             <vxe-button v-has="['audit']" @click="audit">审核</vxe-button>
          </template>
        </vxe-toolbar>
          </el-header>
       <el-main>
        <vxe-table
            :data="tableData"
            :highlight-current-row="row"
            :highlight-hover-row="row"
            height="auto"
            border="full"
			resizable
			show-overflow
          :auto-resize="$store.state.autoResize"
           @cell-click="selectId"
           header-align='center'
          >
          <vxe-table-column    field="rowNum" title="序号"  width="80" align="center"></vxe-table-column>
          <vxe-table-column    field="materialCode" title="物料编码"  width="140" align="center"></vxe-table-column>     
          <vxe-table-column    field="name" title="工序路线名称"  align="left"></vxe-table-column>
          <vxe-table-column    field="materialSpec" title="规格" width="150" align="center"></vxe-table-column>
          <vxe-table-column    field="routeShow" title="工序路线"  align="left" ></vxe-table-column>
          <vxe-table-column    field="updateUser" title="维护人"  width="120"></vxe-table-column>
          <vxe-table-column    field="updateTime" title="维护日期" width="150"></vxe-table-column>
		  <vxe-table-column    field="auditUser" title="审核人" width="150"></vxe-table-column>
          <vxe-table-column    field="auditStatus" title="审核状态" width="100" align="center">
           <template #default="{ row }">
                 <el-button type="warning"  size='mini'  v-if="row.auditStatus==0">未审核</el-button>
                 <el-button type="success"  size='mini' v-if="row.auditStatus==1">已审核</el-button>
                <el-button type="danger"  size='mini'  v-if="row.auditStatus==2">被驳回</el-button>
            </template>
           </vxe-table-column>
         
        </vxe-table>
       </el-main>
      <el-footer>
        <page ref="page_data"  :totalCount="totalCount" @page_list='page_list'/>
      </el-footer>
      <add  ref='add'   @page_list='page_list'/>
      <edit ref='edit'  @page_list='page_list'/>
      <clone ref='clone' @page_list='page_list'/>
       <audit ref='audit'   @page_list='page_list'/>
   </el-container>
</template>


<script>
import page from '@/components/page/page.vue';
import add from './add.vue';
import edit from './edit.vue';
import clone from './clone.vue';
import audit from './audit.vue';
export default {
  name:'ProcessRoute',
  components:{
    page,
    add,
    edit,
    clone,
    audit,
  },
  data(){
    return{
        row:true,
        search:{},
        totalCount: 0,
        tableData: [],
        select_id:'',
        materialCode:'',
    }
   
  },
  mounted(){
      this.page_list();
  },
   methods:{
       page_list: function() {
                 let pagesize=this.$refs.page_data.page_size;
				 let page=this.$refs.page_data.page;
				this.api.production.ProcessRoute.GetList(pagesize, page,this.search).then((res) => {
                    if(res.data.code==200){
	                   this.tableData = res.data.data.rows
					           this.totalCount = parseInt(res.data.data.totalCount)
                    }else{
                        this.$message.error(res.data.message)
                    }
				
				})
      },
      selectId:function(item){
        this.select_id=item.row.id
        this.materialCode=item.row.materialCode
			},
      add:function(){
        this.$refs.add.is_show=!this.$refs.add.is_show
        this.$refs.add.roleForm={}
        this.$refs.add.addtableData=[],
         this.$refs.add.gx_list=1,
          this.$refs.add.totalCount=0,
          this.$refs.add.addsearch={},
          this.$refs.add.items=[{name: "",material_code: "",material_spec: "",material_unit: "",isStorage:0,quotaHour:0,sorts:1}]
          this.$refs.add.radioForm={}
        this.api.production.ProcessRoute.EditInfo().then((res)=>{
          if(res.data.code==200){
            this.$refs.add.options=res.data.data.processList
          }else{
            this.$message.error(res.data.message)
          }
        })
      },
      edit:function(){
        if(!this.select_id){this.$message.error("请先选择部件"); return false}
        this.$refs.edit.items={}
        this.$refs.edit.version='';
        this.$refs.edit.materialCode={}
        this.$refs.edit.radioForm={standard:'',name:''}
        this.$refs.edit.is_show=!this.$refs.edit.is_show;
        this.$refs.edit.select_id=this.select_id;
        this.api.production.ProcessRoute.EditInfo(this.select_id).then((res)=>{
          if(res.data.code==200){
              this.$refs.edit.options=res.data.data.processList  
              this.$refs.edit.radioForm.name=res.data.data.row.materialCode
              this.$refs.edit.items=res.data.data.row.items
              this.$refs.edit.radioForm.standard=res.data.data.row.materialSpec
              this.$refs.edit.version=res.data.data.row.version
              this.$refs.edit.materialCode=this.materialCode 
              this.$refs.edit.select_id=this.select_id
              this.$refs.edit.items.forEach((v,i)=>{
                v.isStorage=parseInt(v.isStorage);
              })
          }
        })
      },
      	del: function() {
				if(!this.select_id){this.$message.error("请先选择部件"); return false}
				this.$confirm('此操作将删除该部件工序路线, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {   
					this.api.production.ProcessRoute.del(this.select_id).then((res) => {
						this.page_list()
						this.$message.success('删除成功')
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
			
				})
      },
      clone(){
        	if(!this.select_id){this.$message.error("请先选择要复制的部件"); return false}
            this.$refs.clone.is_show=!this.$refs.clone.is_show
        this.$refs.clone.roleForm={}
        this.$refs.clone.clonetableData=[],
          this.$refs.clone.totalCount=0,
          this.$refs.clone.clonesearch={},
          this.$refs.clone.radioForm={}
        this.api.production.ProcessRoute.EditInfo(this.select_id).then((res)=>{
          if(res.data.code==200){
              this.$refs.clone.options=res.data.data.processList
              this.$refs.clone.items=res.data.data.row.items
              this.$refs.clone.version=res.data.data.row.version
              this.$refs.clone.materialCode=this.materialCode 
              this.$refs.clone.select_id=this.select_id  
              this.$refs.clone.items.forEach((v,i)=>{
                v.isStorage=parseInt(v.isStorage);
              })
          }
        })
      },
        audit:function(){
        if(!this.select_id){this.$message.error("请先选择工序路线"); return false}
        this.$refs.audit.items=[]
        this.$refs.audit.version='';
        this.$refs.audit.materialCode={}
        this.$refs.audit.radioForm={standard:'',name:''}
        this.$refs.audit.is_show=!this.$refs.audit.is_show;
        this.$refs.audit.select_id=this.select_id;
        this.api.production.ProcessRoute.EditInfo(this.select_id).then((res)=>{
          if(res.data.code==200){
              this.$refs.audit.options=res.data.data.processList  
              this.$refs.audit.radioForm.name=res.data.data.row.materialCode
              this.$refs.audit.items=res.data.data.row.items
              this.$refs.audit.radioForm.standard=res.data.data.row.materialSpec
              this.$refs.audit.version=res.data.data.row.version
              this.$refs.audit.materialCode=this.materialCode 
              this.$refs.audit.select_id=this.select_id
              this.$refs.audit.items.forEach((v,i)=>{
                v.isStorage=parseInt(v.isStorage);
              })
          }
        })
      },
   },
}

</script>
<style lang="less" scoped="scoped">
.el-main{
    padding: 0 20px 20px 20px;
}
.vxe-input{
  margin-right: 18px;
}
</style>