<template>
	<view v-if="show">
		<!-- 订单状态 -->
		<!-- 订单状态0-待付，1-待发，2-待收，3-完成，4-取消，5-退款中，6-已退款 -->
		<view class="order-status">

			<text v-if="status==0">订单当前状态:待付款</text>
			<text v-if="status==1">订单当前状态:待发货</text>
			<text v-if="status==2">订单当前状态:待收货</text>
			<text v-if="status==3">订单当前状态:已完成</text>
			<text v-if="status==4">订单当前状态:已取消</text>
		</view>
		<view class="order-status" v-if="status==2">
			<text>23天后自动确认收货</text>
		</view>
		<!-- 地址 -->
		<view class="address-section">
			<view class="order-content">
				<text class="iconfont icon-dizhi01"></text>
				<view class="cen">
					<view class="top">
						<text class="name">{{dataObj.name}}</text>
						<text class="mobile">{{dataObj.phone}}</text>
					</view>
					<text class="address">{{dataObj.address}}</text>
				</view>
				<text class="iconfont icon-you"></text>
			</view>
		</view>
		<!-- 地址 -->
		<view class="goods-section">
			<!-- 商品列表 -->
			<view class="g-item" v-for="(v,k) in dataObj.dataList" :key='k' v-if="dataObj.type==0">
				<image :src="v.productImage" v-if="k==0"></image>
				<view class="right" v-if="k==0">
					<view class="infoCon">
						<view class="title clamp">{{v.productName}}</view>
						<view class="spec">{{v.sku}}</view>
					</view>
					<view class="price-box">
						<view class="price">￥{{dataObj.payMoney}}</view>
						<view class="number">x {{totalCount}}</view>
					</view>
				</view>
			</view>
			<view class="g-item" v-if="dataObj.type==1||dataObj.type==2">
				<image :src="dataObj.productImage"></image>
				<view class="right">
					<view class="infoCon">
						<view class="title clamp">{{dataObj.productName}}</view>
					</view>

					<!-- <text class="spec">{{item.sku}}</text> -->
					<view class="price-box">
						<view class="price">￥{{dataObj.payMoney}}</view>
						<view class="number">x 1</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 金额明细 -->
		<!-- type:""//订单类型：0-普通订单，1-秒杀订单，2-积分订单 -->
		<view class="yt-list pad">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip">￥{{dataObj.totalPrice}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="type==0&&compline!=0">
				<text class="cell-tit clamp">优惠金额</text>
				<text class="cell-tip red">-￥{{compline}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip">{{dataObj.freight}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">税费</text>
				<text class="cell-tip">{{dataObj.taxes}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="type==2">
				<text class="cell-tit clamp" >消费积分</text>
				<text class="cell-tip">{{dataObj.taxes}}</text>
			</view>
		</view>
		<!-- 获得积分 -->
		<view class="yt-list-cell b-b" style="margin:10px 0;background: #fff;" v-if="type==0||type==1">
			<text class="cell-tit clamp">获得积分</text>
			<text class="cell-tip">{{dataObj.point}}</text>
		</view>

		<!-- 订单信息 -->
<!-- 订单状态0-待付，1-待发，2-待收，3-完成，4-取消，5-退款中，6-已退款 -->
		<view class="yt-list pad">
			<view class="yt-list-cell b-b">
				<text class="yt-list-cell-title">订单信息</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单单号</text>
				<text class="cell-tip red">{{dataObj.orderNum}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">创建时间</text>
				<text class="cell-tip">{{dataObj.adtime}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp" v-if="status!=0">付款时间</text>
				<text class="cell-tip">{{dataObj.payDate}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp" v-if="status!=0||status!=1">发货时间</text>
				<text class="cell-tip">{{dataObj.sendDate}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="status==4">
				<text class="cell-tit clamp">取消时间</text>
				<text class="cell-tip">{{dataObj.cancelDate}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="status==3">
				<text class="cell-tit clamp">收货时间</text>
				<text class="cell-tip">{{dataObj.finishDate}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单状态</text>
				<text class="cell-tip" v-if="status==0">待付款</text>
				<text class="cell-tip" v-if="status==1">待发货</text>
				<text class="cell-tip" v-if="status==2">待收货</text>
				<text class="cell-tip" v-if="status==3">已完成</text>
				<text class="cell-tip" v-if="status==4">已取消</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单类型</text>
				<text class="cell-tip" v-if="type==0">普通订单</text>
				<text class="cell-tip" v-if="type==1">秒杀订单</text>
				<text class="cell-tip" v-if="type==2">积分订单</text>
			</view>
		</view>

		<!-- 底部 -->

		<view class="order-bottom" v-if="status==2||status==3">
			<view class="order-bottom-one" @click="wuliu">
				查看物流
			</view>
			<view class="order-bottom-two" @click="finishOrder">
				确认收货
			</view>
			<!-- <view class="order-bottom-two">
				申请售后
			</view> -->
		</view>
		<view class="order-bottom" v-if="status==3">
			<view class="order-bottom-one" @click="goto">
				查看物流
			</view>
			<view class="order-bottom-two" @click="getXOrder">
				申请售后
			</view>

		</view>
		<view class="order-bottom-finish" v-if="status==0">
			<view class="order-bottom-finish-left">
				付款总金额:
				<view class="order-bottom-orice">
					￥{{dataObj.payMoney}}
				</view>
			</view>
			<view class="order-bottom-two" @click="payOrder">
				去支付
			</view>
		</view>

		<view class="order-bottom-finish" v-if="status==4||status==3">
			<view class="order-bottom-finish-left">
			</view>
			<view class="order-bottom-two" @click="delOrder">
				删除订单
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId: '',
				status: '',
				type: '',
				dataObj: {},
				item: {},
				show:false
			}
		},
		onLoad(options) {
			this.orderId = options.id;
		},
		onShow() {
			this.loadData()
		},
		computed: {
			totalCount(){
				if(this.dataObj.type==0){
					let num=0;
					this.dataObj.dataList.forEach(item=>{
						num+=item.qty
					})
					return num
				}
				
			},
			compline() {
				if(this.dataObj.freight==undefined){
					this.dataObj.freight=0
				}
				if(this.dataObj.taxes==undefined){
					this.dataObj.taxes=0
				}
				return   this.$api.parsePrice( Math.abs(this.dataObj.totalPrice-this.dataObj.payMoney - this.dataObj.freight - this.dataObj.taxes))  
			}
		},
		methods: {
			loadData() {
				this._reqw.ipost({
					orderId: this.orderId
				}, "orderDetail").then(res => {
					this.show=true;
					res.result == 0 ? (this.status = res.status, this.type = res.type, this.dataObj = res) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//删除
			delOrder() {
				this._reqw.ipost({
					orderId: this.orderId
				}, "delOrder").then(res => {
					res.result == 0 ? (this.$api.tip("删除成功"), setTimeout(() => {
						this.$api.back()
					})) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//  售后
			getXOrder() {
				setTimeout(() => {
					this.$api.navTo(`/pagesD/order/subSouHuo?id={JSON.stringify(this.dataObj)}`)
				}, 30)

			},
			// 查看物流
			goto() {
				this.$api.navTo(`/pagesD/order/wuliu?id=${JSON.stringify(this.dataObj)}`)
			},
			// 确认收货
			finishOrder() {
				this.$api.modeltip("确认收货?", this._reqw.ipost({
					orderId: this.orderId
				}, "confirmShouhuo").then(res => {
					res.result == 0 ? (this.$api.tip("删除成功"), setTimeout(() => {
						this.$api.back()
					})) : this.$api.tip(res.resultNote)
				}).catch(err => {}))

			},
			payOrder() {
				let parmas={
					orderNum: this.orderId,
					uid:getApp().globalData.uid,
					type:0
				}
				this._reqw.ipost(parmas, "wxpay").then(res => {
					res.result == 0 ? this.$api.PayBywx(res.body, this.$api.back, this.$api.tip('取消交易')) : this.$api.tip(res.resultNote)
				}).catch(err=>{})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.infoCon{width: 70%;}
	.icon-dizhi01 {
		font-size: 30px;
		color: #8C8C8C;
		margin: 0 15px;
	}

	.pad {
		// padding-bottom: 50px;
	}

	.order-status {
		height: 30px;
		line-height: 30px;
		background: #44BCB4;
		color: #fff;
		text-align: center;
	}

	.order-bottom {
		margin-top: 10px;
		height: 50px;
		background: #fff;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0 15px;
	}

	.order-bottom-orice {
		color: #333333;
		font-size: 13px;
		margin-left: 5px;
	}

	.order-bottom-one {
		color: #999999;
		border: 1px solid #999999;
		border-radius: 16px;
		padding: 5px 10px;
		font-size: 13px;
	}

	.order-bottom-finish {
		margin-top: 10px;
		height: 50px;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px;
	}

	.order-bottom-finish-left {
		display: flex;
	}

	.order-bottom-two {
		color: #00736B;
		border: 1px solid #00736B;
		border-radius: 16px;
		margin-left: 15px;
		padding: 5px 10px;
		font-size: 13px;
	}

	.yt-list-cell-title {
		line-height: 20px;
		border-left: 3px solid #00736B;
		padding-left: 10px;
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
		}

		.icon-you {
			font-size: 32upx;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;
			padding: 10px 0;

			image {
				flex-shrink: 0;
				display: block;
				width: 180upx;
				height: 180upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				display: flex;
				justify-content: space-between;
				padding-left: 24upx;
				overflow: hidden;
			}
			

			.title {
				font-size: 30upx;
			}

			.spec {
				font-size: 26upx;
			}

			.price-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 32upx;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
					color: #FE2C2C;
				}

				.number {
					font-size: 26upx;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: #333333;
		}

		.cell-seek {}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
		}
	}

</style>
