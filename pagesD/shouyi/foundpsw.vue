<template>
	<view class="changpsw">
		<view class="cont_item">
			<input type="number" v-model="phone"  maxlength="11" placeholder="请输入手机号" />
		</view>
		<view class="cont_item">
			<input type="number" v-model="code" placeholder="短信验证码"  />
			<text class="pos" @click="getMa">获取</text>
		</view>
		<view class="cont_item">
			<input type="password" v-model="password" placeholder="请输入新的支付密码" maxlength="6" />
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
				phone: "",
				code: "",
				password: "",
				uid: ""
			};
		},
		onLoad() {
			this.phone=uni.getStorageSync("personPhone");
		},
		methods: {
			SubChange() {
				let parmas = {
					phone: this.phone,
					code: this.code,
					password: this.password
				}
				this.phone == "" ? this.$api.tip("请输入手机号") : !this.$api.regPhone(this.phone) ? this.$api.tip("手机格式不正确!") : this.code ==
					'' ? this.$api.tip("请输入验证码") : this.password == "" ? this.$api.tip("请输入新的密码!") : this._reqw.ipost(parmas,
						"getBackPassword").then(res => {
						res.result == 0 ? (this.$api.tip("密码设置成功!"), this.$api.back()) : this.$api.tip(res.resultNote)
					}).catch(err=>{})
			},
			getMa() {
				this.phone == "" ? this.$api.tip("请输入手机号") : !this.$api.regPhone(this.phone) ? this.$api.tip("手机格式不正确!") : this._reqw
					.ipost({
						phoneNum: this.phone
					}, "sendSmsCode").then(res => {
						res.result == 0 ? this.code = res.code : this.$api.tip(res.resultNote)
					}).catch(err=>{})
			}
		}
	};
</script>
<style scoped lang="scss">
	.changpsw {
		padding: 20px;

		.cont_item {
			height: 45px;
			line-height: 45px;
			font-size: 16px;
			margin-bottom: 10px;
			position: relative;

			input {
				width: 100%;
				height: 40px;
				border-bottom: 1px solid #e5e5e5;
				padding-left: 10px;
			}

			.pos {
				position: absolute;
				right: 0;
				top: 50%;
				height: 20px;
				line-height: 20px;
				padding-left: 15px;
				transform: translateY(-50%);
				color: #00736B;
				border-left: 2px solid #00736B;
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
			background-color:#00736B ;
		}

		.con-inter {
			line-height: 30px;
			text-align: center;
		}
	}
</style>
