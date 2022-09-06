<template>
  <div v-dialogdrag>
    <el-dialog title="编辑职位" v-model="is_show" width="450px">
      <el-form :model="Form" :rules="rules" ref="Form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="departmentName">
          <el-select v-model="Form.departmentName" filterable placeholder="请选择" @blur="selectBlur">
            <el-option v-for="(item, index) in options.departments" :key="index" :label="item" :value="item">
            </el-option>
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
      props: {
        expandTrigger: "hover",
        value: "id",
        label: "name",
        multiple: true,
        checkStrictly: true,
        emitPath: false
      },
      Form: {
        status: 1
      },
      id: 0,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        departmentName: [{ required: true, message: "请选择部门", trigger: "select" }]
      }
    };
  },
  mounted() { },
  methods: {
    selectBlur(even) {
      if (even.target.value) {
        this.Form.departmentName = even.target.value;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.Form.id = this.id
          this.api.hr.Post.edit(this.Form).then(
            res => {
              if (res.data.code == 200) {
                this.is_show = !this.is_show;
                this.$message.success("修改成功");
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
/deep/ .el-input__inner {
  width: 217px;
}
</style>
