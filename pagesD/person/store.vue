<template>
	<view class="container">
		<!-- 		空白页
		<view v-if="!hasLogin || empty===true" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @tap="navToLogin">去登陆></view>
			</view>
		</view> -->
		<!-- 列表 -->
		<view class="cart-top" @click="changDel" v-if="dataList.length!=0">
			{{topText}}
		</view>
		<view class="cart-list">
			<block v-for="(v, k) in dataList" :key="k">
				<view class="cart-item" @click.stop="details(v.productId)">
					<view class="cart-item-left">
						<view class="" @click.stop="check('item',k)" v-if="bianji">
							<view class="iconfont icon-xuanzhong" style="color: #038980;" v-if="v.checked">
							</view>
							<view class="iconfont icon-yuan" style="color: #898989;" v-else>
							</view>
						</view>
						<image :src="v.icon" mode="aspectFill" lazy-load class="product-img"></image>
					</view>
					<view class="item-right">
						<view class="item-right-top">
							<text class="clamp title uni-ellipsis">{{v.name}}</text>
						</view>
						<view class="item-right-top">
							<view class="price">{{v.symbol}} <text class="price-true">{{v.price}}</text> </view>
							<view class="sales">已售:{{v.sales}}</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 底部菜单栏 -->

		<view class="action-section bottom-width" v-if="bianji&&dataList.length!=0" >
			<view class="checkbox" @click.stop="check('all')">
				<view class="">
					<view class="iconfont icon-xuanzhong" style="color: #038980;" v-if="allChecked">
					</view>
					<view class="iconfont icon-yuan" style="color:#898989 ;" v-else>
					</view>
				</view>

				<view style="font-size: 14px; color: #000000;margin-left: 10px;">全选</view>
			</view>

			<view class="no-border confirm-btn" @tap="delStore">删除</view>
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
				uid: '',
				page: 1,
				totalPage: 1,
				topText: "编辑",
				bianji: false,
				allChecked: false
			}
		},
		components: {
			uniLoadMore
		},
		onLoad() {
			this.uid = getApp().globalData.uid;
			
		},
		onShow() {
			this.dataList=[];
			this.loadData()
		},
		methods: {
			loadData() {
				let parmas = {
					uid: this.uid,
					pageNo: this.page
				};
				this._reqw.ipost(parmas, "collectionList").then(res => {
					console.log(res)
					res.result == 0 ? (this.totalPage = res.totalPage, this.status = "more", res.dataList != undefined && res.dataList
						.length != 0 ? res.dataList.forEach(item => {
							item.checked = false,
								this.dataList.push(item)
						}) : this.status = "noMore", res.totalPage == 1 ? this.status = "noMore" : this.status = "more") : (this.$api.tip(
						res.resultNote), this.status = "noMore")
				}).catch(err => {})
			},
			details(id) {
				this.$api.navTo(`/pagesA/shopdetails/shopDetails?id=${id}`)
			},
			delStore() {
				let list = this.dataList.filter(item => {
					return item.checked
				});
				console.log(list)
				let cids = [];
				list.forEach(item => {
					cids.push(item.id)
				});
				let parmas = {
					cids: cids.join(',')
				};
				list.length > 0 ? this._reqw.ipost(parmas, 'delCollection').then(res => {
					res.result == 0 ? (this.$api.tip("删除成功!"),this.dataList=[],this.loadData()) : this.$api.tip(res.resultNote)
				}).catch(err => {}) : this.$api.tip('请选择商品!')
			},
			check(type, index) {
				if (type === 'item') {
					this.dataList[index].checked = !this.dataList[index].checked;
				} else {
					const checked = !this.allChecked
					this.dataList.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
			},
			//  编辑
			changDel() {
				this.topText == '完成' ? this.topText = "编辑" : this.topText = "完成", this.initData();
				this.bianji = !this.bianji;
			},
			initData() {
				this.allChecked = false;
				this.dataList.forEach(item => {
					item.checked = false
				})
			}

		},
		onReachBottom() {
			console.log("加载")
			this.status = "loading",
				this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
					this.status = "noMore"
				}, 30)
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 130px;
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
		margin-bottom: 10px;
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

	.price {
		color: #FF0E0E;
		font-size: 12px;
	}

	.price-true {
		font-weight: bold;
		font-size: 17px;
		margin-left: 10px;
	}

	.sales {
		font-size: 12px;
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
		bottom: 0px;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 100%;
		height: 50px;
		padding: 0 10px;
		box-sizing: border-box;
		background: rgba(255, 255, 255, .9);

		.checkbox {
			height: 60upx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 60upx;
			line-height: 60upx;
			color: #038980;
			border: 1px solid #038980;
		}
	}
</style>
