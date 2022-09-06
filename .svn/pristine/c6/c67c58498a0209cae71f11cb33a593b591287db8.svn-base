<template>
	<div class="title-date">
		<i class="fa fa-caret-left fa-lg"   @click="getDate('prev')"> </i>
		<vxe-input v-model="date" placeholder="日期选择" :type="type" class="data" @change="getDate" ></vxe-input>
		<i class="fa fa-caret-right fa-lg"  @click="getDate('next')"></i>
	</div>
</template>
<script>
	export default{
		components:{},
		props:{
			Pdata:{
				type:String,
			},
			days:{
				type:String,
				default:'days'
			},
			type:{
				type:String,
				default:'date'
			}
		},
		watch:{
			'date':{
				deep:true,
				handler:function(newValue, oldValue){
					if(!newValue){
						this.date=this.moment().format(this.format)
						return false
					}
				},
			},
			'type':{
				deep:true,
				handler:function(newValue, oldValue){
					if(this.type=='date'){this.format='YYYY-MM-DD'}
					if(this.type=='month'){this.format='YYYY-MM'}
					if(this.type=='year'){this.format='YYYY'}
					console.log('更改日期为'+this.format)
					console.log(this.moment(this.date).format(this.format));
					this.$emit('update:Pdata',this.moment(this.date).format(this.format))
				}
			}
		},
		data(){
			return{
				format:'YYYY-MM-DD',
				date:this.moment().format('YYYY-MM-DD'),		
			}
		},
		mounted() {
		  console.log(this.type);
		  if(this.type=='date'){this.format='YYYY-MM-DD'}
		  if(this.type=='month'){this.format='YYYY-MM'}
		  if(this.type=='year'){this.format='YYYY'}
		  this.$emit('update:Pdata',this.moment(this.date).format(this.format))
		},
		methods:{
			getDate:function(option){
				let momentType='YYYY-MM-DD';
				if(this.type=='date'){momentType='days'}
				if(this.type=='month'){momentType='M'}
				if(this.type=='year'){momentType='Y'}
				console.log(momentType)
				if(option=="prev"){this.date=this.moment(this.date).add(-1, momentType).format(this.format)}
				if(option=="next"){this.date=this.moment(this.date).add(1, momentType).format(this.format)}
				this.date=this.moment(this.date).format(this.format)
				this.$emit('update:Pdata',this.date)
				this.$emit("page_list")
			}
		},
	}
</script>
<style lang="less" scoped>
	.title-date{
		position: absolute;
		left: calc(50% - 110px);
		margin: 0 auto;
		font-size: 22px;
	}
	.data{
		margin: 0 12px;
	}
	i{
		cursor:pointer
	};
</style>
