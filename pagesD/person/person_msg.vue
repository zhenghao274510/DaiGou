<template>
	<view class="contain">
		<view class="box">
			<view class="list-item" style="height:80px;">
				<span>修改头像</span>
				<view class="modify_right" @click="onRead">
					<image :src="icon" alt style="border-radius: 50%;" v-if="icon!=''" />
					<image src="/static/image/touxiang2.png" alt v-else />
					<view class="iconfont icon-zuojiantou">

					</view>
				</view>
			</view>
			<view class="list-item">
				<span>昵称</span>
				<view class="modify_right">
					<input type="text" placeholder="请输入昵称" v-model="nickname" />
					<view class="iconfont icon-zuojiantou">

					</view>
				</view>
			</view>
			<view class="list-item">
				<span>性别</span>
				<view class="modify_right" style="width: 50px;text-align: right;">
					<xfl-select :list="sexList" @change="changeSex" initValue="男" style="width: 50px;text-align:center" v-if="sex==0"></xfl-select>
					<xfl-select :list="sexList" @change="changeSex" initValue="女" style="width: 50px;text-align:center" v-else></xfl-select>

					<!-- <input type="text" v-model="sex" /> -->
				</view>
			</view>
			<view class="btn" @click="subChange(1)" hover-class="btn-hover">提交</view>
		</view>
	</view>
</template>

<script>
	import xflSelect from "@/components/mycom/xfl-select.vue"
	export default {
		data() {
			return {
				images: "",
				url: "",
				type: "",
				uid: getApp().globalData.uid,
				nickname: '',
				icon: '',
				account: '',
				sex: "",
				sexLable: 0,
				sexList: [{
						value: '男',
						lable: 0
					},
					{
						value: "女",
						lable: 1
					}
				]
			};
		},
		components: {
			xflSelect
		},
		onLoad() {
			this.initData()
		},
		methods: {
			changeSex(e) {
				console.log(e)
				this.sexLable = e.orignItem.lable
				this.sex = e.newValue
			},
			onRead() {
				let _this = this;
				wx.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["album", "camera"],
					success(result) {
						// tempFilePath可以作为img标签的src属性显示图片
						console.log(result);
						_this._reqw.iupfile(result.tempFiles[0]).then(res => {
							console.log(res)
							let r = JSON.parse(res)
							r.result == 0 ? (_this.$api.tip('上传成功!'), _this.icon = r.dataList[0], _this.subChange(0)) : _this.$api
								.tip(r.resultNote)
						}).catch(res => {});
					}
				});
			},
			initData() {
				let parmas = {
					uid: this.uid
				};
				this._reqw.ipost(parmas, "personalCenterInfo").then(res => {
					res.result == 0 ? (this.icon = res.icon, this.nickname = res.nickName,this.sex=res.sex) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			subChange(n) {
				let parmas = {
					uid: this.uid,
					icon: this.icon,
					nickName: this.nickname,
					sex: this.sexLable
				}
				console.log(parmas)
				this._reqw.ipost(parmas, 'editMemberInfo').then(res => {
					res.result == 0 ? (this.$api.tip("修改成功!"), n == 1 ? this.$api.back() : this.initData()) : this.$api.tip(res.resultNote)
				}).catch(err => {})

			}
		}


	}
</script>

<style scoped lang="scss">
	.contain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;

			.list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				color: #333;
				background: #FFFFFF;
				padding: 10px;
				margin-top: 10px;

				.modify_right {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.icon-zuojiantou {
						color: #333333;
						font-size: 16px;
					}

					image {
						width: 80px;
						height: 80px;
					}

					input {
						text-align: right;
						background: #fff;
					}
				}
			}
		}

		.btn {
			width: 230px;
			margin: 0 auto;
			margin-top: 61px;
			height: 44px;
			line-height: 44px;
			text-align: center;
			color: #FFFFFF;
			border-radius: 22px;
			font-size: 18px;
			background-color: #038980;
		}
	}
</style>
