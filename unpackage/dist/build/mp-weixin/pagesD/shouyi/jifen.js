(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesD/shouyi/jifen"],{"2f42":function(t,n,a){"use strict";(function(t){a("275f"),a("921b");e(a("66fd"));var n=e(a("5b12"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,a("543d")["createPage"])},4111:function(t,n,a){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},i=[];a.d(n,"a",function(){return e}),a.d(n,"b",function(){return i})},"52ef":function(t,n,a){},"5b12":function(t,n,a){"use strict";a.r(n);var e=a("4111"),i=a("850b");for(var o in i)"default"!==o&&function(t){a.d(n,t,function(){return i[t]})}(o);a("eb95");var u=a("2877"),s=Object(u["a"])(i["default"],e["a"],e["b"],!1,null,null,null);n["default"]=s.exports},"850b":function(t,n,a){"use strict";a.r(n);var e=a("d7a6"),i=a.n(e);for(var o in e)"default"!==o&&function(t){a.d(n,t,function(){return e[t]})}(o);n["default"]=i.a},d7a6:function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=function(){return a.e("components/uni-load-more/uni-load-more").then(a.bind(null,"6864"))},i=function(){return a.e("components/mycom/empty").then(a.bind(null,"df0b"))},o={data:function(){return{showPos:!1,tabCurrentIndex:0,navList:[{state:0,text:"全部",dataList:[],status:"loading",load:!1},{state:1,text:"收入",dataList:[],status:"loading",load:!1},{state:2,text:"支出",dataList:[],status:"loading",load:!1}]}},components:{uniLoadMore:e,empty:i},onLoad:function(){this.loadData()},onShow:function(){},onHide:function(){},methods:{changeTarba:function(t){this.tabCurrentIndex=t.target.current,this.initData(this.tabCurrentIndex)},loadData:function(){var t=this;console.log("到底");var n=this.tabCurrentIndex,a={uid:getApp().globalData.uid,type:n,nowPage:this.page};this._reqw.ipost(a,"integralMingxiList").then(function(a){t.navList[n].status="more",0==a.result?(t.totalPage=a.totalPage,0==a.dataList?t.navList[n].load=!0:a.dataList.forEach(function(a){t.navList[n].dataList.push(a)})):t.$api.tip(a.resultNote)}).catch(function(t){})},tabClick:function(t){this.tabCurrentIndex=t},initData:function(t){this.page=1,this.totalPage=1,this.navList[t].dataList=[],this.loadData()},loadDataMore:function(){var t=this;this.tabCurrentIndex;this.totalPage>this.page?(this.page+=1,this.loadData()):setTimeout(function(){t.navList[index].status="noMore"},30)}}};n.default=o},eb95:function(t,n,a){"use strict";var e=a("52ef"),i=a.n(e);i.a}},[["2f42","common/runtime","common/vendor"]]]);