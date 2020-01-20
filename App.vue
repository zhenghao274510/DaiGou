<script>
	export default {
		globalData: {
			uid: '',
			// uid:'',
			isLogin: true,
			aid: '', //上级
			isSet: '', //  支付密码
			isCode: ''
		},
		//页面中获取 和  更改
		onLaunch: function() {
			console.log('App Launch')
			console.log(getApp())
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					uni.setStorageSync('screen', res)
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import './common/uni.css';

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background: #F6F6F6;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.btn-hover {
		opacity: .8;
	}

	.imgs {
		width: 100%;
		touch-action: none;
		height: 100%;
	}

	.one {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #038980;
		margin: 0 6px;
	}

	.two {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #00736B;
		margin: 0 6px;
	}

	.btn-hover {
		opacity: .8;
	}

	.uni-second-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.uni-second-tip-one {
		color: #42c9a1;
		padding: 0 5px;
		border-radius: 3px;
		border: 1px solid #42c9a1;
		font-size: 10px;
	}

	.uni-second-tip-two {
		color: #ff2f5c;
		padding: 0 5px;
		border-radius: 3px;
		border: 1px solid #ff2f5c;
		font-size: 10px;
	}


	@font-face {
		font-family: "iconfont";
		src: url('static/myicon/iconfont.ttf');
		/* IE9 */
	}

	@font-face {
		font-family: "iconfont";
		src: url('static/myicon/iconfont2.ttf');
		/* IE9 */
	}

	@font-face {
		font-family: "iconfont";
		src: url('static/myicon/iconfont3.ttf');
		/* IE9 */
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 28px;
		font-style: normal;
		color: #FFFFFF;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-yuan:before {
		content: "\e63a";
	}

	.icon-error:before {
		content: "\e62b";
	}

	.icon-zhengpinbaozhang:before {
		content: "\e607";
	}

	.icon-dizhi01:before {
		content: "\e62c";
	}

	.icon-del:before {
		content: "\e6ac";
	}

	.icon-back-m:before {
		content: "\e60f";
	}

	.icon-haofangtuo400iconfontshaixuanzhedie:before {
		content: "\e692";
	}

	.icon-haofangtuo400iconfontshaixuanzhedieguanbi:before {
		content: "\e6dc";
	}

	.icon-zuojiantou:before {
		content: "\e61c";
	}

	.icon-iconseach:before {
		content: "\e611";
	}

	.icon-error1:before {
		content: "\e621";
	}

	.icon-fangkuang:before {
		content: "\e629";
	}

	.icon-xuanze-fangkuang:before {
		content: "\e793";
	}

	.icon-baoyou:before {
		content: "\e63e";
	}

	.icon-icon-test:before {
		content: "\e627";
	}

	.icon-xin:before {
		content: "\e74b";
	}

	.icon-danseshixintubiao-:before {
		content: "\e62d";
	}

	.icon-erji:before {
		content: "\e62e";
	}

	.icon-xuanzhong:before {
		content: "\e6b2";
	}

	.icon-LC_icon_down_fill:before {
		content: "\e653";
	}

	.icon-up:before {
		content: "\e734";
	}

	.icon-fanhuidingbu:before {
		content: "\e623";
	}

	.list-top {
		color: #151624;
		font-size: 15px;
		font-weight: bold;
	}

	.list-bottom {
		color: #666666;
		margin-top: 10px;
	}

	.list-color {
		color: #00736b;
		font-size: 15px;
		font-weight: bold;
	}
</style>
