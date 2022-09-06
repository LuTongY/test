<template>
  <div v-dialogdrag>
    <el-dialog title="工序人员绑定" v-model="is_show" width="500px">
      <el-form
        :model="roleForm"
        :rules="rules"
        ref="roleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="车间工序">
          <el-cascader v-model="gx" :options="options.processList" :props="props"></el-cascader>
        </el-form-item>
        <el-form-item label="人员">
          <el-select v-model="user" filterable placeholder="请选择" multiple>
            <el-option
              v-for="(item,index) in options.user"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="roleForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('roleForm')">确认</el-button>
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
      gx: "",
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
      roleForm: {
        name: "",
        place: "",
        status: 1
      },
      id: 0,
      rules: {
        name: [{ required: true, message: "请输入内容", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.api.production.ProcessPerson.add(this.gx, this.user,this.roleForm.status).then(
            res => {
              if (res.data.code == 200) {
                this.is_show = !this.is_show;
                this.$message.success("添加成功");
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
