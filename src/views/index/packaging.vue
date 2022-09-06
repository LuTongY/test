<template>
	
	<div class="packaging">
		<div class="title">
			<h3>今日包装计划</h3>
		</div>
		<div class="main">
			<div class="table">
				<div class="table_header">
					<div class="table_header_tr">
						<div style="flex:0 0 160px">订单号</div>
						<div >成品名称</div>
						<div style="flex:0 0 180px">系列</div>
						<div style="flex:0 0 120px">包装组别</div>
						<div style="flex:0 0 120px">订单套数</div>
						<div style="flex:0 0 120px">已入库套数</div>
						<div style="flex:0 0 200px">进度</div>
					</div>
				</div>
				
				<div class="table_body" @mouseenter="clearTimer()" @mouseleave="startTime()">
					<el-scrollbar>
					<div class="table_body_tr" v-for="(item,index) in data">
						<div style="flex:0 0 160px">{{item.csocode+'-'+item.soseq}}</div>
						<div >{{item.cinvName}}</div>
						<div style="flex:0 0 180px">{{item.cinvCname}}</div>
						<div style="flex:0 0 120px">{{item.PlanTeam}}</div>
						<div style="flex:0 0 120px">{{T.intRow(item.PlanQty)}}</div>
						<div style="flex:0 0 120px">{{T.floatRow(item.PlanQualifiedInQty)}}</div>
						<div style="flex:0 0 200px">
							<div style="width: 150px;">
 							    <el-progress  :color="customColors" :text-inside="true" :stroke-width="26" :percentage="item.percentage" />
						    </div>
						</div>
					</div>
					</el-scrollbar>
				</div>
				
			</div>
		</div>
	</div>

</template>

<script>
	export	default{
		props:{
			data:{
				type:Array,
				default:()=>{return []},
			}
			
		},
		watch: {
			data() {
				if(this.data.length>4){
					this.startTime()
				}else{
					clearInterval(this.timer)
				}
			}
		},
		data(){
			return{
				timer:'',
				customColors:[
				  { color: '#f56c6c', percentage: 20 },
				  { color: '#e6a23c', percentage: 40 },
				  { color: '#CAF61D', percentage: 60 },
				  { color: '#1989fa', percentage: 80 },
				  { color: '#24BB04', percentage: 100 },
				]
			}
		},
		mounted(){
			clearInterval(this.timer)
		},
		methods: {
			startTime() {
				if(this.data.length>4){
					this.timer=setInterval(this.dataList,2000);	
				}else{
					clearInterval(this.timer)
				}
				
				// setTimeout(,100)
			},
			dataList(){
				this.data.push(this.data.shift())
			},
			clearTimer(){
				 clearInterval(this.timer); //关闭
			},
		},
		beforeDestroy() {
		    if(this.timer) { //如果定时器还在运行直接关闭
		       this.clearTimer()
		    }
		}
	}
</script>

<style scoped lang="less">
	@import url("./css/packaging.less");
</style>
