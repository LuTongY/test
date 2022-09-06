<template>
  <div v-dialogdrag>
    <el-dialog v-model="is_show" width="1100px" title="添加钢管规格" destroy-on-close top='7vh'>
      <el-row>
        <el-col :span="12">
          <el-container id="searchInv">
            <el-header style="min-width:auto;">
              <vxe-toolbar>
                <template #buttons>
                  <vxe-input v-model="search.code" placeholder="子件编码"></vxe-input>
                  <vxe-input v-model="search.name" placeholder="子件名称" style="margin-left: 15px;"></vxe-input>
                  <vxe-button status="primary" @click="page_list">搜索</vxe-button>
                </template>
              </vxe-toolbar>
            </el-header>
            <el-main>
              <vxe-table :data="addtableData" height="490" border="full" show-overflow header-align="center"
                highlight-hover-row highlight-current-row :radio-config="{ trigger: 'row' }"
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
        <el-col :span="11" id='pipeInfo'>
          <el-form ref="saveForm" :model="form" :rules="getRules()" label-width="90px" label-position="right">
            <el-form-item label="物料名称">
              <el-input v-model="form.invName" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="物料规格">
              <el-input v-model="form.invStd" disabled size="small"></el-input>
            </el-form-item>
            <el-form-item label="长管形状" prop="type">
              <el-radio-group v-model="form.type">
                <el-radio :label="item.id" v-for="(item, index) in typeList" :key="index">{{ item.name }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="长管规格" prop="longStd">
              <el-input v-model="form.longStd" size="small" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="长管管长" class="w_px_320" prop="length">
              <el-input v-model="form.length" size="small" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="长管管径" class="w_px_320" prop="diameter" v-if="form.type == 2">
              <el-input v-model="form.diameter" size="small" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="长管边长" prop="side" v-else>
              <el-col :span="6">
                <el-input v-model="form.sideLong" size="small" placeholder="长"></el-input>
              </el-col>
              <el-col :span="4" style="padding:0 10px;">x</el-col>
              <el-col :span="6">
                <el-input v-model="form.sideWide" size="small" placeholder="宽"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="长管管厚" class="w_px_320" prop="thickness">
              <el-input v-model="form.thickness" size="small" maxlength="8"></el-input>
            </el-form-item>
            <el-form-item label="损耗长度" class="w_px_320" prop="loss">
              <el-input v-model="form.loss" size="small" maxlength="8"></el-input>
            </el-form-item>
            <el-form-item label="短管长度" class="w_px_320" prop="shortLength">
              <el-input v-model="form.shortLength" size="small" maxlength="8"></el-input>
            </el-form-item>
            <el-form-item label="短管节数" class="w_px_320" prop="pitchNum">
              <el-input v-model="form.pitchNum" size="small" maxlength="8"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" size="small"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div style="height:40px;margin-top:8px">
        <el-button type="primary" @click="submitForm()" style="float:right;margin:0 8px">确认</el-button>
        <el-button @click="is_show = false" style="float:right">取消</el-button>
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
      search: {},
      addtableData: [],
      typeList: [],
      totalCount: 0,
      form: {
        invCode: '',
        invName: '',
        invStd: '',
        type: 1,
        longStd: '',
        length: '',
        diameter: '',
        sideLong: '',
        sideWide: '',
        thickness: '',
        loss: '',
        shortLength: '',
        pitchNum: '',
        remark: ''
      },
    };
  },
  methods: {
    getRules() {
      const validateSide = (rule, value, callback) => {
        let regexp = /^\d+(\.\d+)?$/
        if (!regexp.test(this.form.sideLong) || !regexp.test(this.form.sideWide)) {
          callback(new Error("请填写"));
        }
        callback();
      }
      const validateFloat = (rule, value, callback) => {
        let regexp = /^\d+(\.\d+)?$/
        if (!regexp.test(value)) {
          callback(new Error("请填写"));
        }
        callback();
      }
      let rules = {
        longStd: [{ required: true, message: '请填写', trigger: 'blur' }],
        length: [{ required: true, validator: validateFloat, trigger: 'blur' }],
        thickness: [{ required: true, message: '请填写', trigger: 'blur' }],
        shortLength: [{ required: true, message: '请填写', trigger: 'blur' }],
        pitchNum: [{ required: true, message: '请填写', trigger: 'blur' }],
      };
      if (this.form.type == 2) {
        rules.diameter = [{ required: true, message: '请填写', trigger: 'blur' }];
      } else {
        rules.side = [{ required: true, validator: validateSide, trigger: 'blur' }]
      }
      return rules;
    },
    page_list() {
      let pagesize = this.$refs.page_data.page_size;
      let page = this.$refs.page_data.page;
      this.$refs.page_data.layout = "total,  pager, next";
      this.api.production.Pipe.GetMaterialList(
        pagesize,
        page,
        this.search
      ).then(res => {
        if (res.data.code == 200) {
          this.addtableData = res.data.data.rows;
          this.totalCount = parseInt(res.data.data.totalCount);
        }
      });
    },
    radioChange(row) {
      this.form.invCode = row.row.code;
      this.form.invName = row.row.name;
      this.form.invStd = row.row.standard;

      if (/\(((\d+(\.\d+)?)\*(\d+(\.\d+)?)\*(\d+(\.\d+)?)\*(\d+(\.\d+)?))m+/.test(this.form.invName)) { // 方管
        this.form.sideLong = RegExp.$2;
        this.form.sideWide = RegExp.$4;
        this.form.thickness = RegExp.$6;
        this.form.shortLength = RegExp.$8;
        this.form.type = 1;
      } else if (/\(((\d+(\.\d+)?)\*(\d+(\.\d+)?)\*(\d+(\.\d+)?))m+/.test(this.form.invName)) { // 圆管
        this.form.diameter = RegExp.$2;
        this.form.sideLong = RegExp.$2;
        this.form.sideWide = RegExp.$2;
        this.form.thickness = RegExp.$4;
        this.form.shortLength = RegExp.$6;
        this.form.type = 2;
      }
    },
    submitForm() {
      this.$refs.saveForm.validate((valid) => {
        if (valid) {
          this.api.production.Pipe.add(this.form).then((res) => {
            if (res.data.code == 200) {
              this.is_show = !this.is_show
              this.$message.success('添加成功')
              this.$emit('page_list');
            }
          })
        } else {
          return false;
        }
      });
    },
  }
};
</script>
<style lang='less' scoped="scoped">
.el-main {
  padding-top: 0;
  padding-bottom: 5px;
}

.el-footer {
  height: 35px;
  overflow: hidden;
}

#searchInv {
  border-right: 1px solid #ccc;
  margin-right: 20px;
}

#pipeInfo .el-form-item {
  margin-bottom: 10px;
}

/deep/ #pipeInfo .el-form-item__error {
  padding-top: 0;
}

.w_px_320 {
  width: 320px;
}
</style>