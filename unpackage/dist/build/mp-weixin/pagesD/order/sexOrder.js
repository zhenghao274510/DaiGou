(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesD/order/sexOrder"],{"08cb":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){e.stopPropagation(),t.showPopup=!1},t.e1=function(e){e.stopPropagation(),t.showPopup=!1})},o=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return o})},"16fe":function(t,e,i){"use strict";i.r(e);var n=i("3a28"),o=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);e["default"]=o.a},"2add":function(t,e,i){"use strict";i.r(e);var n=i("08cb"),o=i("16fe");for(var s in o)"default"!==s&&function(t){i.d(e,t,function(){return o[t]})}(s);i("feef");var a=i("2877"),r=Object(a["a"])(o["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},3131:function(t,e,i){},"3a28":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){return i.e("components/vue-pwd/vue-pwd").then(i.bind(null,"be6c"))},o={data:function(){return{desc:"",addressData:{name:"刘晓晓",phone:"18666666666",details:"贵族皇仕牛排(东城店)",province:"北京市",city:"北京市",area:"东城区",default:1,id:"4554564tretuji"},addrId:"",type:"",showPwdBox:!1,isSet:"",password:"",showPopup:!1,puopTitle:"",content:"",freight:10,taxes:10,dataObj:{},count:1}},components:{vuePwd:n},computed:{shopPrice:function(){var t=0;return t=100*this.dataObj.price*this.count,this.$api.parsePrice(t/100)},price:function(){return""==this.taxes&&(this.taxes=0),""==this.freight&&(this.freight=0),this.$api.parsePrice(this.shopPrice-0+(this.taxes-0)+(this.freight-0))}},onLoad:function(e){t.getStorageSync("good")&&(this.dataObj=JSON.parse(t.getStorageSync("good")),t.removeStorageSync("good")),this.type=e.type},onShow:function(){t.getStorageSync("isSet")&&(this.isSet=t.getStorageSync("isSet")),t.getStorageSync("password")&&(this.password=t.getStorageSync("password"))},methods:{interShow:function(t){var e=this;this.puopTitle=7==t?"运费说明":"税费说明",this._reqw.ipost({type:t},"aboutusDetail").then(function(t){0==t.result?(e.showPopup=!0,e.content=e.$api.formText(t.content)):e.$api.tip(t.resultNote)}).catch(function(t){})},submit:function(){""==this.addrId?this.$api.tip("请选择收货地址!"):2==this.type?0==this.isSet?this.test():this.showPwdBox=!0:this.getOrderId()},test:function(){this.$api.modeltip(this.test2,this.$api.back)},test2:function(){this.$api.navTo("/pagesD/shouyi/setpsw")},getDefault:function(){var t=this;this._reqw.ipost({uid:getApp().globalData.uid},"findDefaultAddr").then(function(e){0==e.result?t.addressData=e:t.$api.tip(e.resultNote)}).catch(function(t){})},choseAddress:function(){this.$api.navTo("/pagesD/person/address?source=1")},getOrderId:function(){var t=this,e={uid:getApp().globalData.uid,addrId:this.addrId,productId:this.dataObj.id};1==this.type?this._reqw.ipost(e,"integralOrder").then(function(e){0==e.result?t.wxPay(e.orderId):t.$api.tip(e.resultNote)}).catch(function(t){}):this._reqw.ipost(e,"spikeOrder").then(function(e){0==e.result?t.wxPay(e.orderId):t.$api.tip(e.resultNote)}).catch(function(t){})},wxPay:function(t){var e=this;this._reqw.ipost({orderId:t},"wxpay").then(function(t){0==t.result?e.$api.PayBywx(t.body):e.$api.tip(t.resultNote)})},subOrder:function(t){var e=t.pwd.join("");e==this.password?(this.getOrderId(),this.showPwdBox=!1):this.$api.tip("密码输入错误!请确认")}}};e.default=o}).call(this,i("543d")["default"])},"6ea8":function(t,e,i){"use strict";(function(t){i("275f"),i("921b");n(i("66fd"));var e=n(i("2add"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},feef:function(t,e,i){"use strict";var n=i("3131"),o=i.n(n);o.a}},[["6ea8","common/runtime","common/vendor"]]]);