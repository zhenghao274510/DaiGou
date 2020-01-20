<template>
	<view class="content">
		<view class="search-pop">
			<view class="top-input">
				<view class="iconfont icon-iconseach" style="font-size: 18px; color: #fff;">

				</view>
				<input type="text" value="" placeholder-style="color:#fff" placeholder="请输入关键字" v-model="keywords" />
			</view>
			<view class="search-btn" @click="submitSearch">
				搜索
			</view>
		</view>
		<view class="top-nav">
			<block v-for="(v,k) in navList" :key="k">
				<view class="top-nav-item" @click="changeTab(v,k)">
					<view class="top-nav-item-title" :class="{iconColor:k==current}">
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
			<!-- 完成 -->
			<block v-for="(v,k) in dataList" :key="k" :class="{noPad:k%2==1}">
				<view class="uni-product-list-con" @click="details(v.id)">
					<view class="uni-product">
						<view class="image-view">
							<image class="uni-product-image" :src="v.icon" lazy-load></image>
						</view>
						<view class="uni-product-title pad" style="margin:10px 0;">{{v.name}}</view>
						<view class="uni-product-jifen pad">
							<view class="uni-product-jifen-top uni-flex">
								<view style="color:#FF0E0E">
									{{v.symbol}} <text class="mopney">{{v.price}}</text>
								</view>
								<view style="font-size: 12px;">
									已售{{v.sales}}
								</view>
							</view>
							<view class="uni-product-jifen-bottom uni-ellipsis" style="margin: 10px 0;">
								<image :src="v.nationalFlag" class="img-icon"></image> {{v.title}}
							</view>
						</view>
					</view>
				</view>
			</block>

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
				dataList: [],
				page: 1,
				totalPage: 1,
				status: 'loading',
				sortType: 0,
				keyword: '',
				navList: [{
						title: "销量",
						flag: true
					},
					{
						title: "价格",
						flag: true
					}
				],
				current: 0
			}
		},
		components: {
			uniLoadMore
		},
		onLoad(options) {
			this.keyword = options.id;
			console.log(this.keyword)
			this.loadData();
		},
		onShow() {},
		onHide() {},
		methods: {
			loadData() {
				let parmas = {
					uid: getApp().globalData.uid,
					keyword: this.keyword,
					sortType: this.sortType,
					nowPage: this.page
				}
				console.log(parmas)
				this._reqw.ipost(parmas, "searchList").then(res => {
					res.result == 0 ? (this.totalPage = res.totalPage, this.status = "more", res.dataList != undefined && res.dataList
						.length != 0 ? res.dataList
						.forEach(item => {
							this.dataList.push(item)
						}) : this.status = "noMore") : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			details(id) {
				this.$api.navTo(`/pagesA/shopdetails/shopDetails?id=${id}`)
			},
			changeTab(v, k) {
				console.log(1)
				this.current != k ? this.current = k : v.flag = !v.flag;
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
			initData() {
				this.dataList = [];
				this.page = 1;
				this.totalPage = 1;
				this.status = "loading";
				this.loadData();
			},
			submitSearch() {
				this.$api.navTo('/pagesA/search/search_index')
			}
		},
		//  加载
		onReachBottom() {
			console.log("到底")
			this.status = "loading";
			this.totalPage > this.page ? (this.page += 1, this.loadData()) :
				setTimeout(() => {
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
		align-items: center;
		padding-left: 20px;
		box-sizing: border-box;
		background: #68b8b3;
		color: #fff;
	}

	.top-inptu input {
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
</style>
