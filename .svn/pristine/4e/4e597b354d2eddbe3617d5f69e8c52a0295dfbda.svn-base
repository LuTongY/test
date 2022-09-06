<template>
  <div v-dialogdrag>
    <el-dialog title="修改班组" v-model="is_show" width="500px">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="班组名称" prop="name">
              <el-input v-model.trim="form.name"></el-input>
        </el-form-item>
        <el-form-item label="组长" prop="workNo">
          <el-select v-model="form.workNo" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in options.staffs"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
           <el-form-item label="车间" prop="workshopId">
          <el-select v-model="form.workshopId" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in options.workshops"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="排序" >
              <el-input v-model.trim="form.sorts" type="number"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">确认</el-button>
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
      options: {},
      form: {
        name: "",
        place: "",
        status: 1
      },
      rules: {
        name: [{ required: true, message: "请输入内容", trigger: "blur" }],
        workNo: [{ required: true, message: "请选择组长", trigger: "change" }],
        workshopId: [{ required: true, message: "请选择车间", trigger: "change" }],
        sorts: [{ required: true, message: "请输入内容", trigger: "blur" }],
      }
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.api.production.Team.edit(this.form).then(
            res => {
              if (res.data.code == 200) {
                this.is_show = !this.is_show;
                this.$message.success("更新成功");
                console.log(this.$parent);
                this.$emit("page_list");
              } else {
                this.$message.error(res.data.message);
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
<style lang='less' scoped>
/deep/ .el-input__inner{
    width: 217px;
}
</style>
