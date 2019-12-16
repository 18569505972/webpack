(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "TL16":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Wza8");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_common_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("2alC");
/* harmony import */ var _styles_common_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_common_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("wfkH");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);

// css打包测试
 // es6扩展表达式打包测试

 // 别名测试

new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a(function (resolve) {
  __webpack_require__.e(/* require.ensure */ 4).then((function (require) {
    resolve(__webpack_require__("g1NG"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}).then(function (test) {
  // 别名测试
  dom = test();
}); // 第三方插件打包测试

 // hash缓存测试

 // 获取webpack全局变量

var env =  false ? undefined : '线上环境';
var fragment = document.createDocumentFragment(); // 当前环境

var dom = document.createElement('h5');
var text = document.createTextNode("\u5F53\u524D\u73AF\u5883\uFF1A".concat(env));
dom.appendChild(text);
fragment.appendChild(dom); // 单页

dom = document.createElement('h4');
dom.innerHTML = '单页';
fragment.appendChild(dom);
fragment.appendChild(dom); // css前缀测试

dom = document.createElement('div');
dom.setAttribute('id', 'block');
fragment.appendChild(dom); // css图片测试

dom = document.createElement('div');
dom.className = 'continue';
fragment.appendChild(dom); // es6 promise测试

new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a(function (resolve, reject) {
  // img图片测试
  dom = new Image();

  dom.onload = function () {
    fragment.appendChild(dom);
    resolve();
  };

  dom.setAttribute('src', __webpack_require__("YEQt"));
}).then(function () {
  dom = document.createElement('h5');
  dom.innerHTML = 'promise加载完成';
  fragment.appendChild(dom);
  document.querySelector("#app").appendChild(fragment);
}); // 热加载

if (false) {}

/***/ }),

/***/ "YEQt":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/2.90d3ec2.jpg";

/***/ })

},[["TL16",1,3,2]]]);
//# sourceMappingURL=index.675eee21.js.map