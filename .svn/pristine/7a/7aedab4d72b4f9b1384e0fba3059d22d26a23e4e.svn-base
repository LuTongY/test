<template>
  <el-container>
    <el-header>
      <vxe-toolbar>
        <template #buttons>
          <vxe-input v-model.trim="search.name" placeholder="请输入名称" @keyup="handleSearch"></vxe-input>
          <vxe-button @click="handleSearch"  >搜索</vxe-button>
          <vxe-button @click="get_edit('add')" v-has="['add']">添加菜单</vxe-button>
          <vxe-button @click="get_edit('edit')" v-has="['edit']">修改</vxe-button>
          <vxe-button v-has="['delete']" @click="del_systemMenuList">删除</vxe-button>
		 <vxe-switch v-model="mobile" size='medium' open-label="PC端" :open-value="false" close-label="移动端" :close-value="true" @change="switch" ></vxe-switch>
        </template>
      </vxe-toolbar>
    </el-header>
    <el-main>
      <vxe-table
        highlight-current-row
        highlight-hover-row
        resizable
        show-overflow
        height="auto"
        :auto-resize="$store.state.autoResize"
        ref="main_tree"
        border="full"
        @current-change="handler"
        :tree-config="{ children: 'children', hasChildren: 'hasChildren',iconOpen:'fa fa-minus-square-o' ,iconClose: 'fa fa-plus-square-o',line: false }"
        :data="tableData"
      >
        <vxe-column field="id" title="操作" tree-node width="150">
          <template #default="{ row }">
            <span>
              <template v-if="row.children && row.children.length">
                <i
                  class="tree-node-icon fa"
                  style="color:#F8CA5C"
                  :class="$refs.main_tree.isTreeExpandByRow(row) ? 'fa-folder-open' : 'fa-folder'"
                ></i>
              </template>
              <template v-else>
                <i class="tree-node-icon fa fa-folder-open" style="color:#F8CA5C"></i>
              </template>
            </span>
          </template>
        </vxe-column>
        <vxe-column field="title" title="名称" width="250"></vxe-column>
        <vxe-column field="icon" title="icon" align="center" width="120px">
          <template #default="{ row }">
            <i :class="'fa '+row.icon" style="font-size:22px"></i>
          </template>
        </vxe-column>
        <vxe-column field="path" title="path"></vxe-column>
        <vxe-column field="name" title="name"></vxe-column>
        <vxe-column field="component" title="component"></vxe-column>
        <vxe-column title="类型" align="center" width="120px">
          <template #default="scope">
            <el-tag v-if="scope.row.type == 1" size="medium" effect="dark" type="success">按钮</el-tag>
            <el-tag v-if="scope.row.type == 0" size="medium" effect="dark">菜单</el-tag>
          </template>
        </vxe-column>
        <vxe-column title="隐藏" align="center" width="120px">
          <template #default="{ row }">
            <i class="el-icon-circle-check" v-if="row.is_show == 1"></i>
          </template>
        </vxe-column>
        <vxe-column title="排序" align="center" field="sort" width="120px"></vxe-column>
      </vxe-table>
    </el-main>
    <div v-dialogdrag>
      <el-dialog :title="dialog_title" v-model="edit_dialog" width="600px">
			<el-scrollbar height="570px">
        <el-form
          :model="edit_form"
          :rules="rules"
          ref="edit_form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row :span="24">
            <el-col :span="20">
              <el-form-item label="上级菜单" style="width: 360px">
                <div style="display: fiex">
                  <el-input size="small" v-model="parent_id_title" readonly style="width: 223px"></el-input>
                  <i style="font-size: '22px'" class="el-icon-edit-outline" @click="is_tree"></i>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="20">
              <el-form-item label="名称" prop="title">
                <el-input size="small" v-model="edit_form.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="20">
              <el-form-item label="文件路径">
                <el-input size="small" v-model="edit_form.component"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="20">
              <el-form-item label="path">
                <el-input size="small" v-model="edit_form.path"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="20">
              <el-form-item label="name">
                <el-input size="small" v-model="edit_form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="20">
              <el-form-item label="重定向">
                <el-input size="small" v-model="edit_form.redirect"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="20">
              <el-form-item label="图标" prop="icon">
                <el-input size="small" v-model="edit_form.icon"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="20">
              <el-form-item label="类型" prop="type">
                <el-select size="small" v-model="edit_form.type" placeholder="请选择">
                  <el-option
                    :label="item"
                    :value="key"
                    v-for="(item, key) in menu_types"
                    :key="key"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="12">
              <el-form-item label="排序" prop="sort">
                <el-input size="small" v-model="edit_form.sort"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-form-item style="width: 400px" label="后端API">
              <div>
                <el-button type="default" icon="el-icon-plus" size="small" @click="add_api">添加API</el-button>
              </div>
              <el-row
                :span="24"
                v-for="(item, key) in edit_form.api_url"
                :key="key"
                class="api_list"
              >
                <el-col :span="19" :style="{ 'margin-right': '10' }">
                  <el-input size="small" v-model="item.url" placeholder="请填写API地址"></el-input>
                </el-col>
                <el-col :span="3">
                  <el-button
                    type="default"
                    icon="el-icon-delete"
                    size="small"
                    @click="delete_api(key)"
                  ></el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-row>
          <el-row :span="24">
            <el-col :span="6">
              <el-form-item label="隐藏" prop="is_show">
                <el-switch v-model="edit_form.is_show"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
		 </el-scrollbar>
		 <template #footer>
		     <span class="dialog-footer">
		       <el-button   @click="edit_dialog = false">取 消</el-button>
		       <el-button type="primary" @click="submitForm(dialog_type)" >确 定</el-button>
		     </span>
		   </template>
      </el-dialog>
    </div>
    <tree
      ref="tree"
      :tree_options="tree_options"
      :parent_id="edit_form.parent_id"
      :edit_form="edit_form"
      :parent_id_title.sync="parent_id_title"
      @updateTreeDate="updateTreeDate"
    />
  </el-container>
</template>
<script>
import tree from "./tree";
import XEUtils from 'xe-utils'
export default {
  name: "systemMenuList",
  components: {
    tree
  },
  data() {
    return {
      search:{},
	  mobile:false,
      tableData: [],
      edit_dialog: false,
      add_dialog: false,
      menu_types: [],
      dialog_title: "",
      dialog_type: "add",
      Check_obj: [],
      tree_options: [],
      show_all_levels: false,
      originData:[],
      tree_props: {
        expandTrigger: "hover",
        children: "children",
        checkStrictly: true,
        value: "id",
        label: "title",
        emitPath: false
      },
      currentRow: null,
      rules: {
        parentId: [
          {
            required: true,
            message: "请选择父ID",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入name",
            trigger: "blur"
          }
        ],
        component: [
          {
            required: true,
            message: "请输入路径",
            trigger: "blur"
          }
        ],
        path: [
          {
            required: true,
            message: "请输入path",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择按钮或菜单",
            trigger: "blur"
          }
        ],
        sort: [
          {
            required: true,
            message: "请输入序号",
            trigger: "blur"
          }
        ]
      },
      edit_form: {
        parent_id: ""
      },
      parent_id_title: ""
    };
  },
  // activated() {
  //   this.get_systemMenuList();
  // },
  mounted() {
    this.get_systemMenuList();
    
  },
  methods: {
    switch:function(){
		console.log(this.mobile)
		this.get_systemMenuList();
	},	  
    get_systemMenuList: function() {
	 let mobile = this.mobile == true?'mobile_':'';
      this.api.system[mobile+'get_systemMenuList']().then(res => {
		  if(res.data.code==200){
			  this.originData = res.data.data.menus;
			  this.handleSearch()
		  }else{
			 this.$message.error(res.data.message) 
		  }
        
      });
    },
    setCurrent: function(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange: function(val) {
      this.currentRow = val;
    },
    handler: function(select) {
      this.Check_obj = select.row;
    },
    del_systemMenuList: function() {
      this.$confirm("此操作将删除此菜单及其子菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let mobile = this.mobile == true?'mobile_':'';
        this.api.system[mobile+"del_systemMenuList"](this.Check_obj.id).then(res => {
            this.get_systemMenuList();
            this.$message.success("删除成功");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      });
    },
    get_edit: function(type) {
      this.parent_id_title = "";
	  let mobile = this.mobile == true?'mobile_':'';
      if (type == "edit" && !this.Check_obj.id) {
        this.$message.error("请先选择菜单");
        return false;
      }
      this.dialog_title = type == "edit" ? "修改" : "添加";
      this.dialog_type = type;
      this.edit_dialog = !this.edit_dialog;
      this.edit_form = {};

      this.api.system[mobile+"edit_info_systemMenuList"](type == "edit" ? this.Check_obj.id : 0).then(res => {
          res.data.data.row.is_show = Boolean(res.data.data.row.is_show);
          this.menu_types = res.data.data.types;
          res.data.data.row.type =typeof res.data.data.row.type == "undefined"? 0: parseInt(res.data.data.row.type);
          res.data.data.row.sort = parseInt(res.data.data.row.sort);
          res.data.data.row.sort = isNaN(res.data.data.row.sort)? 0: res.data.data.row.sort;
          res.data.data.menus.unshift({ id: 0, title: "一级菜单" });
          res.data.data.row.parent_id === 0? (res.data.data.row.parent_id = [res.data.data.row.parent_id]): (res.data.data.row.parent_id = [String(res.data.data.row.parent_id)]);
          this.parent_id = String(res.data.data.row.parent_id);
          this.edit_form = res.data.data.row;
          this.tree_options = res.data.data.menus;
          this.edit_form.parent_id =type == "edit" ? this.edit_form.parent_id[0] : this.Check_obj.id;
          this.parent_id_title = type == "edit"? res.data.data.row.parent_name: this.Check_obj.title;
        });
    },
    add_api() {
      var array = this.edit_form.api_url || [];
      array.push({ id: "", url: "" });
      this.edit_form.api_url = array;
    },
    delete_api(key) {
		this.edit_form.api_url.splice(key,1)
    },
    submitForm: function(dialog_type) {
      let formName = "edit_form";
	   let mobile = this.mobile == true?'mobile_':'';
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = Object.assign({}, this.edit_form);
          if (dialog_type == "edit") {
            this.api.system[mobile+"edit_systemMenuList"](params).then(res => {
              if (res.data.code == "200") {
                this.$message.success("编辑成功");
                this.edit_dialog = !this.edit_dialog;
                this.get_systemMenuList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            this.api.system[mobile+"add_systemMenuList"](params).then(res => {
              if (res.data.code == "200") {
                this.$message.success("添加成功");
                this.edit_dialog = !this.edit_dialog;
                this.get_systemMenuList();
				this.search.name=params.title
				this.handleSearch()
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm: function(formName) {
      this.$refs[formName].resetFields();
    },
    tree_handleChange: function(value) {
      this.edit_form.parent_id = String(value);
    },
    is_tree: function() {
      this.$refs.tree.get_auth();
      this.$refs.tree.is_tree_show = !this.$refs.tree.is_tree_show;
    },
    updateTreeDate: function(check) {
      this.edit_form.parent_id = check[0].id;
      this.parent_id_title = check[0].title;
    },
    handleSearch:function () {
              let filterName = XEUtils.toValueString(this.search.name).trim()
              if (filterName) {
                let options = { children: 'children' }
                let searchProps = ['title']
                this.tableData = XEUtils.searchTree(this.originData, item => searchProps.some(key => XEUtils.toValueString(item[key]).indexOf(filterName) > -1), options)
                // 搜索之后默认展开所有子节点
                this.$nextTick(() => {
                  this.$refs.main_tree.setAllTreeExpand(true)
                })
              } else {
                this.tableData = this.originData
              }
            }
          }
};
</script>
<style scoped lang='less'>
.el-main {
  padding: 0 20px 20px 20px;
}
.el-dialog li {
  margin: 20px 0;
  display: flex;
}
.el-dialog li label {
  display: inline-block;
  font-size: 16px;
  width: 90px;
  line-height: 40px;
}

/deep/ .el-dialog__body {
  padding: 5px 20px 20px 20px;
}
/* .demo-ruleForm {
  height: 570px;
} */

.el-form-item {
  margin-bottom: 10px;
}
.api_list {
  overflow: hidden;
}
.api_list .el-col:nth-of-type(1) {
  margin-right: 8px;
}
.el-icon-edit-outline {
  font-size: 22px;
  cursor: pointer;
  margin-left: 5px;
}
/deep/ .vxe-table--render-default .vxe-tree--node-btn{
    font-size: 16px;
}
/deep/ .el-input__suffix-inner i{
		height: 32px;
	}
.vxe-switch{
	float: right;
}
</style>



