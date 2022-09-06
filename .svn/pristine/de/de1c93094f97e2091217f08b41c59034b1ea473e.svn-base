<template>
  <el-container>
    <el-header>
      <vxe-toolbar ref="RecruitmentReportToolbar" custom print export>
        <template #buttons>
          <vxe-input v-model="search.date[0]" placeholder="起始日期" type="date" parse-format="yyyy-dd-MM" clearable></vxe-input>
          <span style="padding: 0 10px;">至</span>
          <vxe-input v-model="search.date[1]" placeholder="结束日期" type="date" parse-format="yyyy-dd-MM" clearable></vxe-input>

          <vxe-button status="primary" @click="page_list">搜索</vxe-button>
          <vxe-button v-has="['add']" @click="save(false)">新增</vxe-button>
          <vxe-button v-has="['edit']" @click="save(true)">修改</vxe-button>
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
        ref="DataList"
        show-overflow
        :export-config="{}"
        :print-config="{}"
        :auto-resize="$store.state.autoResize"
        @cell-click="selectId"
        :checkbox-config="{
          checkField: 'checked',
          trigger: 'row',
          range: true,
          highlight: true,
        }"
      >
        <vxe-column type="checkbox" width="60" align="center"></vxe-column>
        <vxe-table-column field="id" title="ID" width="60px" align="center"></vxe-table-column>
        <vxe-table-column field="date" title="日期" width="100px" align="center"></vxe-table-column>
        <vxe-table-column field="recruiter" title="招聘人员" width="80px" align="center"></vxe-table-column>
        <vxe-table-column field="department" title="部门" width="120px" align="center"></vxe-table-column>
        <vxe-table-column field="post" title="应聘岗位" width="150px" align="center"></vxe-table-column>
        <vxe-table-column field="channel" title="应聘渠道" width="120px" align="center"></vxe-table-column>
        <vxe-table-column field="name" title="姓名" width="80px" align="center"></vxe-table-column>
        <vxe-table-column field="sex" title="性别" width="60px" align="center"></vxe-table-column>
        <vxe-table-column field="age" title="出生年月/年龄" width="100px" align="center"></vxe-table-column>
        <vxe-table-column field="tel" title="联系电话" width="130px" align="center"></vxe-table-column>
        <vxe-table-column field="education" title="学历" width="80px" align="center"></vxe-table-column>
        <vxe-table-column field="workExp" title="工作年限" width="80px" align="center"></vxe-table-column>
        <vxe-table-column field="currentPost" title="目前职务" width="120px" align="center"></vxe-table-column>
        <vxe-table-column field="currentCompany" title="目前公司" width="120px" align="center"></vxe-table-column>
        <vxe-table-column field="salaryRequire" title="薪资要求" width="100px" align="center"></vxe-table-column>
        <vxe-table-column field="source" title="类型" width="100px" align="center"></vxe-table-column>
        <vxe-table-column field="telResult" title="电话结果" width="100px" align="center"></vxe-table-column>
        <vxe-table-column field="description" title="电话邀约情况描述" width="150px" align="center"></vxe-table-column>
        <vxe-table-column field="isArrive" title="是否到面" width="90px" align="center"></vxe-table-column>
        <vxe-table-column field="firstTest" title="初试评价" width="200px" align="center"></vxe-table-column>
        <vxe-table-column field="firstResult" title="初试结果" width="200px" align="center"></vxe-table-column>
        <vxe-table-column field="recommender" title="推荐接收人" width="100px" align="center"></vxe-table-column>
        <vxe-table-column field="secondTest" title="复试评价" width="200px" align="center"></vxe-table-column>
        <vxe-table-column field="isHire" title="是否录用" width="90px" align="center"></vxe-table-column>
        <vxe-table-column field="checkinExpect" title="预计报到时间" width="100px" align="center"></vxe-table-column>
        <vxe-table-column field="isCheckin" title="是否报到" width="90px" align="center"></vxe-table-column>
        <vxe-table-column field="checkinActual" title="实际报到时间" width="100px" align="center"></vxe-table-column>
        <vxe-table-column field="regularTime" title="转正时间" width="100px" align="center"></vxe-table-column>
        <vxe-table-column field="isRegular" title="是否通过转正" width="90px" align="center"></vxe-table-column>
        <vxe-table-column field="remark" title="备注" width="200px" align="center"></vxe-table-column>
      </vxe-table>
    </el-main>
    <el-footer>
      <page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
    </el-footer>
    <save ref="save" @page_list="page_list" />
  </el-container>
</template>
<script>
import page from "@/components/page/page.vue";
import save from "@/views/hr/recruitmentReport/save.vue";
export default {
  name: "recruitmentReport",
  components: {
    page,
    save
  },
  data() {
    return {
      search: {date:[]},
      totalCount: 0,
      tableData: [],
      select_id: "",
      auto: true,
    };
  },
  mounted() {
    this.page_list();
  },
  created () {
    this.$nextTick(() => {
      // 手动将表格和工具栏进行关联
      this.$refs.DataList.connect(this.$refs.RecruitmentReportToolbar)
    })
  },
  methods: {
    page_list: function () {
      let pagesize = this.$refs.page_data.page_size;
      let page = this.$refs.page_data.page;
      this.api.hr.RecruitmentReport.GetList(pagesize, page, this.search).then(
        (res) => {
          this.tableData = res.data.data.rows;
          this.totalCount = parseInt(res.data.data.totalCount);
          this.search = res.data.data.search;
        }
      );
    },
    selectId: function (item) {
      this.select_id = item.row.id;
    },
    save: function (isEdit) {
      let id = 0;
      let data = this.$refs.DataList.getCheckboxRecords();
      if(isEdit) {
        if (data.length < 1) {
          this.$message.error("请先选择数据");
          return false;
        } else if (data.length > 1) {
          this.$message.error("修改只能选择一条数据");
          return false;
        }
        id = data[0].id;
      }
      this.api.hr.RecruitmentReport.EditInfo(id).then((res) => {
        if (res.data.code == 200) {
          var row = res.data.data.row;
          row.isArrive = row.isArrive.toString();
          row.isHire = row.isHire.toString();
          row.isCheckin = row.isCheckin.toString();
          row.isRegular = row.isRegular.toString();

          this.$refs.save.is_edit = id ? true:false;
          this.$refs.save.is_show = !this.$refs.save.is_show;
          this.$refs.save.saveForm = row;
          this.$refs.save.sexOption = res.data.data.sexOption;
          this.$refs.save.departmentOption = res.data.data.departmentOption;
          this.$refs.save.educationOption = res.data.data.educationOption;
          this.$refs.save.judgmentOption = res.data.data.judgmentOption;
        }
      });
    },
    del: function () {
      let data = this.$refs.DataList.getCheckboxRecords();
      if (data.length < 1) {
        this.$message.error("请先选择数据");
        return false;
      }
      let ids = [];
      data.forEach((i, v) => {
        ids.push(i.id);
      });
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.api.hr.RecruitmentReport.Del(ids).then((res) => {
          console.log(res)
          if(res.data.code == 200) {
            this.$message.success("删除成功");
          }
          this.page_list();
        });
      });
    },
  },
};
</script>
<style lang="less" scoped="scoped">
.el-main {
  padding: 0 20px 20px 20px;
}
</style>