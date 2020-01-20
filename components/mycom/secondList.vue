<template>
	<view class="second_con">
		<block>
			<view class="uni-second-list"  v-for="(product,index) in datas" :key="index">
				<view class="uni-second">
					<view class="image-second">
						<image class="uni-second-image" :src="product.image"></image>
					</view>
					<view class="uni-second-price">
						<view class="uni-second-title"><text class="uni-second-tip">{{product.tip}}</text> <text style="margin-left: 10px;">{{product.title}}</text>
						</view>
						<view class="uni-second-title"><text class="uni-second-price-favour">￥{{product.originalPrice}}</text> <text class="uni-second-price-original">￥{{product.favourPrice}}</text>
						</view>
						<text class="uni-second-from">新西兰直邮供货</text>
					</view>
				</view>
			</view>
		</block>
		
	</view>
</template>

<script>
		export default {
			data() {
				return {
					datas: []
				}
			},
			components: {
				secondList
			},
			onLoad() {
				this.datas = [{
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product2.jpg',
						title: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
						originalPrice: 9999,
						favourPrice: 8888,
						tip: '自营'
					},
					{
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product2.jpg',
						title: 'Apple iPad 平板电脑 2018年新款9.7英寸',
						originalPrice: 3499,
						favourPrice: 3399,
						tip: '优惠'
					},
					{
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product2.jpg',
						title: 'Apple MacBook Pro 13.3英寸笔记本电脑（2017款Core i5处理器/8GB内存/256GB硬盘 MupxT2CH/A）',
						originalPrice: 12999,
						favourPrice: 10688,
						tip: '秒杀'
					},
					{
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product2.jpg',
						title: 'Kindle Paperwhite电纸书阅读器 电子书墨水屏 6英寸wifi 黑色',
						originalPrice: 999,
						favourPrice: 958,
						tip: '秒杀'
					},
					{
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product2.jpg',
						title: '微软（Microsoft）新Surface Pro 二合一平板电脑笔记本 12.3英寸（i5 8G内存 256G存储）',
						originalPrice: 8888,
						favourPrice: 8288,
						tip: '优惠'
					},
					{
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product2.jpg',
						title: 'Apple Watch Series 3智能手表（GPS款 42毫米 深空灰色铝金属表壳 黑色运动型表带 MQL12CH/A）',
						originalPrice: 2899,
						favourPrice: 2799,
						tip: '自营'
					}
				]
			},
			methods: {
	
			}
		}
</script>

<style lang="less">
.content{
		background: #F6F6F6;
		box-sizing: border-box;
	}
	.uni-second-list {
		display: flex;
		width:90%;
		margin: 10px auto;
		flex-direction: column;
		background: #fff;
		border-radius: 10px;
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
	.uni-second-from{
		color: red;
	}
		
</style>
