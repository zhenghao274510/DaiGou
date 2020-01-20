<template>
	<view class="content">
		<view class="com-list-con">
			<view class="com-list" v-for="(v,k) in dataList" :key="k" @click="useComplin(v)">
				<image src="/static/image/yilingquyouhuijuan@2x.png" class="image-bg"></image>
				<view class="com-list-left">
					<text><text style="font-size: 14px;">￥</text>  {{v.dyMoney}}</text>
				</view>
				<view class="com-list-right">
					<view class="com-list-right-info">
						<view class="com-list-right-one">满{{v.mjMoney}}元可用</view>
						<view class="com-list-right-two">{{v.startDate}}~{{v.endDate}}</view>
					</view>
					<view class="com-list-btn">
						<view style="color: #00736B;">
							立即使用
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				page: 1,
				totalPage: 1,
				status: "loading",
				dataList: [],
				endPrice: 0
			}
		},
		onLoad(options) {
			this.endPrice = options.id
			this.loadData()
		},
		components: {
			uniLoadMore
		},
		onReachBottom() {
			this.status = "loading";
			this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
				this.status = "noMore"
			}, 30)
		},
		methods: {
			loadData() {
				let parmas = {
					uid: getApp().globalData.uid,
					nowPage: this.page,
					type: "0"
				};
				this._reqw.ipost(parmas, "couponList").then(res => {
					res.result == 0 ? (this.totalPage = res.totalPage, this.status = "more", res.dataList != undefined && res.dataList
						.length != 0 ?
						res.dataList.forEach(item => {
							item.endDate=this.$api.formTime(item.endDate),
							item.startDate=this.$api.formTime(item.startDate),
							this.dataList.push(item)
						}) : this.status = "noMore") : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			// getCompline(v, k) {
			// 	let parmas = {
			// 		uid: getApp().globalData.uid,
			// 		cid: v.id
			// 	};
			// 	v.isCollar == 0 ? this.$api.tip('已经领取!赶快使用吧！') :
			// 		this._reqw.ipost(parmas, "collarCoupon").then(res => {
			// 			res.result == 0 ? (this.$api.tip("领取成功!"), this.dataList[k].isCollar = 1) : this.$api.tip(res.resultNote)
			// 		}).catch(err => {})
			// },
			useComplin(v) {
				this.endPrice-0 > v.mjMoney-0 ? (this.$api.prePage().complinNumber = v.mjMoney - 0, this.$api.prePage().complinId = v.id,
					this.$api.back()) : this.$api.tip('该劵未达到使用标准！')
			},
		}
	}
</script>

<style scoped lang="scss">
	page,
	.content {
		width: 100%;
	}

	.cart-top {
		height: 60px;
		line-height: 60px;
		padding: 0 15px;
		text-align: right;
		font-size: 15px;
		color: #00736B;
	}

	.com-top {
		width: 100%;
		height: 125px;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.com-list {
		width: 90%;
		height: 100px;
		margin: 10px auto;
		display: flex;
		position: relative;

		.image-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
		}

		.com-list-left {
			width: 30%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			font-size: 24px;
			font-weight: bold;
		}

		.com-list-right {
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;

			.com-list-right-info {
				flex: 1;

				.com-list-right-one {
					color: #333333;
					font-size: 16px;
					font-weight: bold;
					margin-bottom: 15px;
					text-align: center;
				}

				.com-list-right-two {
					font-size: 12px;
					color: #999999;
					text-align: center;
				}
			}

			.com-list-btn {
				border-left: 1px solid #ccc;
				width: 50px;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				view {
					width: 23px;
					font-weight: 500;
					text-align: center;
				}
			}
		}
	}
</style>
