<template>
	<view>
		<view class="icon">
			<image src="/static/image/zhifuchenggong@2x.png"></image>
		</view>
		<view class="tis">
			订单支付成功
		</view>
		<view class="back">
			<view class="btn" @tap="toOrder">查看订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onLoad() {

		},
		methods: {
			toOrder() {
				this.$api.navTo(`/pagesD/order/order?id=1`)
			}
		},
	}
</script>

<style lang="scss">
	view {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.icon {
		width: 100%;
		margin-top: 10vw;

		image {
			width: 25vw;
			height: 25vw;
		}
	}

	.tis {
		width: 100%;
		margin-top: 20upx;
		font-size: 48upx;
	}

	.pay-amount {
		width: 100%;
		margin-top: 10upx;
		font-size: 32upx;
	}

	.back {
		position: absolute;
		width: 100%;
		bottom: 80upx;

		.btn {
			padding: 0 50upx;
			height: 70upx;
			border: solid 2upx #f06c7a;
			color: #f06c7a;
			align-items: center;
			border-radius: 10upx;
			font-size: 34upx;
		}
	}
</style>
