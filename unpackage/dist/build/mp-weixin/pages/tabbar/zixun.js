(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/zixun"],{"1c3b":function(t,n,a){"use strict";var e=a("d457"),o=a.n(e);o.a},"1ee0":function(t,n,a){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},o=[];a.d(n,"a",function(){return e}),a.d(n,"b",function(){return o})},3341:function(t,n,a){"use strict";a.r(n);var e=a("3926"),o=a.n(e);for(var i in e)"default"!==i&&function(t){a.d(n,t,function(){return e[t]})}(i);n["default"]=o.a},3926:function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=function(){return a.e("components/SecFooter/SecFooter").then(a.bind(null,"fe43"))},o=function(){return a.e("components/uni-load-more/uni-load-more").then(a.bind(null,"6864"))},i={data:function(){return{tabarA:2,dataList:[],page:1,totalPage:1,status:"loading"}},components:{secFooter:e,uniLoadMore:o},onReachBottom:function(){var t=this;this.status="loading",this.totalPage>this.page?(this.page+=1,this.loadData()):setTimeout(function(){t.status="noMore"},30)},onLoad:function(){this.loadData()},methods:{loadData:function(){var t=this;this._reqw.ipost({nowPage:this.page},"newsList").then(function(n){1==n.totalPage?t.status="noMore":t.status="more",0==n.result?(t.totalPage=n.totalPage,n.dataList.forEach(function(n){t.dataList.push(n)})):t.$api.tip(n.resultNote)}).catch(function(t){})},details:function(t,n){""==n.video?this.$api.navTo("/pagesD/zixun/zixunDetail?id=".concat(n.id,"&name=").concat(n.title)):1==t&&this.$api.navTo("/pagesD/zixun/zixunDetail?id=".concat(n.id,"&name=").concat(n.title))}}};n.default=i},9725:function(t,n,a){"use strict";(function(t){a("275f"),a("921b");e(a("66fd"));var n=e(a("e9df"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,a("543d")["createPage"])},d457:function(t,n,a){},e9df:function(t,n,a){"use strict";a.r(n);var e=a("1ee0"),o=a("3341");for(var i in o)"default"!==i&&function(t){a.d(n,t,function(){return o[t]})}(i);a("1c3b");var u=a("2877"),c=Object(u["a"])(o["default"],e["a"],e["b"],!1,null,"638badae",null);n["default"]=c.exports}},[["9725","common/runtime","common/vendor"]]]);