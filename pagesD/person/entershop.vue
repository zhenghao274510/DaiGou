<template>
	<view class="content">
		<image class="imgs" :src="image" mode="scaleToFill"></image>
		<view class="from-con">
			<text class="from-top">基本信息</text>
			<view class="input-list">
				<view class="">
					联系人:
				</view>
				<input type="text" value="" placeholder="请输入联系人" v-model="name" />
			</view>
			<view class="input-list">
				<view class="">
					联系电话:
				</view>
				<input type="number" value="" placeholder="请输入联系电话" v-model="phone" />
			</view>
			<view class="from-text">
				<view class="from-text-top">
					备注:
				</view>
				<editor placeholder="请输入合作意向" class="from-text from-main" @input="onEditorReady" id="editor"></editor>
			</view>
			<button class="sub-btn" hover-class="btn-hover" @click="subInfo">提交</button>
			<view class="text-bot">
				提交后，平台会在3个工作日内主动联系你，请耐心等待
			</view>
		</view>
	</view>
</template>

<script>
	// import  from ""
	export default {
		data() {
			return {
				remark: '',
				name: '',
				phone: '',
				image: ''
			}
		},
		components: {},
		onLoad() {
			this.image = this.$api.get("joinImage");
			console.log(this.image)
		},
		onShow() {},
		methods: {
			onEditorReady(e) {
				console.log(e)
				this.remark=e.detail.text;
			},
			subInfo() {
				if (this.name == "" || this.phone == "") {
					this.$api.tip('请完善个人信息!')
				} else if (!this.$api.regPhone(this.phone)) {
					this.$api.tip('请输入正确的手机号')
				} else {
					let parmas = {
						uid: getApp().globalData.uid,
						name: this.name,
						phone: this.phone,
						remark: this.remark
					};
					this._reqw.ipost(parmas, "applyAgent").then(res => {
						res.result == 0 ? (this.$api.tip('提交成功'), this.$api.back()) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}

			}
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.imgs {
		height: 125px;
	}

	.from-text {
		margin-top: 10px;
	}

	.from-con {
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.from-top {
		line-height: 20px;
		border-left: 2px solid #44BCB4;
		padding-left: 10px;
	}

	.input-list {
		display: flex;
		align-items: center;
		height: 40px;
		margin-top: 10px;
		border-bottom: 1px solid #ccc;

		input {
			flex: 1;
			text-align: left;
			padding-left: 10px;
		}
	}

	.from-main {
		border: 1px solid #ccc;
		height: 200px;
		padding: 10px;
	}

	.sub-btn {
		width: 40%;
		line-height: 40px;
		background: #038980;
		margin: 10px auto;
		border-radius: 5px;
		color: #fff;
	}

	.text-bot {
		color: #038980;
	}
</style>
