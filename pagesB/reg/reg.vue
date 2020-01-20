<template>
	<view class="s-page-wrapper" :style="{height:height}">
		<image src="/static/image/zhifuchenggong@3x.png" mode="aspectFit" class="logoimg"></image>
		<view class="registercontent">
			<input placeholder="请输入邀请码" v-model="inviteCode" class="is-input1" />
			<view class="registerbtn" @click="subInfo">
				<button>提 交</button>
			</view>
		</view>
		<view class="look-xieiyi" @click.stop="chocked=!chocked">
			<view class="iconcontent">
				<view class="iconfont icon-fangkuang" v-if="chocked" style="color: #CCCCCC;font-size: 18px;">

				</view>
				<view class="iconfont icon-xuanze-fangkuang" style="color: #CCCCCC;font-size: 18px;" v-else>

				</view>
			</view>
			<view class=" bottom-end" @click="inter">
				<text>注册即表示同意</text><text class="is-blue">《用户协议》</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inviteCode: '',
				chocked: false,
				uid: '',
				height: ''
			};
		},
		onLoad(options) {
			this.uid = options.id;
			this.height = uni.getStorageSync("screen").screenHeight
		},
		methods: {
			subInfo() {
				if (this.inviteCode == '') {
					this.$api.tip('请输入验证码')
				} else if (this.chocked) {
					this.$api.tip("请勾选用户协议")
				} else {
					let parmas = {
						uid: this.uid,
						inviteCode: this.inviteCode
					}
					this._reqw.ipost(parmas, "bindCode").then(res => {
						res.result == 0 ? (this.$api.tip("登录成功!"), getApp().globalData.uid = this.uid, uni.setStorageSync('uid', this.uid),
							this.$api.back()) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}
			},
			inter() {
				this.$api.navTo("/pagesA/homenav/servce?type=0&name='注册协议'")
			}

		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		background-color: #FFFFFF;
	}

	.s-page-wrapper {
		display: flex;
		height: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.registercontent {
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.logoimg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		margin: 60px auto;
	}

	.is-blue {
		color: #038980;
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
		border-bottom: 2rpx solid #e5e5e5;
		box-shadow: none;
		outline: 0;
		display: block;
		padding-left: 30rpx;
		margin: 0;
		font-family: inherit;
		resize: none;
		margin: 50px auto;
	}

	.registerbtn {
		margin-top: 30px;
		width: 60%;
	}

	.registerbtn button {
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
		background: #038980;
		opacity: 0.8;
	}

	button:after {
		border: 2rpx solid #f2f2f2;
	}

	.look-xieiyi {
		display: flex;
		margin-top: 30px;
	}

	.bottom-end {
		margin-left: 10px;
	}
</style>
