(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/mycom/haibao"],{"12fc":function(t,n,e){"use strict";e.r(n);var a=e("b76d"),u=e.n(a);for(var c in a)"default"!==c&&function(t){e.d(n,t,function(){return a[t]})}(c);n["default"]=u.a},"2edc":function(t,n,e){"use strict";var a=e("7413"),u=e.n(a);u.a},7413:function(t,n,e){},b76d:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={props:{img:{type:String,default:""}},data:function(){return{}},methods:{saveImage:function(){t.saveImageToPhotosAlbum({filePath:this.poster.finalPath,success:function(t){_app.showToast("保存成功")}})},share:function(){},hideQr:function(){this.$emit("click")}}};n.default=e}).call(this,e("543d")["default"])},b986:function(t,n,e){"use strict";e.r(n);var a=e("c0aa"),u=e("12fc");for(var c in u)"default"!==c&&function(t){e.d(n,t,function(){return u[t]})}(c);e("2edc");var o=e("2877"),i=Object(o["a"])(u["default"],a["a"],a["b"],!1,null,"54b85e1a",null);n["default"]=i.exports},c0aa:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return u})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/mycom/haibao-create-component',
    {
        'components/mycom/haibao-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b986"))
        })
    },
    [['components/mycom/haibao-create-component']]
]);
