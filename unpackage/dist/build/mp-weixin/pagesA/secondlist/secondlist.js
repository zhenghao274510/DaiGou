(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/secondlist/secondlist"],{"60a6":function(t,n,o){"use strict";(function(t){o("275f"),o("921b");a(o("66fd"));var n=a(o("b3d8"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,o("543d")["createPage"])},"8d28":function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){return o.e("components/uni-load-more/uni-load-more").then(o.bind(null,"6864"))},e=function(){return o.e("components/bbs-countdown/bbs-countdown").then(o.bind(null,"8c5f"))},i={data:function(){return{status:"more",setColor:"#038980",page:1,totalPage:1,dataList:[]}},components:{uniLoadMore:a,bbsCountDown:e},onLoad:function(){this.loadData()},methods:{loadData:function(){var t=this,n={uid:getApp().globalData.uid,nowPage:this.page};this._reqw.ipost(n,"spikeProductList").then(function(n){0==n.result?(t.totalPage=n.totalPage,void 0!=n.dataList&&0!=n.dataList.length?n.dataList.forEach(function(n){n.LeaveEnd=t.formDate(n.endDate),t.dataList.push(n)}):t.status="noMore"):t.$api.tip(n.resultNote)}).catch(function(t){})},gotoDetail:function(t){this.$api.navTo("/pagesA/shopdetails/secondshop?id=".concat(t.id))},formDate:function(t){var n=new Date(t).getTime(),o=(new Date).getTime();return n-o}},onReachBottom:function(){var t=this;console.log("到底"),this.status="loading",this.totalPage>this.page?(this.page+=1,this.loadData()):setTimeout(function(){t.status="noMore"},30)}};n.default=i},9988:function(t,n,o){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},e=[];o.d(n,"a",function(){return a}),o.d(n,"b",function(){return e})},b3d8:function(t,n,o){"use strict";o.r(n);var a=o("9988"),e=o("f02a");for(var i in e)"default"!==i&&function(t){o.d(n,t,function(){return e[t]})}(i);o("d0f8");var u=o("2877"),s=Object(u["a"])(e["default"],a["a"],a["b"],!1,null,"974a92f6",null);n["default"]=s.exports},d0f8:function(t,n,o){"use strict";var a=o("f7b8"),e=o.n(a);e.a},f02a:function(t,n,o){"use strict";o.r(n);var a=o("8d28"),e=o.n(a);for(var i in a)"default"!==i&&function(t){o.d(n,t,function(){return a[t]})}(i);n["default"]=e.a},f7b8:function(t,n,o){}},[["60a6","common/runtime","common/vendor"]]]);