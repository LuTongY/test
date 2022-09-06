<template>
  <el-container>
    <el-header>
      <vxe-toolbar ref="candidateToolbar" custom print export>
        <template #buttons>
          <el-select v-model="search.recruiter" placeholder="请选择招聘人员" class="search-row" size="medium">
            <el-option value="" label="全部"></el-option>
            <el-option v-for="(item, key) in recruiterList" :key="key" :label="item" :value="key"></el-option>
          </el-select>
          <el-select v-model="search.department" placeholder="请选择部门" class="search-row" size="medium">
            <el-option value="" label="全部"></el-option>
            <el-option v-for="(item, key) in departmentList" :key="key" :label="item" :value="key"></el-option>
          </el-select>
          <vxe-input placeholder="应聘者" v-model="search.name" class="search-row"></vxe-input>
          <el-select v-model="search.priority" placeholder="请选择优先级" class="search-row" size="medium">
            <el-option v-for="(item, key) in priorityList" :key="key" :label="item" :value="key"></el-option>
          </el-select>
          <vxe-button status="primary" @click="page_list">搜索</vxe-button>
        </template>
      </vxe-toolbar>
    </el-header>
    <el-main>
      <vxe-table :data="tableData" highlight-current-row highlight-hover-row height="auto" border="full" ref="DataList"
        show-overflow :export-config="{}" :print-config="{}" :auto-resize="$store.state.autoResize"
        @cell-click="selectId" :checkbox-config="{
          checkField: 'checked',
          trigger: 'row',
          range: true,
          highlight: true,
        }">
        <vxe-column type="checkbox" width="60" align="center"></vxe-column>
        <vxe-table-column field="recruiter" title="招聘人员" width="80px" align="center"></vxe-table-column>
        <vxe-table-column field="name" title="应聘者" width="80px"></vxe-table-column>
        <vxe-table-column field="department" title="应聘部门" width="120px"></vxe-table-column>
        <vxe-table-column field="post" title="应聘岗位" width="150px" align="center"></vxe-table-column>
        <vxe-table-column field="priority" title="优先级" width="80px" align="center"></vxe-table-column>
        <vxe-table-column field="contactTime" title="联系时间" width="150px" align="center"></vxe-table-column>
        <vxe-table-column field="contactType" title="联系类型" width="130px" align="center"></vxe-table-column>
        <vxe-table-column field="contactDuration" title="联系时长(分钟)" width="120px" align="right"></vxe-table-column>
        <vxe-table-column field="tel" title="联系电话" width="130px" align="center"></vxe-table-column>
        <vxe-table-column field="wx" title="微信号" width="130px" align="center"></vxe-table-column>
        <vxe-table-column field="isAddWx" title="已加微信" width="80px" align="center"></vxe-table-column>
        <vxe-column field="resume" title="简历附件" width="120px">
          <template #default="{ row }">
            <a :href="row.resume" target="_blank">{{ row.resumeName }}</a>
          </template>
        </vxe-column>
        <vxe-table-column field="salaryRequire" title="薪资要求" width="100px" align="center"></vxe-table-column>
        <vxe-table-column field="contactResult" title="沟通结果"></vxe-table-column>
      </vxe-table>
    </el-main>
    <el-footer>
      <page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
    </el-footer>
    <save ref="save" @page_list="page_list" />
    <contactLog ref="contactLog" @page_list="page_list" />
  </el-container>
</template>
<script>
import page from "@/components/page/page.vue";
export default {
  name: "Candidate",
  components: {
    page,
  },
  data() {
    return {
      search: {},
      totalCount: 0,
      tableData: [],
      select_id: "",
      auto: true,
      departmentList: [],
      recruiterList: [],
      priorityList: [],
    };
  },
  mounted() {
    this.page_list();
  },
  created() {
    this.$nextTick(() => {
      // 手动将表格和工具栏进行关联
      this.$refs.DataList.connect(this.$refs.candidateToolbar)
    })
  },
  methods: {
    page_list: function () {
      let pagesize = this.$refs.page_data.page_size;
      let page = this.$refs.page_data.page;
      this.api.hr.Candidate.GetContactDetailList(pagesize, page, this.search).then(
        (res) => {
          this.tableData = res.data.data.rows;
          this.departmentList = res.data.data.departmentList;
          this.recruiterList = res.data.data.recruiterList;
          this.priorityList = res.data.data.priorityList;
          this.totalCount = parseInt(res.data.data.totalCount);
        }
      );
    },
    selectId: function (item) {
      this.select_id = item.row.id;
    },
  },
};
</script>
<style lang="less" scoped="scoped">
.el-main {
  padding: 0 20px 20px 20px;
}

.search-row {
  margin-right: 8px;
}
</style>