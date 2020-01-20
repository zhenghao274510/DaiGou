<template>
	<view class="sec-footer">
		<view @click.stop="onNavTab(index)" class="item" v-for="(item,index) in nav" :key="index">
			<image :src="tabarA==index?item.imgh:item.img"></image>
			<text class="choose" v-if="tabarA==index">{{item.txt}}</text>
			<text class="dc" v-else>{{item.txt}}</text>
			<!-- <text class="pos" v-if="index==3">{{cartnum}}</text> -->
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			tabarA: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				nav: [{
						txt: '首页',
						img: "/static/tabs/shouye_hui@2x.png",
						imgh: '/static/tabs/shouye@2x.png',
					},
					{
						txt: '分类',
						img: "/static/tabs/fenlei_hui@2x.png",
						imgh: '/static/tabs/fenlei@2x.png',
					},
					{
						txt: '资讯',
						img: "/static/tabs/zixun_hui@2x.png",
						imgh: '/static/tabs/zixun@2x.png',
					},
					{
						txt: '购物车',
						img: "/static/tabs/gouwuche_hui@2x.png",
						imgh: '/static/tabs/gouwuche@2x.png',
					},
					{
						txt: '我的',
						img: "/static/tabs/wode_hui@2x.png",
						imgh: '/static/tabs/wode@2x.png',
					},
				]
			}
		},
		components: {},
		onLoad() {},
		onShow() {

		},
		computed: {
			cartnum() {
				return this.$store.state.cartnum;
			}
		},
		onHide() {},
		methods: {
			onNavTab(e) {
				let num = e - 0;
				if (num == this.tabarA) {
					return;
				} else {
					switch (num) {
						case 0:
							uni.reLaunch({
								url: "/pages/tabbar/home"
							});
							break;
						case 1:
							uni.reLaunch({
								url: "/pages/tabbar/class"
							});
							break;
						case 2:
							uni.reLaunch({
								url: "/pages/tabbar/zixun"
							});
							break;
						case 3:
							uni.reLaunch({
								url: "/pages/tabbar/cart"
							});
							break;
						case 4:
							uni.reLaunch({
								url: "/pages/tabbar/mine"
							});
					}
				}

			}
		}

	}
</script>

<style>
	.sec-footer {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50px;
		background: #fff;
		z-index: 99;
		border-top: 1px solid #f2f3f4;
	}

	.item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		position: relative;
	}

	.item image {
		width: 24px;
		height: 25px;
	}

	.choose {
		color: #00736b;
	}

	.pos {
		width: 13px;
		height: 13px;
		line-height: 13px;
		text-align: center;
		position: absolute;
		top: 0;
		right: 15px;
		background: red;
		color: #fff;
		border-radius: 50%;
		font-size: 12px;
	}
</style>
