import unireq from './request.js'
const api = {
	tip(a) {
		uni.showToast({
			title: a,
			icon: "none",
			duration: 1500
		})
	},
	get(k) {
		return uni.getStorageSync(k)
	},
	getLocaltion() {
		uni.getLocation({
			type: "gcj02",
			success(res) {

			}
		})
	},
	navTo(url) {
		uni.navigateTo({
			url: url
		})
	},
	back() {
		setTimeout(() => {
			uni.navigateBack()
		}, 500)

	},
	setNav(e) {
		uni.setNavigationBarTitle({
			title: e
		})
	},
	prePage() {
		let pages = getCurrentPages();
		let prePage = pages[pages.length - 2];
		return prePage.$vm;
	},
	loading(e) {
		uni.showLoading({
			mask: false,
			title: e
		})
	},
	hideLoading() {
		uni.hideLoading()
	},
	regPhone(v) {
		var re = new RegExp(/^[1][3456789]\d{9}$/)
		if (re.test(v)) {
			return true;
		} else {
			return false;
		}
	},
	loginTip(cfb, ccb) {
		uni.showModal({
			title: "需要你的授权",
			content: "你还没有登录,请先登录!",
			cancelColor: "#CCCCCC",
			confirmText: "前往登录",
			cancelText: "取消",
			confirmColor: "#038980",
			success: function(res) {
				if (res.confirm) {
					cfb()
					// uni.redirectTo({
					// 	url: "/pagesB/author/index"
					// })
				} else if (res.cancel) {
					ccb()
					console.log("取消")

				}

			}

		})
	},
	modeltip(cfb, ccb) {
		uni.showModal({
			title: "设置支付密码",
			content: "你还没有设置支付密码,是否前往设置?取消将视为放弃该商品",
			cancelColor: "#cccccc",
			confirmText: "确定",
			cancelText: "取消",
			confirmColor: "#038980",
			success: function(res) {
				if (res.confirm) {
					cfb()
				} else if (res.cancel) {
					ccb()
				}

			}

		})
	},
	getMineOrderTypeList() {
		return [{
				name: '待付款',
				icon: 'daifukuan@2x.png',
				width: 22.5,
				height: 18
			},
			{
				name: '待发货',
				icon: 'daifahuo@2x.png',
				width: 19,
				height: 19.5
			},
			{
				name: '待收货',
				icon: 'daishouhuo@2x.png',
				width: 22,
				height: 18
			},
			{
				name: '售后',
				icon: 'shouhou@2x.png',
				width: 19,
				height: 19.5
			}
		]

	},
	getMineServceTypeList() {
		return [{
				name: '优惠卷',
				icon: 'wodeyouhuijuan@2x.png',
				width: 21.6,
				height: 21.6
			},
			{
				name: '我的收益',
				icon: 'wodeshouyi@2x.png',
				width: 20.5,
				height: 20.5
			},
			{
				name: '地址管理',
				icon: 'dizhiguanli@2x.png',
				width: 16.5,
				height: 20.5
			},
			{
				name: '我的收藏',
				icon: 'wodeshoucang@2x.png',
				width: 20,
				height: 19
			},
			{
				name: '联系客服',
				icon: 'lianxikefu@2x.png',
				width: 19,
				height: 18
			},
			{
				name: '邀请有礼',
				icon: 'yaoqingyouli@2x.png',
				width: 19,
				height: 18.5
			},
			{
				name: '我的粉丝',
				icon: 'wodefensi@2x.png',
				width: 22,
				height: 19
			},
			{
				name: '我的积分',
				icon: 'wodejiufen@2x.png',
				width: 20.5,
				height: 20.5
			},
			{
				name: '招商加盟',
				icon: 'zhaoshanglianmeng@2x.png',
				width: 20,
				height: 20
			},
			{
				name: '帮助中心',
				icon: 'bangzhuzhongxin@2x.png',
				width: 19,
				height: 20
			}
		]
	},
	shareList() {
		return [{
				type: 1,
				icon: '/static/image/weixin@2x.png',
				text: '发送给朋友'
			},
			{
				type: 2,
				icon: '/static/image/haibao@2x.png',
				text: '生成海报'
			}
		]
	},
	PayBywx(data) {
		uni.requestPayment({
			timeStamp: data.timestamp,
			nonceStr: data.nonceStr,
			package: data.prepayid,
			signType: data.signType,
			paySign: data.paySign,
			success(res) {
				uni.redirectTo({
					url: '/pagesD/order/order?id=2'
				});
				console.log("支付成功!");
			},
			fail(res) {
				uni.redirectTo({
					url: '/pagesD/order/order?id=1'
				});
			}
		});
	},
	callPhone(num) {
		uni.makePhoneCall({
			phoneNumber: num
		})
	},
	formText(str,width) {
		var s = "";
		s = str.replace(/&amp;/g, "&");
		s = s.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">");
		s = s.replace(/&nbsp;/g, " ");
		s = s.replace(/&#39;/g, "'");
		s = s.replace(/&quot;/g, '"');
		s = s.replace(/<br\/>/g, "\n");
		s=s.replace(/style="[^"]+"/gi, '')
		s=s.replace(/\<img/gi, '<img style=width:'+width+"px;height:auto;display:block;")
		return s;
	},
	parsePrice(money) {
		var n = 2;
		money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = money.split(".")[0].split("");
		var r = money.split(".")[1];
		var t = "";
		for (let i = 0; i < l.length; i++) {
			t += l[i];
		}
		return t + "." + r;
	},
	formTime(val) {
		return val.split(' ')[0]
	},
	formCard(val){
		 var isIdCard2 = /^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i;
		 if(isIdCard2.test(val)){
			 return true
		 }else{
			 return false
		 }
	}
}
export default api;
