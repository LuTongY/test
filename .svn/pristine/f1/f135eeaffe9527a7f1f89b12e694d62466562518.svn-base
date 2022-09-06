<template>
  <div class="about grid-content bg-purple" id="charts"></div>
</template>
 
<script>
import {onMounted,onBeforeUnmount,getCurrentInstance} from "vue";
export default {
	setup(){
		//生成表格
		let myChart;
		const _this=getCurrentInstance().appContext.config.globalProperties;
		const handleResizeChart=()=>{
				   myChart.resize()
		 }
		onMounted(()=>{
			window.addEventListener('resize',handleResizeChart)
			    // 基于准备好的dom，初始化echarts实例
			   myChart = _this.$echarts.init(document.getElementById("charts"));
			  //  绘制图表
				
				var PvData = []
				for(let i=0;i<7;i++){
					PvData.push(parseInt(Math.random()*100))
				}
			    myChart.setOption({
			    title: {
			        text: '系统访问量'
			    },
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'cross',
			            label: {
			                backgroundColor: '#6a7985'
			            }
			        }
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis: [
			        {
			            type: 'category',
			            boundaryGap: false,
			            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			        }
			    ],
			    yAxis: [
			        {
			            type: 'value'
			        }
			    ],
			    series: [
			        {
			            // symbol:'none', //去掉折线图中的节点
			            smooth: true,  //true 为平滑曲线，false为直线
			            name: '访问量',
			            type: 'line',
			            stack: '总量',
			            itemStyle : { 
			           color:{
			                type: 'linear',
			                x: 0,
			                y: 0,
			                x2: 0,
			                y2: 1,
			                colorStops: [{
			                    offset: 0, color: '#6982F8' // 0% 处的颜色
			                }, {
			                    offset: 1, color: '#3757EE' // 100% 处的颜色
			                }],
			                global: false // 缺省为 false
			           }
			        },
			            areaStyle: {
			               
			            },
			            emphasis: {
			                focus: 'series'
			            },
			            data:PvData
			        },
			    ]
			});
		})
		onBeforeUnmount(()=>{
			//取消监听
			window.removeEventListener('resize',handleResizeChart)
		})
	},
};
</script>
 
<style  scoped>
#charts {
 height: calc(100% - 20px);
  width: calc(100% - 20px);
 /* height: 94%;
  width:  94% ; */
   border-radius: 10px;
  background: #fff;
  padding: 10px;
}
</style>