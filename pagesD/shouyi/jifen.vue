<template>
	<view class="content">
		<view class="jifen-top">
			<text style="font-size:30px;">{{integral}}</text>
			<text style="font-size:15px;">我的积分</text>
		</view>
		<!-- <view class="jifen-con"> -->
		<view class="navbar" :class="{pos:showPos}">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex == index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>
		<swiper duration="300" :current="tabCurrentIndex" @change="changeTarba" class="swiper-box">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadDataMore">
					<empty v-if="tabItem.dataList.length==0&&tabItem.load"></empty>
					<view class="list-item" v-for="(v,k) in tabItem.dataList" :key="k" v-else>
						<view class="list-item-left">
							<view class="list-top">
								{{v.title}}
							</view>
							<view class="list-bottom">
								{{v.adtime}}
							</view>
						</view>
						<view class="list-item-right" v-if="v.szType==0">
							-{{v.integral}}
						</view>
						<view class="list-item-right" v-if="v.szType==1">
							+{{v.integral}}
						</view>
					</view>
					<uni-load-more :status="tabItem.status" v-if="tabItem.dataList.length!=0"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
	</view>
</template>

<script>
	// import  from ""
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/mycom/empty";
	export default {
		data() {
			return {
				showPos: false,
				tabCurrentIndex: 0,
				integral:0,
				navList: [{
						state: 0,
						text: '全部',
						dataList: [],
						status: 'loading',
						load: false
					},
					{
						state: 1,
						text: '收入',
						dataList: [],
						status: 'loading',
						load: false
					},
					{
						state: 2,
						text: '支出',
						dataList: [],
						status: 'loading',
						load: false
					}
				]
			}
		},
		components: {
			uniLoadMore,
			empty
		},
		onLoad() {
			this.loadData();
		},
		onShow() {},
		onHide() {},
		methods: {
			changeTarba(e) {
				this.tabCurrentIndex = e.target.current;
				this.initData(this.tabCurrentIndex);
			},
			loadData() {
				console.log("到底")
				let num = this.tabCurrentIndex;
				let parmas = {
					uid: getApp().globalData.uid,
					type: num,
					nowPage: this.page
				}
				this._reqw.ipost(parmas, "integralMingxiList").then(res => {
					this.navList[num].status="more"
					console.log(res)
					res.result == 0 ? (this.totalPage = res.totalPage,this.integral=res.integral, res.dataList == 0 ? this.navList[num].load =
						true : res.dataList
						.forEach(item => {
							this.navList[num].dataList.push(item)
						})) : this.$api.tip(res.resultNote)
				}).catch(err => {})

			},
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			initData(index) {
				this.page = 1;
				this.totalPage = 1;
				this.navList[index].dataList = [];
				this.loadData();
			},
			loadDataMore() {
				let num = this.tabCurrentIndex;
				this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
					this.navList[index].status = "noMore"
				}, 30)
			}

		}

	}
</script>

<style lang="scss">
	page,
	.content {
		height: 100%;
		overflow: hidden;
	}

	.swiper-box {
		height: calc(100% - 160px);


	}

	.pos {
		position: fixed;
		top: 0;
		left: 0;

	}

	.jifen-top {
		// height: 100px;
		padding: 30px 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #038980;
		color: #fff;
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
			height: 40px;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: #00736b;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid #00736b;
				}
			}
		}
	}

	.list-scroll-content {

		height: 100%;

		.list-item {
			width: 90%;
			height: 60px;
			margin: 10px auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ccc;
		}
	}
</style>
