<template>
	<view class="content">
		<view class="get-title">
			提现金额
		</view>
		<view class="get-input border">
			<text class="get-hao">￥</text><input type="number" value="" v-model="money" placeholder="请输入提现金额" />
		</view>

		<view class="get-input flex">
			<view>
				可提现余额￥{{balance}}
			</view>
			<view class="allGet" @click="sub(0)">
				全部提现
			</view>
		</view>
		<button class="btn" hover-class="btn-hover" @click="sub(1)">申请提现</button>

	</view>
</template>

<script>
	// import  from ""
	export default {
		data() {
			return {
				money: "",
				balance: ''
			}
		},
		components: {},
		onLoad() {
			this.balance = this.$api.get('balance')
		},
		onShow() {},
		onHide() {},
		methods: {
			sub(type) {
				this.balance -= 0;
				this.balance == 0 ? this.$api.tip("暂无可提现余额!请确认!") : type == 0 ? this.getall() : this.getMoney()
			},
			getall() {
				this.money = this.balance;
				this.getMoney();
			},
			getMoney() {
				this.money == "" ? this.$api.tip("请输入提现金额!") :
					this._reqw.ipost({
						uid: getApp().globalData.uid,
						money: this.money
					}, "applyWithdraw").then(res => {
						res.result == 0 ? (this.$api.tip("申请已提交平台!请耐心等待!"), this.$api.back()) : this.$api.tip(resultNote)
					}).catch(err=>{})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		padding: 20px;
	}

	.get-title {
		line-height: 40px;
	}

	.get-input {
		display: flex;
		height: 50px;
		align-items: center;

		.get-hao {
			font-size: 20px;
			font-weight: bold;
		}

		input {
			flex: 1;
			padding-left: 10px;
		}

		.allGet {
			color: #00736B;
		}
	}

	.btn {
		width: 80%;
		margin: 30px auto;
		background: #00736B;
		height: 40px;
		line-height: 40px;
		color: #fff;
	}

	.flex {
		display: flex;
		justify-content: space-between;
	}

	.border {
		border-bottom: 1px solid #ccc;
	}
</style>
