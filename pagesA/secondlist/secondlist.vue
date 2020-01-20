<template>
	<view class="second_con">
		<view class="uni-second-list" v-for="(v,k) in dataList" :key="k" @click="gotoDetail(v)">
			<view class="uni-second-top">
				<text class="uni-second-top-left">限购{{v.limitNum}}份</text>
				<bbs-count-down :time="v.LeaveEnd" :setColor="setColor" v-if="v.LeaveEnd!=0"></bbs-count-down>
				<view style="color: #00736B;" v-else>活动已结束</view>
			</view>
			<view class="uni-second">
				<view class="image-second">
					<image class="uni-second-image" :src="v.icon"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title"><text>{{v.name}}</text>
					</view>
		                 <!-- 市场价 -->
					<view class="uni-ellipsis uni-second-title-price">{{v.symbol}} <text class="uni-second-price-original">{{v.price}}</text>
					</view>
					<text class="uni-second-price-favour"> {{v.symbol}}<text>{{v.marketPrice}}</text></text>
					<text class="uni-second-btn">抢购</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import bbsCountDown from "@/components/bbs-countdown/bbs-countdown.vue"
	export default {
		data() {
			return {
				status: 'more',
				setColor: "#038980",
				page: 1,
				totalPage: 1,
				dataList: []
			}
		},
		components: {
			uniLoadMore,
			bbsCountDown
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData() {
				let parmas = {
					uid: getApp().globalData.uid,
					nowPage: this.page
				}
				this._reqw.ipost(parmas, "spikeProductList").then(res => {
					res.result == 0 ? (this.totalPage = res.totalPage, res.dataList != undefined && res.dataList.length != 0 ? res.dataList
						.forEach(item => {
							item.LeaveEnd = this.formDate(item.endDate.replace(/-/g, "/"));
							this.dataList.push(item)
						}) : this.status = "noMore") : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			gotoDetail(e) {
				this.$api.navTo(`/pagesA/shopdetails/secondshop?id=${e.id}`)
			},
			formDate(time) {
				let endtime = new Date(time).getTime();
				let startime = new Date().getTime();
				return endtime - startime
			}

		},
		onReachBottom() {
			console.log("到底")
			this.status = "loading";
			this.totalPage > this.page ? (this.page += 1, this.loadData()) :
				setTimeout(() => {
					this.status = "noMore"
				}, 30)
		}
	}
</script>

<style lang="scss" scoped>
	.second_con {
		background: #F6F6F6;
		box-sizing: border-box;
	}

	.uni-second-list {
		display: flex;
		width: 92%;
		margin: 10px auto;
		flex-direction: column;
		background: #fff;
		border-radius: 10px;
	}

	.uni-second-top {
		display: flex;
		padding: 2px 10px;
		justify-content: space-between;
		align-items: center;
		height: 30px;
	}

	.uni-second-top-left {
		border: 1px solid red;
		color: red;
		font-size: 8px;
		padding: 0 2px;
		border-radius: 2px;
	}

	.uni-second {
		display: flex;
		flex-direction: row;
	}

	.image-second {
		height: 110px;
		width: 110px;
		margin: 12upx;
		position: relative;
	}

	.uni-second-image {
		height: 110px;
		width: 110px;
		border-radius: 5px;
	}

	.uni-second-btn {
		width: 70px;
		text-align: center;
		line-height: 30px;
		border-radius: 5px;
		position: absolute;
		right: 20px;
		bottom: 20px;
		font-size: 14px;
		color: #fff;
		background: #00736B;
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
		margin: 10upx 0 0 10upx;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
	}

	.uni-second-price-original {
		color: #FF0E0E;
		font-size: 17px;
		margin: 10px 0;
		font-weight: bold;
	}

	.uni-second-title-price {
		color: #FF0E0E;
		margin: 10px 0 5px 0;
	}



	.uni-second-price-favour {
		color: #888888;
		text-decoration: line-through;
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
