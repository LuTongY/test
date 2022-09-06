<template>
  <el-container>
    <el-header>
      <vxe-toolbar ref="ReportDailyToolbar">
        <template #buttons>
			<TitleDate @page_list='page_list' v-model:Pdata="Pdata" />
            <vxe-input v-model.trim="search.name" placeholder="请输入销售订单号" @keyup="searchEvent"></vxe-input>
		   <vxe-switch style="float: right;margin-right: 18px;" v-model="switch_op" size='medium' open-label="日报" :open-value="false" close-label="时报" :close-value="true" @change="switch" ></vxe-switch>
       
		</template>
		
      </vxe-toolbar>
    </el-header>
    <el-main>
       <Summary v-if="!switch_op" ref="Summary"   :Pdata="Pdata" :search="search.name"/>
	   <Detailed v-if="switch_op" ref="Detailed"  :Pdata="Pdata" :search="search.name"/>
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
 
</template>
<script>
import page from "@/components/page/page.vue";
import TitleDate from "@/components/TitleDate/TitleDate.vue"
import Summary from "./Summary/Summary.vue";
import Detailed from "./Detailed/Detailed.vue";
import XEUtils from 'xe-utils'
export default {
  name: "ReportDaily",
  components: {
    page,
	Summary,
	Detailed,
	TitleDate,
  },
  data() {
    return {
	  switch_op:false,
	  Pdata:this.moment().format('YYYY-MM-DD'),
      search: {
		 name:'',
	  },
    };
  },
created () {
            },
  mounted() {
  },
  methods: {
	searchEvent:function(){
		let refs = this.switch_op ? 'Detailed':'Summary';
		this.$refs[refs].searchEvent(this.search.name);
		
	},
	switch:function(){
	    	 
	},
	page_list:function(){
		let refs = this.switch_op ? 'Detailed':'Summary';
		this.$refs[refs].page_list(this.Pdata);
		// console.log(this.Pdata)
	}
  }
};
</script>
<style lang="less" scoped="scoped">
.el-main {
  padding: 0 20px 20px 20px;
}
/deep/.vxe-body--expanded-cell{
	padding: 10px;
	padding-left: 10px;
}
</style>
