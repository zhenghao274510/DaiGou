<template>
	<view class="content">
		<!-- <web-view src=""></web-view> -->
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				id: '',
				content:''
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.loadData()
		},
		methods: {
			loadData() {
				this._reqw.ipost({
					id: this.id
				}, "helpDetail").then(res => {
					res.result == 0 ? this.content = res.content : this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 10px;
	}
</style>
