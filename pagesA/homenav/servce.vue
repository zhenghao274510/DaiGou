<template>
	<view class="servce-box">
		<u-parse :content="content"></u-parse>
	</view>
</template>

<script>
	import uParse from '@/components/uParse/src/wxParse.vue'
	export default {
		data() {
			return {
				type: '',
				content: ''
			}
		},
		components: {
			uParse
		},
		onLoad(options) {
			this.type = options.type;
			this.$api.setNav(options.name);
			this.loadData()
		},
		onShow() {

		},
		methods: {
			loadData() {
				this._reqw.ipost({
					type: this.type
				}, "aboutusDetail").then(res => {
					console.log(res)
					res.result == 0 ? this.content = this.$api.formText(res.content) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.servce-box {
		padding: 20px 10px;
	}
</style>
