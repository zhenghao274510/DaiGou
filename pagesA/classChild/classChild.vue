<template>
	<view class="content">
		<view class="search-pop" @click="submitSearch">
			<view class="top-input">
				<view class="iconfont icon-iconseach" style="font-size: 18px; color: #fff;">

				</view>
				<!-- <input type="text" value="" placeholder-style="color:#fff" placeholder="请输入关键字"  /> -->
				<view class="inputHide">
					请输入关键字
				</view>
			</view>
			<view class="search-btn">
				搜索
			</view>
		</view>
		<view class="top-nav">
			<block v-for="(v,k) in navList" :key="k">
				<view class="top-nav-item" @click="changeTab(v,k)">
					<view class="top-nav-item-title" :class="{iconColor:k==currentActive}">
						{{v.title}}
					</view>
					<view class="top-nav-item-icon">
						<view class="iconfont icon-up" :class="{iconColor:v.flag}">

						</view>
						<view class="iconfont icon-LC_icon_down_fill" :class="{iconColor:!v.flag}">

						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="uni-product-list">
			<view class="uni-product-list-con" v-for="(v,k) in dataList" :key="k" :class="{noPad:k%2==1}" @click="gotoDetail(v)">
				<view class="uni-product">
					<view class="image-view">
						<image class="uni-product-image" :src="v.icon" lazy-load mode="scaleToFill"></image>
					</view>
					
					<view class="uni-product-jifen pad">
						<view class="uni-product-title">{{v.name}}</view>
						<view class="uni-product-jifen-top uni-flex">
							<view style="color:#FF0E0E">
								<text class="mopney">{{v.symbol}}{{v.price}}</text>
							</view>
							<view style="font-size: 12px;">
								已售:{{v.sales}}
							</view>
						</view>
						<view class="uni-product-jifen-bottom" style="margin: 10px 0;">
							<image :src="v.nationalFlag" class="img-icon" mode="scaleToFill"></image> {{v.title}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	// import  from ""
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				page: 1,
				id: "",
				totalPage: 1,
				currentActive: 0,
				sortType: 0,
				status: 'loading',
				dataList: [],
				navList: [{
						title: "销量",
						flag: true
					},
					{
						title: "价格",
						flag: true
					}
				],
			}
		},
		components: {
			uniLoadMore
		},
		onLoad(options) {
			console.log(options)
			this.id = options.id;
			this.loadData();
		},
		onShow() {},
		onHide() {},
		methods: {
			loadData() {
				let parmas = {
					uid: getApp().globalData.uid,
					categoryId: this.id,
					sortType: this.sortType,
					nowPage: this.page
				}
				console.log(parmas)
				this._reqw.ipost(parmas, "productList").then(res => {
					res.result != 0 ? (this.$api.tip(res.resultNote), this.status = "noMore") : (this.totalPage = res.totalPage, res
						.dataList != undefined && res.dataList.length != 0 ? (res.dataList
							.forEach(item => {
								this.dataList.push(item)
							}), this.status = "more") : this.status = "noMore")
				}).catch(err => {})
			},
			submitSearch() {
				this.$api.navTo('/pagesA/search/search_index');
			},
			gotoDetail(e) {
				this.$api.navTo(`/pagesA/shopdetails/shopDetails?id=${e.id}`)
			},
			initData() {
				this.page = 1;
				this.totalPage = 1;
				this.status = "loading";
				this.dataList = [];
				this.loadData();
			},
			changeTab(v, k) {
				console.log(k)
				this.currentActive != k ? this.currentActive = k : v.flag = !v.flag;
				switch (k) {
					case 0:
						v.flag ? this.sortType = 0 : this.sortType = 1;
						this.initData();
						break;
					case 1:
						v.flag ? this.sortType = 2 : this.sortType = 3;
						this.initData();
						break;
				}
			},
		},
		//  加载
		onReachBottom() {
			console.log("到底")
			this.status = "loading";
			this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
				this.status = "noMore"
			}, 30)
		},

	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.img-icon {
		width: 23px;
		height: 12px;
		margin-right: 5px;
	}

	.search-pop {
		background: #038980;
		padding: 14px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.noPad {
		padding-left: 0;
	}

	.iconColor {
		color: #038980 !important;
	}

	.mopney {
		font-size: 17px;
		font-weight: bold;
		color: #FF0E0E;
		margin-left: 5px;
	}

	.pad {
		padding: 0 6px;
	}

	.top-input {
		flex: 1;
		margin-right: 20px;
		border-radius: 20px;
		height: 30px;
		line-height: 30px;
		display: flex;
		padding-left: 20px;
		box-sizing: border-box;
		background: #68b8b3;
		color: #fff;
	}

	.top-input .inputHide {
		height: 30px;
		line-height: 30px;

	}

	.search-btn {
		width: 50px;
		height: 100%;
		color: #ffffff;
		font-size: 16px;
		font-weight: bold;
	}

	.iconfont {
		margin-right: 10px;
		color: #ccc
	}

	.top-nav {
		height: 40px;
		background: #ffffff;
		display: flex;
		align-items: center;
	}

	.top-nav-item {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-nav-item-title {
		text-align: center;
	}

	.top-nav-item-icon {
		width: 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}

	.icon-up {
		font-size: 10px;
	}

	.icon-LC_icon_down_fill {
		font-size: 8px;
	}

	.uni-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.uni-product-jifen{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
