(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/classChild/classChild"],{"029a":function(t,a,i){"use strict";i.r(a);var n=i("daa6"),o=i("be73");for(var e in o)"default"!==e&&function(t){i.d(a,t,function(){return o[t]})}(e);i("34f8");var s=i("2877"),c=Object(s["a"])(o["default"],n["a"],n["b"],!1,null,"0c556bc6",null);a["default"]=c.exports},"34f8":function(t,a,i){"use strict";var n=i("b7ca"),o=i.n(n);o.a},ac28:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=function(){return i.e("components/uni-load-more/uni-load-more").then(i.bind(null,"6864"))},o={data:function(){return{page:1,id:"",totalPage:1,currentActive:0,sortType:0,status:"loading",dataList:[],navList:[{title:"销量",flag:!0},{title:"价格",flag:!0}]}},components:{uniLoadMore:n},onLoad:function(t){console.log(t),this.id=t.id,this.loadData()},onShow:function(){},onHide:function(){},methods:{loadData:function(){var t=this,a={uid:getApp().globalData.uid,categoryId:this.id,sortType:this.sortType,nowPage:this.page};console.log(a),this._reqw.ipost(a,"productList").then(function(a){0!=a.result?(t.$api.tip(a.resultNote),t.status="noMore"):(t.totalPage=a.totalPage,void 0!=a.dataList&&0!=a.dataList.length?(a.dataList.forEach(function(a){t.dataList.push(a)}),t.status="more"):t.status="noMore")}).catch(function(t){})},submitSearch:function(){this.$api.navTo("/pagesA/search/search_index")},gotoDetail:function(t){this.$api.navTo("/pagesA/shopdetails/shopDetails?id=".concat(t.id))},initData:function(){this.page=1,this.totalPage=1,this.status="loading",this.dataList=[],this.loadData()},changeTab:function(t,a){switch(console.log(a),this.currentActive!=a?this.currentActive=a:t.flag=!t.flag,a){case 0:t.flag?this.sortType=0:this.sortType=1,this.initData();break;case 1:t.flag?this.sortType=2:this.sortType=3,this.initData();break}}},onReachBottom:function(){var t=this;console.log("到底"),this.status="loading",this.totalPage>this.page?(this.page+=1,this.loadData()):setTimeout(function(){t.status="noMore"},30)}};a.default=o},b7ca:function(t,a,i){},b988:function(t,a,i){"use strict";(function(t){i("275f"),i("921b");n(i("66fd"));var a=n(i("029a"));function n(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,i("543d")["createPage"])},be73:function(t,a,i){"use strict";i.r(a);var n=i("ac28"),o=i.n(n);for(var e in n)"default"!==e&&function(t){i.d(a,t,function(){return n[t]})}(e);a["default"]=o.a},daa6:function(t,a,i){"use strict";var n=function(){var t=this,a=t.$createElement;t._self._c},o=[];i.d(a,"a",function(){return n}),i.d(a,"b",function(){return o})}},[["b988","common/runtime","common/vendor"]]]);