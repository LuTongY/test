<template>
   <!-- title:系统日志
   auth:路通
   data:2021-07-15 -->
   <el-container>
       <el-header>
      <vxe-toolbar>
          <template #buttons>
           <vxe-input placeholder="存货编码" v-model="search.code" style="margin-right:8px;height: 32px;line-height: 32px;" ></vxe-input>
           <vxe-input placeholder="存货名称" v-model="search.name" style="margin-right:8px;height: 32px;line-height: 32px;" ></vxe-input>
            <vxe-button status="primary" icon="el-icon-search"  @click="page_list()" size="small" style="margin-left:8px">搜索</vxe-button>
          </template>
        </vxe-toolbar>
          </el-header>
       <el-main>
        <vxe-table
          :data="tableData"
           highlight-current-row
          highlight-hover-row
		  ref="singleTable"
          height="auto"
		  border="full"
		   :auto-resize="$store.state.autoResize"
          >
        <vxe-table-column field="rowNum" title="序号" width="80" align="center"></vxe-table-column>
        <vxe-table-column field="code" title="存货编码" width="180"></vxe-table-column>
        <vxe-table-column field="name" title="存货名称" width="380"></vxe-table-column>
        <vxe-table-column field="standard" title="规格" width="180"></vxe-table-column>
        <!-- <vxe-table-column field="cid" title="分类" width="120"></vxe-table-column> -->
        <vxe-table-column field="createUser" title="创建人" width="150"></vxe-table-column>
        <vxe-table-column field="updateUser" title="更新人" width="150"></vxe-table-column>
        <vxe-table-column field="updateTime" title="更新时间" width="150"></vxe-table-column>
        <vxe-table-column field="unit" title="单位" width="120"></vxe-table-column>
        <vxe-table-column field="type" title="类别" :formatter="({ cellValue })=>{ return  cellValue==1?'半成品':'成品'}" width="120"></vxe-table-column>
        </vxe-table>	
       </el-main>
      <el-footer>
        <page ref="page_data"  :totalCount="totalCount" @page_list='page_list'/>
      </el-footer>
   </el-container>
</template>
<script>
import page from "@/components/page/page.vue";
export default {
  name:'system_log',
  components: {
    page
  },
  data() {
    return {
      keyword: "",
      pageSize: 0,
      tableData: [],
      date: "",
      totalCount:0,
      search:{}
    };
  },

  mounted() {
      this.page_list();
  },
  methods: {
    page_list: function() {
      let pagesize = this.$refs.page_data.page_size;
      let page = this.$refs.page_data.page;
      let start_time, end_time;
      if (this.date) {
        start_time = this.edit_date(this.date[0]);
        end_time = this.edit_date(this.date[1]);
      }
      this.api.production.Inventory.GetList(pagesize, page, this.search).then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.rows;
            this.totalCount = parseInt(res.data.data.totalCount)
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    edit_date(dateData) {
      let date = new Date(dateData);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      const time = y + "-" + m + "-" + d;
      return time;
    }
  }
};
</script>
<style scoped="scoped">
.system_log_main {
  height: 100%;
  width: 100%;
  background-color: #fff;
}

.system_log_main_head {
  height: 90px;
  padding: 12px 20px;
}

.system_log_main_table {
  padding: 0px 20px;
}

.system_log_main_head li:not(:first-child) {
  padding: 0 8px;
}
.el-main{
    padding: 0 20px 20px 20px;
}
</style>
<style>
.el-button--primary {
  background-color: #1d94fa;
  border-color: #1d94fa;
}

.el-button--danger {
  color: #fff;
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}
</style>
