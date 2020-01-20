<template>
	<view class="zixun-content">
		<view class="uni-card" v-for="(v,k) in dataList" :key="k">
			<view class="uni-card__header">
				<view class="uni-card__header-extra-img" @click.stop="details(0,v)">
					<video :src="v.video" :poster="v.image" controls v-if="v.video!=''" class="uni-card__header-extra-img"></video>
					<image :src="v.image" class="uni-card__header-extra-img" v-else />
				</view>
				<view class="uni-card__footer" @click.stop="details(1,v)">
					<view class="uni-card__header-title-text">{{v.title }}</view>
					<view class="uni-card__header-extra-text">{{v.adtime}}</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status"></uni-load-more>
		<!-- <sec-footer :tabarA="tabarA"></sec-footer> -->
	</view>
</template>

<script>
	import secFooter from "@/components/SecFooter/SecFooter.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				tabarA: 2,
				dataList: [],
				page: 1,
				totalPage: 1,
				status: 'loading'
			}
		},
		components: {
			secFooter,
			uniLoadMore
		},
		onReachBottom() {
			this.status = "loading";
			this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
				this.status = "noMore"
			}, 30)
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData() {
				this._reqw.ipost({
					nowPage: this.page
				}, "newsList").then(res => {
					res.totalPage == 1 ? this.status = "noMore" : this.status = "more";
					res.result == 0 ? (this.totalPage = res.totalPage, res.dataList
						.forEach(item => {
							this.dataList.push(item)
						})) : this.$api.tip(
						res.resultNote);
				}).catch(err => {})
			},
			details(type, e) {
				if (e.video == '') {
					this.$api.navTo(`/pagesD/zixun/zixunDetail?id=${e.id}&name=${e.title}`)
				} else {
					if (type == 1) {
						this.$api.navTo(`/pagesD/zixun/zixunDetail?id=${e.id}&name=${e.title}`)
					}
				}


			}
		}
	}
</script>

<style scoped>
	.zixun-content {
		padding: 10px 15px 50px 15px;
	}

	.uni-card {
		margin: 24upx 0;
		background: #fff;
		box-shadow: none;
		position: relative;
		display: flex;
		flex-direction: column;
		border-radius: 7px;
	}

	.uni-card__header {
		position: relative;
		display: flex;
		flex-direction: column;

	}

	.uni-card__footer {
		position: relative;
		display: flex;
		justify-content: space-between;
		padding: 16upx;
		color: #111111;
	}

	.uni-card__header-title {
		flex: 1;
		margin-right: 16upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center
	}

	.uni-card__header-extra-img {
		width: 100%;
		height: 125px;
	}

	.uni-card__header-title-text {
		flex: 1;
		font-size: 28upx;
		text-align: left;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden
	}

	.uni-card__header-extra-text {
		margin-left: 16upx;
		font-size: 28upx;
		text-align: right;
	}
</style>
