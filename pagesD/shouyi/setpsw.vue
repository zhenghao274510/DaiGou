<template>
	<view class="changpsw">
<!-- 		<view class="cont_item">
			<input type="number" v-model="phone" placeholder="请输入手机号码" maxlength="11" />
		</view> -->
		<view class="cont_item">
			<input type="password" v-model="newpwd" placeholder="请输入支付密码" maxlength="6" />
		</view>
		<view class="cont_item">
			<input type="password" v-model="repeatpwd" placeholder="请再次输入支付密码" maxlength="6" />
		</view>
	<!-- 	<view class="cont_item">
			<input type="number" v-model="code" placeholder="短信验证码" class="inputend" />
			<text class="pos" @click="getMa">获取</text>
		</view> -->
		<view class="con-inter">
			说明：支付密码仅支持6位数字
		</view>
		<view class="btn" @click="SubChange" hover-class="btn-hover">提交</view>
	</view>
</template>

<script>
	//import 《组件名称》 from '《组件路径》';
	export default {
		data() {
			return {
				newpwd: "",
				repeatpwd: "",
				pwd: "",
				code: '',
				type: "",
				uid: "",
				phone: ""
			};
		},
		onLoad() {
			this.phone=uni.getStorageSync("personPhone")
		},
		methods: {
			getMa() {
				if (this.phone == '') {
					this.$api.tip('手机号不能为空')
				} else if (!this.$api.regPhone(this.phone)) {
					this.$api.tip('请输入正确的手机号!')
				} else {
					this.$api.loading("发送中..");
					this._reqw.ipost({
						phoneNum: this.phone
					}, "sendSmsCode").then(res => {
						res.result == 0 ? (this.code = res.code,this.$api.hideLoading()) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}

			},
			SubChange() {
				if (this.phone == '') {
					this.$api.tip('手机号不能为空!')
				} else
				if (this.newpwd != this.repeatpwd) {
					this.$api.tip('两次输入密码不一致!')
				} 
				// else if (this.code == '') {
				// 	this.$api.tip('请输入验证码!')
				// } 
				else if (!this.$api.regPhone(this.phone)) {
					this.$api.tip('请输入正确的手机号!')
				} else {
					this.$api.loading("提交中..");
					let parmas = {
						uid: getApp().globalData.uid,
						password: this.newpwd,
						qrPassword: this.repeatpwd,
						code: this.code
					};
					this._reqw.ipost(parmas, 'setPassword').then(res => {
						res.result == 0 ? (this.$api.hideLoading(),this.$api.tip('设置成功!'),uni.setStorageSync('isSet',1),uni.setStorageSync('password',this.newpwd), setTimeout(() => {
							this.$api.back()
						}, 500)) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}

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
              .inputend{
				  width: 80%;
			  }
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
			width: 275px;
			margin: 0 auto;
			margin-top: 61px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			color: #fff;
			font-size: 18px;
			background-color: #00736B;
		}

		.con-inter {
			line-height: 30px;
			text-align: left;
			color: #00736B;
		}
	}
</style>
