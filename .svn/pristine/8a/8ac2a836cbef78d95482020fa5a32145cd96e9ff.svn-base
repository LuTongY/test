<template>
  <el-container>
    <el-header>
      <vxe-toolbar>
        <template #buttons>
          <vxe-button status="primary" @click="showSearch">查询</vxe-button>
          <vxe-button @click="exportList()">导出</vxe-button>
        </template>
      </vxe-toolbar>
    </el-header>
    <el-main>
      <vxe-table :data="tableData" highlight-current-row highlight-hover-row height="auto" border="full"
        ref="RecruitmentPlanStat" :auto-resize="$store.state.autoResize" @cell-click="selectId" show-overflow
        :checkbox-config="{ checkField: 'checked', trigger: 'row', range: true, highlight: true, }">
        <vxe-column type="expand" width="40">
          <template #content="{ row }">
            <vxe-grid :columns="childColumns" :data="row.children" :auto-resize="$store.state.autoResize"
              highlight-current-row highlight-hover-row></vxe-grid>
          </template>
        </vxe-column>
        <vxe-table-column field="recruiterName" title="招聘负责人"></vxe-table-column>
      </vxe-table>
    </el-main>
    <Dialog width="500px" title="查询" ref="search" @page_list="page_list">
      <el-form label-width="120px">
        <el-form-item label="招聘人员">
          <vxe-select v-model="search.recruiterId" placeholder="招聘人员" style="margin-right: 8px;">
            <vxe-option label="全部"></vxe-option>
            <vxe-option v-for="(item, index) in option.recruiterList" :key="index" :value="index" :label="item">
            </vxe-option>
          </vxe-select>
        </el-form-item>
        <el-form-item label="部门">
          <vxe-select v-model="search.departmentId" placeholder="部门" style="margin-right: 8px;">
            <vxe-option label="全部"></vxe-option>
            <vxe-option v-for="(item, index) in option.departmentList" :key="index" :value="index" :label="item">
            </vxe-option>
          </vxe-select>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker v-model="search.startTime" type="date" placeholder="开始日期" value-format="YYYY-MM-DD">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </Dialog>
  </el-container>

</template>
<script>
import Dialog from "@/components/TitleSearch/TitleSearch.vue";
import page from "@/components/page/page.vue";
export default {
  name: "recruitmentPlanStat",
  components: {
    page,
    Dialog
  },
  data() {
    return {
      search: {},
      totalCount: 0,
      tableData: [],
      select_id: "",
      auto: true,
      option: {},
      childColumns: [
        { field: "recruiterName", title: "招聘负责人", width: "100px", align: "center" },
        { field: "departmentName", title: "所在部门", width: "120px" },
        { field: "postName", title: "招聘职位", width: "120px" },
        { field: "demandQty", title: "需招聘人数", width: "100px", align: "right" },
        { field: "startTime", title: "分配开始日期", width: "110px" },
        { field: "endTime", title: "分配结束日期", width: "110px" },
        { field: "hireCount", title: "已录用人数", width: "100px", align: "right" },
        { field: "checkinCount", title: "已报到人数", width: "100px", align: "right" },
        { field: "checkinDate", title: "已招到报到时间", width: "120px" },
        { field: "uncheckinCount", title: "录用未到岗人数", width: "120px", align: "right" },
        { field: "hireLeaveCount", title: "入职后离职人数", width: "120px", align: "right" },
        { field: "onJobCount", title: "现在职人数", width: "100px", align: "right" },
        { field: "rule", title: "奖励标准", width: "150px" },
        { field: "reward", title: "招聘奖励", width: "150px" },
        { field: "remark", title: "备注", width: "150px" },
      ]
    };
  },
  mounted() {
    this.get_info();
  },
  methods: {
    get_info: function () {
      this.api.hr.RecruitmentPlanStat.getInfo().then(res => {
        this.option.departmentList = res.data.data.departmentList;
        this.option.recruiterList = res.data.data.recruiterList;
      });
    },
    page_list: function () {
      if (!this.search.startTime) {
        this.$message.error('请填写开始日期');
        return false;
      }
      this.api.hr.RecruitmentPlanStat.GetList(
        this.search
      ).then(res => {
        this.tableData = res.data.data.dataList;
        this.option.departmentList = res.data.data.departmentList;
        this.option.recruiterList = res.data.data.recruiterList;
      });
    },
    showSearch: function () {
      this.$refs.search.SelectShow = true;
    },
    selectId: function (item) {
      this.select_id = item.row.id;
    },
    exportList: function () {
      if (!this.search.startTime) {
        this.$message.error('请填写开始日期');
        return false;
      }
      this.api.hr.RecruitmentPlanStat.export(
        this.search
      ).then(res => {
        if (res.data.code == 200) {
          window.location.href = res.data.data.exportList[0].url
        }
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
