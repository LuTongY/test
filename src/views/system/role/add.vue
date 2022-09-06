<template>
  <div v-dialogdrag>
    <el-dialog title="增加角色" v-model="is_show" width="500px">
      <el-form
        :model="roleForm"
        :rules="rules"
        ref="roleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-model="roleForm.role_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('roleForm')">立即创建</el-button>
          <el-button @click="is_show=false">取消</el-button>
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
      roleForm: {
        role_name: ""
      },
      rules: {
        role_name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.roleForm.role_name = "";
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.api.user_role.add(this.roleForm.role_name).then(res => {
            if (res.data.code == 200) {
              this.is_show = !this.is_show;
              this.$emit("page_list");
              this.$message.success("添加成功");
            } else {
              this.$message.error(res.data.message);
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
