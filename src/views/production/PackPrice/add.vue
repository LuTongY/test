<template>
  <div v-dialogdrag>
    <el-dialog v-model="is_show" width="800px" title="添加包装工价" destroy-on-close top='7vh'>
      <el-form ref="saveForm" :model="form" label-width="90px" label-position="right">
        <el-form-item label="选择成品">
          <el-button size="small" @click="chooseInv">选择</el-button>
        </el-form-item>
        <el-form-item label="设置工价">
          <vxe-table :data="dataList" height="450" border="full" show-overflow header-align="center" highlight-hover-row
            highlight-current-row :edit-config="{ trigger: 'click', mode: 'cell' }">
            <vxe-table-column field="invCode" title="成品编码" width="140" align="center"></vxe-table-column>
            <vxe-table-column field="invName" title="成品名称"></vxe-table-column>
            <vxe-table-column field="invStd" title="成品规格"></vxe-table-column>
            <vxe-table-column field="price" title="包装工价"
              :edit-render="{ name: 'input', attrs: { type: 'number', placeholder: '最多保留6位小数点' } }">
            </vxe-table-column>
          </vxe-table>
        </el-form-item>
      </el-form>
      <div style="height:40px;margin-top:8px">
        <el-button type="primary" @click="submitForm()" style="float:right;margin:0 8px">确认</el-button>
        <el-button @click="is_show = false" style="float:right">取消</el-button>
      </div>
    </el-dialog>
    <choose-inv ref="chooseDlg" @callback="setInvList" />
  </div>
</template>
<script>
import ChooseInv from "./ChooseInv.vue";
export default {
  components: {
    ChooseInv
  },
  data() {
    return {
      is_show: false,
      search: {},
      dataList: []
    };
  },
  methods: {
    chooseInv() {
      this.$refs.chooseDlg.is_show = true;
      this.$nextTick(() => {
        this.$refs.chooseDlg.page_list();
      });
    },
    setInvList(data) {
      this.dataList = data;
    },
    submitForm() {
      let flag = true;
      let array = [];
      this.dataList.forEach(function (item) {
        array.push({
          invCode: item.invCode,
          price: item.price,
        })
        if (!item.price || !/^\d+(\.\d{1,6})?$/.test(item.price)) {
          flag = false;
        }
      })
      if (array.length <= 0) {
        this.$message.error('请选择成品');
        return false;
      }
      if (!flag) {
        this.$message.error('请完善工价');
        return false;
      }

      this.api.production.PackPrice.add({ data: array }).then((res) => {
        if (res.data.code == 200) {
          this.is_show = !this.is_show
          this.$message.success('添加成功')
          this.$emit('page_list');
        }
      })
    },
  }
};
</script>
<style lang='less' scoped="scoped">
.el-main {
  padding-top: 0;
  padding-bottom: 5px;
}

.el-footer {
  height: 35px;
  overflow: hidden;
}

#searchInv {
  border-right: 1px solid #ccc;
  margin-right: 20px;
}

#pipeInfo .el-form-item {
  margin-bottom: 10px;
}

/deep/ #pipeInfo .el-form-item__error {
  padding-top: 0;
}

.w_px_320 {
  width: 320px;
}
</style>