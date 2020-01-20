<template>
	<view class="content">
		<view class="second-title">
			<view class="one"></view>
			<view class="two"></view>
			<view style="margin:0 6px;font-size: 17px;">
				热销推荐
			</view>
			<view class="two"></view>
			<view class="one"></view>
		</view>
		<view class="uni-second-list" v-for="(v,k) in innerList" :key="k" @click="onClick(v)">
			<view class="uni-second">
				<view class="image-second">
					<image class="uni-second-image" :src="v.icon"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title"><text class="uni-second-tip-one">{{v.tag}}</text> <text style="margin-left: 10px;">{{v.name}}</text>
					</view>
					<view class="">
						<view class="uni-second-from">
							<view class="uni-second-price-original">{{v.symbol}}{{v.price}}</view>
							<view class="uni-second-from-right">
								已售:{{v.sales}}
							</view>
						</view>
						<view class="uni-second-from-left">
							<view class="flageImg">
								<image :src="v.nationalFlag" mode="scaleToFill" class="flageImg"></image>
							</view>
							{{v.title}}
						</view>
					</view>

				</view>

			</view>
		</view>
	</view>
	</view>
</template>
<script>
	export default {
		props: {
			datas: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
			}
		},
		computed:{
			innerList(){
				return this.datas
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			onClick(e) {
				this.$emit("click", e)
			}
		}
	}
</script>
<style scoped>
	.content {
		background: #ffffff;
		box-sizing: border-box;
	}

	.second-title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 45px;
		font-size: 17px;
		font-weight: bold;
		color: #333333;
	}

	.uni-second-list {
		display: flex;
		padding: 0 10px;
		margin-bottom: 10px;
		flex-direction: column;
		border-radius: 10px;
	}

	.uni-second {
		display: flex;
		flex-direction: row;
	}

	.image-second {
		height: 100px;
		width: 100px;
	}

	.uni-second-image {
		height: 100px;
		width: 100px;
		border-radius: 10px;
	}

	.flageImg {
		width: 23px;
		height: 11.5px;
		margin-right: 5px;
		vertical-align: middle;
		font-size: 0;
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
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
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
		display: flex;
		padding: 0 5px;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.uni-second-from-left {
		color: #ff0e0e;
		display: flex;
		font-size: 10px;
		align-items: center;
	}

	.uni-second-from-right {
		color: #8c8c8c;
	}
</style>
