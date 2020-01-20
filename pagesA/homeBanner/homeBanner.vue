<template>
	<view>
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			};
		},
		onLoad(options) {
			this.content =this.$api.formText(options.id);
		},
		
	}
</script>

<style lang="scss">

</style>
