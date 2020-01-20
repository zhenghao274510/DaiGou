<template>
	<view class='box'>
		<view class="nui-home-top">
			<view class="" style="color: #FFFFFF;font-size: 20px;font-weight: bold;">
				logo
			</view>
			<view class="mp-search-box">
				<view class="iconfont icon-iconseach" style="font-size: 18px;">
				</view>
				<view class="ser-input" @tap.stop="onScan">
					输入商品搜索
				</view>
			</view>
			<image src="/static/image/dianhua@2x.png" class="topImage" @click="tellFiex"></image>
		</view>
		<view class="no" style="height: 80px;border-bottom: 100px solid #ffffff;">
		</view>
		<!-- banner -->
		<view class="swiper-box">
			<swiper autoplay="3000" indicator-active-color="#F70E24" indicator-color="#ffffff" circular="true" :height="250"
			 indicator-dots="true">
				<swiper-item v-for="(image, index) in bannerList" :key="index">
					<image class="imgs" :src="image.image" @click.stop="imgurl(image)" lazy-load mode='scaleToFill' />
				</swiper-item>
			</swiper>
		</view>
		<!-- banner -->
		<!-- 标题 -->
		<view class="nav_list">
			<view class="nav_list_item" v-for="(v,k) in keywordList" :key="k" @click="gotoText(v)">
				<image src="/static/image/8.png" mode="" class="keyWordImg" v-if="k==0"></image>
				<image src="/static/image/9.png" mode="" class="keyWordImg" v-if="k==1"></image>
				<image src="/static/image/10.png" mode="" class="keyWordImg" v-if="k==2"></image>
				<text>{{v.title}}</text>
			</view>

		</view>
		<!-- 标题 -->
		<!-- 二级分类 -->
		<view class="all">
			<view class="contains">
				<view class="nav-item" v-for="(item,index) in iconList" :key="index">
					<image :src="item.image" alt @tap.stop="classify(item)" lazy-load />
					<text>{{item.categoryName}}</text>
				</view>
				<view class="nav-item">
					<image src="/static/image/libao.png" alt @tap.stop="gotoClass" lazy-load />
					<text>更多</text>
				</view>
			</view>
		</view>
		<!-- 二级分类 -->
		<!-- 积分换购商城 -->
		<view class="promotion">
			<view class="list">
				<view class="column" v-for="(v, k) in jifenshop" @tap="toPromotion(k)" :key="k">
					<view class="right">
						<image :src="v" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 超值秒杀 -->
		<view class="second_list">
			<view class="second-title">
				<view class="one"></view>
				<view class="two"></view>
				<view style="margin:0 6px;font-size: 17px;">
					超值秒杀
				</view>
				<view class="two"></view>
				<view class="one"></view>
			</view>
			<view class="second_con">
				<view class="second_list_item" v-for="(item,index) in dataList" :key="index" @click="gotoSecond">
					<view class="img">
						<image :src="item.icon"></image>
					</view>
					<view class="second-list-one uni-ellipsis">
						{{item.symbol}}{{item.price}}
					</view>
					<view class="second-list-two uni-ellipsis" style="text-decoration: line-through;">
						{{item.symbol}}{{item.marketPrice}}
					</view>
				</view>
			</view>
		</view>
		<!-- 销量推荐 -->
		<home-list :datas="hotProductList" @click="gotoDetail"></home-list>
		<uni-load-more :status="status"></uni-load-more>
		<back-top v-if="showBack" @click="backTop"></back-top>
		<!-- <sec-footer :tabarA="tabarA"></sec-footer> -->
	</view>
</template>
<script>
	import secFooter from "@/components/SecFooter/SecFooter"
	import homeSwipe from "@/components/mycom/swipe.vue"
	import homeList from "@/components/mycom/homelist.vue"
	import backTop from "@/components/mycom/backTop.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				tabarA: 0,
				show: true,
				fxsTel: '',
				bannerList: [], //  banner
				keywordList: [], //三个关键词列表  
				iconList: [], //四个图标列表
				integralImage: '',
				jifenshop: [], //  jifen
				dataList: [], //超值秒杀
				page: 1,
				totalPage: 2,
				showBack: false,
				status: "more",
				hotProductList: [], // 热销
				uid: ""
			}
		},

		components: {
			secFooter,
			homeSwipe,
			homeList,
			backTop,
			uniLoadMore
		},
		onShow() {
			this.uid = getApp().globalData.uid;
		},
		onLoad() {
			this.loadData();
			this.loadHotProductList();
		},
		onPageScroll(e) {
			e.scrollTop > 100 ? this.showBack = true : this.showBack = false;
		},
		methods: {
			imgurl(e) {
				let num = e.type - 0;
				switch (num) {
					case 0:
						this.$api.navTo(`/pagesA/shopdetails/shopDetails?id=${e.productId}&type=0`);
						break;
					case 1:
						this.$api.navTo(`/pagesA/homeBanner/homeBanner?id=${e.content}`);
						break;
					case 2:
						this.$api.navTo(`/pagesC/jifenshop/jifenshop`);
						break;
					case 3:
						this.$api.navTo(`/pagesC/juancenter/commplin`);
						break;
					case 4:
						this.$api.navTo(`/pagesA/classChild/classChild?id=${e.categoryId}`);
						break;
				}
			},
			orderCanle() {
				this.$api.loginTip(this.auother, this.canle)
			},
			loadData() {
				// if (uni.getStorageSync("homeData")) {
				// 	let homeData = JSON.parse(uni.getStorageSync("homeData"))
				// 	this.formData(homeData)
				// } else {
				let parmas = {
					uid: this.uid
				}
				this._reqw.ipost(parmas, "indexInfo").then(res => {
					// console.log(res)
					res.result == 0 ? (uni.setStorageSync('homeData', JSON.stringify(res)), this.formData(res)) : this.$api.tip(res
						.resultNote)
				}).catch(err => {})
				// }
			},
			formData(res) {
				let a;
				this.fxsTel = res.fxsTel, this.bannerList = res.bannerList, a = res.keywordList[2], res.keywordList
					.pop(), res.keywordList.unshift(a),
					this.keywordList = res.keywordList,
					this.iconList = res.iconList, this.dataList = res.dataList, this.jifenshop.push(res.integralImage), this.jifenshop
					.push(res.couponImage), uni.setStorageSync("integralImage", res.integralImage), uni.setStorageSync(
						"couponImage", res.couponImage), uni.setStorageSync("phone", this.fxsTel)
			},
			loadHotProductList() {
				let parmas = {
					uid: this.uid,
					nowPage: this.page
				}
				this._reqw.ipost(parmas, "hotProductList").then(res => {
					console.log(res)
					res.result == 0 ? (this.totalPage = res.totalPage, res.dataList
						.forEach(item => {
							this.hotProductList.push(item)
						})) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			classify(item) {
				this.$api.navTo("/pagesA/classChild/homeChild?id=" + item.categoryId)
			},
			backTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
			onScan() {
				this.$api.navTo('/pagesA/search/search_index')
			},
			toPromotion(k) {
				switch (k) {
					case 0:
						this.$api.navTo('/pagesC/jifenshop/jifenshop');
						break;
					case 1:
						this.$api.navTo('/pagesC/juancenter/commplin');
						break;
				}
			},
			gotoText(v) {
				this.$api.navTo(`/pagesA/homenav/servce?name=${v.title}&type=${v.type}`)
			},
			gotoDetail(e) {
				console.log(e)
				this.$api.navTo(`/pagesA/shopdetails/shopDetails?id=${e.id}&type=${0}`)
			},
			gotoSecond() {
				this.$api.navTo("/pagesA/secondlist/secondlist")
			},
			tellFiex() {
				console.log(1)
				this.$api.callPhone(this.fxsTel)
			},
			gotoClass() {
               uni.switchTab({
               	url:"/pages/tabbar/class"
               })
			}
		},
		//  加载
		onReachBottom() {
			console.log("到底")
			this.status = "loading"
			this.totalPage > this.page ? (this.page += 1, this.loadHotProductList()) :
				setTimeout(() => {
					this.status = "noMore"
				}, 100)
		},
	}
</script>
<style lang="scss" scoped>
	.topImage {
		width: 24px;
		height: 24px;
	}

	.keyWordImg {
		width: 18px;
		height: 18px;
		margin-right: 5px;
	}

	.nav_list_item {
		display: flex;
		align-items: center;
	}

	// jifen  gouwujuan 
	.promotion {
		width: 92%;
		margin: 4%;

		.text {
			width: 100%;
			height: 60upx;
			font-size: 34upx;
			font-weight: 600;
			margin-top: -10upx;
		}

		.list {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.column {
				width: 49%;
				background-color: #ffffff;
				border-radius: 10upx;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.top {
					width: 100%;
					height: 40upx;
					display: flex;
					align-items: center;
					margin-bottom: 5upx;

					.title {
						font-size: 30upx;
					}
				}

				.left {
					width: 50%;
					height: 18.86vw;
					display: flex;
					flex-wrap: wrap;
					align-content: space-between;

					.ad {
						margin-top: 5upx;
						width: 100%;
						font-size: 22upx;
						color: #acb0b0;
					}

					.into {
						width: 100%;
						font-size: 24upx;
						color: #aaa;
						margin-bottom: 5upx;
					}
				}

				.right {
					width: 100%;
					height: 98px;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}

	.swiper-box {
		width: 90%;
		padding: 0 5%;
		margin: -180px auto 0 auto;
	}

	.nui-home-top,
	.no {
		background: $page-color-light;
	}

	.middle_list {
		display: flex;
		padding: 10px;
		justify-content: space-between;
		align-items: center;

		.middle_list_item {
			flex: 1;
			height: 200px;

			image {
				width: 100%;
				height: 200px;
			}
		}
	}

	.nav_list {
		width: 100%;
		height: 45px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: $font-color-spec;

		text {
			flex: 1;
			line-height: 45px;
			text-align: center;
			color: #00736B;
		}
	}

	.second_list {
		background: #fff;
		margin: 10px 0;

		.second_con {
			display: flex;
			padding: 10px;

			.second-list-first {
				width: 25%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}

			.second_list_item {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.img {
					width: 80px;
					height: 80px;

					image {
						width: 100%;
						height: 80px;
					}
				}

				.second-list-one {
					margin: 0 auto;
					font-size: 14px;
					font-weight: bold;
					color: #111111;
					line-height: 25px;
				}

				.second-list-two {
					margin: 0 auto;
					font-size: 10px;
				}
			}
		}

		.second-title {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 45px;
			font-size: 17px;
			font-weight: bold;
			color: #333333;
		}
	}

	.all {
		position: relative;
		width: 100%;
		background: $font-color-spec;

		.contains {
			display: flex;
			flex-wrap: wrap;
			position: relative;

			.nav-item {
				width: 20%;
				margin-top: 10px;
				margin-bottom: 10px;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;

				image {
					width: 45px;
					height: 45px;
					border-radius: 50%;
				}

				text {
					font-size: 12px;
					color: #666;
					margin-top: 7px;
				}
			}
		}
	}
</style>
