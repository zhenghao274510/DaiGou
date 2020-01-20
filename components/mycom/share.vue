<template>
	<view class="mask" @click.stop="shareToFriend(3)" @touchmove.stop.prevent="stopPrevent"
	>
		<view 
			class="mask-content"
			@click.stop.prevent="stopPrevent"
		>
				<view class="share-header">
					分享
				</view>
				<view class="share-list">
					<view 
						v-for="(item, index) in shareList" :key="index"
						class="share-item" 
						@click.stop="shareToFriend(index)"
					>
						<image :src="item.icon" mode=""></image>
						<text>{{item.text}}</text>
						<button  open-type="share" v-if="index==0" class="share-btn"></button>
					</view>
				</view>
			<view class="bottom b-t" @click="shareToFriend(2)">取消</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: 0,

			};
		},
		props:{
			contentHeight:{
				type: Number,
				default: 0
			},
			//是否是tabbar页面
			hasTabbar:{
				type: Boolean,
				default: false
			},
			shareList:{
				type: Array,
				default: []
			},
			showShare:{
				type:Boolean
			}
		},
		onLoad() {
		},
		methods:{
			toggleMask(){
				//防止高频点击
				if(this.timer == 1){
					return;
				}
				this.timer = 1;
				setTimeout(()=>{
					this.timer = 0;
				}, 500)	
			},
			//防止冒泡和滚动穿透
			stopPrevent(){},
			//分享操作
			shareToFriend(index){
				this.$emit("click",index)
			},
		}
	}
</script>

<style lang='less'>
	.mask{
		position:fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display:flex;
		justify-content: center;
		align-items: flex-end;
		padding-bottom: 30px;
		z-index: 99999;
		transition: .3s;
		background: rgba(0,0,0,0.3);
	}
	
	.mask-content{
		width: 90%;
		height: 400upx;
		transition: .3s;
		margin: 0 auto;
		background: #fff;
		transform: translateY(400);
		z-index: 99999;
		border-radius: 10px;
	}
	.share-header{
		height: 110upx;
		display:flex;
		align-items:center;
		justify-content: center;
		padding-top: 10upx;
		&:before, &:after{
			content: '';
			width: 240upx;
			heighg: 0;
			transform: scaleY(.5);
			margin-right: 30upx;
		}
		 &:after{
			 margin-left: 30upx;
			 margin-right: 0;
		 }
	}
	.share-list{
		display:flex;	
	}
	.share-item{
		min-width: 50%;
		display:flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 180upx;
		image{
			width: 80upx;
			height: 80upx;
			margin-bottom: 16upx;
		}
	}
	.b-t{
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid #ccc;
		margin-top: 10px;
	}
	.share-btn{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
	}
</style>
