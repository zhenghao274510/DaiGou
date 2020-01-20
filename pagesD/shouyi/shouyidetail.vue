<template>
	<view class="content">
		<empty v-if="dataList.length==0"></empty>
		<block v-for="(v,k) in dataList" :key="k" v-else>
			<view class="detial-list">
				<view class="detial-info">
					<view class="detial-time">
						{{v.title}}
					</view>
					<view class="detial-money">

						{{v.adtime}}
					</view>
				</view>
				<view class="detial-name">
					+{{v.money}}
				</view>
			</view>
		</block>
		<uni-load-more :status="status" v-if="dataList.length!=0"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import empty from "@/components/mycom/empty";
	export default {
		data() {
			return {
				title: '',
				status: 'loading',
				dataList: [],
				page: 1,
				totalPage: 1
			}
		},
		components: {
			uniLoadMore,
			empty
		},
		onLoad() {
			this.loadData()
		},
		onShow() {},
		onHide() {},
		methods: {
			loadData() {
				let parmas = {
					uid: getApp().globalData.uid,
					nowPage: this.page
				};
				this._reqw.ipost(parmas, "incomeList").then(res => {
					res.result == 0 ? (this.totalPage = res.totalPage, res.dataList != undefined && res.dataList.length != 0 ? res.dataList
						.forEach(item => {
							this.dataList.push(item)
						}) : this.status = "noMore", res.totalPage == 1 ? this.status = "noMore" : this.status = "more") : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			}
		},
		//  加载
		onReachBottom() {
			console.log("到底")
			this.status = "loading"
			this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
				this.status = "noMore"
			}, 50)
		},

	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;

		.detial-list {
			width: 90%;
			box-sizing: border-box;
			margin: 10px auto 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			// height: 80px;
			border-bottom: 1px solid #999999;

			.detial-time {
				color: #151624;
			}

			.detial-name {
				font-size: 15px;
				font-weight: bold;
				color: #00736B;
			}

			.detial-money {
				color: #999999;
				font-size: 11px;
				margin: 10px 0;
			}
		}
	}
</style>
