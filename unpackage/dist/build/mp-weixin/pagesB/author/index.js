(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesB/author/index"],{"0933":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return u})},"2ff1":function(t,e,n){"use strict";var o=n("4717"),u=n.n(o);u.a},4717:function(t,e,n){},"67c5":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{no:!1}},computed:{},methods:{getInfo:function(){console.log(111)},bindGetPhoneNumbe:function(t){console.log(t)},bindGetUserInfo:function(e){var n=this;console.log(e.mp.detail.userInfo),t.login({success:function(o){var u={code:o.code,userInfo:e.mp.detail.userInfo};console.log(u),n._reqw.ipost(u,"loginByWeixin").then(function(e){0==e.result?(console.log(e),getApp().globalData.uid=e.uid,getApp().globalData.isSet=e.isSet,getApp().globalData.isCode=e.isCode,getApp().globalData.status=e.status,0==e.isCode?n.$api.back():setTimeout(function(){t.redirectTo({url:"/pagesB/reg/reg"})},300)):n.$api.tip(e.resultNote)})},fail:function(){},complete:function(){}})}}};e.default=n}).call(this,n("543d")["default"])},"69ce":function(t,e,n){"use strict";(function(t){n("275f"),n("921b");o(n("66fd"));var e=o(n("d3d8"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"9b25":function(t,e,n){"use strict";n.r(e);var o=n("67c5"),u=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);e["default"]=u.a},d3d8:function(t,e,n){"use strict";n.r(e);var o=n("0933"),u=n("9b25");for(var i in u)"default"!==i&&function(t){n.d(e,t,function(){return u[t]})}(i);n("2ff1");var a=n("2877"),c=Object(a["a"])(u["default"],o["a"],o["b"],!1,null,"7676d36e",null);e["default"]=c.exports}},[["69ce","common/runtime","common/vendor"]]]);