<template>
	<view>
		<image src="/static/image/back.png" mode="scaleToFill" class="backcont"  @click="onClick"></image>
	</view>
</template>

<script>
	// import  from ""
	export default {
		data() {
			return {
			}
		},
		methods: {
			onClick(){
			 this.$emit("click")
			}
		}
	}
</script>

<style lang="less">
	.backcont {
		width: 50px;
		height: 50px;
		position: fixed;
		bottom: 70px;
		right: 20px;
		border-radius: 50%;
		z-index: 999;
		text-align: center;
		line-height: 50px;
	}

</style>
