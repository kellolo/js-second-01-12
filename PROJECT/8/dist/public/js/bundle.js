/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _public_js_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public/js/main */ \"./src/public/js/main.js\");\n/* harmony import */ var _public_style_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./public/style/style.css */ \"./src/public/style/style.css\");\n/* harmony import */ var _public_style_style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_public_style_style_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _public_style_normalize_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./public/style/normalize.css */ \"./src/public/style/normalize.css\");\n/* harmony import */ var _public_style_normalize_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_public_style_normalize_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar app = new Vue(_public_js_main__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/public/js/cart-item.js":
/*!************************************!*\
  !*** ./src/public/js/cart-item.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  template: \"\\n    <div class=\\\"cart-item\\\">\\n        <div class=\\\"product-bio\\\">\\n            <img :src=\\\"image\\\" alt=\\\"Some image\\\">\\n            <div class=\\\"product-desc\\\">\\n                <p class=\\\"product-title\\\">{{ item.product_name }}</p>\\n                <p class=\\\"product-quantity\\\">Quantity: {{ item.quantity }}</p>\\n                <p class=\\\"product-single-price\\\">$ {{item.price}} each</p>\\n            </div>\\n        </div>\\n        <div class=\\\"right-block\\\">\\n            <p class=\\\"product-price\\\">$ {{ item.quantity * item.price }}</p>\\n            <button class=\\\"del-btn\\\" @click=\\\"$parent.delProduct (item)\\\">&times;</button>\\n        </div>\\n    </div>\\n    \",\n  props: {\n    image: {\n      type: String,\n      \"default\": function _default() {\n        return 'https://placehold.it/100x80';\n      }\n    },\n    item: {\n      type: Object,\n      \"default\": function _default() {\n        return {};\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/public/js/cart-item.js?");

/***/ }),

/***/ "./src/public/js/cart.js":
/*!*******************************!*\
  !*** ./src/public/js/cart.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cart_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart-item */ \"./src/public/js/cart-item.js\");\n\nvar cart = {\n  components: {\n    item: _cart_item__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  template: \"\\n    <div>\\n        <button class=\\\"btn-cart\\\" type=\\\"button\\\" @click=\\\"cartShown = !cartShown\\\">\\u041A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0430</button>\\n        <div class=\\\"cart-block\\\" v-show=\\\"cartShown\\\">\\n            <p>\\u0412\\u0441\\u0435\\u0433\\u043E \\u0442\\u043E\\u0432\\u0430\\u0440\\u043E\\u0432: {{ getSum.qua }} </p>\\n            <item v-for=\\\"prod of items\\\" :key=\\\"prod.id_product\\\" :item=\\\"prod\\\"></item>\\n            <p>\\u041E\\u0431\\u0449\\u0430\\u044F \\u0441\\u0442-\\u0442\\u044C: $ {{ getSum.sum }} </p>\\n        </div>\\n    </div>\\n    \",\n  data: function data() {\n    return {\n      items: [],\n      cartShown: false,\n      url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',\n      addUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',\n      delUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json'\n    };\n  },\n  methods: {\n    addProduct: function addProduct(pr) {\n      var _this = this;\n\n      var find = this.items.find(function (item) {\n        return item.id_product === pr.id_product;\n      });\n\n      if (find) {\n        this.$parent.putJson('/cart/' + pr.id_product, {\n          q: 1\n        }).then(function (d) {\n          d.result ? find.quantity++ : console.log('error');\n        });\n      } else {\n        var p = Object.assign({}, pr, {\n          quantity: 1\n        });\n        this.$parent.postJson('/cart', p).then(function (d) {\n          d.result ? _this.items.push(p) : console.log('error');\n        });\n      }\n    },\n    delProduct: function delProduct(pr) {\n      var _this2 = this;\n\n      var find = this.items.find(function (item) {\n        return item.id_product === pr.id_product;\n      });\n\n      if (find.quantity > 1) {\n        this.$parent.putJson('/cart/' + pr.id_product, {\n          q: -1\n        }).then(function (d) {\n          d.result ? find.quantity-- : console.log('error');\n        });\n      } else {\n        this.$parent.deleteJson('/cart/' + pr.id_product).then(function (d) {\n          d.result ? _this2.items.splice(_this2.items.indexOf(pr), 1) : console.log('error');\n        });\n      }\n    }\n  },\n  mounted: function mounted() {\n    var _this3 = this;\n\n    this.$parent.getJson('/cart').then(function (data) {\n      _this3.items = data.contents;\n    });\n  },\n  computed: {\n    getSum: function getSum() {\n      var sum = 0;\n      var qua = 0;\n      this.items.forEach(function (el) {\n        sum += el.price * el.quantity;\n        qua += el.quantity;\n      });\n      return {\n        sum: sum,\n        qua: qua\n      };\n    }\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (cart);\n\n//# sourceURL=webpack:///./src/public/js/cart.js?");

/***/ }),

/***/ "./src/public/js/catalog-item.js":
/*!***************************************!*\
  !*** ./src/public/js/catalog-item.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  template: \"\\n    <div class=\\\"product-item\\\">\\n        <img :src=\\\"image\\\" alt=\\\"Some img\\\">\\n        <div class=\\\"desc\\\">\\n            <h3>{{ item.product_name }}</h3>\\n            <p>{{ item.price }} $</p>\\n            <button class=\\\"buy-btn\\\" @click=\\\"$root.$refs.cart.addProduct (item)\\\">\\u041A\\u0443\\u043F\\u0438\\u0442\\u044C</button>\\n        </div>\\n    </div>\\n    \",\n  props: {\n    image: {\n      type: String,\n      \"default\": function _default() {\n        return 'https://placehold.it/200x150';\n      }\n    },\n    item: {\n      type: Object,\n      \"default\": function _default() {\n        return {};\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/public/js/catalog-item.js?");

/***/ }),

/***/ "./src/public/js/catalog.js":
/*!**********************************!*\
  !*** ./src/public/js/catalog.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _catalog_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./catalog-item */ \"./src/public/js/catalog-item.js\");\n\nvar catalog = {\n  components: {\n    item: _catalog_item__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  template: \"\\n    <div class=\\\"products\\\">\\n        <item v-for=\\\"prod of filtered\\\" :key=\\\"prod.id_product\\\" :item=\\\"prod\\\"></item>\\n    </div>\\n    \",\n  data: function data() {\n    return {\n      //url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',\n      url: '/catalog',\n      items: [],\n      filtered: []\n    };\n  },\n  methods: {\n    filter: function filter(searchString) {\n      var _this = this;\n\n      var reg = new RegExp(searchString, 'i'); // this.filtered = this.items.filter (item => reg.test(item.product_name))\n\n      this.filtered = [];\n      this.items.forEach(function (element) {\n        if (reg.test(element.product_name)) {\n          _this.filtered.push(element);\n        }\n      });\n    }\n  },\n  mounted: function mounted() {\n    var _this2 = this;\n\n    this.$parent.getJson(this.url).then(function (data) {\n      _this2.items = data;\n      _this2.filtered = data;\n    });\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (catalog);\n\n//# sourceURL=webpack:///./src/public/js/catalog.js?");

/***/ }),

/***/ "./src/public/js/filter-comp.js":
/*!**************************************!*\
  !*** ./src/public/js/filter-comp.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  template: \"\\n    <form action=\\\"#\\\" class=\\\"search-form\\\" @submit.prevent=\\\"$root.$refs.catalog.filter (str)\\\">\\n        <input type=\\\"text\\\" class=\\\"search-field\\\" v-model=\\\"str\\\">\\n        <button class=\\\"btn-search\\\" type=\\\"submit\\\">\\n            <i class=\\\"fas fa-search\\\"></i>\\n        </button>\\n    </form>\\n    \",\n  data: function data() {\n    return {\n      str: ''\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/public/js/filter-comp.js?");

/***/ }),

/***/ "./src/public/js/main.js":
/*!*******************************!*\
  !*** ./src/public/js/main.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart */ \"./src/public/js/cart.js\");\n/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ \"./src/public/js/catalog.js\");\n/* harmony import */ var _filter_comp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filter-comp */ \"./src/public/js/filter-comp.js\");\n\n\n\nvar app = {\n  el: '#app',\n  components: {\n    cart: _cart__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    catalog: _catalog__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    filtercomp: _filter_comp__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  },\n  methods: {\n    getJson: function getJson(url) {\n      return fetch(url).then(function (d) {\n        return d.json();\n      });\n    },\n    postJson: function postJson(url, data) {\n      return fetch(url, {\n        method: 'POST',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(function (d) {\n        return d.json();\n      });\n    },\n    putJson: function putJson(url, data) {\n      return fetch(url, {\n        method: 'PUT',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(function (d) {\n        return d.json();\n      });\n    },\n    deleteJson: function deleteJson(url) {\n      return fetch(url, {\n        method: 'DELETE',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        }\n      }).then(function (d) {\n        return d.json();\n      });\n    }\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/public/js/main.js?");

/***/ }),

/***/ "./src/public/style/normalize.css":
/*!****************************************!*\
  !*** ./src/public/style/normalize.css ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/public/style/normalize.css?");

/***/ }),

/***/ "./src/public/style/style.css":
/*!************************************!*\
  !*** ./src/public/style/style.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/public/style/style.css?");

/***/ })

/******/ });