<template>
	<view class="content">
		<uni-steps :options="options" :active="active" :activeColor="activeColor"></uni-steps>
		<block v-for="(product,index) in datas" :key="index">
			<view class="uni-second-list-top">
				<view class="">
					订单商品
				</view>
				<view class="">
					订单编号:{{product.orderNum}}
				</view>
			</view>
			<view class="uni-second-list" v-for="(v,k) in dataList[0]" :key="k">
				<view class="uni-second">
					<view class="image-second">
						<image class="uni-second-image" :src="v.productImage"></image>
					</view>
					<view class="uni-second-price">
						<!-- <text class="uni-second-tip">{{product.tip}}</text> -->
						<view class="uni-second-title"> <text style="margin-left: 10px;">{{v.productName}}</text>
						</view>
						<view class="uni-second-title">规格:{{v.sku}}</view>
						<view class="uni-second-title">共计 {{v.qty}}件商品</view>
						<!-- <text class="uni-second-from">新西兰直邮供货</text> -->
					</view>
				</view>
			</view>
			<view class="tui-inter">
				<view class="inter-title">
					售后说明
				</view>
				<view class="inter-con">
					{{content}}
				</view>
			</view>
			<view class="tui-inter">
				<view class="inter-title">
					凭证
				</view>
				<view class="img-list">
					<view class="img" v-for="(v,k) in imgList" :key="k" @click="seeDetails(k)">
						<image :src="v" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import uniSteps from "@/components/uni-steps/uni-steps.vue"

	export default {
		data() {
			// "提交成功", "处理中", "处理完成"
			return {
				title: '',
				options: [{
					title: '提交成功'
				}, {
					title: '处理中'
				}, {
					title: '处理完成'
				}],
				active: 1,
				activeColor: 'green',
				imgList: [],
				currentOrder: {},
				id: '',
				datas: [],
				dataList:[],
				content:''
			}
		},
		components: {
			uniSteps
		},
		onLoad(options) {
			this.id = options.id;
			this.loadData();
		},
		onShow() {},
		onHide() {},
		methods: {
			loadData() {
				this._reqw.ipost({
					orderId: this.id
				}, "orderDetail").then(res => {
					res.result == 0 ? (this.datas.push(dataList[0]),this.dataList=res.dataList,this.imgList=res.imageList,this.content=res.content) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			seeDetails(n) {
				uni.previewImage({
					urls: this.imgList,
					count: this.imgList[n]
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		background: #F6F6F6;
		box-sizing: border-box;
	}

	.img-list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;

		.img {
			width: 31%;
			padding: 0 1%;
			height: 100px;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.tui-inter {
		margin: 10px 0;
	}

	.inter-title {
		line-height: 30px;
	}

	.uni-second-title {
		height: 20px;
		margin: 5px 0;
	}

	.uni-second-list-top {
		display: flex;
		height: 40px;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 0 5px;
		border-radius: 10px 10px 0 0;
	}

	.uni-second-list {
		display: flex;
		width: 100%;
		margin: 0 auto;
		margin-bottom: 10px;
		flex-direction: column;
		background: #fff;
		border-radius: 0 0 10px 10px;
	}

	.uni-second {
		padding: 20upx;
		display: flex;
		flex-direction: row;
	}

	.image-second {
		height: 110px;
		width: 110px;
		margin: 12upx 0;
	}

	.uni-second-image {
		height: 110px;
		width: 110px;
	}

	.uni-second-title {
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.uni-second-price {
		flex: 1;
		margin-top: 10px;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
	}

	.uni-second-price-original {
		color: #e80080;
	}

	.uni-second-price-favour {
		color: #888888;
		text-decoration: line-through;
		margin-left: 10upx;
	}

	.uni-second-tip {
		background-color: #ff3333;
		color: #ffffff;
		padding: 0 10upx;
		border-radius: 5upx;
	}

	.uni-second-from {
		color: red;
	}
</style>
