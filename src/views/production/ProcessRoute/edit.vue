<template>
   <div v-dialogdrag>
    <el-dialog v-model="is_show" width="700px" title="修改工序路线"  destroy-on-close top='7vh'>
          <el-form ref="form" :model="radioForm" label-width="80px" label-position="left">
            <el-form-item label="物料名称">
              <el-input v-model="radioForm.name" readonly size="small"></el-input>
            </el-form-item>
            <el-form-item label="规格">
              <el-input v-model="radioForm.standard" readonly size="small"></el-input>
            </el-form-item> 
             <el-form-item label="版本号">
              <el-input v-model="version" readonly size="small"></el-input>
            </el-form-item> 
          </el-form>
          <vxe-toolbar>
            <template #buttons>
              <vxe-button icon="fa fa-plus" @click="addItems">新增</vxe-button>
              <vxe-button @click="delItems">删除</vxe-button>
            </template>
          </vxe-toolbar>
         
          <table
            border="1"
            style="border-collapse:collapse;border-spacing: 0;table-layout: fixed; border:1px solid #ccc; font-size:11px; width:98%"
            class="gxTable"
          >
            <thead>
              <tr>
                <td style="width:60px">选项</td>
                <td style="width:80px;">序号</td>
                <td style="width:200px;">工序名称</td>
                <td style="width:80px;">工时</td>
                <td style="width:115px;">工价</td>
                <td style="width:80px;">是否入库</td>
              </tr>
            </thead>
             <div class="gxTableMain">
            <tbody>
              <tr v-for="(itme_tr,tr_index) in items.length" :key="items[tr_index].sorts">
                <td style="text-align: center;width:41px">
                  <el-checkbox v-model="items[tr_index].checked" @change='checkbox(tr_index)'></el-checkbox>
                </td>
                <td style="width:64px;">
                  <select  style="border:1px solid #ccc;width:50px" v-model="items[tr_index].sorts">
                   <option v-for="item in 25"
                        :key="item"
                        :label="item"
                        :value="item"
                        ></option>
                  </select>
                    
                </td>
                <td style="width:188px;">
                    <el-cascader
                       v-model="items[tr_index].processId"
                       :options="options"
                       :props="props"
                       size="mini"
                       ></el-cascader>
                </td>
                 <td style="width: 63px;">
                   <el-input v-model="items[tr_index].workHour" placeholder="工时" size="mini"></el-input>
                </td>
                 <td style="width: 100px;">
                   <el-input v-model="items[tr_index].workPrice" placeholder="工价" size="mini" type='number'></el-input>
                </td>
                 <td style="text-align: center;width:59px;">
                    <vxe-switch v-model="items[tr_index].isStorage" :open-value="1"  :close-value="0"></vxe-switch>
                </td>
              </tr>
            </tbody>
              </div>
          </table>     
           <div style="height:40px;margin-top:8px">
             <el-button type="primary" @click="submitForm('roleForm')" style="float:right;margin:0 8px">确认</el-button>
             <el-button @click="is_show=false" style="float:right">取消</el-button>
           </div>

    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      is_show: false,
      version:'',
      props: { expandTrigger: 'hover',value:'id',label:'name'},
      items: [],
      radioForm: {
        standard:'',
        name:'',
      },
      checked: [],
      options:[],
      delchecked:[],
      select_id:'',
      materialCode:'',
    };
  },
  methods: {
    addItems() {
        this.gx_list++;
      this.items.push({
        name: "",
        material_code: "",
        material_spec: "",
        material_unit: "",
         isStorage:0,
         quotaHour:0,
      });
    },
    submitForm(){
      this.api.production.ProcessRoute.edit(this.select_id,this.items,this.materialCode).then((res)=>{
                  if(res.data.code==200){
                     this.is_show=!this.is_show
								     this.$message.success('添加成功')
								     this.$emit('page_list');
                  }else{
                    if(res.data.data.errors.materialCode){
                       this.$message.error(res.data.data.errors.materialCode)
                    }else{
                      this.$message.error(res.data.data.errors.items)
                    }				    
							 }
      })
    },
    checkbox(value){
    if(this.delchecked.indexOf(value)>-1){
        this.delchecked.splice(this.delchecked.indexOf(value),1)
    }else{
        this.delchecked.push(value)
    }
    },
    delItems(){
      this.delchecked.forEach((v,i)=>{
          this.items.splice(v,1)  
      });
      this.delchecked=[]
      this.items.forEach((v,i)=>{
         v.checked=false
      })
    }
  }
};
</script>
<style lang='less' scoped="scoped">
#add_ProcessRoute {
  border-right: 1px solid #ccc;
  margin-right: 20px;
}
.el-footer {
  overflow: hidden;
}
.el-form-item__label {
  padding: 0 12px 0 10px;
}
thead > tr {
		height: 30px;
		text-align: center;
		background-color: #f2f2f2;
   
	}
.gxTable  tbody td{
 padding:0 10px
}
.gxTable .el-input--mini .el-input__icon{
  height:28px
}
.el-cascader{
  width:100%
}
.gxTableMain{
  width:666px;
  height:467px;

  overflow-y: overlay;
}
.el-form-item{
   margin-bottom: 0px;
}
.el-dialog__body{
    padding:0 20px 30px 20px
}
/deep/ .el-input__suffix-inner i, .el-input__prefix i{
  height: 28px;
}
</style>