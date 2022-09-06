<template>
  <div v-dialogdrag>
    <el-dialog v-model="is_show" width="550px" title="修改钢管规格" destroy-on-close top='7vh'>
      <el-form ref="saveForm" :model="form" :rules="getRules()" label-width="90px" label-position="right">
        <el-form-item label="物料编码">
          <el-input v-model="form.invCode" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="物料名称">
          <el-input v-model="form.invName" disabled size="small"></el-input>
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
      <div style="height:40px;margin-top:8px">
        <el-button type="primary" @click="submitForm()" style="float:right;margin:0 8px">确认</el-button>
        <el-button @click="is_show = false" style="float:right">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      is_show: false,
      props: { expandTrigger: 'hover', value: 'id', label: 'name' },
      typeList: [],
      form: {
        invCode: '',
        invName: '',
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
    submitForm() {
      this.api.production.Pipe.edit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.is_show = !this.is_show
          this.$message.success('修改成功')
          this.$emit('page_list');
        }
      })
    },
  }
};
</script>
<style lang='less' scoped="scoped">
.el-form-item {
  margin-bottom: 10px;
}

/deep/ .el-form-item__error {
  padding-top: 0;
}

.w_px_320 {
  width: 320px;
}
</style>