<template>
	<view class="container">
		<empty v-if="empty" @click="navToLogin"></empty>
		<!-- <view v-if="!hasLogin || empty===true" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view> -->
		<view v-else>
			<!-- 列表 -->
			<view class="cart-top" @click="changDel">
				{{topText}}
			</view>
			<view class="cart-list">
				<block v-for="(item, index) in dataList" :key="item.id">
					<view class="cart-item">
						<view class="cart-item-left">
							<view class="" @tap="check('item',index)">
								<view class="iconfont icon-xuanzhong" style="color: #038980;" v-if="item.checked">
								</view>
								<view class="iconfont icon-yuan" style="color: #898989;" v-else>
								</view>
							</view>
							<image :src="item.icon" mode="aspectFill" lazy-load class="product-img"></image>
						</view>
						<view class="item-right">
							<view class="item-right-top">
								<text class="clamp title uni-ellipsis">{{item.name}}</text>
								<view class="iconfont icon-del" style="color: #111111;font-size: 20px;" @click="deleteCartItem(item)">
								</view>
							</view>
							<view class="item-right-top">
								<text class="price">{{item.symbol}}{{item.gwPrice}}</text>
								<uni-number-box class="step" :min="1" :value="item.count" :isMin="item.count===1" :index="index" @change="numberChange"></uni-number-box>
							</view>
							<!-- 		<view class="item-end">
								已达到最大限购数量
							</view> -->
						</view>

					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section" :class="{'bottom-width':total==0}" v-if="bianji">
				<view class="checkbox" @tap="check('all')">
					<view class="iconfont icon-xuanzhong" style="color: #038980;" v-if="allChecked">

					</view>
					<view class="iconfont icon-yuan" style="color: #898989;" v-else>

					</view>

				</view>

				<view class="total-box" v-if="total!=0">
					<text class="price">¥{{total}}</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @tap="createOrder(0)">去结算</button>
			</view>
			<view class="action-section bottom-width" v-else>
				<view class="checkbox" @tap="check('all')">
					<view class="iconfont icon-xuanzhong" style="color: #038980;" v-if="allChecked">

					</view>
					<view class="iconfont icon-yuan" style="color: #898989;" v-else>

					</view>
				</view>

				<view class="del-btn" @tap="createOrder(1)">删除</view>
			</view>
		</view>
		<!-- <sec-footer :tabarA="tarbaA"></sec-footer> -->
	</view>
</template>

<script>
	import secFooter from "@/components/SecFooter/SecFooter.vue"
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import empty from "@/components/mycom/empty";
	export default {
		components: {
			uniNumberBox,
			secFooter,
			empty
		},
		data() {
			return {
				checked: false,
				topText: '完成',
				bianji: true,
				tarbaA: 3,
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				dataList: [],
				uid: ""
			};
		},
		onShow() {
			if (uni.getStorageSync('uid')) {
				this.uid = uni.getStorageSync('uid'),
					getApp().globalData.uid = this.uid
			} else {
				this.uid = ''
			}
			console.log(this.uid)
			if (this.uid == '') {
				this.empty = true
			} else {
				this.initData();
			}

		},
		watch: {
			//显示空白页
			dataList(e) {
				let empty = e.length === 0 ? true : false;
				if (this.empty !== empty) {
					this.empty = empty;
				}
			}
		},
		onHide() {
			this.dataList = [];
		},
		computed: {},
		methods: {
			navToLogin() {
				if (this.uid == '') {
					this.$api.navTo('/pagesB/author/index')
				} else {
					uni.redirectTo({
						url: '/pages/tabbar/home'
					});
				}

				console.log(1)
			},
			initData() {

				this.loadData();
			},
			loadData() {
				let parmas = {
					uid: this.uid,
				};
				this._reqw.ipost(parmas, "cartList").then(res => {
					res.result == 0 ? (res.dataList != undefined && res.dataList.length != 0 ? res.dataList.forEach(item => {
						item.checked = false;
						this.dataList.push(item)
					}) : this.empty = true) : this.$api.tip(res.resultNote)
				}).catch(err => {})

			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					this.dataList[index].checked = !this.dataList[index].checked;
				} else {
					const checked = !this.allChecked
					const list = this.dataList;
					list.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(data) {
				console.log(data)
				this.dataList[data.index].count = data.number;
				this.calcTotal();

			},
			//  编辑
			changDel() {
				this.topText == '完成' ? this.topText = "编辑" : this.topText = "完成";
				this.bianji = !this.bianji;
			},
			//删除
			deleteCartItem(list) {
				let _this = this;
				uni.showModal({
					title: "确定删除吗",
					cancelText: "取消",
					confirmText: "确定",
					confirmColor: "#00736B",
					titleColor: "#00736B",
					success(res) {
						if (res.confirm) {
							let cartId = []
							console.log(list, cartId)
							list.id != undefined ? cartId.push(list.id) : list.forEach(item => {
								cartId.push(item.id)
							})
							// typeof list != Array ? cartId.push(list) :cartId ;

							let parmas = {
								uid: _this.uid,
								cartIds: cartId.join(',')
							}
							_this._reqw.ipost(parmas, "delCart").then(res => {
								res.result == 0 ? (_this.$api.tip('删除成功!'), _this.initData(), _this.calcTotal()) : _this.$api.tip(res.resultNote)
							})
						} else if (res.cancel) {
							console.log("取消")
						}
					}
				})

			},
			//计算总价
			calcTotal() {
				let list = this.dataList;
				if (list.length === 0) {
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item => {
					if (item.checked === true) {
						total += item.price * item.count;
					} else if (checked === true) {
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = this.$api.parsePrice(total);
			},
			//创建订单
			createOrder(n) {
				let list = this.dataList.filter(item => {
					return item.checked
				});
				list.length > 0 ? (n == 1 ? this.deleteCartItem(list) : (uni.setStorageSync('good', JSON.stringify(list)),
						setTimeout(() => {
							this.$api.navTo(
								`/pagesD/order/finishOrder?payType=1&type=0`)
						}, 200))) :
					this
					.$api.tip('请选择商品!')
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container {
		padding-bottom: 130px;
	}

	.empty {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		padding-bottom: 100upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background: #fff;

		image {
			width: 240upx;
			height: 160upx;
			margin-bottom: 30upx;
		}

		.empty-tips {
			display: flex;
			font-size: $font-sm+2upx;
			color: $font-color-disabled;

			.navigator {
				color: $uni-color-primary;
				margin-left: 16upx;
			}
		}
	}

	.cart-top {
		height: 60px;
		line-height: 60px;
		padding: 0 15px;
		text-align: right;
		font-size: 15px;
		color: #00736B;
	}

	.cart-item {
		width: 95%;
		margin: 0 auto;
		display: flex;
		position: relative;
		background: #ffffff;
		padding: 8px;
		box-sizing: border-box;
	}

	.item-right-top {
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}

	.bottom-width {
		width: 100%;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
	}

	.item-end {
		text-align: right;
		color: #00736B;
	}

	.cart-item-left {
		width: 230upx;
		height: 230upx;
		position: relative;
		display: flex;
		align-items: center;

	}

	.product-img {
		width: 90px;
		height: 90px;
		border-radius: 5px;
		margin-left: 10px;
	}

	.item-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		position: relative;
		padding-left: 30upx;
	}

	.title,
	.price {
		height: 40upx;
		line-height: 40upx;
		flex: 1;
	}

	.del-btn {
		padding: 4upx 10upx;
		font-size: 34upx;
		height: 50upx;
		color: $font-color-light;
	}

	.iconfont {
		font-size: 24px;
	}

	/* 底部栏 */
	.action-section {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 100%;
		height: 50px;
		padding: 0 10px;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 1);

		.checkbox {
			height: 52upx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;

			&.show {
				opacity: 1;
				width: 120upx;
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;

			.price {
				font-size: $font-lg;
				color: $font-color-dark;
			}

			.coupon {
				font-size: $font-sm;
				color: $font-color-light;

				text {
					color: $font-color-dark;
				}
			}
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 60upx;
			line-height: 60upx;
			background: #038980;
			font-size: 13px;
		}

		.del-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 60upx;
			line-height: 60upx;
			color: #038980;
			border: 1px solid #038980;
			font-size: 13px;
		}
	}
</style>
