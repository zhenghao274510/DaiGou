<template>
	<view class="s-page-wrapper">
		<image src="../../static/img/common/logo.jpg" mode="aspectFit" class="logoimg"></image>
		<view class="registercontent">
			<view class="has-mglr-10 ">
				<view class="has-radius has-mgtb-10">
					<input placeholder="请输入邀请码" v-model="invertCode" class="is-input1" />
				</view>
				<view class=" registerbtn has-radius has-mgtb-20">
					<button>注 册</button>
				</view>
			</view>
		</view>
		<view class="look-xieiyi" @click.stop="chocked=!chocked">
			<view class="iconcontent">
				<view class="iconfont icon-fangkuang" v-if="chocked">

				</view>
				<view class="iconfont icon-xuanze-fangkuang" v-else>

				</view>
			</view>
			<navigator url="#" class="is-flex has-radius is-center is-grey ">
				<text>注册即表示同意</text><text class="is-blue">《用户协议》</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				invertCode: '',
				smsbtn: {
					text: '获取验证码',
					status: false,
					codeTime: 60
				},
				timerId: null,
				chocked: false
			};
		},
		methods: {
			getsmscode: function() {
				if (this.smsbtn.status == true) {
					return false;
				}
				this.smsbtn.status = true; 
				this.timerId = setInterval(() => {
						var codeTime = this.smsbtn.codeTime;
						codeTime--;
						this.smsbtn.codeTime = codeTime;
						this.smsbtn.text = codeTime + "S";
						if (codeTime < 1) {
							clearInterval(this.timerId);
							this.smsbtn.text = "重新获取";
							this.smsbtn.codeTime = 60;
							this.smsbtn.status = false;
						}
					},
					1000);
				return false;
			}

		}
	}
</script>

<style lang="scss" scoped>
	page {
		min-height: 100%;
		width: 100%;
		background-color: #FFFFFF;
	}

	.s-page-wrapper {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.registercontent {
		width: 85%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.logoimg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.is-input1 {
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		padding: 12rpx;
		color: #353535;
		font-size: 32rpx;
		box-sizing: border-box;
		appearance: none;
		border: 2rpx solid #e5e5e5;
		box-shadow: none;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		padding-left: 30rpx;
		margin: 0;
		font-family: inherit;
		background: #fff;
		resize: none;
	}
	.registerbtn button {
		margin-top: 20rpx;
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		color: #ffffff;
		font-size: 32rpx;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		margin: 0;
		font-family: inherit;
		background: #f35;
		opacity: 0.8;
	}

	button:after {
		border: 2rpx solid #f2f2f2;
	}

	.look-xieiyi {
		display: flex;
	}
</style>
