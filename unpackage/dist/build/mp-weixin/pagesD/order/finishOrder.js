(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesD/order/finishOrder"],{"197a":function(t,i,e){"use strict";(function(t){e("275f"),e("921b");o(e("66fd"));var i=o(e("6a78"));function o(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,e("543d")["createPage"])},"65b7":function(t,i,e){},"6a78":function(t,i,e){"use strict";e.r(i);var o=e("83de"),n=e("a209");for(var a in n)"default"!==a&&function(t){e.d(i,t,function(){return n[t]})}(a);e("d567");var s=e("2877"),r=Object(s["a"])(n["default"],o["a"],o["b"],!1,null,null,null);i["default"]=r.exports},"79dd":function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={data:function(){return{maskState:0,desc:"",addressData:{name:"刘晓晓",phone:"18666666666",details:"贵族皇仕牛排(东城店)",province:"北京市",city:"北京市",area:"东城区",default:1,id:"4554564tretuji"},addrId:"",complinNumber:0,complinId:"",dataList:[],skuList:[],type:"",payType:"",showPopup:!1,puopTitle:"",content:"",freight:10,taxes:10}},components:{},computed:{shopPrice:function(){var t=0;return this.dataList.forEach(function(i){t+=100*(i.price-0)*(i.count-0)}),this.$api.parsePrice(t/100)},price:function(){return""==this.taxes&&(this.taxes=0),""==this.freight&&(this.freight=0),this.shopPrice-0+(this.taxes-0)+(this.freight-0)},endPrice:function(){var t=0;return t=""==this.complinId?this.price:this.price-this.complinNumber,this.$api.parsePrice(t)},totalCount:function(){var t=0;return this.dataList.forEach(function(i){t+=i.count-0}),t},totalPoint:function(){var t=0;return this.dataList.forEach(function(i){t+=i.point-0}),t},endpoint:function(){var t=0;return this.dataList.forEach(function(i){t+=i.dhPoint-0}),t}},onLoad:function(i){t.getStorageSync("good")&&(this.dataList=JSON.parse(t.getStorageSync("good")),t.removeStorageSync("good")),t.getStorageSync("sku")&&(this.skuList=JSON.parse(t.getStorageSync("sku"))),this.type=i.type,this.payType=i.payType,0==this.type?this.getComplin():this.complinId="",console.log(this.dataList)},onShow:function(){t.getStorageSync("isSet")&&(this.isSet=t.getStorageSync("isSet")),t.getStorageSync("password")&&(this.password=t.getStorageSync("password")),console.log(this.complinId,this.complinNumber)},methods:{gotoChooseCompline:function(){this.$api.navTo("/pagesC/complin/usecomplin?id=".concat(this.endPrice))},interShow:function(t){var i=this;this.puopTitle=7==t?"运费说明":"税费说明",this._reqw.ipost({type:t},"aboutusDetail").then(function(t){0==t.result?(i.showPopup=!0,i.content=i.$api.formText(t.content)):i.$api.tip(t.resultNote)}).catch(function(t){})},submit:function(){""==this.addrId?this.$api.tip("请选择收货地址!"):this.getOrderId()},test:function(){this.$api.modeltip(this.test2,this.$api.back)},test2:function(){this.$api.navTo("/pagesD/shouyi/setpsw")},getDefault:function(){var t=this;this._reqw.ipost({uid:getApp().globalData.uid},"findDefaultAddr").then(function(i){0==i.result?t.addressData=i:t.$api.tip(i.resultNote)}).catch(function(t){})},getComplin:function(){var t=this,i={uid:getApp().globalData.uid,money:this.shopPrice};this._reqw.ipost(i,"findAvailableCouponList").then(function(i){if(console.log(i),0==i.result)for(var e in i.dataList)i.dataList[e+1]>i.dataList[e]?(t.complinNumber=i.dataList[e+1].mjMoney-0,t.complinId=i.dataList[e+1].id):(t.complinNumber=i.dataList[e].mjMoney-0,t.complinId=i.dataList[e].id);else t.$api.tip(i.resultNote)}).catch(function(t){})},choseAddress:function(){this.$api.navTo("/pagesD/person/address?source=1")},getOrderId:function(){var t=this,i={},e=[];console.log(this.dataList),this.dataList.forEach(function(o){0==t.payType?i.productId=o.productId:i.cartId=o.cartId,i.skuId=o.skuId,i.qty=o.number,e.push(i)}),console.log(e);var o={uid:getApp().globalData.uid,type:this.payType,addrId:this.addrId,couponId:this.couponId,totalPrice:this.shopPrice,freight:this.freight,taxes:this.taxes,payMoney:this.endPrice,point:this.point,usePoint:this.usePoint,productList:e}(this._reqw.ipost(o,"saveOrder").then(function(i){0==i.result?t.wxPay(i.orderId):t.$api.tip(i.resultNote)}).catch(function(t){}))},wxPay:function(t){var i=this;this._reqw.ipost({orderId:t},"wxpay").then(function(t){0==t.result?i.$api.PayBywx(t.body):i.$api.tip(t.resultNote)})}}};i.default=e}).call(this,e("543d")["default"])},"83de":function(t,i,e){"use strict";var o=function(){var t=this,i=t.$createElement;t._self._c;t._isMounted||(t.e0=function(i){i.stopPropagation(),t.showPopup=!1},t.e1=function(i){i.stopPropagation(),t.showPopup=!1})},n=[];e.d(i,"a",function(){return o}),e.d(i,"b",function(){return n})},a209:function(t,i,e){"use strict";e.r(i);var o=e("79dd"),n=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(i,t,function(){return o[t]})}(a);i["default"]=n.a},d567:function(t,i,e){"use strict";var o=e("65b7"),n=e.n(o);n.a}},[["197a","common/runtime","common/vendor"]]]);