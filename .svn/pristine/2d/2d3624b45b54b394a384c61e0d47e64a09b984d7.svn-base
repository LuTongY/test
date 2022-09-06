<template>
   <!-- title:系统日志
   auth:路通
   data:2021-07-15 -->
   <el-container>
       <el-header>
      <vxe-toolbar>
          <template #buttons>
           <vxe-input placeholder="请输入账号或姓名" v-model="keyword" style="margin-right:8px;height: 32px;line-height: 32px;" ></vxe-input>
           <el-date-picker
              v-model="date"
              size="small"
              type="daterange"
              format="YYYY-MM-DD"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"       
            ></el-date-picker>
            <vxe-button status="primary" icon="el-icon-search"  @click="page_list()" size="small" style="margin-left:8px">搜索</vxe-button>
          </template>
        </vxe-toolbar>
          </el-header>
       <el-main>
        <vxe-table
          :data="tableData"
		  show-overflow
           highlight-current-row
          highlight-hover-row
		  ref="singleTable"
          height="auto"
		  border="full"
		   :auto-resize="$store.state.autoResize"
          >
        <vxe-table-column field="truename" title="姓名" width="100"></vxe-table-column>
        <vxe-table-column field="type" title="类型" ></vxe-table-column>
        <vxe-table-column field="content" title="内容" width="420"></vxe-table-column>
        <vxe-table-column field="url" title="url" width="320"></vxe-table-column>
        <vxe-table-column field="create_time" title="时间" width="200"></vxe-table-column>
        <vxe-table-column field="ip" title="IP" width="150"></vxe-table-column>
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
      totalCount:0
    };
  },
  activated() {
    this.page_list();
  },
  mounted() {},
  methods: {
    page_list: function() {
      let pagesize = this.$refs.page_data.page_size;
      let page = this.$refs.page_data.page;
      let start_time, end_time;
      if (this.date) {
        start_time = this.edit_date(this.date[0]);
        end_time = this.edit_date(this.date[1]);
      }
      this.api.system
        .GetList(pagesize, page, this.keyword, start_time, end_time)
        .then(res => {
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
