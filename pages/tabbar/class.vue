<template>
	<view>
		<!-- 状态栏 -->
		<view class="header" :style="{position:headerPosition}">
			<view class="input-box" @tap="toSearch()">
				<view class="iconfont icon-iconseach" style="color: #ffffff;font-size: 15px;"></view>
				<view class="inputHide">
					请输入商品名称
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view scroll-y="true" class="left">
				<view class="row" v-for="(v,k) in leftDataList" :key="k" :class="[k==showCategoryIndex?'on':'']" @tap="showCategory(v.id,k)">
					<view class="text">
						{{v.name}}
					</view>
				</view>

			</scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view scroll-y="true" class="right">
				<view class="category">
					<view class="banner">
						<image :src="image"></image>
					</view>
					<view class="list">
						<view class="box" v-for="(v,k) in rightDataList" :key="k" @tap="toCategory(v)">
							<image :src="v.icon"></image>
							<view class="text">{{v.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- <sec-footer :tabarA="tabarA"></sec-footer> -->
	</view>
</template>
<script>
	import secFooter from '@/components/SecFooter/SecFooter.vue';
	export default {
		data() {
			return {
				tabarA: 1,
				showCategoryIndex: 0,
				categoryId: '',
				image: '',
				leftDataList: [],
				//分类列表
				rightDataList: []
			}
		},
		components: {
			secFooter
		},
		onLoad() {
			this.LoadData()
		},
		methods: {
			LoadData() {
				this._reqw.ipost({}, "yjCategoryList").then(res => {
					console.log(res)
					res.result == 0 ? (res.dataList != undefined && res.dataList.length != 0 ? (this.leftDataList = res.dataList,
							this.categoryId = res.dataList[0].id, this.loadRightData(this.categoryId)) : this.$api.tip("暂无数据")) : this.$api
						.tip(res.resultNote)
				}).catch(err => {})
			},
			loadRightData(id) {
				this._reqw.ipost({
					categoryId: id
				}, "ejCategoryList").then(res => {
					console.log(res)
					res.result == 0 ? (res.dataList != undefined && res.dataList.length != 0 ? (this.rightDataList = res.dataList,
						this.image = res.yjIcon) : this.$api.tip("暂无二级分类")) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},

			//分类切换显示
			showCategory(id, k) {
				this.showCategoryIndex = k;
				this.loadRightData(id);
			},
			toCategory(e) {
				console.log(e)
				e.id == undefined ? this.$api.tip('该商品暂无更多分类！') :
					this.$api.navTo(`/pagesA/classChild/classChild?id=${e.id}`)
			},
			//搜索跳转
			toSearch() {
				this.$api.navTo('/pagesA/search/search_index')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
	}

	.header {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #038980;

		.addr {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;

			.icon {
				height: 60upx;
				margin-right: 5upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
				color: #ffc50a;
			}
		}

		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #68b8b3;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;
			padding-left: 15px;
			box-sizing: border-box;

			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}

			.inputHide {
				padding-left: 28upx;
				height: 28upx;
				line-height: 28upx;
				font-size: 28upx;
				color: #FFFFFF;
			}
		}

	}

	.category-list {
		width: 100%;
		background-color: #fff;
		display: flex;
		

		.left,
		.right {
			position: absolute;

			top: 100upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(100upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
		}

		.left {
			width: 24%;
			left: 0upx;
			background-color: #f2f2f2;

			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;

				.text {
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;

					.block {
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}

				&.on {
					height: 100upx;
					background-color: #fff;

					.text {
						font-size: 30upx;
						font-weight: 600;
						color: #038980;
					}
				}
			}
		}

		.right {
			width: 76%;
			left: 24%;
			background: #ffffff;

			.category {
				width: 94%;
				padding: 20upx 3%;

				.banner {
					width: 100%;
					height: 24.262vw;
					border-radius: 10upx;
					overflow: hidden;
					box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.3);

					image {
						width: 100%;
						height: 24.262vw;
					}
				}

				.list {
					margin-top: 40upx;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
                     // padding-bottom: 50px;
					.box {
						width: calc(71.44vw / 3);
						margin-bottom: 30upx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;

						image {
							width: 60%;
							height: calc(71.44vw / 3 * 0.6);
						}

						.text {
							margin-top: 5upx;
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 26upx;
						}
					}
				}
			}
		}
	}
</style>
