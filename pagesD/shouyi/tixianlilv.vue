<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex == index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>
		<swiper :current="tabCurrentIndex" duration="300" @change="changeTab" class="swiper-box">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadDataMore">
					<empty v-if="tabItem.dataList.length==0&&tabItem.load"></empty>
					<view v-for="(v,k) in tabItem.dataList" :key="k" class="com-list" v-else>
						<view class="com-list-left">
							<text>{{v.money}}</text>
						</view>
						<view class="com-list-right">
							<!-- 0—待审核，1—已通过，2-已拒绝 -->
							<view v-if="v.checkStatus==0">待审核</view>
							<view v-if="v.checkStatus==1">已通过</view>
							<view v-if="v.checkStatus==2">已拒绝</view>
							<view>{{v.adtime}}</view>
						</view>
					</view>
					<uni-load-more :status="tabItem.status" v-if="!tabItem.load"></uni-load-more>
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
						state: 0,
						text: '全部',
						dataList: [],
						status: "loading",
						load: false
					},
					{
						state: 1,
						text: '待审核',
						dataList: [],
						status: "loading",
						load: false
					},
					{
						state: 2,
						text: '成功',
						dataList: [],
						status: "loading",
						load: false
					},
					{
						state: 3,
						text: '失败',
						dataList: [],
						status: "loading",
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
		onShow() {},
		onHide() {},
		methods: {
			changeTab(e) {
				this.tabCurrentIndex = e.detail.current;
				this.initData()
			},
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			loadData() {
				let num = this.tabCurrentIndex;
				console.log("加载")
				if (this.navList[num].load) {
					return;
				} else {
					let parmas = {
						uid: getApp().globalData.uid,
						type: num,
						nowPage: this.page
					}
					this._reqw.ipost(parmas, "withdrawList").then(res => {
						this.navList[num].status="more"
						res.result == 0 ? (this.totalPage = res.totalPage,res.dataList.length==0?this.navList[num].load=true: res.dataList
							.forEach(item => {
								this.navList[num].dataList.push(item)
							})) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}

			},
			loadDataMore() {
				let num = this.tabCurrentIndex;
				this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
					this.navList[num].status = "noMore"
				}, 30)
			},
			initData() {
				let index = this.tabCurrentIndex;
				this.page = 1;
				this.totalPage = 1;
				this.navList[index].dataList = [];
				// this.navList[index].status = "loading";
				this.navList[index].load = false;
				this.loadData()
			}
		}
	}
</script>
<style lang="scss">
	swiper-item {
		overflow-y: scroll;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	page,
	.content {
		height: 100%;

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
				line-height: 40px;
				text-align: center;
				font-size: 15px;
				position: relative;

				&.current {
					color: #00736B;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 44px;
						height: 0;
						border-bottom: 2px solid #00736B;
					}
				}
			}
		}

		.list-scroll-content {

			// height:100%;
			.com-list {
				width: 95%;
				height: 60px;
				margin: 10px auto;
				display: flex;
				border-bottom: 1px solid #ccc;

				.com-list-left {
					width: 30%;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #00736B;
					font-weight: bold;
					font-size: 17px;
				}

				.com-list-right {
					display: flex;
					flex: 1;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;

					.com-one {
						font-weight: bold;
					}

					.com-two {
						color: #999999;
						font-size: 12px;
					}
				}
			}
		}

	}
</style>
