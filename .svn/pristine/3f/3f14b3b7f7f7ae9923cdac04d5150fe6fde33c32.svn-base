<template>
  <div v-dialogdrag>
    <el-dialog title="增加工艺" v-model="is_show" width="500px">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="150px">
        <el-form-item label="工艺名称" prop="name">
          <el-input v-model.trim="addForm.name"></el-input>
        </el-form-item>
		<el-form-item label="提前生产天数" prop="days">
		  <el-input v-model.trim="addForm.days" type="number"></el-input>
		</el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addForm')">立即创建</el-button>
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
      addForm: {
        name: "",
		days:"",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
		days: [{ required: true, message: "请输入天数", trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.api.production.Craft.add(this.addForm).then(res => {
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
