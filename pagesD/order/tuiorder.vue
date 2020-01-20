<template>
	<view class="content">
		<view class="uni-second-list" v-for="(v,k) in dataList" :key="k" @click="gotoDetails(v)">
			<view class="uni-second">
				<view class="image-second">
					<image class="uni-second-image" :src="v.image"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title"><text class="uni-second-tip-one">{{v.tip}}</text> <text style="margin-left: 10px;">{{v.title}}</text>
					</view>
					<view class="uni-second-title">规格：{{v.sku}}</text>
						<view class="uni-second-title">共计{{v.totalCount}}件商品</text>
						</view>
						<!-- <text class="uni-second-from">新西兰直邮供货</text> -->
					</view>
				</view>
				<view class="uni-second-right">
					<view class="uni-second-title">已完成</view>
					<view class="uni-second-title">￥{{v.payMoney}}</view>
					<view class="btn">
						售后详情
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
				dataList: [],
				status: 'more',
				uid: getApp().globalData.uid,
				page: 1,
				totalPage: 1
			}
		},
		components: {
			uniLoadMore
		},
		onLoad() {
			this.loadData()
		},
		onReachBottom() {
			this.status = "loading";
			this.totalPage > this.page ? (this.page += 1, this.loadData()) :
				setTimeout(() => {
					this.status = "noMore"
				}, 100)
		},
		methods: {
			gotoDetails(e) {
				this.$api.navTo(`/pagesD/order/tuiDetails?id=${e.id}`)
			},
			loadData() {
				let parmas = {
					uid: this.uid,
					type: 4,
					pageNo: 1
				}
				this._reqw.ipost(parmas, "orderList").then(res => {
					res.result == 0 ? (this.totalPage = res.totalPage, res.dataList != undefined && res.dataList.length != 0 ? res.datalist
						.forEach(item => {
							this.datList.push(item)
						}) : this.status = "noMore") : this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>
<style scoped lang="scss">
	.content {
		background: #F6F6F6;
		box-sizing: border-box;
	}

	.uni-second-right {
		display: flex;
		flex-direction: column;
		padding: 10px 0;
	}

	.uni-second-title {
		height: 20px;
		margin: 5px 0;
	}

	.uni-second-list {
		display: flex;
		width: 95%;
		margin: 0 auto;
		margin: 10px;
		flex-direction: column;
		background: #fff;
		border-radius: 10px;
	}

	.uni-second {
		display: flex;
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
		width: 50%;
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

	.uni-second-from {
		color: red;
	}
</style>
