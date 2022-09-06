<template>
  <el-container>
    <el-header>
      <vxe-toolbar ref="PackTaskToolbar" custom print export>
        <template #buttons>
          <vxe-input v-model.trim="search.productNo" placeholder="销售订单号"></vxe-input>
          <vxe-button status="primary" @click="page_list">搜索</vxe-button>
          <vxe-button v-has="['edit']" @click="edit">修改</vxe-button>
          <vxe-button v-has="['split']" @click="split">拆分</vxe-button>
          <vxe-button v-has="['del']" @click="del">删除</vxe-button>
          <vxe-button @click="intend" v-has="['intend']">打印备料单</vxe-button>
          <vxe-button @click="printCard" v-has="['printCard']">打印标识卡</vxe-button>
        </template>
      </vxe-toolbar>
    </el-header>
    <el-main>
      <vxe-table :data="tableData" highlight-current-row highlight-hover-row height="auto" border="full" ref="PackTask"
        keep-source :print-config="{}" :auto-resize="$store.state.autoResize"
        :checkbox-config="{ checkField: 'checked', trigger: 'row', range: true, highlight: true, }">
        <vxe-column type="checkbox" width="60" align="center"></vxe-column>
        <vxe-table-column field="soNo" title="销售订单号" width="120px" align="center"></vxe-table-column>
        <vxe-table-column field="soSeq" title="行号" width="70px" align="center"></vxe-table-column>
        <vxe-table-column field="series" title="系列" width="160px" align="center"></vxe-table-column>
        <vxe-table-column field="orderQty" title="订单数量" width="100px" align="center"></vxe-table-column>
        <vxe-table-column field="invCode" title="成品编码" width="150px" :visible='false'></vxe-table-column>
        <vxe-table-column field="invName" title="成品名称" width="220px"></vxe-table-column>
        <vxe-table-column field="produceDate" title="计划日期" width="150px" align="center"></vxe-table-column>
        <vxe-table-column field="quantity" title="计划数量" width="100px" align="center"></vxe-table-column>
        <vxe-table-column field="orderQualifyQty" title="入库数量" width="100px" align="center"></vxe-table-column>
        <vxe-table-column field="workcenterName" title="工作中心" width="150px" align="center"></vxe-table-column>
        <vxe-table-column field="isPrintCard" title="产品标识卡" width="120px" align="center"></vxe-table-column>
        <vxe-table-column field="status" title="状态" width="120px" align="center">
          <template #default='{ row }'>
            <vxe-button status="success" size="mini" v-if="row.status == '已生成'">{{ row.status }}</vxe-button>
            <vxe-button size="mini" v-else>{{ row.status }}</vxe-button>
          </template>
        </vxe-table-column>

      </vxe-table>
    </el-main>
    <el-footer>
      <page ref="page_data" :totalCount="totalCount" @page_list="page_list" />
    </el-footer>
    <!-- <add  ref='add' @page_list="page_list" /> -->
    <edit ref='edit' title="修改" @page_list="page_list" :FootBtn='false' width="500px">
      <el-form label-width="120px">
        <el-form-item label="日期">
          <vxe-input type="date" v-model="form.date" placeholder="请输入日期" />
        </el-form-item>
        <el-form-item label="工作中心">
          <el-cascader size="small" :show-all-levels="false" v-model="form.workcenterId" :options="WorkGetList"
            :props="{ expandTrigger: 'hover', label: 'name', value: 'id', emitPath: false }">
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </edit>
    <split-dlg ref='splitDlg' title="拆分" @page_list="page_list" :FootBtn='false' width="500px">
      <el-form label-width="120px">
        <el-form-item label="数量">
          <vxe-input type="number" v-model="form.splitNum" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="splitSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </split-dlg>
    <print-card-dlg ref='printCardDlg' title="打印产品标识卡" @page_list="page_list" :FootBtn='false' width="500px">
      <el-form ref="idcardForm" label-width="120px" :model="form" :rules="rulesIdcard">
        <el-form-item label="每层数量(套)" prop="layerNum">
          <vxe-input type="number" v-model="form.layerNum" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="层数" prop="layerCount">
          <vxe-input type="number" v-model="form.layerCount" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.layerRemain" label="将尾数归入最后一板" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="printCardSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </print-card-dlg>
    <IntendPrint ref="IntendPrint" title="打印备料单" width='1200px' />
    <idcard-print ref="IdcardPrint" title="打印产品标识卡" width='800px' />
  </el-container>
</template>
<script>
import page from "@/components/page/page.vue";
import edit from "@/components/TitleSearch/TitleSearch.vue";
import splitDlg from "@/components/TitleSearch/TitleSearch.vue";
import printCardDlg from "@/components/TitleSearch/TitleSearch.vue";
import IntendPrint from "./IntendPrint.vue";
import IdcardPrint from "./IdcardPrint.vue";
export default {
  name: "PackTask",
  components: {
    page,
    edit,
    splitDlg,
    printCardDlg,
    IntendPrint,
    IdcardPrint
  },
  data() {
    return {
      search: {},
      totalCount: 0,
      tableData: [],
      select_id: "",
      auto: true,
      WorkGetList: [],
      form: {},
      rulesIdcard: {
        layerNum: [{ required: true, message: "请输入每层套数", trigger: "blur" }],
        layerCount: [{ required: true, message: "请输入层数", trigger: "blur" }],
      }
    };
  },
  created() {
    this.$nextTick(() => { this.$refs.PackTask.connect(this.$refs.PackTaskToolbar) })
  },
  mounted() {
    this.page_list();
  },
  methods: {
    page_list: function () {
      let pagesize = this.$refs.page_data.page_size;
      let page = this.$refs.page_data.page;
      this.api.production.PackTask.GetList(pagesize, page, this.search).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.rows;
          this.totalCount = parseInt(res.data.data.totalCount);
        } else {
          this.$message.error(res.data.message)
        }
      });
    },
    intend: function () {
      let data = this.$refs.PackTask.getCheckboxRecords();
      if (data.length != 1) { this.$message.error("请选择一条数据"); return false }
      this.$refs.IntendPrint.SelectShow = true;
      this.api.production.PackTask.GetPrintInfo(data[0].id).then(res => {
        if (res.data.code == 200) {
          this.$refs.IntendPrint.table = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      });

    },
    edit: function (row) {
      let data = this.$refs.PackTask.getCheckboxRecords();
      if (data.length < 1) { this.$message.error("请至少选择一条数据"); return false }
      this.$refs.edit.SelectShow = true;
      //获取工作中心
      this.api.production.Assign.getWorkshopWorkcenters().then(res => {
        if (res.data.code == 200) {
          this.WorkGetList = res.data.data.workcenters;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    editSubmit: function () {
      let data = this.$refs.PackTask.getCheckboxRecords();
      let ids = [];
      data.forEach((i, v) => { ids.push(i.id) });
      let obj = { ids: ids, workcenterId: this.form.workcenterId, date: this.form.date };
      this.api.production.PackTask.DispatchWorkcenter(obj).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.message);
          this.page_list();
          this.$refs.edit.SelectShow = false;
        } else {
          this.$message.error(res.data.message);
        }
      })
    },
    del() {
      let data = this.$refs.PackTask.getCheckboxRecords();
      if (data.length < 1) {
        this.$message.error("请选择数据");
        return false
      }
      let ids = [];
      data.forEach((i, v) => { ids.push(i.id) });
      this.$confirm("此操作将删除选中的任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.api.production.PackTask.Delete(ids).then(res => {
          if (res.data.code == 200) {
            this.page_list();
            this.$message.success("删除成功");
          }
        });
      });
    },
    split: function (row) {
      let data = this.$refs.PackTask.getCheckboxRecords();
      if (data.length < 1) {
        this.$message.error("请选择一条数据");
        return false
      }
      this.$refs.splitDlg.SelectShow = true;
    },
    splitSubmit: function () {
      let data = this.$refs.PackTask.getCheckboxRecords();
      let obj = {
        id: data[0].id,
        splitNum: this.form.splitNum
      };
      this.api.production.PackTask.Split(obj).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.message);
          this.page_list();
          this.$refs.splitDlg.SelectShow = false;
        }
      })
    },
    printCard: function (row) {
      let data = this.$refs.PackTask.getCheckboxRecords();
      if (data.length < 1) {
        this.$message.error("请选择一条数据");
        return false
      }
      this.api.production.PackTask.GetIdcardInfo(data[0].id).then(res => {
        if (res.data.code == 200) {
          let idcardInfo = res.data.data.idcardInfo || {};
          this.form.layerNum = idcardInfo.layer_num || '';
          this.form.layerCount = idcardInfo.layer_count || '';
          this.form.layerRemain = idcardInfo.put_remain_last || 0;
        }
      })
      this.$refs.printCardDlg.SelectShow = true;
    },
    printCardSubmit: function () {
      let data = this.$refs.PackTask.getCheckboxRecords();
      if (data.length < 1) {
        this.$message.error("请选择一条数据");
        return false
      }
      this.$refs.idcardForm.validate(valid => {
        if (valid) {
          let obj = {
            id: data[0].id,
            layerNum: this.form.layerNum,
            layerCount: this.form.layerCount,
            layerRemain: this.form.layerRemain,
          };
          this.api.production.PackTask.GetIdcardPrint(obj).then(res => {
            if (res.data.code == 200) {
              this.$refs.printCardDlg.SelectShow = false;
              let info = res.data.data.info;
              info.currentQty = info.layerSum;
              info.currentQrcode = info.taskNo + '-1';
              info.currentPage = 1;
              this.$refs.IdcardPrint.info = info;
              this.$refs.IdcardPrint.SelectShow = true;
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>
<style lang="less" scoped="scoped">
.el-main {
  padding: 0 20px 20px 20px;
}

/deep/ .el-input__suffix-inner i {
  height: 32px;
}
</style>
