<template>
	<view class="content">
		<view class="uni-second-list-top">
			<view class="">
				订单商品
			</view>
			<view class="">
				订单编号：{{dataObj.orderNum}}
			</view>
		</view>
		<view class="uni-second-list">
			<view class="uni-second">
				<view class="image-second">
					<image class="uni-second-image" :src="dataObj.dataList[0].image"></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-second-title"><text class="uni-second-tip">{{dataObj.dataList[0].tip}}</text> <text style="margin-left: 10px;">{{dataObj.dataList[0].title}}</text>
					</view>
					<view class="uni-second-title">规格:hjfdkdj</text>
					</view>
					<view class="uni-second-title">共计 {{productCount}}件商品</text>
					</view>
					<text class="uni-second-from">￥{{payMoney}}</text>
				</view>
			</view>
		</view>
		<view class="tui-inter">
			<view class="inter-title">
				售后说明
			</view>
			<editor placeholder="请输入售后说明" v-model="content"></editor>

		</view>
		<view class="tui-inter">
			<view class="inter-title">
				凭证
			</view>
			<view class="img-list">
				<view class="img" @click="uploads" v-if="imgList.length<4">
					<image src="/static/image/tianjiatupian@2x.png" mode="scaleToFill"></image>
				</view>
				<view class="img" v-for="(v,k) in imgList" :key="k" @click="seeDetails(k)">
					<image :src="v" mode="scaleToFill"></image>
				</view>
			</view>
		</view>
		<view class="btn" @click="SubChange">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				active: 1,
				imgList: [],
				id: '',
				dataObj: {},
				content: ''
			}
		},
		components: {},
		onLoad(options) {
			this.dataObj=JSON.parse(options.id);
			this.id=JSON.parse(options.id).orderNum;
		},
		onShow() {},
		methods: {
			uploads() {
				console.log("上传")
				let _this = this;
				wx.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["album", "camera"],
					success(res) {
						// tempFilePath可以作为img标签的src属性显示图片
						console.log(res);
						_this.$api.iupfile(res.tempFiles[0]).then(res => {
							res.result == 0 ? (this.$api.tip('上传成功!'), _this.icon = res.dataList[0].imgUrl) : _this.$api
								.tip(res.resultNote)
						}).catch(res => {});
					}
				});
			},
			SubChange() {
				let parmas = {
					orderId: this.id,
					content: this.content,
					images: this.imgList.join('|')
				};
				this.content == "" ? this.$api.tip('请输入相关说明') : (this.imgList.length == 0 ? this.$api.tip("请上传相关凭证!") : this._reqw.ipost(
					parmas, "applyRefund").then(res => {
					res.result == 0 ? (this.$api.tip('提交成功!'), setTimeout(() => {
						this.$api.back()
					}, 300)) : this.$api.tip(res.resultNote)
				}).catch(err => {}))

			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		background: #F6F6F6;
		box-sizing: border-box;
	}

	.img-list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;

		.img {
			width: 31%;
			padding: 0 1%;
			height: 100px;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.tui-inter {
		margin: 10px 0;
	}

	.inter-title {
		line-height: 30px;
	}

	.uni-second-title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 45px;
	}

	.uni-second-list-top {
		display: flex;
		height: 40px;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 0 5px;
		border-radius: 10px 10px 0 0;
	}

	.uni-second-list {
		display: flex;
		width: 100%;
		margin: 0 auto;
		margin-bottom: 10px;
		flex-direction: column;
		background: #fff;
		border-radius: 0 0 10px 10px;
	}

	.uni-second {
		padding: 20upx;
		display: flex;
		flex-direction: row;
	}

	.image-second {
		height: 110px;
		width: 110px;
		margin: 12upx 0;
	}

	.uni-second-image {
		height: 110px;
		width: 110px;
	}

	.uni-second-title {
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.uni-second-price {
		flex: 1;
		margin-top: 10upx;
		font-size: 28upx;
		line-height: 1.5;
		position: relative;
	}

	.uni-second-price-original {
		color: #e80080;
	}

	.uni-second-price-favour {
		color: #888888;
		text-decoration: line-through;
		margin-left: 10upx;
	}

	.uni-second-tip {
		background-color: #ff3333;
		color: #ffffff;
		padding: 0 10upx;
		border-radius: 5upx;
	}

	.uni-second-from {
		color: red;
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
</style>
