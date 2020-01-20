<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click.stop="checkAddress(item)">
			<view class="wrapper">
				<view class="u-box">
					<text class="name">{{item.name}}</text>
					<text class="mobile">{{item.phone}}</text>
				</view>
				<view class="address-box">
					<text class="address">{{item.province}} {{item.city}}{{item.area}}{{item.details}}</text>
				</view>
			</view>
			<view class="u-bottom">
				<text class="yticon icon-bianji" @click.stop="addAddress('edit', item)">编辑</text>
				<text class="yticon icon-bianji" @click.stop="delAddress(item.id,k)">删除</text>
			</view>

		</view>
		<uni-load-more :status="status"></uni-load-more>
		<button class="add-btn" @click="addAddress('add')" hover-class="btn-hover">新增地址</button>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				status: 'loading',
				source: 0,
				addressList: [],
				page: 1,
				totalPage: 1
			}
		},
		components: {
			uniLoadMore
		},
		onLoad(options) {
			console.log(options.source);
			this.source = options.source;

		},
		onShow() {
			this.initData();
		},
		onReachBottom() {
			this.status = "loading";
			this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
				this.status = "noMore"
			}, 30)
		},
		methods: {
			initData(){
				this.page=1;
				this.totalPage=1;
				this.addressList=[];
				this.loadData();
			},
			loadData() {
				let parmas = {
					uid: getApp().globalData.uid,
					newPage: this.page
				}
				this._reqw.ipost(parmas, "addressList").then(res => {
					res.result == 0 ? (this.totalPage = res.totalPage, res.dataList != undefined && res.dataList
						.length != 0 ? res.dataList.forEach(item => {
								this.addressList.push(item)
						}) : this.status = "noMore", res.totalPage == 1 ? this.status = "noMore" : this.status = 'more') : this.$api.tip(
						res.resultNote)
				}).catch(err => {})
			},
			//选择地址
			checkAddress(item) {
				if (this.source == 1) {
					//  上一页实例
					console.log(item)
					item.address=item.province+item.city+item.area+item.details;
					this.$api.prePage().addressData = item;
					this.$api.prePage().addrId = item.id;
					uni.navigateBack();
				}
			},
			addAddress(type, item) {
				this.$api.navTo(`/pagesD/person/addressManage?type=${type}&id=${JSON.stringify(item)}`)
			},
			delAddress(id, k) {
				let _this=this;
				uni.showModal({
					confirmText:"确定",
					confirmColor:"#00736B",
					content:"确定删除吗？",
					success(res) {
							
						if(res.confirm){
							_this._reqw.ipost({
								id: id
							}, "delAddr").then(res => {
								res.result == 0 ? (_this.$api.tip("删除成功"), _this.initData()) : _this.$api.tip(res.resultNote)
							}).catch(err => {})
						}else if(res.cancel){
							_this.$api.tip('取消')
						}
					}
				})
				
			},
			initData() {
				this.page = 1;
				this.totalPage = 1;
				this.addressList = [];
				this.loadData()
			}
		}
	}
</script>

<style lang='scss' scoped>
	.list {
		display: flex;
		flex-direction: column;
		width: 90%;
		margin: 10px auto;
		padding: 0 10px;
		background: #fff;
		box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.04);
		border-radius: 10px;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 10px 0;
	}

	.address-box {
		display: flex;
		align-items: center;
		margin-top: 10px;

		.address {
			font-size: 13px;
			color: #333333;
		}
	}

	.u-box {
		font-size: 17px;
		color: $font-color-light;
		font-weight: bold;
		margin-top: 16upx;

		.name {
			margin-right: 30upx;
			font-weight: bold;
			color: #333333;
		}

		.mobile {
			font-weight: bold;
			color: #333333;
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200px;
		margin: 40px auto 0 auto;
		height: 40px;
		font-size: 32upx;
		border-radius: 22px;
		color: #fff;
		background-color: #038980;
	}

	.u-bottom {
		display: flex;
		justify-content: flex-end;
		padding: 10px 0;
		border-top: 1px solid #F0F0F0;
	}

	.yticon {
		padding: 3px 8px;
		border-radius: 5px;
		border: 1px solid #F0F0F0;
		margin-left: 15px;
		color: #666666;
		font-size: 13px;
	}
</style>
