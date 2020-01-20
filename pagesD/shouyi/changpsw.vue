<template>
	<view class="changpsw">
		<view class="cont_item">
			<input type="password" v-model="oldPassword" placeholder="请输入原6位密码" maxlength="6" />
		</view>
		<view class="cont_item">
			<input type="password" v-model="newPassword" placeholder="请输入新密码" maxlength="6" />
		</view>
		<view class="cont_item">
			<input type="password" v-model="qrPassword" placeholder="再次输入新密码" maxlength="6" />
		</view>
		<view class="con-inter">
			说明：支付密码仅支持6位数字
		</view>
		<view class="btn" @click="SubChange">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPassword: "",
				newPassword: "",
				qrPassword: "",
				uid: ""
			};
		},
		onLoad() {},
		methods: {
			SubChange() {
				let parmas = {
					oldPassword: this.oldPassword,
					newPassword: this.newPassword,
					qrPassword: this.qrPassword,
					uid: getApp().globalData.uid
				}
				this.oldPassword == "" || this.newPassword == "" || this.qrPassword == "" ? this.$api.tip("请完善密码后重试") : this.oldPassword ==
					this.newPassword || this.oldPassword == this.qrPassword ? this.$api.tip("新旧密码不能一致"): this.newPassword != this.qrPassword ?
					this.$api.tip('两次输入密码不一致!请确认') : this._reqw.ipost(parmas, "updatePassword").then(res => {
						res.result == 0 ? (this.$api.tip('修改成功'), this.$api.back()) : this.$api.tip(res.resultNote)
					}).catch(err=>{})
			}
		}
	};
</script>
<style scoped lang="less">
	.changpsw {
		padding: 20px;

		.cont_item {
			height: 45px;
			line-height: 45px;
			font-size: 16px;
			margin-bottom: 10px;

			input {
				width: 100%;
				height: 40px;
				border-bottom: 1px solid #e5e5e5;
				padding-left: 10px;
			}
		}

		.btn {
			width: 300px;
			margin: 0 auto;
			margin-top: 61px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			color: #fff;
			border-radius: 22px;
			font-size: 18px;
			background-color: #00736B;
		}

		.con-inter {
			line-height: 30px;
			text-align: center;
		}
	}
</style>
