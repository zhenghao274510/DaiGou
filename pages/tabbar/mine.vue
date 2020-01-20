<template>
	<view class="page-content">
		<view class="mine-top pos">
			<image src="/static/image/wodebeijing@2x.png" mode="" class="bg-img"></image>
		</view>
		<view class="mine-top">
			<view class="header">
				<view class="userinfo">
					<view class="username">{{nickName}}</view>
					<view class="integral" @click.stop="copy">邀请码:{{inviteCode}}
						<view class="copy-con">
							复制
						</view>
					</view>
				</view>
				<view class="setting" @click.stop="gotoChange">
					<view class="face">
						<image :src="icon" class="imgs" v-if="icon!=''"></image>
						<image src="/static/image/touxiang2.png" mode="" class="imgs" v-else></image>
					</view>
					<view class="iconfont icon-zuojiantou" style="font-size: 18px;">
					</view>
				</view>
			</view>
		</view>
		<view class="order-con" >
			<view class="orders-title" @click="toOrderType(0)">
				我的订单
			</view>
			<view class="orders">
				<view class="box">
					<view class="label" v-for="(v,k) in orderTypeList" :key="k" hover-class="hover" @tap="toOrderType(k+1)">
						<view class="icon" :style="{width:v.width+'px',height:v.height+'px'}">
							<image :src="'/static/image/'+v.icon"></image>
						</view>
						<view class="">
							{{v.name}}
						</view>

					</view>
				</view>
			</view>
		</view>
		<view class="order-con">
			<view class="orders-title">
				平台服务
			</view>
			<view class="orders">
				<view class="server-box">
					<view class="label" v-for="(v,k) in serverTypeList" :key="k" hover-class="hover" @tap="toSerceveType(k)">
						<view class="icon" :style="{width:v.width+'px',height:v.height+'px'}">
							<image :src="'/static/image/'+v.icon"></image>
						</view>
						<view class="">
							{{v.name}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 海报 -->
		<view :hidden="canvasFlag">
			<image src="/static/image/quxiao@2x.png" class="del" @click.stop="canvasCancel"></image>
			<canvas class="canvas" canvas-id="myCanvas"></canvas>
			<view class="downLoad" @click.stop="save">
				<image src="/static/image/baocundaobendi@2x.png" class="downLoadImage"></image>
				<text class="downLoadText">下载到本地</text>
			</view>

		</view>

		<hchPoster ref="hchPoster" :canvasFlag.sync="canvasFlag" :posterObj.sync="posterData" />

		<home-list :datas="hotProductList" @click="gotoDetail"></home-list>
		<!-- <sec-footer :tabarA="tabarA"></sec-footer> -->
		<back-top v-if="showBack" @click="backTop"></back-top>
		<share-cont :shareList="shareList" :hasTabbar="hasTabbar" contentHeight="580" v-if="showShare" @click.stop="share"></share-cont>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>
<script>
	import secFooter from "@/components/SecFooter/SecFooter"
	// import homeList from "@/components/mycom/homelist.vue"
	import homeList from "@/components/mycom/mineList.vue"
	import backTop from "@/components/mycom/backTop.vue"
	import shareCont from "@/components/mycom/share.vue"
	import creatShare from "@/components/mycom/haibao.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import hchPoster from '@/components/hch-poster/hch-poster.vue'
	export default {
		data() {
			return {
				hasTabbar: true,
				showShare: false,
				tabarA: 4,
				shareImage: "", //  分享图片
				showBack: false,
				orderTypeList: [],
				serverTypeList: [],
				shareList: [],
				status: 'more',
				icon: '',
				nickName: '',
				inviteCode: '',
				kefuTel: '',
				phone: '',
				hotProductList: [],
				totalPage: 1,
				page:1,
				uid: '',
				canvasFlag: true,
				posterData: {}
			};
		},
		components: {
			secFooter,
			homeList,
			backTop,
			shareCont,
			creatShare,
			uniLoadMore,
			hchPoster
		},
		onLoad() {
			//加载
			this.orderTypeList = this.$api.getMineOrderTypeList();
			this.serverTypeList = this.$api.getMineServceTypeList();
			this.shareList = this.$api.shareList();
			this.initData()

		},
		onShow() {
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
				 getApp().globalData.uid=this.uid;
				 this.loadData()
			}else{
				this.uid=''
			}
		},
		onPageScroll(e) {
			e.scrollTop > 100 ? this.showBack = true : this.showBack = false
		},
		onReachBottom() {
			this.status = "loading",
				this.totalPage > this.page ? (this.page += 1, this.loadHotProductList()) :
				setTimeout(() => {
					this.status = "noMore"
				}, 50)
		},
		methods: {
			createCanvasImageEvn() {
				// 这个是固定写死的小程序码
				Object.assign(this.posterData, {
					url: this.shareImage, //商品主图
					// code: 'https://img0.zuipin.cn/mp_zuipin/poster/hch-code.png', //小程序码
					text: this.nickName
				})
				this.$forceUpdate(); //强制渲染数据
				setTimeout(() => {
					this.canvasFlag = false; //显示canvas海报
					this.$refs.hchPoster.createCanvasImage(); //调用子组件的方法
				}, 500)
			},
			copy() {
				//  复制
				if (this.uid == "") {
					this.$api.loginTip(this.auother, this.canle)
				} else {
					let copytext = this.inviteCode
					uni.setClipboardData({
						data: copytext,
						success(res) {
							console.log(res)
						}
					})
				}
			},
			loadData() {
				this._reqw.ipost({
					uid: this.uid
				}, "personalCenterInfo").then(res => {
					console.log(res)
					res.result == 0 ? (this.icon = res.icon, this.nickName = res.nickName, this.inviteCode = res.inviteCode, this.kefuTel =
						res.kefuTel, this.shareImage = res.shareImage, uni.setStorageSync("personPhone", res.phone), uni.setStorageSync(
							"joinImage", res.joinImage),
						uni.setStorageSync("balance", res.balance),
						this.status = "more",
						uni.setStorageSync("isSet", res.isSet)) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			loadHotProductList() {
				let parmas = {
					uid: getApp().globalData.uid,
					newPage: this.page
				};
				console.log(parmas)
				this._reqw.ipost(parmas, "hotProductList").then(res => {
					console.log(res)
					res.result == 0 ? (this.totalPage = res.totalPage, res.dataList
						.forEach(item => {
							this.hotProductList.push(item)
						}), this.status = "more") : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			backTop() {
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
			},
			gotoChange() {
				console.log(11)
				if (this.uid == "") {
					this.$api.loginTip(this.auother, this.canle)
				} else {
					this.$api.navTo(`/pagesD/person/person_msg?icon=${this.icon}&name=${this.nickName}`)
				}
			},
			toOrderType(index) {
				console.log(index)
				if (this.uid == "") {
					this.$api.loginTip(this.auother, this.canle)
				} else {
					index == 4 ? this.$api.navTo('/pagesD/order/tuiorder') : this.$api.navTo(`/pagesD/order/order?id=${index}`)
				}
			},
			gotoDetail(e) {
				console.log(e)
				this.$api.navTo(`/pagesA/shopdetails/shopDetails?id=${e.id}&type=0`)
			},
			auother() {
				this.$api.navTo('/pagesB/author/index')
			},
			canle() {
				this.$api.tip("取消")
			},
			toSerceveType(index) {
				if (this.uid == "") {
					this.$api.loginTip(this.auother, this.canle)
				} else {
					switch (index) {
						case 0:
							this.$api.navTo('/pagesD/person/mycomplin');
							break;
						case 1:
							this.$api.navTo('/pagesD/shouyi/myshouyi');
							break;
						case 2:
							this.$api.navTo('/pagesD/person/address?source=0');
							break;
						case 3:
							this.$api.navTo('/pagesD/person/store');
							break;
						case 4:
							this.$api.callPhone(this.kefuTel);
							break;
							// 邀请有礼
						case 5:
							console.log("点击分享")
							this.showShare = true;
							break;
						case 6:
							this.$api.navTo('/pagesD/person/fensi');
							break;
						case 7:
							this.$api.navTo('/pagesD/shouyi/jifen');
							break;
						case 8:
							this.$api.navTo('/pagesD/person/entershop');
							break;
						case 9:
							this.$api.navTo('/pagesD/person/help');
							break;
					}
				}

			},
			save() {
				this.$refs.hchPoster.saveCanvasImage()
			},
			// 取消海报
			canvasCancel() {
				console.log(111)
				this.canvasFlag = true;
			},
			share(n) {
				console.log(n)
				if (n == 1) {
					this.showShare = false;
					this.createCanvasImageEvn();
				} else if (n == 2 || n == 3) {
					this.showShare = false;
				}
			},
			initData() {
				this.hotProductList=[];
				this.loadHotProductList();
			}

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff
	}

	.page-content {
		padding-bottom: 50px;
	}

	.copy-con {
		padding: 0 5px;
		border: 1px solid #CCCCCC;
		margin-left: 10px;
		font-size: 12px;
		border-radius: 3px;
	}


	.pos {
		position: relative;

		.bg-img {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 215px;
			z-index: -1;
		}
	}

	.header {
		padding: 30px 10px 30px 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #ffffff;
		position: relative;
		z-index: 9999;

		.userinfo {
			flex: 1;
			margin: 0 auto;
			z-index: 9999;



			.username {
				width: 100%;
				color: #fff;
				font-size: 20px;
				font-weight: bold;
			}

			.integral {
				display: flex;
				align-items: center;
				padding: 0 10upx;
				height: 40upx;
				color: #fff;
				// font-size: 24upx;
				margin-top: 15px;
			}

		}

		.setting {
			width: 32%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			z-index: 9999;

			.face {
				width: 60px;
				height: 60px;

				.imgs {
					width: 100%;
					height: 100%;
					border-radius: 100%;
				}
			}

		}
	}

	.hover {
		background-color: #eee
	}

	.order-con {
		width: 92%;
		margin: 20px auto;
		background-color: #fefefe;
		border-radius: 24upx;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);

		.orders-title {
			line-height: 40px;
			border-bottom: 1px solid #ccc;
			padding-left: 20px;
			z-index: 999;
		}

		.orders {
			display: flex;
			align-items: flex-start;

			.box {
				width: 98%;
				height: 22vw;
				// margin-bottom: 40upx;
				display: flex;
				align-items: center;

				.label {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					// flex-flow: wrap;
					width: 25%;
					height: 16vw;
					color: #666666;
					font-size: 26upx;
					margin-bottom: 10px;

					.icon {
						position: relative;
						margin-bottom: 10px;

						image {
							width: 100%;
							height: 100%;
							z-index: 9;
						}
					}
				}
			}
		}

	}


	.server-box {
		margin: 10px;
		// background: #eee;
		display: flex;
		flex-wrap: wrap;
		border-radius: 5px;

		.label {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-flow: wrap;
			flex-direction: column;
			width: 20%;
			height: 16vw;
			color: #666666;
			font-size: 26upx;
			margin-bottom: 10px;

			.icon {
				position: relative;
				margin-bottom: 10px;

				image {
					width: 100%;
					height: 100%;
					z-index: 9;
				}
			}
		}
	}

	.downLoad {
		position: fixed;
		bottom: 60px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9999;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.downLoadImage {
		width: 40px;
		height: 40px;
	}

	.downLoadText {
		color: #FFFFFF;
		margin-top: 10px;
	}

	.canvas {
		position: fixed !important;
		top: 0 !important;
		left: 0 !important;
		display: block !important;
		width: 100% !important;
		height: 100% !important;
		z-index: 9999;
	}

	.del {
		width: 31px;
		height: 31px;
		position: fixed;
		top: 30px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 19999;
	}
</style>
