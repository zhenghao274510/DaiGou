<template>
	<view>
		<view class="header">
			<image src="/static/image/zhifuchenggong@3x.png" />
		</view>
		<button class="bottom" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo" v-if="show">微信授权登录</button>
		<button class="bottom" type="primary" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="bindGetPhoneNumber"
		 v-else>进入</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: '',
				show: true
			};
		},
		computed: {},
		methods: {
			bindGetPhoneNumber(e) {
				console.log(e)
				let self = this;
				// uni.checkSession({
				// success(res) {
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userInfo']) {
							uni.login({
								success: function(res) {
									console.log(res)
									let parmas = {
										uid: self.uid,
										encryptedData: e.detail.encryptedData,
										iv: e.detail.iv,
										code: res.code
									};
									console.log(parmas)
									self._reqw.ipost(parmas, "getPhoneNum").then(res => {
										if (res.result == 0) {
											getApp().globalData.uid = self.uid;
											// self.$api.back()
											uni.redirectTo({
												url: `/pagesB/reg/reg?id=${self.uid}`
											})
										} else {
											self.$api.tip(res.resultNote)
										}
									});
								},
								fail: function() {
									// fail
								},
								complete: function() {
									// complete
								}
							});
						}
					}
				})
				// }
				// })
			},
			bindGetUserInfo(e) {
				console.log(e)
				let self = this;
				wx.login({
					success: function(res) {
						console.log(res)
						let parmas = {
							code: res.code,
							userInfo: e.detail
						};
						console.log(parmas)
						self._reqw.ipost(parmas, "loginByWeixin").then(res => {
							if (res.result == 0) {
								console.log(res)
								self.uid = res.uid;
								// uni.setStorageSync('uid', res.uid);
								if (res.status == 0) {
									if (res.isBind == 0) {
										self.show = false;
									} else if (res.isBind == 1 && res.isCode == 0) {
										uni.redirectTo({
											url: `/pagesB/reg/reg?id=${self.uid}`
										})
									} else {
										uni.setStorageSync('uid', self.uid)
										self.$api.back();
									}

								} else {
									self.$api.tip("账号异常")
								}
							} else {
								self.$api.tip(res.resultNote)
							}
						});
					},
					fail: function() {
						console.log("失败")
						// fail
					},
					complete: function() {
						// complete
					}
				});
			}
		}
	};
</script>
<style scoped lang="scss">
	.header {
		margin: 90px auto;
		text-align: center;
		width: 200rpx;
		height: 200rpx;
	}

	.hide {
		opacity: 0;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.bottom {
		height: 80rpx;
		width: 200px;
		background: #038980;
		border-radius: 12rpx;
		margin: 70rpx auto;
		font-size: 30rpx;
	}
</style>
