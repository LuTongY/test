<template>
  <div v-dialogdrag>
    <el-dialog title="新增工作组" v-model="is_show" width="600px">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="120px"
        class="demo-ruleForm"
      >
	  <el-form-item label="工作中心编码" prop="code">
	        <el-input v-model.trim="form.code"></el-input>
	  </el-form-item>
        <el-form-item label="工作中心名称" prop="name">
              <el-input v-model.trim="form.name"></el-input>
        </el-form-item>
		<el-form-item label="车间" prop="workshopId">
		  <el-select v-model="form.workshopId" filterable placeholder="请选择" @change="GetEquipments">
		    <el-option
		      v-for="(item,index) in options.workshops"
		      :key="index"
		      :label="item"
		      :value="index"
		    ></el-option>
		  </el-select>
		</el-form-item>
        <el-form-item label="人员" prop="persons">
          <el-select v-model="form.persons" filterable placeholder="请选择" multiple>
            <el-option
              v-for="(item,index) in options.staffs"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
		<el-form-item label="设备" >
		  <el-select v-model="form.equipments" filterable placeholder="请选择" multiple>
		    <el-option
			  multiple
		      v-for="(item,index) in options.machines"
		      :key="index"
		      :label="item"
		      :value="index"
		    ></el-option>
		  </el-select>
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
      form: {
        name: "",
        place: "",
        status: 1,
		persons:[],
      },
      id: 0,
      rules: {
		code: [{ required: true, message: "请输入编码", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        persons: [{ required: true, message: "请选择人员", trigger: "select" }],
		equipments: [{ required: true, message: "请选择设备", trigger: "change" }],
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
          this.api.production.WorkCenter.edit(this.form).then(
            res => {
              if (res.data.code == 200) {
                this.is_show = !this.is_show;
                this.$message.success(res.data.message);
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
    },
	GetEquipments:function(){
		this.form.equipments=[]
		this.api.production.WorkCenter.GetWorkshopMachine(this.form.workshopId).then(res=>{
			if(res.data.code==200){
				this.options.machines=res.data.data.machineList
			}else{
				this.$message.error(res.data.message)
			}
		})
		}
  }
};
</script>
<style lang='less' scoped>
/deep/ .el-input__inner{
    width: 420px;
}

</style>
