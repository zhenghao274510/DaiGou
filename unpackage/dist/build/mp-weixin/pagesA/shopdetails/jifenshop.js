(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/shopdetails/jifenshop"],{"0139":function(t,n,e){},"1a90":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{count:1,dataObj:{},productId:"",uid:"",type:2,content:"",imgList:[],video:"",showDate:!1}},onShow:function(){this.uid=getApp().globalData.uid},onLoad:function(t){this.productId=t.id,this.loadData()},methods:{auother:function(){this.$api.navTo("/pagesB/author/index")},canle:function(){this.$api.tip("取消")},loadData:function(){var n=this,e={uid:this.uid,productId:this.productId};console.log(e),this._reqw.ipost(e,"integralProductDetail").then(function(e){n.showDate=!0,console.log(e);var o=/\.mp4|\.rmb/;0==e.result?(n.dataObj=e,n.content=n.$api.formText(e.content),n.isCollection=e.isCollection,e.lbImageList.forEach(function(t,i){o.test(t)&&(e.lbImageList.splice(i,1),n.video=t)}),n.imgList=e.lbImageList,t.setStorageSync("isSet",e.isSet),t.setStorageSync("password",e.payPassword)):n.$api.tip(e.resultNote)}).catch(function(t){})},tellPhone:function(){this.$api.callPhone(this.phone)},activeBuy:function(){var n=this.dataObj;n.id=this.productId,t.setStorageSync("good",JSON.stringify(n)),this.$api.navTo("/pagesD/order/sexOrder?type=".concat(this.type))},stopPrevent:function(){}}};n.default=e}).call(this,e("543d")["default"])},"3abf":function(t,n,e){"use strict";e.r(n);var o=e("925b"),i=e("f05d");for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);e("fc9c");var c=e("2877"),u=Object(c["a"])(i["default"],o["a"],o["b"],!1,null,"de1dc684",null);n["default"]=u.exports},"5cad":function(t,n,e){"use strict";(function(t){e("275f"),e("921b");o(e("66fd"));var n=o(e("3abf"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"925b":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})},f05d:function(t,n,e){"use strict";e.r(n);var o=e("1a90"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=i.a},fc9c:function(t,n,e){"use strict";var o=e("0139"),i=e.n(o);i.a}},[["5cad","common/runtime","common/vendor"]]]);