<template>
  <div v-dialogdrag>
    <el-dialog title="增加机台" v-model="is_show" width="450px">
      <el-form
        :model="Form"
        :rules="rules"
         ref="Form"
        label-width="100px"
        class="demo-ruleForm"
      >
       <el-form-item label="机器名称"  prop="name">
          <el-input v-model.trim="Form.name"></el-input>
        </el-form-item>
		<el-form-item label="机台特性">
		   <el-input v-model.trim="Form.feature"></el-input>
		</el-form-item>
		<el-form-item label="产能">
		    <el-input v-model.trim="Form.capacity"></el-input>
		</el-form-item>
		 <el-form-item label="额定产能">
		     <el-input v-model.trim="Form.quotaQty"></el-input>
		  </el-form-item>
        <el-form-item label="车间" prop="workshopId">
          <el-select v-model="Form.workshopId" filterable placeholder="请选择" >
            <el-option
              v-for="(item,index) in options.workshops"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="Form.status">
            <el-radio  v-for="(item,index) in options.statusList"   :label="index">{{item}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('Form')">确认</el-button>
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
        status: 1
      },
      id: 0,
      rules: {
        name: [{ required: true, message: "请输入机台名称", trigger: "blur" }],
		workshopId: [{ required: true, message: "请选择车间", trigger: "select" }]
      }
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.api.production.Machine.add(this.Form).then(
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
	/deep/ .el-input__inner{
	    width: 217px;
	}
</style>
