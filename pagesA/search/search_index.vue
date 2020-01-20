<template>
	<view class="s-page-wrapper">
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
		<view class="search-cat">
			<view class="search-cat-tit"><text class="up-menu">热门搜索</text></view>
			<view class="src-content">
				<view class="src-item " v-for="(v, k) in keywordlist" :key="k" @click="hostSearch(v.title)">
					{{v.title}}
				</view>
			</view>
		</view>
		<view class="search-cat">
			<view class="search-cat-tit"><text class="up-menu">搜索历史</text></view>
			<view class="src-content">
				<!-- <view class="main-src"> -->
				<view class="src-item " v-for="(v, k) in searchList" :key="k" @click="hostSearch(v)">
					{{ v }}
				</view>
				<!-- </view> -->
			</view>
			<view class="clear-search" @click="clear">
				清空搜索历史
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				placeholder: '请输入关键字',
				keywords: '',
				keywordlist: [{
						title: '抽纸'
					},
					{
						title: '洗面奶'
					},
					{
						title: '洗衣液'
					},
					{
						title: '卫生巾'
					},
					{
						title: '短袜'
					},
					{
						title: '垃圾袋'
					},
					{
						title: '行李箱'
					},
					{
						title: '洗发水'
					}
				],
				current: 0,
				searchList: []
			};
		},
		onShow() {
			uni.getStorageSync('historySearch') ? this.searchList = uni.getStorageSync("historySearch") : this.searchList = [];
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			//  热门搜索
			loadData() {
				this._reqw.ipost({}, "keywordList").then(res => {
					res.result == 0 ? (this.keywordlist = res.dataList) : this.$api.tip(res.resultNote)
				})
			},
			submitSearch() {
				for (let i in this.searchList) {
					if (this.searchList[i] == this.keywords) {
						this.searchList.splice(i, 1)
					}
				}
				this.keywords == "" ? this.$api.tip("请输入要搜索的内容!") : (this.searchList.length < 5 ? (this.searchList
					.unshift(this.keywords), uni.setStorageSync(
						"historySearch", this.searchList)) : (this.searchList.pop(), this.searchList.unshift(this.keywords), uni.setStorageSync(
					"historySearch", this.searchList)), this.$api.navTo(
					`/pagesA/search/search_list?id=${this.keywords}`))
			},
			clear() {
				this.searchList = [];
				uni.removeStorageSync("historySearch");
			},
			hostSearch(k) {
				this.keywords = k;
				this.submitSearch();
			}

		}
	};
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.help-tips {
		font-size: 13px;
		color: #999;
		line-height: 26px;
		padding: 0 0 0 30px;
		margin: 0;
		width: 80%;
		text-align: left;
	}

	.help-tips.color999 {
		color: #999999;
	}

	.search-pop {
		background: #038980;
		padding: 14px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		align-items: center;
	}

	.top-inptu input {
		height: 100%;
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
	}

	.search-cat {
		width: 100%;
		padding-bottom: 11px;
	}

	.search-cat .search-cat-tit {
		position: relative;
		width: 150px;
		height: 30px;
		margin: 13px 3% 0;
	}

	.search-cat .search-cat-tit .up-menu {
		display: block;
		height: 20px;
		line-height: 20px;
		font-size: 0.9em;
		color: #111111;
	}

	.src-content {
		margin: 10px auto;
		display: flex;
		flex-wrap: wrap;
	}

	.src-item {
		border-radius: 22px;
		padding: 0 10px;
		height: 23px;
		line-height: 23px;
		background: #fff;
		margin: 10px 5px;
		position: relative;
		font-size: 13px;
		color: #000;
	}

	.clear-search {
		padding: 10px 0;
		text-align: center;
		font-size: 16px;
		color: #333;
	}
</style>
