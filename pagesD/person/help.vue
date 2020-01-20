<template>
	<view class="content">
		<view class="help-list" v-for="(v,k) in dataList" :key="k" @click="goto(v)">
			<text>{{v.title}}</text>
			<view class="iconfont icon-zuojiantou" style="color:#ccc;font-size: 14px;">
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				page:1
			}
		},
		components: {},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData() {
				let parmas = {
					nowPage: this.page
				};

				this._reqw.ipost(parmas, "helpList").then(res => {
					res.result == 0 ? this.dataList = res.dataList : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			goto(e) {
				uni.navigateTo({
					url: `/pagesD/person/helpdetail?id=${e.id}`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 10px;

		.help-list {
			width: 100%;
			height: 40px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ccc;

			text {}

			image {
				width: 15px;
				height: 12px;
			}
		}
	}
</style>
