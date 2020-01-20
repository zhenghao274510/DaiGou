<template>
	<view class="content" v-if="content!=''">
		<view class="zixun-top">
			<image :src="image" mode="" v-if="video==''" class="zixun-image"></image>
			<video :src="video" object-fit="cover" controls :poster="image" v-else ></video>
		</view>
		<view>
			<u-parse :content="content"></u-parse>
		</view>
		
	</view>
</template>

<script>
	import uParse from '@/components/uParse/src/wxParse.vue'
	export default {
		data() {
			return {
				id: '',
				content: '',
				image: '',
				video: ''
			}
		},
		components:{
			uParse
		},
		onLoad(options) {
			this.id = options.id;
			this.$api.setNav(options.name);
			this.loadData()
		},
		methods: {
			loadData() {
				this._reqw.ipost({
					newsId: this.id
				}, "newDetail").then(res => {
					console.log(res)
					res.result == 0 ? (this.video = res.video, this.image = res.image, this.content = this.$api.formText(res.content)) :
						this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.content {
		width: 100%;
		padding-bottom: 50px;
	}

	.zixun-top {
		width: 100%;
		height: 125px;
		margin-bottom:10px ;
	}

	.zixun-image {
		width: 100%;
		height: 100%;
	}

	video {
		width: 100%;
		height: 100%;
	}

	.zixun-cont-main {
		padding: 10px;
	}

	.img {
		width: 100%;

		image {
			width: 100%;
		}
	}
</style>
