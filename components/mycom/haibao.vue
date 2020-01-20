<template>
	<view class=" modalView" @tap.stop="hideQr">
		<view class="content">
			<view class="con-top">
				<image src="/static/HM-PersonalCenter/face.jpeg" mode="widthFix" class="posterImage"></image>
				<view class="content-image">
					<image src="/static/1.png"></image>
					<view class="content-text">
						<view class="">
							长按识别小程序
						</view>
						<view class="">
							分享来自
						</view>
					</view>

				</view>
			</view>
			<view class="share-btn">
				<button type="primary" size="mini" @tap.prevent.stop="saveImage">下载图片</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			img: {
				type: String,
				default: ''
			},
		},
		data() {
			return {}
		},
		methods: {
			saveImage() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			share() {
				
			},
			hideQr() {
				this.$emit("click")
			}
		}
	}
</script>

<style lang="less" scoped>
	.modalView {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;;
		background: rgba(0, 0, 0, .3);
		.content{
			width: 90%;
			height: 80%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.con-top{
				background: #fff;
				border-radius: 15px;
				.posterImage{
					border-radius: 15px 15px 0 0;
					max-height: 300px;
				}
			}
			.content-image{
				display: flex;
				padding: 15px;
				justify-content: space-between;
				align-items: center;
				image{
					width: 80px;
					height: 80px;
				}
				.content-text{
					flex: 1;
					padding-left: 15px;
					text-align: left;
				}
			}
			.share-btn{
				padding-top: 20px;
			}
		}
	}
	
</style>
