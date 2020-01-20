<template>
	<view class="box">
		<swiper autoplay="3000" indicator-active-color="white" indicator-color="#ccc" circular="true" :height="200"
		 indicator-dots="true">
			<swiper-item v-for="(image, index) in images" :key="index">
				<image class="imgs" :src="image.image" @click.stop="imgurl(image,image.type,image.content)" lazy-load mode='scaleToFill' />
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			images: {
				type: Array,
				default: []
			}
		},
		data() {
			return {}
		},
		methods: {
			imgurl(item, type, text) {
			}
		}
	}
</script>

<style scoped>
	.box{
		width: 90%;
		margin:50px auto 0 auto ;
	}
	.imgs {
		width:100%;
		touch-action: none;
		height: 100%;
	}
</style>
