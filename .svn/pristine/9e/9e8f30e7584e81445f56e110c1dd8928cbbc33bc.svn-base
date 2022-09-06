<template>
  <el-container>
    <el-header>
      <vxe-toolbar>
        <template #buttons>
          <vxe-input v-model.trim="search.name" placeholder="工艺名称"></vxe-input>
          <vxe-button status="primary" @click="page_list">搜索</vxe-button>
          <vxe-button v-has="['add']" @click="add">新增</vxe-button>
          <vxe-button v-has="['edit']" @click="edit">修改</vxe-button>
          <vxe-button v-has="['del']" @click="del">删除</vxe-button>
        </template>
      </vxe-toolbar>
    </el-header>
    <el-main>
      <vxe-table
        :data="tableData"
        highlight-current-row
        highlight-hover-row
        height="auto"
        border="full"
        ref="Craft"
        :auto-resize="$store.state.autoResize"
        @cell-click="selectId"
         :checkbox-config="{checkField: 'checked', trigger: 'row',range: true,highlight: true,}"
      >
       <vxe-column type="checkbox" width="60" align="center"></vxe-column>
        <vxe-table-column field="rowNum" title="序号" width="80px" align="center"></vxe-table-column>
        <vxe-table-column field="name" title="工艺名称"  width="120px"></vxe-table-column>
		<vxe-table-column field="days" title="提前生产天数"  width="120px"></vxe-table-column>
        <vxe-table-column field="updateUser" title="维护人"   width="180px"></vxe-table-column>
        <vxe-table-column field="updateTime" title="维护日期"  width="220px"></vxe-table-column>
      </vxe-table>
    </el-main>
    <el-footer>
      <page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
    </el-footer>
     <add  ref='add' @page_list="page_list" />
     <edit  ref='edit' @page_list="page_list" />
  </el-container>
 
</template>
<script>
import page from "@/components/page/page.vue";
import add from "./add.vue";
import edit from "./edit.vue";
export default {
  name: "Craft",
  components: {
    page,
    add,
    edit,
  },
  data() {
    return {
      search: {},
      totalCount: 0,
      tableData: [],
      select_id: "",
      auto: true
    };
  },
  mounted() {
    this.page_list();
  },
  methods: {
    page_list: function() {
      let pagesize = this.$refs.page_data.page_size;
      let page = this.$refs.page_data.page;
      this.api.production.Craft.GetList(
        pagesize,
        page,
        this.search
      ).then(res => {
        this.tableData = res.data.data.rows;
        this.totalCount = parseInt(res.data.data.totalCount);
      });
    },
    selectId: function(item) {
      this.select_id = item.row.id;
    },
    add: function() {
      this.$refs.add.is_show = !this.$refs.add.is_show;
      this.$refs.add.addForm.name='';
    },
    edit:function(){
     let data = this.$refs.Craft.getCheckboxRecords();
     if (data.length < 1) {this.$message.error("请先选择工艺");return false}else if(data.length >1){this.$message.error("修改只能单选");return false}
     this.api.production.Craft.EditInfo(data[0].id).then((res)=>{
         if(res.data.code==200){
             this.$refs.edit.is_show=!this.$refs.edit.is_show;
             this.$refs.edit.addForm=res.data.data.row
         }else{

         }
         })
    },
    del: function() {
     let data = this.$refs.Craft.getCheckboxRecords();
     if (data.length < 1) {this.$message.error("请先选择工艺");return false}
      let ids = [];
      data.forEach((i, v) => {ids.push(i.id)});
      this.$confirm("此操作将删除该工艺, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.api.production.Craft.del(ids).then(res => {
          this.page_list();
          this.$message.success("删除成功");
        });
      });
    }
  }
};
</script>
<style lang="less" scoped="scoped">
.el-main {
  padding: 0 20px 20px 20px;
}
</style>