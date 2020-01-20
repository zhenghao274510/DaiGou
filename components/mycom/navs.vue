<template>
	<view class="all">
		<view class="contains">
			<view class="nav-item" v-for="(item,index) in navs" :key="index">
				<image :src="item.icon" alt @click.stop="classify(item)" lazy-load />
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			navs: {
				type: Array,
				default: []
			}
		},
		data() {
			return {};
		},
		components: {},
		methods: {
			classify(item) {
				this.$emit("click",item)
			},
			fenlei() {}
		}
	}
</script>

<style scoped lang="less">
	.all {
		position: relative;
		width: 100%;
		.contains {
			display: flex;
			flex-wrap: wrap;
			position: relative;

			.nav-item {
				width: 20%;
				margin-top: 10px;
				margin-bottom: 10px;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;

				image {
					width: 45px;
					height: 45px;
					border-radius: 50%;
				}

				text {
					font-size: 12px;
					color: #666;
					margin-top: 7px;
				}
			}
		}
	}
</style>
