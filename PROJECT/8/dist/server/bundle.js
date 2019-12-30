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

eval("var cart = {\n  change: function change(req, cart) {\n    var id = +req.params.id;\n\n    var find = this._findItem(cart, id);\n\n    find.quantity += +req.body.q;\n    return {\n      newCart: cart,\n      name: find.product_name\n    };\n  },\n  add: function add(req, cart) {\n    var item = req.body;\n    cart.contents.push(Object.assign({}, item, {\n      quantity: 1\n    }));\n    return {\n      newCart: cart,\n      name: item.product_name\n    };\n  },\n  \"delete\": function _delete(req, cart) {\n    var id = +req.params.id;\n\n    var find = this._findItem(cart, id);\n\n    cart.contents.splice(cart.contents.indexOf(find), 1);\n    return {\n      newCart: cart,\n      name: find.product_name\n    };\n  },\n  _findItem: function _findItem(cart, id) {\n    return cart.contents.find(function (elem) {\n      return elem.id_product === id;\n    });\n  }\n};\nmodule.exports = cart;\n\n//# sourceURL=webpack:///./src/server/cart.js?");

/***/ }),

/***/ "./src/server/logger.js":
/*!******************************!*\
  !*** ./src/server/logger.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar moment = __webpack_require__(/*! moment */ \"moment\");\n\nvar file = './server/db/logger.json';\n\nfunction logger(name, action) {\n  fs.readFile(file, 'utf-8', function (err, data) {\n    if (err) {\n      console.log('can not read');\n    } else {\n      var logs = JSON.parse(data);\n      logs.push({\n        time: moment().format('DD MM YYYY hh:mm:ss'),\n        product_name: name,\n        userAction: action\n      });\n      fs.writeFile(file, JSON.stringify(logs), function (err) {\n        if (err) {\n          console.log('can not write');\n        }\n      });\n    }\n  });\n}\n\nmodule.exports = logger;\n\n//# sourceURL=webpack:///./src/server/logger.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar app = express();\n\nvar cart = __webpack_require__(/*! ./cart */ \"./src/server/cart.js\");\n\nvar writer = __webpack_require__(/*! ./writer */ \"./src/server/writer.js\");\n\nvar path = './server/db/'; //app.get('/', (req, res) => res.send('Hello World!'))\n\napp.use(express.json());\napp.use('/', express[\"static\"]('public'));\napp.get('/catalog', function (req, res) {\n  fs.readFile(path + 'catalogData.json', 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0\n      }));\n    } else {\n      res.send(data);\n    }\n  });\n});\napp.get('/cart', function (req, res) {\n  fs.readFile('server/db/userCart.json', 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0\n      }));\n    } else {\n      res.send(data);\n    }\n  });\n});\napp.post('/cart', function (req, res) {\n  fs.readFile(path + 'userCart.json', 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(500, '{ \"result\": 0 }');\n    } else {\n      var _cart$add = cart.add(req, JSON.parse(data)),\n          newCart = _cart$add.newCart,\n          name = _cart$add.name;\n\n      writer(path + 'userCart.json', JSON.stringify(newCart), res, {\n        action: 'add',\n        name: name\n      });\n    }\n  });\n});\napp.put('/cart/:id', function (req, res) {\n  fs.readFile(path + 'userCart.json', 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(500, '{ \"result\": 0 }');\n    } else {\n      var _cart$change = cart.change(req, JSON.parse(data)),\n          newCart = _cart$change.newCart,\n          name = _cart$change.name;\n\n      writer(path + 'userCart.json', JSON.stringify(newCart), res, {\n        action: 'change',\n        name: name\n      });\n    }\n  });\n});\napp[\"delete\"]('/cart/:id', function (req, res) {\n  fs.readFile(path + 'userCart.json', 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(500, '{ \"result\": 0 }');\n    } else {\n      var _cart$delete = cart[\"delete\"](req, JSON.parse(data)),\n          newCart = _cart$delete.newCart,\n          name = _cart$delete.name;\n\n      writer(path + 'userCart.json', JSON.stringify(newCart), res, {\n        action: 'del',\n        name: name\n      });\n    }\n  });\n});\napp.listen(3030, function () {\n  return console.log(\"app listening on port 3030! some\");\n});\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ }),

/***/ "./src/server/writer.js":
/*!******************************!*\
  !*** ./src/server/writer.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar logger = __webpack_require__(/*! ./logger */ \"./src/server/logger.js\");\n\nfunction writeFile(file, obj, res, log) {\n  fs.writeFile(file, obj, function (err) {\n    if (err) {\n      res.sendStatus(500, '{ \"result\": 0} ');\n    } else {\n      res.send('{ \"result\": 1 }');\n      logger(log.name, log.action);\n    }\n  });\n}\n\nmodule.exports = writeFile;\n\n//# sourceURL=webpack:///./src/server/writer.js?");

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

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ })

/******/ });