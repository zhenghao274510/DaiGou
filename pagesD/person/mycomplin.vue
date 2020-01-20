<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex == index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>
		<view class="cart-top" @click="changDel">
			使用说明
		</view>
		<swiper :current="tabCurrentIndex" duration="300" @change="changeTab" class="swiper-box">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadDataMore">
					
					<empty v-if="tabItem.dataList.length==0&&tabItem.load"></empty>
					<view v-for="(v,k) in tabItem.dataList" :key="k" class="com-list" @click="useComplin(v)">
						<image src="/static/image/yilingquyouhuijuan@2x.png" mode="scaleToFill" class="image-bg"></image>
						<view class="com-list-left">
							<text><text style="font-size: 14px;">￥</text>{{v.dyMoney}}</text>
						</view>
						<view class="com-list-right">
							<text class="com-list-right-one">满{{v.mjMoney}}元可用</text>
							<text class="com-list-right-two">{{v.startDate}}~{{v.endDate}}</text>
						</view>
					</view>
					<uni-load-more :status="tabItem.status" v-if="tabItem.dataList.length!=0"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// import  from ""
	import empty from "@/components/mycom/empty";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						text: '未使用',
						dataList: [],
						status: 'loading',
						load: false
					},
					{
						text: '已使用',
						dataList: [],
						status: 'loading',
						load: false
					},
					{
						text: '已过期',
						dataList: [],
						status: 'loading',
						load: false
					}
				]
			}
		},
		components: {
			empty,
			uniLoadMore
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			changDel() {
				console.log(111)
				this.$api.navTo(`/pagesA/homenav/servce?type=2&name=使用说明`)
			},
			changeTab(e) {
				this.tabCurrentIndex = e.detail.current;
				this.initData(this.tabCurrentIndex)
			},
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			loadData() {
				let num = this.tabCurrentIndex;
				// if (this.navList[num].load) {
				// 	return;
				// } else {
					// this.navList[num].load = true;
					// this.navList[num].status = "loading";
					let parmas = {
						uid: getApp().globalData.uid,
						type: num,
						nowPage: this.page
					};
					this._reqw.ipost(parmas, "couponList").then(res => {
						this.navList[num].status = "more"
						res.result == 0 ? (this.totalPage = res.totalPage, res.dataList != undefined &&
							res.dataList.length != 0 ? res.dataList.forEach(item => {
								item.startDate=this.$api.formTime(item.startDate),
								item.endDate=this.$api.formTime(item.endDate),
								this.navList[num].dataList.push(item)
							}) : this.navList[num].load = true) : this.$api.tip(res.resultNote)
					})
				// }
			},
			loadDataMore() {
				let num = this.tabCurrentIndex;
				this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
					this.navList[num].status = "noMore"
				}, 30)
			},
			initData(index) {
				this.page = 1;
				this.totalPage = 1;
				this.navList[index].dataList = [];
				this.loadData();
			}
		}

	}
</script>

<style lang="scss">
	page,
	.content {
		height: 100%;
	}
	.cart-top {
		height: 60px;
		line-height: 60px;
		padding: 0 15px;
		text-align: right;
		font-size: 15px;
		color: #00736B;
		z-index: 999;
	}

	.image-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
		.com-list {
			width: 90%;
			height: 100px;
			margin: 10px auto;
			display: flex;
			position: relative;

			.com-list-left {
				width: 30%;
				display: flex;
				color: #fff;
				font-size: 24px;
				font-weight: bold;
				justify-content: center;
				align-items: center;
			}

			.com-list-right {
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.com-list-right-one {
					color: #333333;
					font-size: 16px;
					font-weight: bold;
					margin-bottom: 15px;
				}

				.com-list-right-two {
					font-size: 12px;
				}
			}
		}
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
			// color: $font-color-dark;
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
</style>
