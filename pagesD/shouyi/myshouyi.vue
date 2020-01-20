<template>
	<view class="content">
		<view class="shouyi-top">
			<view class="shouyi-two">
				{{balance}}
			</view>
			<view class="shouyi-one">
				账户总余额(元)
			</view>
		</view>
		<view class="shouyi-con" v-for="(v,k) in navList" :key="k" @click="goto(k)">
			<view class="shouyi-list">
				<text class="">{{v.text}}</text>
			</view>
			<view class="iconfont icon-zuojiantou" style="color: #999999;font-size: 12px;">
			</view>
		</view>
	</view>
</template>

<script>
	// import  from ""
	export default {
		data() {
			return {
				balance:'',
				navList: [{
						text: '收益明细',
					},
					{
						text: '申请提现',
					},
					{
						text: '提现记录',
					},
					{
						text: '交易密码修改',
					}
				]
			}
		},
		components: {},
		onLoad() {
			this.balance=this.$api.get('balance');
		},
		onShow() {
			uni.getStorageSync('isSet')==1 ? (this.navList[3].text = "交易密码修改", this.isSet = true) : (this.navList[3].text =
				"设置交易密码",
				this.isSet = false)
		},
		onHide() {},
		methods: {
			goto(index) {
				switch (index) {
					case 0:
						this.$api.navTo('/pagesD/shouyi/shouyidetail');
						break;
					case 1:
						this.$api.navTo('/pagesD/shouyi/getmoney');
						break;
					case 2:
						this.$api.navTo('/pagesD/shouyi/tixianlilv');
						break;
					case 3:
						this.isSet ? this.$api.navTo('/pagesD/shouyi/changpsw') :
							this.$api.navTo('/pagesD/shouyi/setpsw');
						break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;

		.shouyi-top {
			display: flex;
			width: 90%;
			margin: 15px auto;
			height: 110px;
			flex-direction: column;
			justify-content: center;
			background: #00887E;
			border-radius: 10px;
			box-shadow: 0 0 8px 0 #00887E;

			.shouyi-one {
				color: #fff;
				text-indent: 30px;
			}

			.shouyi-two {
				font-size: 30px;
				color: #fff;
				text-indent: 30px;
			}
		}

		.shouyi-con {
			display: flex;
			width: 90%;
			margin: 0 auto;
			height: 50px;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ccc;

			.shouyi-list {
				display: flex;
				align-items: center;

				image {
					width: 20px;
					height: 22px;
					margin-right: 10px;
				}
			}

			.right {
				width: 10px;
				height: 12px;
			}

		}

	}
</style>
