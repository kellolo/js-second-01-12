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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/cart.js":
/*!****************************!*\
  !*** ./src/server/cart.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var cart = {\n  addToCart: function addToCart(arr, obj) {\n    var mas = JSON.parse(arr).contents;\n    mas.push(obj);\n    return {\n      valueForFileCart: this._sumAndQuantity(mas),\n      valueForFileStats: {\n        data: new Date(),\n        name: obj.name,\n        action: 'добавлен в корзину'\n      }\n    };\n  },\n  delAllCart: function delAllCart() {\n    return {\n      valueForFileCart: JSON.stringify({\n        amount: 0,\n        countGoods: 0,\n        contents: []\n      }),\n      valueForFileStats: {\n        data: new Date(),\n        action: 'Полная очитска корзины'\n      }\n    };\n  },\n  dellInCart: function dellInCart(arr, id) {\n    var mas = JSON.parse(arr).contents;\n    var item = mas.find(function (item) {\n      return item.id == id;\n    });\n    mas.splice(mas.findIndex(function (item) {\n      return item.id == id;\n    }), 1);\n    return {\n      valueForFileCart: this._sumAndQuantity(mas),\n      valueForFileStats: {\n        data: new Date(),\n        name: item.name,\n        action: 'удален из корзины'\n      }\n    };\n  },\n  chengeQuantity: function chengeQuantity(arr, id, q) {\n    var mas = JSON.parse(arr).contents;\n    var find = mas.find(function (item) {\n      return item.id == id.id;\n    });\n    find.quantity = +find.quantity + +q.quantity;\n    var action;\n    +q.quantity < 0 ? action = 'количество уменьшино на 1' : action = 'количество увеличено на 1';\n    return {\n      valueForFileCart: this._sumAndQuantity(mas),\n      valueForFileStats: {\n        data: new Date(),\n        name: find.name,\n        action: action\n      }\n    };\n  },\n  _sumAndQuantity: function _sumAndQuantity(arr) {\n    var sum = 0;\n    var quant = 0;\n    arr.forEach(function (element) {\n      sum += +element.quantity * element.price;\n      quant += +element.quantity;\n    });\n    return JSON.stringify({\n      amount: sum,\n      countGoods: quant,\n      contents: arr\n    });\n  }\n};\nmodule.exports = cart;\n\n//# sourceURL=webpack:///./src/server/cart.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar app = express();\n\nvar cart = __webpack_require__(/*! ./cart */ \"./src/server/cart.js\");\n\nvar workFile = __webpack_require__(/*! ./workWithFiles */ \"./src/server/workWithFiles.js\");\n\nvar LINKBACK = {\n  cart: './buildProject/backEndDir/db/getBasket.json',\n  stats: './buildProject/backEndDir/db/stats.json',\n  catalog: './buildProject/backEndDir/db/catalogData.json',\n  addCart: './buildProject/backEndDir/db/addToBasket.json',\n  dellCart: './buildProject/backEndDir/db/deleteFromBasket.json'\n};\nvar LINKFRONT = {\n  cart: '/cart',\n  stats: '/stats',\n  catalog: '/catalogData.json',\n  addCart: '/addToBasket',\n  dellCart: '/deleteFromBasket'\n}; // слушаем порт 3040\n\napp.listen(3040, function () {\n  console.log('Example app listening on port 3040!');\n}); //  отображаем наш проект\n\napp.use('/', express[\"static\"]('buildProject/frontDir')); // закидываем данные в req.body\n\napp.use(bodyParser.json()); // обработка запроса к catalog\n\napp.get(LINKFRONT.catalog, function (req, res) {\n  workFile.getRespons(LINKBACK.catalog, res); // отправляем ответ\n}); // обработка запроса к cart\n\napp.get(LINKFRONT.cart, function (req, res) {\n  workFile.getRespons(LINKBACK.cart, res); // отправляем ответ\n}); // перезаписываем json файл корзины при добавлении товара в корзину \n\napp.post(LINKFRONT.addCart, function (req, res) {\n  fs.readFile(LINKBACK.cart, 'utf-8', function (err, data) {\n    if (err) {\n      console.log(\"\\u0424\\u0430\\u0438\\u043B \".concat(LINKBACK.cart, \" \\u043D\\u0435\\u043D\\u0430\\u0439\\u0434\\u0435\\u043D!\"));\n    } else {\n      var value = cart.addToCart(data, req.body);\n      workFile.write(LINKBACK.cart, LINKBACK.stats, value.valueForFileCart, value.valueForFileStats, res);\n    }\n  });\n}); // обрботка запроса на увеличение количества товра в корзине\n\napp.put(LINKFRONT.addCart + '/:id', function (req, res) {\n  fs.readFile(LINKBACK.cart, 'utf-8', function (err, data) {\n    if (err) {\n      console.log(\"\\u0424\\u0430\\u0438\\u043B \".concat(LINKBACK.cart, \" \\u043D\\u0435\\u043D\\u0430\\u0439\\u0434\\u0435\\u043D!\"));\n    } else {\n      var value = cart.chengeQuantity(data, req.params, req.body);\n      workFile.write(LINKBACK.cart, LINKBACK.stats, value.valueForFileCart, value.valueForFileStats, res);\n    }\n  });\n}); // перезаписываем json файл корзины при удалении товара в корзину \n\napp.put(LINKFRONT.dellCart + '/:id', function (req, res) {\n  fs.readFile(LINKBACK.cart, 'utf-8', function (err, data) {\n    if (err) {\n      console.log(\"\\u0424\\u0430\\u0438\\u043B \".concat(LINKBACK.cart, \" \\u043D\\u0435\\u043D\\u0430\\u0439\\u0434\\u0435\\u043D!\"));\n    } else {\n      var value = cart.chengeQuantity(data, req.params, req.body);\n      workFile.write(LINKBACK.cart, LINKBACK.stats, value.valueForFileCart, value.valueForFileStats, res);\n    }\n  });\n}); // обрабатываем запрос на полную очистку карзины и удаление элемента из корзины\n\napp[\"delete\"](LINKFRONT.dellCart, function (req, res) {\n  fs.readFile(LINKBACK.cart, 'utf-8', function (err, data) {\n    if (err) {\n      console.log('err');\n    } else {\n      if (req.body.allQuntity == 0) {\n        var value = cart.delAllCart();\n        workFile.write(LINKBACK.cart, LINKBACK.stats, value.valueForFileCart, value.valueForFileStats, res);\n      } else {\n        var _value = cart.dellInCart(data, req.body.id);\n\n        workFile.write(LINKBACK.cart, LINKBACK.stats, _value.valueForFileCart, _value.valueForFileStats, res);\n      }\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ }),

/***/ "./src/server/workWithFiles.js":
/*!*************************************!*\
  !*** ./src/server/workWithFiles.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var workFile = {\n  fs: __webpack_require__(/*! fs */ \"fs\"),\n  cart: __webpack_require__(/*! ./cart */ \"./src/server/cart.js\"),\n  getRespons: function getRespons(fileName, res) {\n    this.fs.readFile(fileName, 'utf-8', function (err, data) {\n      if (err) {\n        console.log('err');\n      } else {\n        res.send(data);\n        console.log('Ответ ушел!');\n      }\n    });\n  },\n  anyRespons: function anyRespons(res) {\n    res.send({\n      \"result\": 1\n    });\n  },\n  write: function write(linkFile, linkStats, data, action, res) {\n    var cont = this;\n    this.fs.writeFile(linkFile, data, function (err) {\n      if (err) {\n        console.log(err);\n      } else {\n        console.log(\"\\u0424\\u0430\\u0439\\u043B \".concat(linkFile, \" \\u043F\\u0435\\u0440\\u0435\\u0437\\u0430\\u043F\\u0438\\u0441\\u0430\\u043D!\"));\n        cont.statsFile(linkStats, action, res);\n      }\n    });\n  },\n  statsFile: function statsFile(linkStats, action, res) {\n    var _this = this;\n\n    console.log(action);\n    var cont = this;\n    this.fs.readFile(linkStats, 'utf-8', function (err, data) {\n      if (err) {\n        console.log(\"\\u0424\\u0430\\u0439\\u043B \".concat(linkStats, \" \\u043D\\u0435 \\u043D\\u0430\\u0439\\u0434\\u0435\\u043D!\"));\n      } else {\n        var arr = JSON.parse(data);\n        arr.push(action);\n\n        _this.fs.writeFile(linkStats, JSON.stringify(arr), function (err) {\n          if (err) {\n            console.log(err);\n          } else {\n            cont.anyRespons(res);\n            console.log(\"\\u0424\\u0430\\u0439\\u043B \".concat(linkStats, \" \\u043F\\u0435\\u0440\\u0435\\u0437\\u0430\\u043F\\u0438\\u0441\\u0430\\u043D!\"));\n          }\n        });\n      }\n    });\n  }\n};\nmodule.exports = workFile;\n\n//# sourceURL=webpack:///./src/server/workWithFiles.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ })

/******/ });