<template>
	<view class="second_con">
		<block>
			<view class="uni-second-list" v-for="(product,index) in datas" :key="index">
				<view class="uni-second-list-title">
					订单商品
				</view>
				<view class="uni-second">
					<view class="image-second">
						<image class="uni-second-image" :src="product.image"></image>
					</view>
					<view class="uni-second-price">
						<view class="uni-second-title"><text class="uni-second-tip-one">{{product.tip}}</text> <text style="margin-left: 10px;">{{product.title}}</text>
						</view>
						<view class="uni-second-title"><text class="uni-second-price-favour">￥{{product.originalPrice}}</text> <text
							 class="uni-second-price-original">￥{{product.favourPrice}}</text>
						</view>
						<!-- <text class="uni-second-from">新西兰直邮供货</text> -->
					</view>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	// import uniSteps from "@/components/uni-steps/uni-steps.vue"
	export default {
		data() {
			return {
				dataList: [],
				dataObj:{},
				expressCode:'',
				expressNo:""
			}
		},
		components: {},
		onLoad(options) {
			this.dataObj =JSON.parse(options).id;
			this.expressNo=this.dataObj.expressNo;
			this.expressCode=this.dataObj.expressCode;
				
		},
		methods: {
			loadData() {
				let parmas = {
					expressCode: this.expressCode,
					expressNo: this.expressNo
				};
				this._reqw.ipost(parmas, 'expressInfo').then(res => {
					res.result == 0 ? this.dataList = res.dataList : this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background: #F6F6F6;
		box-sizing: border-box;
	}

	.uni-second-list {
		display: flex;
		width: 90%;
		margin: 10px auto;
		flex-direction: column;
		background: #fff;
		border-radius: 10px;
	}

	.uni-second {
		padding: 20upx;
		display: flex;
		flex-direction: row;
	}

	.image-second {
		height: 110px;
		width: 110px;
		margin: 12upx 0;
	}

	.uni-second-image {
		height: 110px;
		width: 110px;
	}

	.uni-second-title {
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.uni-second-price {
		flex: 1;
		margin-top: 10upx;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
	}

	.uni-second-price-original {
		color: #e80080;
	}

	.uni-second-price-favour {
		color: #888888;
		text-decoration: line-through;
		margin-left: 10upx;
	}

	.uni-second-from {
		color: red;
	}
</style>
