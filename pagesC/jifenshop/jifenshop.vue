<template>
	<view class="content">
		<view class="com-top">
			<image :src="image"></image>
		</view>
		<view class="uni-product-list">
			<view class="uni-product-list-con" v-for="(v,k) in dataList" :key="k" :class="{noPad:k%2==1}" @tap="details(v.id)">
				<view class="uni-product">
					<view class="image-view">
						<image class="uni-product-image" :src="v.icon" lazy-load mode="scaleToFill"></image>
					</view>
					<view class="uni-product-title pad">{{v.name}}</view>
					<view class="uni-product-jifen pad">
						<view class="uni-product-jifen-top">{{v.point}}积分</view>
						<view class="uni-product-jifen-bottom">已兑:{{v.sales}}</view>
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
				dataList: [],
				totalPage: 1,
				page: 1,
				status: "more",
				image: ''
			};
		},
		components: {
			uniLoadMore
		},
		onLoad() {
			this.image=uni.getStorageSync("integralImage");
			this.loadData();
		},
		onReachBottom() {
			this.status = "loading";
			this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
				this.status = "noMore"
			}, 30)
		},
		methods: {
			loadData() {
				this._reqw.ipost({
					nowPage: this.page
				}, "integralProductList").then(res => {
					console.log(res)
					res.result == 0 ? (this.totalPage = res.totalPage, this.status = "more", res.dataList != undefined && res.dataList
						.length != 0 ?
						res.dataList.forEach(item => {
							this.dataList.push(item)
						}) : this.status = "noMore") : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			details(id) {
				console.log(id)
				this.$api.navTo(`/pagesA/shopdetails/jifenshop?id=${id}`)
			}
		},


	};
</script>

<style lang="scss" scoped>
	page,
	.content {
		width: 100%;
	}

	.com-top {
		width: 100%;
		height: 125px;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.uni-product-jifen {
		margin-top: 10px;
	}

	.uni-product-jifen-top {
		color: #FF0E0E;
		font-size: 17px;
		font-weight: bold;
	}

	.uni-product-jifen-bottom {
		color: #333333;
		font-size: 12px;
		margin: 10px 0;
	}

	.noPad {
		padding-left: 0;
	}

	.pad {
		padding: 0 6px;
	}
	.uni-product-list-con{
		border-radius:10px 10px 0 0 ;
	}
</style>
