<template>
  <div v-dialogdrag>
    <el-dialog v-model="is_show" width="550px" title="修改包装工价" destroy-on-close top='7vh'>
      <el-form ref="saveForm" :model="form" :rules="rules" label-width="90px" label-position="right">
        <el-form-item label="成品编码">
          <el-input v-model="form.invCode" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="成品名称">
          <el-input v-model="form.invName" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="成品规格">
          <el-input v-model="form.invStd" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="包装工价" prop="price">
          <el-input v-model="form.price" size="small" maxlength="20"></el-input>
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
    const validatePrice = (rule, value, callback) => {
      if (!/^\d+(\.\d{1,6})?$/.test(value)) {
        callback(new Error("请填写"));
      }
      callback();
    }
    return {
      is_show: false,
      props: { expandTrigger: 'hover', value: 'id', label: 'name' },
      form: {
        invCode: '',
        invName: '',
        invStd: '',
        price: ''
      },
      rules: {
        price: [{ required: true, validator: validatePrice, trigger: 'blur' }],
      }
    };
  },
  methods: {
    submitForm() {
      this.api.production.PackPrice.edit(this.form).then((res) => {
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