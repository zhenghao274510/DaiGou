<template>
	<view>
		<!-- 地址 -->
		<view class="address-section" @click="choseAddress">
			<view class="order-content">
				<text class="iconfont icon-dizhi01"></text>
				<view class="cen" v-if="addrId!=''">
					<view class="top">
						<text class="name">收货人:{{addressData.name}}</text>
						<text class="mobile">{{addressData.phone}}</text>
					</view>
					<text class="address">{{addressData.address}}</text>
				</view>
				<view class="cen" v-else>
					请选择收货地址
				</view>
				<view class="iconfont icon-zuojiantou"></view>
			</view>
		</view>

		<view class="goods-section">
			<!-- 商品列表 -->
			<view class="g-item" v-for="(v,k) in dataList" :key="k">
				<image :src="v.image" class="product-img" v-if="v.image"></image>
				<image :src="v.icon" class="product-img" v-else></image>
				<view class="right">
					<text class="title clamp">{{v.name}}</text>
					<text class="spec" v-if="v.sku">规格: {{v.sku}}</text>
					<text class="spec" v-else>规格: <text v-for="(i,j) in skuList" :key="j" v-if="payType==0">{{i.value}}</text></text>
				</view>
				<view class="price-box">
					<text class="price">￥{{v.price}}</text>
					<text class="number">x {{v.count}}</text>
				</view>
			</view>
		</view>

		<!-- 金额明细 -->
		<!-- 秒杀、 type=1 type=0 普通商品  type=2  积分兑换 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b" v-if="type!=2">
				<text class="cell-tit clamp">共计{{totalCount}}件商品</text>
				<text class="cell-tip" v-if="shopPrice!=0">商品金额 ￥{{shopPrice}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="type==0" @click="gotoChooseCompline">
				<text class="cell-tit clamp">优惠劵</text>
				<view class="cell-tip uni-flex">-￥{{complinNumber}}
					<view class="iconfont icon-zuojiantou" style="color: #CCCCCC;font-size: 20px;">
					</view>
				</view>
			</view>
			<view class="yt-list-cell b-b">
				<view class="cell-tit icon-swiper" @click="interShow(7)">
					<view class="clamp">运费
					</view>
					<!-- <view class="iconfont icon-icon-test">

					</view> -->
					<image src="/static/image/tishi@2x.png" mode="" class="tishiimg"></image>
				</view>

				<text class="cell-tip">￥{{freight}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<view class="cell-tit icon-swiper" @click="interShow(8)">
					<view class=" clamp">税务
					</view>
					<image src="/static/image/tishi@2x.png" mode="" class="tishiimg"></image>
				</view>
				<text class="cell-tip">￥{{taxes}}</text>
			</view>
			<view class="yt-list-cell b-b" v-if="type!=2">
				<view class="cell-tit clamp">订单总额
				</view>
				<text class="cell-tip">￥{{endPrice}}</text>
			</view>
		</view>
		<view class="yt-list" style="margin-top: 10px;">
			<view class="yt-list-cell b-b" v-if="type!=2">
				<view class="cell-tit clamp">获得积分</view>
				<text class="cell-tip">
					{{totalPoint}}
				</text>
			</view>
		</view>
		<view class="shuoming-con" :class="{pos:type!=0}">
			说明
			<rich-text :nodes="finishedContent"></rich-text>
		</view>

		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip" v-if="endPrice!=0">￥</text>
				<text class="price">{{endPrice}}</text>
			</view>
			<text class="submit" @click="submit" hover-class="btn-hover">提交订单</text>
		</view>
		<uni-popup v-if="showPopup" type="middle" class="uni-popup" @click.stop="showPopup=false">

			<view class="uni-popup__wrapper-box">
				<view class="uni-puop-content">
					<view class="iconfont icon-error" style="color: #CCCCCC;" @click.stop="showPopup=false">
					</view>
					<view class="line">
					</view>
					<view class="uni-puop-info">
						<view class="puop-title">
							{{puopTitle}}
						</view>
						<rich-text :nodes="content"></rich-text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maskState: 0, //优惠券面板显示状态
				desc: '', //备注
				addressData: {
					name: '刘晓晓',
					phone: '18666666666',
					address: '贵族皇仕牛排(东城店)',
					default: 1,
					id: '4554564tretuji'
				},
				addrId: '',
				complinNumber: 0,
				complinId: '',
				dataList: [],
				skuList: [],
				type: '',
				payType: "",
				showPopup: false,
				puopTitle: '',
				content: '',
				finishedContent: ''

			}
		},
		components: {},
		computed: {
			freight() {
				let price = 0;
				let ary2 = this.dataList.filter(item => {
					if (item.isShip == 0) {
						return item
					}
				})
				ary2.length != 0 ?
					ary2.forEach(item => {
						if (item.weight < 1) {
							price += 5 * 100
						} else {
							if (item.isChina == 0) {
								price += (item.weight - 0) * 100 * 5
							} else {
								price += Math.ceil(item.weight) * 100 * 5
							}

						}
					}) : price = 0

				return this.$api.parsePrice(price / 100)
			},
			taxes() {
				let price = 0;
				this.dataList.forEach(item => {
					price += (item.taxes - 0) * 100 * (item.count - 0)

				})
				return this.$api.parsePrice(price / 100)
			},
			shopPrice() {
				let price = 0;
				this.dataList.forEach(item => {
					price += (item.price - 0) * 100 * (item.count - 0)
				})
				return this.$api.parsePrice(price / 100)
			},
			price() {
				if (this.taxes == "") {
					this.taxes = 0
				}
				if (this.freight == "") {
					this.freight = 0
				}
				return (this.shopPrice - 0) + (this.taxes - 0) + (this.freight - 0)
			},
			endPrice() {
				let price = 0;
				this.complinId == '' ? price = this.price : price = this.price - this.complinNumber;
				return this.$api.parsePrice(price)
			},
			totalCount() {
				let num = 0;
				this.dataList.forEach(item => {
					num += item.count - 0
				})
				return num
			},
			totalPoint() {
				let num = 0;
				this.dataList.forEach(item => {
					num += item.point - 0
				})
				return num
			}

		},
		onLoad(options) {
			if (uni.getStorageSync('good')) {
				this.dataList = JSON.parse(uni.getStorageSync("good"));
				uni.removeStorageSync("good");
			}
			if (uni.getStorageSync("sku")) {
				this.skuList = JSON.parse(uni.getStorageSync("sku"))
			}
			this.type = options.type;
			this.payType = options.payType;
			this.finishInter();
			this.getDefault();
			this.getComplin();

		},
		onShow() {
			if (uni.getStorageSync('isSet')) {
				this.isSet = uni.getStorageSync('isSet');
			}
			if (uni.getStorageSync('password')) {
				this.password = uni.getStorageSync('password')
			}


		},
		methods: {
			// 选择优惠卷
			gotoChooseCompline() {
				this.$api.navTo(`/pagesC/complin/usecomplin?id=${this
				.endPrice}`)
			},
			interShow(n) {
				n == 7 ? this.puopTitle = "运费说明" : this.puopTitle = "税费说明";
				this._reqw.ipost({
					type: n
				}, "aboutusDetail").then(res => {
					res.result == 0 ? (this.showPopup = true, this.content = this.$api.formText(res.content)) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			finishInter() {
				this._reqw.ipost({
					type: 3
				}, "aboutusDetail").then(res => {
					res.result == 0 ? (this.finishedContent = this.$api.formText(res.content)) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			submit() {
				this.addrId == '' ? this.$api.tip("请选择收货地址!") :
					this.getOrderId()
			},
			test() {
				this.$api.modeltip(this.test2, this.$api.back)
			},
			test2() {
				this.$api.navTo('/pagesD/shouyi/setpsw')
			},
			//  默认地址
			getDefault() {
				this._reqw.ipost({
					uid: getApp().globalData.uid
				}, 'findDefaultAddr').then(res => {
					console.log(res)
					res.result == 0 ? (this.addrId = res.addrId, this.addressData = res) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			getComplin() {
				let parmas = {
					uid: getApp().globalData.uid,
					money: this.shopPrice
				};
				this._reqw.ipost(parmas, "findAvailableCouponList").then(res => {

					if (res.result == 0) {
						console.log(res)
						let complin = {
							dyMoney: 0
						}
						for (let i in res.dataList) {
							res.dataList[i].dyMoney - 0 > complin.dyMoney - 0 ? (complin = res.dataList[i], console.log(res.dataList[i])) :
								(complin)
						}
						this.complinId = complin.id;
						this.complinNumber = complin.dyMoney;
						console.log(this.complinId, this.complinNumber)
					} else {
						this.$api.tip(res.resultNote)
					}
				}).catch(err => {})
			},
			choseAddress() {
				this.$api.navTo(`/pagesD/person/address?source=1`)
			},
			// payType  0-直接购买，1-购物车结算
			getOrderId() {

				let productList = [];
				console.log(this.dataList)
				this.dataList.forEach(item=>{
					this.payType == 0 ? productList.push({
						skuId: item.skuId,
						qty: item.count,
						productId: item.id
					}) :productList.push({
						qty: item.count,
						cartId: item.id,
						productId:item.productId
					}) ;
				})
				console.log(productList);
				let parmas = {
					uid: getApp().globalData.uid,
					type: this.payType,
					addrId: this.addrId,
					couponId: this.complinId,
					totalPrice: this.shopPrice,
					freight: this.freight,
					taxes: this.taxes,
					payMoney: this.endPrice,
					point: this.totalPoint,
					productList: productList
				};
				console.log(parmas)
				this._reqw.ipost(parmas, "saveOrder").then(res => {
					res.result == 0 ? this.wxPay(res.orderNum) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			wxPay(id) {
				let parmas = {
					orderNum: id,
					uid: getApp().globalData.uid,
					type: this.payType
				};
				this._reqw.ipost(parmas, "wxpay").then(res => {
					res.result == 0 ? this.$api.PayBywx(res.body) : this.$api.tip(res.resultNote)
				}).catch(err=>{})
			}
		}
	}
</script>

<style lang="scss">
	//  弹出层
	.uni-popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		background: rgba(0, 0, 0, .4);
	}

	.uni-popup__wrapper-box {
		width: 80%;
		position: fixed;
		left: 50%;
		top: 40%;
		transform: translate(-50%, -50%);
	}

	.icon-error {
		position: absolute;
		top: -60px;
		right: 8px;
	}

	.line {
		height: 32px;
		width: 1px;
		background: #FFFFFF;
		position: absolute;
		top: -32px;
		right: 20px;
	}

	.uni-puop-info {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.uni-puop-content {
		z-index: 999;
		background: #FFFFFF;
		border-radius: 10px;
		padding: 20px 10px;
		position: relative;
	}

	.puop-title {
		color: #00736B;
		font-weight: bold;
		font-size: 17px;
	}

	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.tishiimg {
		width: 14px;
		height: 14px;
		margin-left: 5px;
	}

	.icon-swiper {
		display: flex;
		align-items: center;
	}

	.icon-dizhi01 {
		font-size: 30px;
		color: #8C8C8C;
		margin: 0 15px;
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-danseshixintubiao- {
			color: #038980;
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
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-zuojiantou {
			font-size: 32upx;
			color: $font-color-light;
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
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			padding: 15px;

			.product-img {
				flex-shrink: 0;
				display: block;
				width: 90px;
				height: 90px;
				border-radius: 4px;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				overflow: hidden;

			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
				word-break: break-all;
				display: -webkit-box;
				overflow: hidden;
				line-height: 1.5;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				font-weight: bold;
				color: #111111;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
				margin-top: 8px;
				background: #F6F6F6;
				padding: 5px 10px;
			}

			.price-box {
				display: flex;
				flex-direction: column;
				font-size: 32upx;
				color: $font-color-dark;

				.price {
					margin-bottom: 4upx;
					font-size: 15px;
					font-weight: bold;
					color: #FE2C2C;
				}

				.number {
					font-size: 13px;
					color: #111111;
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
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}

			&.red {
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);
		padding: 0 10px;
		box-sizing: border-box;

		.price-content {
			padding-left: 30upx;
		}

		.price-tip {
			color: $base-color;
			margin-left: 8upx;
		}

		.price {
			font-size: 36upx;
			color: $base-color;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 3px 10px;
			margin-right: 8upx;
			color: #fff;
			border-radius: 5px;
			font-size: 28upx;
			background-color: #038980;
		}
	}

	.shuoming-con {
		width: 95%;
		margin: 10px auto 50px auto;
		color: #038980;
	}

	.pos {
		position: fixed;
		bottom: 70px;
		left: 0;
		padding: 0 10px;
	}
</style>
