<template>
  <div class="tabs_wapper">
    <div class="itmes" id="itmes">
      <i class="el-icon-arrow-left" v-show="iconShow" @click="icon_distance('left')"></i>
      <div style="width:100%;height:100%;overflow:hidden">
        <div class="item_warp" id="item_warp" :style="{'left':left+'px'}">
          <div
            v-for="(item,index) in $store.state.tabsMenu"
            :key="item.id"
            id="tabs"
            class="itme1 itme"
            :class="{op_item:item.id==($store.state.tabsMenu_index==0?item.id:$store.state.tabsMenu_index)}"
            @click="edit_index({'id':item.id,'name':item.name})"
          >
            <span>{{item.title}}</span>
            <span>
              <i
                v-if="item.name !='statistics'"
                @click.stop="del_tabs_item(item.id)"
                class="el-icon-circle-close"
              ></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="vab-tabs-more">
      <i class="el-icon-arrow-right" v-show="iconShow" @click="icon_distance('right')"></i>
      <el-dropdown>
        <i class="el-icon-menu"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="close_tab('rests')">关闭其他</el-dropdown-item>
            <el-dropdown-item @click="close_tab('all')">关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: "tabs",
  components: {},
  data() {
    return {
      tabs_list: this.$store.state.tabsMenu,
      itmesWidth: "",
      itemWidth: "",
      iconShow: false,
      left: 0
    };
  },
  mounted() {
    //监听选项卡父级变化
    this.$getDomSize.listenTo(document.getElementById("itmes"), element => {
      this.itmesWidth = element.offsetWidth;
      this.isshow(1);
    });

    //监听选项卡变化
    this.$getDomSize.listenTo(document.getElementById("item_warp"), element => {
      this.itemWidth = element.offsetWidth;
      this.isshow();
    });
  },
  methods: {
    isshow(parent) {
      if (this.itemWidth > this.itmesWidth) {
        this.iconShow = true;
        if (!parent) {
          this.left = this.itmesWidth - this.itemWidth - 50;
        }
      } else {
        this.left = 0;
        this.iconShow = false;
      }
    },
    icon_distance(option) {
      if (option == "left") {
        this.left = this.left + 300;

        if (this.left >= 0) {
          this.left = 0;
        }
      }
      if (option == "right") {
        this.left = this.left - 300;
        if (Math.abs(this.left) + this.itmesWidth >= this.itemWidth) {
          this.left = this.itmesWidth - this.itemWidth - 50;
        }
      }
    },
    tabs: function() {
      tabs_list =this.$store.state.tabsMenu.length > 0? this.$store.state.tabsMenu: getTabsMenu().length > 0? getTabsMenu(): this.$store.state.tabsMenu;
    },
    del_tabs_item: function(item) {
      this.$store.dispatch("changeTabsMenu", {
        data: item,
        option: "del"
      });
      this.$router.push({ name: this.$store.state.tabsMenu_router });
    },
    edit_index: function(item) {
      this.$store.dispatch("changeTabsMenu", {
        data: item,
        option: "add"
      });
      this.$router.push({ name: this.$store.state.tabsMenu_router });
    },
    close_tab(options) {
      this.$store.dispatch("close_tabs", options);
    }
  }
};
</script>

<style scoped lang="less">
#itmes {
  width: calc(100% - 60px);
  display: flex;
  overflow: hidden;
}
.tabs_wapper {
  width: calc(100% - 80px);
  width: auto;
  height: 100%;
  display: flex;
}
.item_warp {
  white-space: nowrap;
  display: inline-flex;
  transition: 0.2s;
}
.itme {
  height: 32px;
  border: 1px solid rgb(220, 223, 230);
  margin-top: 8px;
  line-height: 32px;
  padding: 0 20px;
  border-radius: 2.5px;
  cursor: pointer;
  font-size: 14px;
  word-break: break-all;
  float: left;
  position: relative;
}
.itme:hover {
  color: #1890ff;
  background: #e8f4ff;
  border: 1px solid #1890ff;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
}
.item_warp .itme:not(:first-child) {
  margin: 8px 5px 0 5px;
}
.el-icon-menu {
  font-size: 21px;
  line-height: 49px;
  float: right;
}
.el-icon-menu:hover {
  color: #1890ff;
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s,
    color 0.1s, font-size 0s;
  transform: rotate(180deg);
  cursor: pointer;
}
.itme i {
  margin-left: 8px;
}
.itme i:hover {
  color: #fff;
  border-radius: 50%;
  background-color: #1d94fa;
}
.vab-tabs-more {
  width: 85px;
  float: right;
  background: #fff;
  z-index: 20;
  display: flex;
}
a {
  display: block;
  color: #000000;
  height: 100%;
  width: 100%;
  padding: 0 20px;
}
.op_item {
  color: #1890ff;
  background: #e8f4ff;
  border: 1px solid #1890ff;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
}
.el-icon-arrow-left,
.el-icon-arrow-right {
  width: 20px;
  margin-right: 12px;
  font-size: 18px;
  cursor: pointer;
  float: left;
  line-height: 49px;
  margin-left: 15px;
}
.el-icon-arrow-left:hover,
.el-icon-arrow-right:hover {
  font-size: 20px;
  font-weight: 700;
}
.tabs_wapper /deep/ .el-dropdown {
  width: 100%;
}
</style>
