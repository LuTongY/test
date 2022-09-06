<template>
	<el-container>
		<el-header>
			<el-col>
				<ul style="display: flex;list-style: none;height: 40px;margin-top: 13px;">
					<li>
						<el-input v-model="search.item_no" placeholder="请输入产品编码" size="small"></el-input>
					</li>
					<li style="margin-left: 20px;">
						<el-button type="primary" icon="el-icon-search" size="small" @click="page_list()">搜索</el-button>
					</li>
				</ul>
			</el-col>
			<el-col style="height: 100%;float: right;margin-right: 200px;position: relative;">
				<el-badge :value="joinShopList.length" class="item shopImg" type="danger"
					style="position: relative;top: 50%;transform:translateY(-50%);">
					<svg style="justify-items: center;" t="1653009522661" class="icon" viewBox="0 0 1024 1024"
						version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9289" width="32" height="32">
						<path d="M0 0h1024v1024H0V0z" fill="#202425" opacity=".01" p-id="9290"></path>
						<path
							d="M662.664533 48.264533a68.266667 68.266667 0 0 0-96.529066 0l-98.269867 98.269867c-21.504 21.504-6.280533 58.2656 24.132267 58.2656h244.804266c30.378667 0 45.636267-36.7616 24.132267-58.2656l-98.269867-98.269867zM307.2 921.6a68.266667 68.266667 0 1 1-136.533333 0 68.266667 68.266667 0 0 1 136.533333 0z m614.4 0a68.266667 68.266667 0 1 1-136.533333 0 68.266667 68.266667 0 0 1 136.533333 0z"
							fill="#FFAA44" p-id="9291"></path>
						<path
							d="M68.266667 85.333333a51.2 51.2 0 1 0 0 102.4h26.7264l116.565333 553.6768A119.466667 119.466667 0 0 0 328.465067 836.266667H853.333333a51.2 51.2 0 0 0 0-102.4H328.465067a17.066667 17.066667 0 0 1-16.725334-13.550934L303.854933 682.666667h535.552a68.266667 68.266667 0 0 0 65.3312-48.5376l92.740267-307.2A68.266667 68.266667 0 0 0 932.078933 238.933333H210.397867l-18.056534-85.845333A85.333333 85.333333 0 0 0 108.8512 85.333333H68.266667z"
							fill="#FF7744" p-id="9292"></path>
					</svg>
				</el-badge>
				<div class="shopPop">
					<ul>			
						<li v-for="(item,index) in joinShopList" :key='item.id' class='shopPopLi' style="height: 51px;border-bottom: 1px solid rgb(217, 217, 217);">
							<div style="display: flex;height: 100%;">
								  <div style="flex: 1;line-height: 51px;">
								     <span>{{item.item_no}}</span>
								  </div>
								  <div style="flex: 0 0 30px;"></div>
							</div>
						</li>
					</ul>
					<div style="position: absolute;bottom: 0;border-top: 1px solid rgb(217, 217, 217);width: 100%;padding: 8px 0;text-align: center;cursor: pointer;">
						生成PDF
					</div>
				</div>
			</el-col>
		</el-header>
		<el-main>
			<div class="accessory-result-page accessory-page">
				<div class="accessory-list col-4">
					<ul>
			  	<li class="item" v-for="item in goodsList" :key="item.id">
							<div class="pic">
								<img v-lazy="item.imgUrl?item.imgUrl:'1'" style="height: 300px;width: 100%;" />
			 			</div>
							<div class="main">
			 				<div class="item_no productInfo">
									<div class="label" style="flex: 0 0 80px;">
										<label for="">ITEM NO:</label>
									</div>
									<div>
										<span>{{item.item_no}}</span>
									</div>
								</div>
								<div class="package productInfo">
									<div class="label" style="flex: 0 0 80px;">
										<label for="">PACKAGE:</label>
									</div>
									<div>
										<span>{{item.package}}</span>
									</div>
								</div>
								<div class="productInfo">
									<div class="label">
										<label for="">QTY(PCS)/OUTER CTN:</label>
									</div>
									<div>
										<span>{{item.outer_qty}}</span>
									</div>

								</div>
								<div class="item_no productInfo">
									<div class="label" style="flex: 0 0 80px;">
										<label for="">MOQ:</label>
									</div>
									<div style="flex:1;">
										<span>{{item.moq}}</span>
									</div>
									<div class="label" style="flex: 0 0 80px;">
										<label for="">CBM:</label>
									</div>
									<div style="flex:1;">
										<span>{{item.outer_ctn_cbm}}</span>
									</div>
								</div>
								<div class="prince productInfo">
									<div class="label" style="flex: 0 0 80px;">
										<label for="">PACKAGE(＄):</label>
									</div>
									<div style="flex:1;">
										<span>{{item.price}}</span>
									</div>
									<div class="label" style="flex: 0 0 80px;">
								 	<label for="">QTY/INNER:</label>
									</div>
									<div style="flex:1;">
										<span>{{item.inner_qty}}</span>
									</div>
								</div>
								<div class="productInfo">
									<div class="label" style="flex: 0 0 80px;">
										<label for="">20'GP(pcs):</label>
									</div>
									<div style="flex: 1;">
										<span>{{item.gp}}</span>
									</div>
									<div class="label" style="flex: 0 0 80px;">
										<label for="">40'HQ(pcs):</label>
									</div>
									<div style="flex: 1;">
										<span>{{item.hq}}</span>
									</div>
								</div>
								<div class="productInfo">
									<div class="label" style="flex: 0 0 40px;">
										<label for="">L:</label>
									</div>
									<div style="flex: 1">
										<span>{{item.inner_box_size_l}}</span>
									</div>
									<div class="label" style="flex: 0 0 40px;">
										<label for="">W:</label>
									</div>
									<div style="flex: 1">
										<span>{{item.inner_box_size_w}}</span>
									</div>
									<div class="label" style="flex: 0 0 40px;">
										<label for="">H:</label>
									</div>
									<div style="flex: 1">
										<span>{{item.inner_box_size_h}}</span>
									</div>
								</div>
								<div class="productInfo">
									<div class="label" style="flex: 0 0 40px;">
										<label for="">L:</label>
									</div>
									<div style="flex: 1">
										<span>{{item.outer_ctn_l}}</span>
									</div>
									<div class="label" style="flex: 0 0 40px;">
										<label for="">W:</label>
									</div>
									<div style="flex: 1">
										<span>{{item.outer_ctn_w}}</span>
									</div>
									<div class="label" style="flex: 0 0 40px;">
										<label for="">H:</label>
									</div>
									<div style="flex: 1">
										<span>{{item.outer_ctn_h}}</span>
									</div>
								</div>
								<!-- <div>
								<div class="label"  style="flex: 1;">
								    <label for="">PRODUCT INFORMATION:</label>
									
								</div>
								<div >
									<vxe-textarea v-model="item.product" rows="60" disabled resize="none"   ></vxe-textarea>
								</div>
							</div>
					 -->
								<div class="btn-area" @click="joinShop(item)">
									<a href="javascript:;" class="btn btn--m" >＋加入报价单</a>
								</div>
							</div>
			  	</li>
					</ul>
					<!-- 分页       -->
					<!--  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" nfinite-scroll-distance="20">
			             <img src="./../../static/loading-svg/loading-spinning-bubbles.svg" v-show="loading">
			           </div> -->
				</div>
			</div>
		</el-main>

	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				search: {},
				goodsList: [],
				joinShopList:[],
			}
		},
		mounted() {
			this.page_list();
		},
		methods: {
			page_list: function() {
				this.api.trade.PriceSheet.GetList(this.search).then(res => {
					if (res.data.code == 200) {
						this.goodsList = res.data.data.rows
					}
				});
			},
			joinShop:function(item){
				this.joinShopList.push(item)
				console.log(this.joinShopList)
			}
		}
	}
</script>

<style scoped lang="less">
	/* @import url("css/PriceSheet.css"); */
	* {
		list-style: none;
	}

	.el-header {
		border-bottom: #ccc 1px solid;
	}

	.accessory-list ul {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.accessory-list ul li {
		overflow: hidden;
		list-style: none;
		margin-right: 30px;
		margin-bottom: 20px;
		min-width: 300px;
		max-width: 350px;
		flex: 1;
		cursor: pointer;
		border: 2px solid #e9e9e9;
		/* padding-bottom: 10px; */
		-webkit-transition: all .5s ease-out;
		transition: all .5s ease-out;
	}

	.accessory-list ul li:hover {
		border-color: #ee7a23;
		-webkit-transform: translateY(-5px);
		-ms-transform: translateY(-5px);
		transform: translateY(-5px);
		-webkit-box-shadow: 0 0 10px #999;
		box-shadow: 0 0 10px #999;
		-webkit-transition: all .5s ease-out;
		transition: all .5s ease-out;
	}

	.accessory-list .main .name {
		height: 4em;
		line-height: 1.25em;
		padding-bottom: 10px;
		font-family: "moderat", sans-serif;
		font-weight: bold;
		overflow: hidden;
	}

	.btn-area {
		text-align: center;
		background-color: #ee7a23;
		padding: 10px 0;

		a {
			color: #fff;
			font-weight: 500;
		}
	}

	.productInfo {
		margin: 6px 2px;
		display: flex;
		border: 1px solid #e9e9e9;
		border-left: none;

		.label {
			border-left: 1px solid #e9e9e9;
			border-right: 1px solid #e9e9e9;
			background-color: rgb(245, 247, 250);
			text-align: center;
			font-size: 12px;
			line-height: 23px;
			color: rgb(144, 147, 153);
		}
	}

	/deep/.vxe-textarea--inner {
		height: 81px !important;
	}

	span {
		font-size: 13px;
	}

	.shopImg {
		cursor: pointer;
	}

	.shopPop {
		z-index: 300;
		background-color: #fff;
		width: 300px;
		height: 0;
		position: absolute;
		overflow: hidden;
		transition: 0.2s;
		border-color: #eeeeee;
		top: 50px;
		right: calc(100% - 170px)
	}

	.shopPop:hover {
		height: 300px;
		border: 1px solid rgb(217, 217, 217);
	}

	.shopImg:hover+.shopPop {
		height: 300px;
		border: 1px solid rgb(217, 217, 217);
	}
	.shopPopLi:last-child{
		border:none !important
	}
</style>
