<template>
	<view class="content">
		<view class="com-top">
			<image :src="image"></image>
		</view>
		<view class="cart-top" @click="changDel">
			领劵说明
		</view>
		<view class="com-list-con">
			<view class="com-list" v-for="(v,k) in dataList" :key="k" @click="getCompline(v,k)">
				<image src="/static/image/yilingquyouhuijuan@2x.png" class="image-bg"></image>
				<view class="com-list-left">
					<text><text style="font-size: 14px;">￥</text>{{v.dyMoney}}</text>
				</view>
				<view class="com-list-right">
					<view class="com-list-right-info">
						<view class="com-list-right-one">满{{v.mjMoney}}元可用</view>
						<view class="com-list-right-two">有效期: {{v.days}}天</view>
					</view>
					<view class="com-list-btn" v-if="v.isCollar==0">
						<view style="color: #00736B;">
							立即领取
						</view>
					</view>
					<view class="com-list-btn" v-if="v.isCollar==1">
						<view>
							已领
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				page: 1,
				totalPage: 1,
				status: "loading",
				dataList: [],
				image: '',
				uid: ''
			}
		},
		onLoad() {
			this.image = uni.getStorageSync("couponImage");
		},
		onShow() {
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
				 getApp().globalData.uid=this.uid;
			}else{
				this.uid=''
			}
			this.initData()
		},
		components: {
			uniLoadMore
		},
		onReachBottom() {
			this.status = "loading";
			this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
				this.status = "noMore"
			}, 30)
		},
		methods: {
			loadData() {
				let parmas = {
					uid: this.uid,
					nowPage: this.page
				};

				this._reqw.ipost(parmas, "couponCenterList").then(res => {
					res.result == 0 ? (this.totalPage = res.totalPage, this.status = "more", res.dataList != undefined && res.dataList
						.length != 0 ?
						res.dataList.forEach(item => {
							this.dataList.push(item)
						}) : this.status = "noMore") : this.$api.tip(res.resultNote)
				})
			},
			auother() {
				this.$api.navTo('/pagesB/author/index')
			},
			canle() {
				this.$api.tip("取消")
			},
			initData() {
				this.dataList = [];
				this.page = 1;
				this.totalPage = 1;
				this.status = "loading";
				this.loadData();
			},
			getCompline(v, k) {

				if (this.uid == "") {
					this.$api.loginTip(this.auother, this.canle)
				} else {
					let parmas = {
						uid: this.uid,
						cid: v.id
					};
					v.isCollar == 1 ? this.$api.tip("该劵已领取!") : this._reqw.ipost(parmas, "collarCoupon").then(res => {
						res.result == 0 ? (this.$api.tip("领取成功"), this.dataList[k].isCollar = 1) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}

			},
			changDel() {
				this.$api.navTo(`/pagesA/homenav/servce?type=1&name=领劵说明`)
			}
		}
	}
</script>

<style scoped lang="scss">
	page,
	.content {
		width: 100%;
	}

	.cart-top {
		height: 60px;
		line-height: 60px;
		padding: 0 15px;
		text-align: right;
		font-size: 15px;
		color: #00736B;
	}


	.com-top {
		width: 100%;
		height: 125px;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.com-list {
		width: 90%;
		height: 100px;
		margin: 10px auto;
		display: flex;
		position: relative;

		.image-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
		}

		.com-list-left {
			width: 30%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			font-size: 24px;
			font-weight: bold;
		}

		.com-list-right {
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;

			.com-list-right-info {
				flex: 1;

				.com-list-right-one {
					color: #333333;
					font-size: 16px;
					font-weight: bold;
					margin-bottom: 15px;
					text-align: center;
				}

				.com-list-right-two {
					font-size: 12px;
					color: #999999;
					text-align: center;
				}
			}

			.com-list-btn {
				border-left: 1px solid #ccc;
				width: 50px;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				view {
					width: 23px;
					font-weight: 500;
					text-align: center;
					color: #999999;
				}
			}
		}
	}
</style>
