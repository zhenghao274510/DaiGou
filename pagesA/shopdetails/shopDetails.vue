<template>
	<view class="container" v-if="showDate">
		<!-- <block v-for="(v,k) in dataList" :key="k"> -->
		<view class="carousel">
			<swiper indicator-dots circular=true indicator-active-color="#038980">
				<swiper-item class="swiper-item" v-if="video!=''">
					<view class="image-wrapper">
						<video :src="video" controls :poster="imgList[0]" object-fit="cover"></video>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper" @click="seeDetails(index)">
						<image :src="item" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="introduce-section">
			<view class="top-content">
				<view class="price-box">
					<view class="">
						<text style="color: #FF0E0E;">¥</text>
						<text class="introduce-section-price">{{dataObj.price}}</text>
					</view>
					<view class="" v-if="dataObj.isChina==0">
						<text class="m-price">{{dataObj.symbol}}</text>
						<text class="coupon-tip">{{dataObj.gwPrice}}</text>
					</view>
				</view>
				<view class="">
					已售:{{dataObj.sales}}
				</view>
			</view>

			<view class="title">
				<!-- 		<view style="display: flex;align-items:center;flex-wrap: wrap;"> -->

				<view class="title-info">
					<text class="title-icon" v-if="dataObj.isShip==1">
						包邮
					</text>
					{{dataObj.name}}
				</view>
				<!-- </view> -->
			</view>
			<!--  分享 -->
			<view class="share">
				<image src="/static/image/fenxiang@2x.png" mode=""></image>
				<button type="primary" open-type="share" class="share-btn"></button>
			</view>

		</view>
		<view class="c-list">
			<view class="c-row b-b">
				<view class="com-list-item">
					<text class="tit">赠送积分:</text>
					<view class="con-list" style="color: #FF0E0E;">
						{{dataObj.point}}
					</view>
				</view>
			</view>
		</view>
		<view class="c-list">
			<view class="c-row b-b">
				<view class="com-list-item">
					<!-- <text class="tit">副标题:</text> -->
					<view>
						{{dataObj.subtitle}}
					</view>
				</view>
			</view>
			<view class="c-row b-b">
				<!-- <view class=""> -->
				<view class="com-list-item-swiper">
					<view class="com-list-item">
						<view class="iconfont icon-zhengpinbaozhang">
						</view>
						<view class="">
							正品保障
						</view>
					</view>
					<view class="com-list-item" v-if="dataObj.isShip==1">
						<view class="iconfont icon-baoyou">
						</view>
						<view class="">
							全国包邮
						</view>
					</view>
					<view class="com-list-item">
						<image :src="dataObj.nationalFlag" mode="" class="nationalFlag"></image>
						<view class="">
							{{dataObj.title}}
						</view>
					</view>
				</view>
				<!-- </view> -->

			</view>
		</view>
		<view class="detail-desc">
			<view class="d-header">
				商品详情
			</view>
			<rich-text :nodes="content"></rich-text>
			<!-- <u-parse :content="content"></u-parse> -->
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<view class="page-bottom-left">
				<view class="p-b-btn">
					<view class="iconfont icon-erji" style="color: #8C8C8C;font-size: 20px;" @click="tellPhone">

					</view>
					<view>客服</view>
				</view>
				<view class="p-b-btn" :class="{active:isCollection==1}" @click="toFavorite">
					<image src="/static/image/shoucang_se@2x.png" mode="" v-if="isCollection==1"></image>
					<image src="/static/image/shoucang@2x.png" mode="" v-else></image>
					<view>收藏</view>
				</view>
			</view>

			<view class="action-btn-group" v-if="type==0">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click.stop="toggleSpec(1)">加入购物车</button>
				<button type="primary" class=" action-btn no-border  add-cart-btn" @click.stop="toggleSpec(0)">立即购买</button>
			</view>
		</view>


		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" v-if="showChoose" @touchmove.stop.prevent="stopPrevent" @click.stop="showChoose=false">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<block>
				<view class="layer attr-content" @click.stop>
					<view class="a-t">
						<image :src="list[current].image"></image>
						<view class="right">
							<text class="guge-price">¥{{list[current].price}}</text>
							<text class="stock">库存：{{list[current].stock}}</text>
							<view class="selected">
								已选：
								<text class="selected-text" v-for="(v,k) in choseSku" :key="k">
									"{{v.value}}"
								</text>
							</view>
						</view>
						<view class="iconfont icon-error" style="color: #999999;" @click.stop="showChoose=false">

						</view>
					</view>
					<block v-for="(item,index) in shunameList" :key="index" class="tit">
						<view class="attr-list">
							<text>{{item.shuName}}</text>
							<view class="item-list">
								<block v-for="(v, k) in skuList" :key="k" class="tit" v-if="shunameList.length==1">
									<text :class="{selected:k==current}" @click="choseItem(index,k)">{{v.value}}</text>
								</block>
								<block v-for="(v, k) in skuList[index]" :key="k" class="tit" v-if="shunameList.length>1">
									<text :class="[{selected:k==currentSku1&&index==0},{selected:k==currentSku2&&index==1}]" @click="choseItem(index,k)">{{v.value}}</text>
								</block>
							</view>
						</view>
					</block>
					<view class="choseNum">
						<view class="">
							购买数量
						</view>
						<uni-number-box class="step" :min="1" :max="stock" @change="numberChange"></uni-number-box>
					</view>
					<button class="btn" @click.stop="finishChose">确定</button>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import bbsCountDown from "@/components/bbs-countdown/bbs-countdown.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import uParse from '@/components/uParse/src/wxParse.vue'
	export default {
		components: {
			bbsCountDown,
			uniNumberBox
		},
		data() {
			return {
				showChoose: false,
				current: 0,
				currentSku1: 0,
				currentSku2: 0,
				count: 1,
				isbuy: 0, //  0  购买   1  加入购物车
				dataObj: {},
				productId: '',
				skuId: '',
				uid: '',
				type: 0,
				content: '',
				isCollection: 0,
				imgList: [],
				skuList: [],
				shunameList: [],
				choseSku: [],
				list: [],
				video: '',
				showDate: false,
				width: '',
				phone: ''
			};
		},
		components: {
			uParse
		},
		onShow() {
			if (uni.getStorageSync('uid')) {
				this.uid = uni.getStorageSync('uid');
				getApp().globalData.uid = this.uid;
			} else {
				this.uid = ''
			}
			this.initData();
		},
		computed: {
			stock() {
				if (this.dataObj.skuList != undefined) {
					let k = this.current;
					return this.dataObj.skuList[k].stock
				}
			}
		},
		onLoad(options) {
			this.productId = options.id;
			this.phone = uni.getStorageSync('phone');
			this.width = uni.getStorageSync("screen").screenWidth;
		},
		methods: {
			seeDetails(n) {
				console.log(n)
				uni.previewImage({
					urls: this.imgList,
					current: this.imgList[n]
				})
			},
			choseItem(index, k) {
				if (this.shunameList.length == 1) {
					this.current = k;
					this.choseSku = this.list[k].specification;
				} else {
					index == 0 ? (this.currentSku1 = k) :
						(this.currentSku2 = k);
					let n = this.currentSku1;
					let m = this.currentSku2;
					this.choseSku[0] = this.skuList[0][n];
					this.choseSku[1] = this.skuList[1][m];
					for (let i in this.list) {
						if ((this.list[i].specification[0].value == this.choseSku[0].value) && (this.list[i].specification[1].value ==
								this.choseSku[1].value)) {
							this.current = i;
						}
					}
				}

			},
			initData() {
				this.current = 0;
				this.count = 0;
				this.loadData()
			},
			auother() {
				this.$api.navTo('/pagesB/author/index')
			},
			canle() {
				this.$api.tip("取消")
			},
			numberChange(data) {
				console.log(data)
				let k = this.current;
				data.number >= this.stcok ? (this.$api.tip('已达到最大!'), this.count = this.stcok) : this.count = data.number;
			},
			loadData() {
				let parmas = {
					uid: this.uid,
					productId: this.productId
				};
				console.log(parmas)
				this._reqw.ipost(parmas, "productDetail").then(res => {
					this.showDate = true;
					console.log(res)
					// MPEG、AVI、nAVI、ASF、MOV、3GP、WMV、DivX、XviD、RM、RMVB、FLV/F4V
					let reg = new RegExp(/\.mp4|\.rmvb|\.wmv|\.mpeg|\.avi/);
					res.result == 0 ? (this.dataObj = res, res.lbImageList.forEach((item, index) => {
							if (reg.test(item)) {
								res.lbImageList.splice(index, 1);
								this.video = item
							}
						}), this.imgList = res.lbImageList, this.shunameList =
						res.shunameList,
						res.skuList.forEach(item => {
							item.specification = JSON.parse(item.specification)
						}), this.list = res.skuList,
						this.skuList = this.formData(res.skuList), this.content = this.$api.formText(res.content, this.width), this.isCollection =
						res.isCollection) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			tellPhone() {
				this.$api.callPhone(this.phone)
			},
			//规格弹窗开关
			toggleSpec(n) {
				if (this.uid == "") {
					this.$api.loginTip(this.auother, this.canle)
				} else {
					this.isbuy = n;
					n == 0 || n == 1 ? this.showChoose = true : this.activeBuy();
				}
			},
			addCart() {
				if (this.uid == '') {
					this.$api.loginTip(this.auother, this.canle)
				} else {
					let parmas = {
						uid: this.uid,
						skuId: this.skuId,
						count: this.count
					};
					this._reqw.ipost(parmas, "addCart").then(res => {
						res.reult == 0 ? this.$api.tip("添加成功") : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}

			},
			formData(arry) {
				let newArry = this.shunameList;
				this.choseSku = [];
				let ary1 = [];
				let ary2 = [];
				if (newArry.length == 1) {
					for (let j = 0; j < arry.length; j++) {
						ary1.push(arry[j].specification[0])
					}
					console.log(ary1)
					this.choseSku.push(ary1[0]);
					return ary1
				} else {
					for (let j = 0; j < arry.length; j++) {
						ary1.push(arry[j].specification[0])
						ary2.push(arry[j].specification[1])
					}
					let s1 = this.formAry(ary1);
					let s2 = this.formAry(ary2);
					let myArry = [s1, s2]
					this.choseSku[0] = myArry[0][0],
						this.choseSku[1] = myArry[1][0]
					return myArry
				}
			},
			formAry(arr) {
				var result = [];
				var obj = {};
				for (var i = 0; i < arr.length; i++) {
					if (!obj[arr[i].value]) {
						result.push(arr[i]);
						obj[arr[i].value] = true;
					}
				}
				return result
			},
			// 规格完成
			finishChose() {
				let k = this.current;
				this.showChoose = false;
				this.skuId = this.list[k].id;
				console.log(this.skuId)
				this.isbuy == 1 ? this.addCart() : this.activeBuy()
			},
			activeBuy() {
				let k = this.current;
				console.log(this.dataObj.skuList[k])
				let obj = this.dataObj.skuList[k];
				obj.id = this.productId;
				obj.skuId=this.skuId;
				obj.count = this.count;
				obj.name = this.dataObj.name;
				obj.point = this.dataObj.point;
				obj.taxes = this.dataObj.taxes;
				let finishGood = [];
				finishGood.push(obj)
				// console.log(finishGood)
				uni.setStorageSync("good", JSON.stringify(finishGood));
				uni.setStorageSync('sku', JSON.stringify(this.choseSku));
				this.$api.navTo(`/pagesD/order/finishOrder?type=${this.type}&payType=0`)
			},
			//收藏
			toFavorite() {
				if (this.uid == '') {
					this.$api.loginTip(this.auother, this.canle)
				} else {
					let parmas = {
						uid: this.uid,
						productId: this.productId
					};
					this._reqw.ipost(parmas, "collectionOrCancel").then(res => {
						res.result == 0 ? (
							this.isCollection == 0 ? (this.$api.tip('收藏成功'), this.isCollection = 1) : (this.isCollection = 0, this.$api.tip(
								'取消成功'))) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}
			},
			stopPrevent() {}
		},
		onHide() {
			this.current= 0;
			this.currentSku1= 0;
			this.currentSku2= 0;
		}

	}
</script>

<style lang='scss' scoped>
	.container {
		padding-bottom: 50px;
	}

	.top-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 15px;
	}

	.richImg {
		width: 375px;

	}

	.dui-btn,
	.secod-btn {
		width: 120px;
		height: 38px;
		line-height: 38px;
		border-radius: 20px;
		background: #00736B;
		color: #FFFFFF;
		font-size: 14px;
	}

	.com-list-item {
		display: flex;
		align-items: center;
		margin-right: 10px;
		width: 100%;
	}

	.com-list-item-swiper {
		display: flex;
		width: 100%;

	}

	.nationalFlag {
		width: 18px;
		height: 13px;
		margin-right: 10px;
	}

	.icon-zhengpinbaozhang,
	.icon-baoyou {
		color: red;
		font-size: 14px;
		margin-right: 5px;
	}

	.buy-now-btn {
		background: linear-gradient(-90deg, rgba(32, 172, 162, 1) 0%, rgba(41, 220, 207, 1) 100%);
		border-radius: 38px 0px 0px 38px;
		border-right: 1px solid #ffffff;
	}

	.add-cart-btn {
		background: linear-gradient(-90deg, rgba(0, 115, 107, 1) 35%, rgba(32, 172, 162, 1) 100%);
		border-radius: 0px 38px 38px 0px;
	}

	.share-btn {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		z-index: 99;
	}

	.title-icon {
		background: #00736B;
		padding: 1px 5px;
		text-align: center;
		border-radius: 8px;
		font-size: 10px;
		color: #fff;
		margin-right: 10px;
		margin-top: 5px;
	}

	.title-info {
		font-weight: bold;
		color: #111111;
		line-height: 25px;
	}

	.second-time {
		height: 40px;
		display: flex;
		padding: 0 10px;
		justify-content: space-between;
		align-items: center;
		background: linear-gradient(79deg, rgba(20, 175, 164, 1) 0%, rgba(0, 115, 107, 1) 100%);
		color: #fff;
		font-size: 16px;
	}

	.carousel {
		height: 722upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 375px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		position: relative;
		padding-left: 20px;
	}

	.title {
		font-size: 32upx;
		padding: 15px 10px 30px 0;
		display: flex;
		justify-content: space-between;
		align-items: cnetr;
		flex-wrap: wrap;
	}

	.price-box {
		display: flex;
		align-items: flex-end;
		height: 64upx;
		padding: 10upx 0;
		font-size: 26upx;
		align-items: center;
	}

	.guge-price {
		color: #FE2C2C;
		font-size: 25px;
	}

	.introduce-section-price {
		font-size: 19px;
		font-weight: bold;
		color: #FF0E0E;
	}

	.m-price {
		margin: 12upx;
		color: #666666;
	}

	.coupon-tip {
		align-items: center;
		font-size: $font-sm;
		line-height: 1;
	}

	.bot-row {
		display: flex;
		align-items: center;
		height: 50upx;

		text {
			flex: 1;
		}
	}


	/* 分享 */
	.share {
		width: 56px;
		height: 24px;
		margin-top: -30px;
		position: relative;
		float: right;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.c-list {
		background: #fff;
		margin-top: 10px;

		.c-row {
			display: flex;
			align-items: center;
			padding: 20upx 30upx;
			position: relative;
		}

		.tit {
			width: 140upx;
		}

		.con {
			flex: 1;

			.selected-text {
				margin-right: 10upx;
			}
		}

		.bz-list {
			height: 40upx;

			text {
				display: inline-block;
				margin-right: 30upx;
			}
		}

		.con-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			line-height: 40upx;
		}

		.red {
			color: red;
		}
	}

	/*  详情 */
	.detail-desc {
		background: #fff;
		margin-top: 16upx;


		.d-header {
			height: 80upx;
			line-height: 80upx;
			position: relative;
			color: #111111;
			font-weight: bold;
			padding-left: 15px;
		}
	}

	/* 规格选择弹窗 */
	.attr-content {
		padding: 10upx 30upx;
		width: 100%;
		box-sizing: border-box;

		.a-t {
			display: flex;
			justify-content: space-between;

			image {
				width: 120px;
				height: 120px;
				flex-shrink: 0;
				border-radius: 8upx;
			}

			.right {
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: flex-end;
				padding-left: 24upx;
				line-height: 42upx;

				.price {
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			padding-top: 30upx;
			padding-left: 10upx;
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				/* background: #eee; */
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 5px;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				border: 1px solid #CCCCCC;
			}

			.selected {
				border: 1px solid #00736B;
				color: #00736B;
				/* background: #fbebee; */
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				color: #fff;
				margin: 30upx auto;
				background: #00736B;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 95;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		width: 100%;
		box-sizing: border-box;
		height: 50px;
		background: #fff;
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);

		.page-bottom-left {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 32%;

			.p-b-btn {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 50px;
				box-sizing: border-box;

				image {
					width: 20px;
					height: 20px;
				}

				.yticon {}

				&.active,
				&.active .yticon {
					color: #00736B;
				}
			}

		}

		.action-btn-group {
			display: flex;
			flex: 1;
			margin-left: 20px;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			margin-left: 5upx;
			position: relative;

			.action-btn {
				display: flex;
				flex: 1;
				align-items: center;
				justify-content: center;
				/* width: 240upx; */
				height: 100%;
				font-size: 14px;
				padding: 0;
				border-radius: 0;
			}
		}
	}

	.choseNum {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
