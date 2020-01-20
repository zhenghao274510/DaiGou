<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex == index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadDataMore">
					<!-- 空白页 -->
					<empty v-if="tabItem.load && tabItem.dataList.length === 0"></empty>

					<!-- 订单列表 -->
					<view v-for="(item,index) in tabItem.dataList" :key="index" class="order-item">
						<view class="i-top b-b">
							<view class="time">订单编号:{{item.orderId}}</view>
							<view class="time">{{item.adtime}}</view>
						</view>
						<view class="goods-box-single" v-for="(v, k) in item.productList" :key="k" @click.stop="gotoDetails(item)" v-if="item.type==0">
							<image class="goods-img" :src="v.productImage" mode="aspectFill" v-if="k==0"></image>
							<view class="right" v-if="k==0">
								<text class="title uni-two-cut">{{v.productName}}</text>
								<text class="attr-box uni-ellipsis">规格:{{v.sku}}</text>
								<!-- <view class="price-box">
									共{{item.totalCount}}件商品
								</view> -->
							</view>
							<!-- 订单状态0-待付，1-待发，2-待收，3-完成，4-取消，5-退款中，6-已退款 -->
							<view class="order-status-right" v-if="k==0">
								<view class="order-status-right-one" v-if="item.status==0">
									待付款
								</view>
								<view class="order-status-right-one" v-if="item.status==1">
									待发货
								</view>
								<view class="order-status-right-one" v-if="item.status==4">
									已取消
								</view>
								<view class="order-status-right-one" v-if="item.status==5">
									退款中
								</view>
								<view class="order-status-right-one" v-if="item.status==6">
									已退款
								</view>
								<view class="order-status-right-one" v-if="item.status==3">
									已完成
								</view>
								<view class="order-status-right-one" v-if="item.status==2">
									待收货
								</view>

								<!-- <view class=""> -->
								<text class="order-status-right-price">￥{{item.payMoney}}</text>
								<!-- </view> -->
							</view>
						</view>
						<view class="goods-box-single" @click.stop="gotoDetails(item)" v-if='item.type==1||item.type==2'>
							<image class="goods-img" :src="item.productImage" mode="aspectFill"></image>
							<view class="right">
								<text class="title uni-two-cut">{{item.productName}}</text>
								<!-- <text class="attr-box uni-ellipsis">规格</text> -->
								<view class="price-box">
									共1件商品
								</view>
							</view>
							<!-- 订单状态0-待付，1-待发，2-待收，3-完成，4-取消，5-退款中，6-已退款 -->
							<view class="order-status-right">
								<view class="order-status-right-one" v-if="item.status==0">
									待付款
								</view>
								<view class="order-status-right-one" v-if="item.status==1">
									待发货
								</view>
								<view class="order-status-right-one" v-if="item.status==4">
									已取消
								</view>
								<view class="order-status-right-one" v-if="item.status==5">
									退款中
								</view>
								<view class="order-status-right-one" v-if="item.status==6">
									已退款
								</view>
								<view class="order-status-right-one" v-if="item.status==3">
									已完成
								</view>
								<view class="order-status-right-one" v-if="item.status==2">
									待收货
								</view>

								<!-- <view class=""> -->
								<text class="order-status-right-price">￥{{item.payMoney}}</text>
								<!-- </view> -->
							</view>
						</view>
						<!-- 订单状态0-待付，1-待发，2-待收，3-完成，4-取消，5-退款中，6-已退款 -->
						<view class="action-box b-t">
							<view class="endDel" v-if="item.status==0">
								30分钟后自动取消订单
							</view>
							<view class="" v-else>

							</view>
							<view class="">
								<button class="action-btn" @click.stop="gotoOrderWu(item)" v-if="item.status==2||item.status==3">查看物流</button>
								<button class="action-btn" v-if="item.status==0" @click.stop="gotoDetails(item.orderId)">去支付</button>
								<button class="action-btn" v-if="item.status==3" @click.stop="applyShouhuo(item)">申请售后</button>
								<button class="action-btn" v-if="item.status==2" @click.stop="gotoDetails(item.orderId)">确认收货</button>
								<button v-if="item.status==4" class="action-btn" @click.stop="deleteOrder(item.orderId,k)">删除订单</button>
							</view>


						</view>
					</view>
					<uni-load-more :status="item.loadingType" v-if="item.dataList.length!=0"></uni-load-more>
				</scroll-view>
			</swiper-item>

		</swiper>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/mycom/empty";
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				totalPage: 1,
				page: 1,
				change:false,
				navList: [{
						load: false,
						text: '全部',
						dataList: [],
						loadingType: "loading"
					},
					{
						load: false,
						text: '待付款',
						dataList: [],
						loadingType: "loading"
					},
					{
						load: false,
						text: '待发货',
						dataList: [],
						loadingType: "loading"
					},
					{
						load: false,
						text: '待收货',
						dataList: [],
						loadingType: "loading"
					},
					{
						load: false,
						text: '已完成',
						dataList: [],
						loadingType: "loading"
					}
				],
			};
		},

		onLoad(options) {
			this.tabCurrentIndex = options.id;
			
		},
		onShow() {
            this.initData()
		},
		methods: {
			loadData() {
				let type;
				let num = this.tabCurrentIndex;
				num == 0 ? type = '' : type = num - 1
				let parmas = {
					uid: getApp().globalData.uid,
					type: type,
					pageNo: this.page
				};
				this._reqw.ipost(parmas, "orderList").then(res => {
					this.change=true;
					res.result == 0 ? (this.totalPage = res.totalPage, res.dataList != undefined && res.dataList.length != 0 ? res.dataList
						.forEach(item => {
							this.navList[num].dataList.push(item)
						}) : this.navList[num].load = true) : this.$api.tip(res.resultNote)
				}).catch(err => {})

			},
			loadDataMore() {
				let num = this.tabCurrentIndex;
				this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
					this.navList[num].loadingType = "noMore"
				}, 30)
			},
			//swiper 切换
			changeTab(e) {
				console.log(e)
				if(this.change){
					this.tabCurrentIndex = e.target.current;
					this.initData();
				}
				
			},
			//顶部tab点击
			tabClick(k) {
				this.tabCurrentIndex = k;
			},
			initData() {
				let num = this.tabCurrentIndex;
				this.navList[num].dataList = [];
				this.navList[num].loadingType = "loading";
				this.navList[num].load = false;
				this.page = 1;
				this.totalPage = 1;
				this.loadData()
			},
			//删除订单
			deleteOrder(id, k) {
				uni.showLoading({
					title: '请稍后'
				})
				let num = this.tabCurrentIndex;
				this._reqw.ipost({
					orderId: id
				}, "delOrder").then(res => {
					res.result == 0 ? (this.$api.tip('删除成功'), this.initData(), uni.hideLoading()) :
						this.$api.tip(res.reultNote)
				}).catch(err => {})
			},
			// gotoDetails(id){
			// 	this.$api.navTo(`/pagesD`)
			// },

			//   查看物流
			gotoOrderWu(item) {
				this.$api.navTo(`/pagesD/order/wuliu?id=${item}`);
			},
			applyShouhuo(item) {
				this.$api.navTo(`/pagesD/order/subSouHuo?id=${item}`)
			},
			gotoDetails(item) {
                    console.log(item)
				item.status == 5 || item.status == 6 ? this.$api.navTo(`/pagesD/order/tuiDetails?id=${item.orderId}`) :
					this.$api.navTo(`/pagesD/order/orderDetail?id=${item.orderId}`)
			}

		},
	}
</script>

<style lang="scss">
	.time {
		font-size: 12px;
	}

	page,
	.content {
		background: #f6f6f6;
		height: 100%;
	}

	.order-status-right {
		display: flex;
		width: 70px;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		.order-status-right-one {
			color: #00736B;
		}

		.order-status-right-price {
			color: #FE2C2C;
			font-size: 15px;
			margin-top: 20px;
		}

	}


	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: #038980;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid #038980;
				}
			}
		}
	}

	.order-item {
		display: flex;
		flex-direction: column;
		padding: 0 30upx;
		background: #fff;
		margin-top: 16upx;

		.i-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;

			.del-btn {
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 20upx 0;

			.goods-img {
				display: block;
				width: 90px;
				height: 90px;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;

				.title {
					font-size: 14px;
					font-weight: bold;
					color: #111111;
				}

				.attr-box {
					font-size: 11px;
					color: #666666;
					background: #f6f6f6;
					// padding: 0 10px;
				}
			}
		}

		.price-box {
			font-size: $font-sm + 2upx;
			color: $font-color-light;
		}

		.action-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}

		.action-btn {

			height: 60upx;
			padding: 0 10px;
			margin-left: 24upx;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: #00736B;
			border-radius: 100px;
			border: 1px solid #00736B;
		}
	}
</style>
