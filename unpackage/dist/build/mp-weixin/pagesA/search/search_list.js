(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/search/search_list"],{"044c":function(t,a,e){"use strict";e.r(a);var n=e("19c9"),o=e("3503");for(var i in o)"default"!==i&&function(t){e.d(a,t,function(){return o[t]})}(i);e("d565");var s=e("2877"),u=Object(s["a"])(o["default"],n["a"],n["b"],!1,null,"59f6bf5a",null);a["default"]=u.exports},"19c9":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement;t._self._c},o=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return o})},3503:function(t,a,e){"use strict";e.r(a);var n=e("fe93"),o=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,function(){return n[t]})}(i);a["default"]=o.a},"476e":function(t,a,e){},b980:function(t,a,e){"use strict";(function(t){e("275f"),e("921b");n(e("66fd"));var a=n(e("044c"));function n(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("543d")["createPage"])},d565:function(t,a,e){"use strict";var n=e("476e"),o=e.n(n);o.a},fe93:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=function(){return e.e("components/uni-load-more/uni-load-more").then(e.bind(null,"6864"))},o={data:function(){return{dataList:[],page:1,totalPage:1,status:"loading",sortType:0,keyword:"",navList:[{title:"销量",flag:!0},{title:"价格",flag:!0}],current:0}},components:{uniLoadMore:n},onLoad:function(t){this.keyword=t.id,console.log(this.keyword),this.loadData()},onShow:function(){},onHide:function(){},methods:{loadData:function(){var t=this,a={uid:getApp().globalData.uid,keyword:this.keyword,sortType:this.sortType,nowPage:this.page};console.log(a),this._reqw.ipost(a,"searchList").then(function(a){0==a.result?(t.totalPage=a.totalPage,t.status="more",void 0!=a.dataList&&0!=a.dataList.length?a.dataList.forEach(function(a){t.dataList.push(a)}):t.status="noMore"):t.$api.tip(a.resultNote)}).catch(function(t){})},details:function(t){this.$api.navTo("/pagesA/shopdetails/shopDetails?id=".concat(t))},changeTab:function(t,a){switch(console.log(1),this.current!=a?this.current=a:t.flag=!t.flag,a){case 0:t.flag?this.sortType=0:this.sortType=1,this.initData();break;case 1:t.flag?this.sortType=2:this.sortType=3,this.initData();break}},initData:function(){this.dataList=[],this.page=1,this.totalPage=1,this.status="loading",this.loadData()},submitSearch:function(){this.$api.navTo("/pagesA/search/search_index")}},onReachBottom:function(){var t=this;console.log("到底"),this.status="loading",this.totalPage>this.page?(this.page+=1,this.loadData()):setTimeout(function(){t.status="noMore"},30)}};a.default=o}},[["b980","common/runtime","common/vendor"]]]);