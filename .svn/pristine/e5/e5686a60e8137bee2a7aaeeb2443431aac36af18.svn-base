<template>
  <div v-dialogdrag>
    <el-dialog title="修改部门" v-model="is_show" width="400px">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model.trim="addForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addForm')">确认</el-button>
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
      addForm: {
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.api.hr.Department.edit(this.addForm).then(res => {
            if (res.data.code == 200) {
              this.is_show = !this.is_show;
              this.$emit("page_list");
              this.$message.success("修改成功");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
