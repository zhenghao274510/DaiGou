(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/homenav/servce"],{"16d1":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return u})},6157:function(t,n,e){"use strict";e.r(n);var a=e("cd99"),u=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);n["default"]=u.a},7311:function(t,n,e){"use strict";(function(t){e("275f"),e("921b");a(e("66fd"));var n=a(e("d9f8"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},8337:function(t,n,e){"use strict";var a=e("aef1"),u=e.n(a);u.a},aef1:function(t,n,e){},cd99:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{type:"",content:""}},onLoad:function(t){this.type=t.type,this.$api.setNav(t.name),this.loadData()},onShow:function(){},methods:{loadData:function(){var t=this;this._reqw.ipost({type:this.type},"aboutusDetail").then(function(n){0==n.result?t.content=n.content:t.$api.tip(n.resultNote)}).catch(function(t){})}}};n.default=a},d9f8:function(t,n,e){"use strict";e.r(n);var a=e("16d1"),u=e("6157");for(var o in u)"default"!==o&&function(t){e.d(n,t,function(){return u[t]})}(o);e("8337");var c=e("2877"),i=Object(c["a"])(u["default"],a["a"],a["b"],!1,null,"8590552c",null);n["default"]=i.exports}},[["7311","common/runtime","common/vendor"]]]);