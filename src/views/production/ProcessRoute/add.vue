<template>
   <div v-dialogdrag>
    <el-dialog v-model="is_show" width="1200px" title="添加工序路线"  destroy-on-close top='7vh'>
      <el-row>
        <el-col :span="11">
          <el-container id="add_ProcessRoute">
            <el-header>
              <vxe-toolbar>
                <template #buttons>
                  <vxe-input v-model="addsearch.code" placeholder="子件编码"></vxe-input>
                  <vxe-input v-model="addsearch.name" placeholder="子件名称" style="margin-left: 15px;"></vxe-input>
                  <vxe-button status="primary" @click="page_list">搜索</vxe-button>
                </template>
              </vxe-toolbar>
            </el-header>
            <el-main>
              <vxe-table 
			    :data="addtableData" 
				height="575" 
				border="full"
				show-overflow
				header-align="center" 
				highlight-hover-row 
				highlight-current-row
                :radio-config="{ trigger: 'row'}"
				 @radio-change="radioChange"> 
                <vxe-column type="radio" title="选项" width="50" align="center"></vxe-column>
                <vxe-table-column field="code" title="子件编码" width="140" align="center"></vxe-table-column>
                <vxe-table-column field="name" title="子件名称" align="left"></vxe-table-column>
              </vxe-table>
            </el-main>
            <el-footer>
              <page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
            </el-footer>
          </el-container>
        </el-col>
        <el-col :span="13" id='gxListTitle'>
          <el-form ref="form" :model="radioForm" label-width="80px" label-position="left">
            <el-form-item label="物料名称">
              <el-input v-model="radioForm.name" readonly size="small"></el-input>
            </el-form-item>
            <el-form-item label="规格">
              <el-input v-model="radioForm.standard" readonly size="small"></el-input>
            </el-form-item>
            <el-form-item label="版本号">
              <el-input v-model="Version" readonly size="small"></el-input>
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
                <td style="width:50px">选项</td>
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
                <td style="text-align: center;width:29px">
                  <el-checkbox v-model="items[tr_index].checked" @change='checkbox(tr_index)'></el-checkbox>
                </td>
                <td style="width:61px;">
                  <select  style="border:1px solid #ccc;width:50px" v-model="items[tr_index].sorts">
                   <option v-for="item in 25"
                        :key="item"
                        :label="item"
                        :value="item"
                        ></option>
                  </select>
                    
                </td>
                <td style="width:181px;">
                    <el-cascader
                       v-model="items[tr_index].processId"
                       :options="options"
                       :props="props"
                       size="mini"
                       ></el-cascader>
                </td>
                 <td style="width: 61px;">
                   <el-input v-model="items[tr_index].workHour" placeholder="工时" size="mini"></el-input>
                </td>
                 <td style="width: 95px;">
                   <el-input v-model="items[tr_index].workPrice" placeholder="工价" size="mini" type='number'></el-input>
                </td>
                 <td style="text-align: center;width:60px;border-right: none;">
                    <vxe-switch v-model="items[tr_index].isStorage" :open-value="1" :close-value="0"></vxe-switch>
                </td>
              </tr>
            </tbody>
              </div>
          </table>
        
        </el-col>
      </el-row>
           <div style="height:40px;margin-top:8px">
             <el-button type="primary" @click="submitForm('roleForm')" style="float:right;margin:0 8px">确认</el-button>
             <el-button @click="is_show=false" style="float:right">取消</el-button>
           </div>

    </el-dialog>
  </div>
</template>
<script>
import page from "@/components/page/page.vue";
export default {
  components: {
    page
  },
  data() {
    return {
      is_show: false,
      addsearch: {},
      addtableData: [],
      totalCount: 0,
      Version:'',
      props: { expandTrigger: 'hover',value:'id',label:'name'},
      items: [
        {
          name: "",
          material_code: "",
          material_spec: "",
          material_unit: "",
          isStorage:0,
          quotaHour:0,
          sorts:1,
        }
      ],
      code: "",
      name: "",
      radioForm: {},
      checked: [],
      gx_list: 1,
      options:[],
      delchecked:[],
    };
  },
  methods: {
    page_list() {
      let pagesize = this.$refs.page_data.page_size;
      let page = this.$refs.page_data.page;
      this.$refs.page_data.layout="total,  pager, next";
      this.api.production.ProcessRoute.GetMaterialList(
        pagesize,
        page,
        this.addsearch
      ).then(res => {
        if (res.data.code == 200) {
          this.addtableData = res.data.data.rows;
          this.totalCount = parseInt(res.data.data.totalCount);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
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
      this.items.forEach((v,i)=>{
         v.sorts=i+1;
      })
    },
    radioChange(row){
      this.radioForm=row.row
      this.api.production.ProcessRoute.Version(this.radioForm.code).then((res)=>{
          if(res.data.code==200){
            this.Version=res.data.data.version
          }else{
            this.$message.error(res.data.message)
          }
      })
    },
    submitForm(){
      this.api.production.ProcessRoute.add(this.items,this.radioForm.code).then((res)=>{
                  if(res.data.code==200){
                         this.is_show=!this.is_show
					     this.$message.success('添加成功')
						 this.$emit('page_list');
                  }else{
                      this.$message.error(res.data.message)	    
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
         v.sorts=i+1;
         v.checked=false
      })
    }
  }
};
</script>
<style lang='less' scoped="scoped">
/deep/ .el-dialog__body{
	padding-top: 0;
	padding-bottom: 5px;
}
#add_ProcessRoute {
  border-right: 1px solid #ccc;
  margin-right: 20px;
}
.el-footer {
	height: 35px;
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
/deep/ .el-input__suffix-inner i, .el-input__prefix i{
  height: 28px;
}
.el-main{
	padding-top: 0;
	padding-bottom: 5px;
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
#gxListTitle .el-form-item{
   margin-bottom: 0px;
}
</style>