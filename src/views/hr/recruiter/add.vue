<template>
  <div v-dialogdrag>
    <el-dialog title="增加招聘人员" v-model="is_show" width="450px">
      <el-form :model="Form" :rules="rules" ref="Form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="选择人员" prop="staffNo">
          <el-select v-model="Form.staffNo" filterable placeholder="请选择">
            <el-option v-for="(item, index) in options.users" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('Form')">确认</el-button>
          <el-button @click="is_show = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      is_show: false,
      options: {},
      user: "",
      props: {
        expandTrigger: "hover",
        value: "id",
        label: "name",
        multiple: true,
        checkStrictly: true,
        emitPath: false
      },
      Form: {
        staffNo:''
      },
      id: 0,
      rules: {
        staffNo: [{ required: true, message: "请选择", trigger: "select" }]
      }
    };
  },
  mounted() { },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.api.hr.Recruiter.add(this.Form).then(
            res => {
              if (res.data.code == 200) {
                this.is_show = !this.is_show;
                this.$message.success("添加成功");
                this.$emit("page_list");
              } else {
                this.$message.error(res.data.data.errors.name);
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style leng="less" scoped>
/deep/.el-input__inner {
  width: 217px;
}
</style>
