<template>
	<view class="content">
		<view class="one-info">
			<view class="one-info-top">
				<text class="tit">联系人</text>
				<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
			</view>
			<view class="one-tip">
				温馨提示：为了不影响清关，务必填写与身份证上姓名一致
			</view>

		</view>
		<view class="row b-b">
			<text class="tit">电 话：</text>
			<input class="input" type="number" v-model="addressData.phone" placeholder="请输入联系电话" placeholder-class="placeholder"
			 maxlength="11" />
		</view>
		<view class="row b-b">
			<text class="tit">身份证号：</text>
			<input class="input" type="text" v-model="identityNum" placeholder="请输入身份证号" placeholder-class="placeholder"
			 maxlength="18" />
		</view>
		<view class="row b-b">
			<text class="tit">地 址：</text>
			<text @click="chooseLocation" class="input" v-if="type==0">
				{{addressData.province}}{{addressData.city}}{{addressData.area}}
			</text>
			<text @click="chooseLocation" class="input" v-else>
				{{address}}
			</text>

		</view>
		<view class="row b-b">
			<text class="tit">详细地址：</text>
			<input class="input" type="text" v-model="addressData.details" placeholder="请输入详细地址，如门牌号" placeholder-class="placeholder" />
		</view>
		<view class="row default-row" @click="choseDefault">
			<view class="tit">设为默认</view>
			<view class="">
				<view class="iconfont icon-yuan" v-if="addressData.isDefault==0" style="color: #303133;">

				</view>
				<view class="iconfont icon-xuanzhong" v-else style="color:#00736B;">

				</view>
			</view>
		</view>
		<button class="add-btn" @click="confirm">保存</button>
		<picker-city v-if="showPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#038980'
		 @onCancel="onCancel"></picker-city>
	</view>
</template>

<script>
	import pickerCity from "@/components/mpvue-citypicker/mpvueCityPicker.vue"
	export default {
		data() {
			return {
				addressData: {
					name: '',
					phone: '',
					province: '',
					city: '',
					area: '',
					details: '',
					id: '',
					isDefault: 0
				},
				identityNum: '',
				cityPickerValueDefault: [0, 0, 1],
				showPicker: false,
				type: 0, // 0  修改   1  添加
				address: '请选择省/市/区',
				icard: ''
			}
		},
		components: {
			pickerCity
		},
		onLoad(options) {
			let title = ""
			options.type == "edit" ? (title = "修改地址", this.addressData = JSON.parse(options.id), this.type = 0, uni.getStorageSync(
				'cardNumber') ? this.identityNum = uni.getStorageSync(
				'cardNumber') : this.identityNum = "") : (title =
				"添加地址", this.type = 1);
			console.log(title, options)
			this.$api.setNav(title);
		},
		methods: {
			//选择地址
			chooseLocation() {
				this.showPicker = true;
				console.log(1)
			},
			onConfirm(e) {
				console.log(e)
				let address = this.addressData
				this.showPicker = false;
				this.address = e.label;
				console.log(e.label.split('-'))
				address.province = e.label.split('-')[0];
				address.city = e.label.split('-')[1];
				address.area = e.label.split('-')[2];
			},
			onCancel() {
				this.showPicker = false;
			},
			choseDefault() {
				this.addressData.isDefault == 0 ? this.addressData.isDefault = 1 : this.addressData.isDefault = 0;
			},

			//提交
			confirm() {
				let data = this.addressData;
				if (!data.name) {
					this.$api.tip('请填写收货人姓名');
					return;
				}
				if (!this.$api.regPhone(data.phone)) {
					this.$api.tip('请输入正确的手机号码');
					return;
				}
				if (!data.province || !data.city || !data.area) {
					this.$api.tip('请在选择所在省市');
					return;
				}
				if (!data.details) {
					this.$api.tip('请填写门牌号信息');
					return;
				} else if (this.identityNum == "") {
					this.$api.tip("请输入身份证号");
				}else if(this.$api.formCard(this.identityNum)){
					this.$api.tip("身份证号格式不对请重新输入")
				}else {
					let parmas = {
						id: data.id,
						uid: getApp().globalData.uid,
						name: data.name,
						phone: data.phone,
						province: data.province,
						city: data.city,
						area: data.area,
						details: data.details,
						isDefault: data.isDefault,
						identityNum: this.identityNum
					};
					console.log(parmas)
					this._reqw.ipost(parmas, "addOrUpdateAddr").then(res => {
						res.result == 0 ? (this.$api.tip('提交成功!'), uni.setStorageSync('cardNumber', this.identityNum), setTimeout(() => {
							this.$api.back()
						}, 300)) : this.$api.tip(res.resultNote)
					}).catch(err => {})

				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 10px;
	}

	.one-tip {
		width: 100%;
		height: 30px;
		background: rgb(68, 188, 180);
		border-radius: 10px;
		color: #fff;
		line-height: 30px;
		font-size: 12px;
		text-align: center;
		margin-top: 10px;
	}

	.row {
		height: 110upx;
		border-bottom: 1px solid #999999;
	}

	.one-info {
		border-bottom: 1px solid #999999;
		padding: 10px 0;
	}

	.iconfont {
		font-size: 20px;
		margin-left: 10px;
	}

	.row,
	.one-info-top {
		display: flex;
		align-items: center;
		position: relative;

		.tit {
			flex-shrink: 0;
			width: 152upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: #999999;
			padding-left: 15px;
		}

	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200px;
		border-radius: 22px;
		height: 40px;
		margin: 50px auto;
		font-size: $font-lg;
		color: #fff;
		background-color: #038980;
	}
</style>
