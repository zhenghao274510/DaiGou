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

					<view class="com-list" v-for="(v,k) in tabItem.dataList" :key="k">
						<view class="com-list-left">
							<image :src="v.icon" mode="" lazy-load></image>
							<view class="com-list-left-info">
								<view class="list-top">{{v.nickName}}</view>
								<view class="list-bottom">{{v.phone}}</view>
							</view>
							<view class="com-list-right">
								{{v.adtime}}
							</view>
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
				page: 1,
				totalPage: 1,
				navList: [{
						state: 0,
						text: '全部',
						dataList: [],
						status: "loading",
						load: false
					},
					{
						state: 1,
						text: '一级粉丝',
						dataList: [],
						status: "loading",
						load: false
					},
					{
						state: 2,
						text: '二级粉丝',
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
			this.loadData();
		},
		onShow() {},
		onHide() {},
		methods: {
			changeTab(e) {
				this.tabCurrentIndex = e.detail.current;
				this.initData(this.tabCurrentIndex);
			},
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			loadData() {
				console.log('添加')
				let num = this.tabCurrentIndex;
				let type;
				if(num==0){
					type=''
				}else{
					type=num-1
				}
				let parmas = {
					uid: getApp().globalData.uid,
					type: type,
					nowPage: this.page
				};
				this._reqw.ipost(parmas, "fanList").then(res => {
					console.log(res)
					this.navList[num].status = "more"
					res.result == 0 ? (this.totalPage = res.totalPage,
						res.dataList.length == 0 ? (this.navList[num].load = true) : res.dataList.forEach(item => {
							item.phone = this.formPhone(item.phone)
							this.navList[num].dataList.push(item)
						})) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			loadDataMore() {
				let num = this.tabCurrentIndex;
				this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
					this.navList[num].status = "noMore"
				}, 30)
			},
			formPhone(val){
				let v=`${val.substring(0,3)}****${val.substring(7)}`
				return v
			},
			initData(index) {
				this.page = 1;
				this.totalPage = 1;
				this.navList[index].dataList = [];
				this.navList[index].status = "loading";
				this.navList[index].load = false;
				this.loadData()
			}
		}


	}
</script>

<style lang="scss">
	page,
	.content {
		height: 100%;
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
			border-bottom: 1px solid #ccc;

			.com-list-left {
				width: 100%;
				display: flex;
				align-items: center;

				image {
					width: 80px;
					height: 80px;
					border-radius: 50%;
				}

				.com-list-left-info {
					margin-left: 10px;
					display: flex;
					flex: 1;
					flex-direction: column;
					align-items: center;

					// justify-content: first baseline
					view {
						width: 100%;
						text-align: left;
					}
				}
			}

			.com-list-right {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
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
</style>
