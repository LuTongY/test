<template>
  <div v-dialogdrag>
    <el-dialog :title="(is_edit ? '修改' : '添加') + '沟通记录'" v-model="is_show" width="670px">
      <el-form :model="logSaveForm" :rules="rules" ref="saveForm" label-width="100px">
        <el-scrollbar height="450px" style="padding-right:20px">
          <el-form-item label="沟通时间" prop="contactTime">
            <vxe-input v-model="logSaveForm.contactTime" type="datetime" label-format="yyyy-MM-dd HH:mm" maxlength="16"
              clearable></vxe-input>
          </el-form-item>
          <el-form-item label="沟通类型" prop="type">
            <template v-for="(item, key) in typeOption" :key="key">
              <el-radio v-model="logSaveForm.type" :label="key">{{ item }}</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="时长" prop="duration">
            <el-col :span="8">
              <el-input v-model.trim="logSaveForm.duration" maxlength="10"></el-input>
            </el-col>
            <el-col :span="4" style="padding-left:5px;">分钟</el-col>
          </el-form-item>
          <el-form-item label="截图凭证" prop="pictures" v-if="logSaveForm.type != 3">
            <el-upload v-show="upload" class="upload-demo" drag multiple accept="image/*" ref="upload"
              :on-progress="onUploadProgress" :on-success="onUploadSuccess" :on-error="onUploadError" :action=uploadUrl
              :with-credentials="credentials" :data="data" :show-file-list="false">
              <i class="fa fa-2x" :class="uploadIcon" style="color: #42A2FA;margin-top: 8px;"></i>
            </el-upload>
            <div class="upload-demo upload-demo-list" v-for="(item, key) in logSaveForm.pictures" :key="key">
              <a :href="item" target="_blank"><img :src="item" class="upload-img" /></a>
              <i class="fa fa-close" @click="removePicture(key)"></i>
            </div>
          </el-form-item>
          <el-form-item label="沟通结果" prop="remark">
            <vxe-textarea v-model="logSaveForm.remark" resize="vertical" style="line-height: 2;"></vxe-textarea>
          </el-form-item>
        </el-scrollbar>
        <el-form-item style="padding-top: 10px;">
          <el-button type="primary" @click="submitForm()">确定</el-button>
          <el-button @click="is_show = false; $refs.saveForm.resetFields();">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    let that = this;
    let validateDuration = (rule, value, callback) => {
      console.log(rule, value, callback)
      if (!/^\d+$/.test(value) || value <= 0) {
        return callback(new Error('请输入时长'));
      }
      callback();
    };
    return {
      is_edit: false,
      is_show: false,
      candidateId: 0,
      logSaveForm: {
        contactTime: "",
        type: "",
        typeName: "",
        duration: "",
        pictures: [],
        remark: ""
      },
      contactIndex: '',
      upload: true,
      credentials: true,
      uploadIcon: "fa-plus",
      uploadUrl: this.axios.defaults.baseURL + "/hr/candidate-contact/upload",
      data: {
        'factoryId': localStorage.getItem('factory'),
        'accessToken': localStorage.getItem('accessToken')
      },
      rules: {
        contactTime: [{ required: true, message: "请选择沟通时间", trigger: "blur" }],
        duration: [{ required: true, validator: validateDuration, trigger: "blur", }],
        pictures: [{ required: true, message: "请上传截图凭证", trigger: "blur" }],
      },
    };
  },
  methods: {
    onUploadProgress: function () {
      this.uploadIcon = "fa-refresh fa-spin"
    },
    onUploadSuccess: function (response, file, fileList) {
      this.uploadIcon = "fa-plus"
      if (response.code == 200) {
        this.logSaveForm.pictures.push(response.data.filepath);
      } else {
        this.$message.error(response.message)
      }
    },
    onUploadError: function (response, file, fileList) {
      this.uploadIcon = "fa-plus"
      this.$message.error(response.message);
    },
    removePicture: function (key) {
      var count = this.logSaveForm.pictures.length;
      var array = new Array();
      for (var i = 0; i < count; i++) {
        if (i != key) {
          array.push(this.logSaveForm.pictures[i]);
        }
      }
      this.logSaveForm.pictures = array;
      console.log(this.logSaveForm.pictures);
    },
    submitForm() {
      var that = this;
      this.$refs.saveForm.validate((valid) => {
        if (valid) {
          if (that.logSaveForm.type == 3) {
            that.logSaveForm.pictures = [];
          }
          that.logSaveForm.contactTime = that.logSaveForm.contactTime.substr(0, 16)
          that.logSaveForm.typeName = that.typeOption[that.logSaveForm.type];
          that.$emit("callback", that.logSaveForm, that.contactIndex);
          that.is_show = !that.is_show;
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang='less' scoped>
/deep/ .el-header {
  height: 30px !important;
}

/deep/.upload-demo {
  width: 80px;
  height: 100px;
  float: left;
  margin: 0 5px 5px 0;
}

/deep/.upload-demo-list {
  border: 1px solid #d9d9d9;
  position: relative;
}

/deep/.upload-demo-list i {
  position: absolute;
  background-color: #bbb;
  color: #fff;
  padding: 3px;
  top: -5px;
  right: -5px;
  border-radius: 100%;
  height: 14px;
  width: 14px;
  text-align: center;
  cursor: pointer;
}

/deep/.upload-demo .upload-img {
  width: 100%;
  height: 100%;
}

/deep/.el-upload {
  width: 80px;
  height: 100px;
}

/deep/.el-upload-dragger,
.download {
  width: 80px;
  height: 100px;
}

.download {
  border: 1px solid #ccc;
}

.download p {
  color: red;
}

.p_bt {
  text-align: center;
  margin-top: 40px;
}
</style>