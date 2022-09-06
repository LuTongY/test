<template>
		<div class="warpper">
				<div class="about grid-content bg-purple" ref="echart" id="echart"></div>
		</div>
     
</template>
 
<script>
export default {
	props:{
		list:{
			type:Object,
			default() {
			        return {}
			      }
		},
		text:{
			type:String,
			default:'没有传入表头名称',
		},
		autoShow:{
			type:Boolean,
			default:false
		}
		
	},
	data(){
		return {
           data:{
			   chart: null,
		   }     
		}
	},
	watch:{
	    list(n,o){ //n为新值,o为旧值;
	      this.data = n;
		  this.setOption()
		  this.chart.hideLoading()
	    }
	},
	mounted(){
		//实例化
		this.chart = this.$echarts.init(this.$el);
		this.setOption();
		//监听窗口
		 window.addEventListener('resize',this.handleResizeChart);
		 
		 this.chart.showLoading({
		       text: 'loading',
		       color: '#83bff6',
		       textColor: '#000',
		       maskColor: 'rgba(255, 255, 255, 0.2)',
		       zlevel: 0,
		     });
		let that=this
		this.chart.on('click',function(params){
			that.$emit('itemClick',params)
		 })
	},
	methods:{
		//页面改变时自动修改图形大小
		handleResizeChart(){
			if (!this.chart) return;
			    this.chart.resize();
		},
		//配置相关属性
		setOption(){
			this.chart.setOption({
				 tooltip: {
				    trigger: 'axis',
				    axisPointer: {
				      type: 'shadow'
				    }
				  },
				    grid: {
				      left: '3%',
				      right: '4%',
				      bottom: '3%',
				      containLabel: true
				    },
				title:{
					text:this.text
				},
  		    	  xAxis: {
  		    	    type: 'category',
  		    	    data: this.data.barXAxis,
					 axisTick: {
					        alignWithLabel: true
					      }
  		    	  },
  		    	  yAxis: {
  		    	    type: 'value'
  		    	  },
				 
  		    	  series: [
  		    	    {
					  name: '入库数量',
  		    	      data: this.data.barList,
  		    	      type: 'bar',
					   itemStyle: {
					          color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
					            { offset: 0, color: '#83bff6' },
					            { offset: 0.5, color: '#188df0' },
					            { offset: 1, color: '#188df0' }
					          ])
					        },
					  label:{
					    // normal:{ 
					    // show: true, 
					    // position: 'top'  
					    //  }
					  },
  		    	    }
  		    	  ]
  		    })
		},
	},
	onBeforeUnmount(){
		//取消监听
		window.removeEventListener('resize',handleResizeChart);
		clearInterval(this.changePieInterval);
	}
	
	}
</script>
 
<style  scoped>
.warpper{
	height: calc(100% - 20px);
	width: calc(100% - 20px);
	 background: #fff;
}
#echart {
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  background: #fff;
  padding: 10px;
  border-radius: 10px;
}
</style>