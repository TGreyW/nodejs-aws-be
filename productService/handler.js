/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./handlers/createProduct.js":
/*!***********************************!*\
  !*** ./handlers/createProduct.js ***!
  \***********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 19:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nconst { Client } = __webpack_require__(/*! pg */ \"pg\");\r\n\r\nconst { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;\r\n\r\nconst dbOptions = {\r\n    host: PG_HOST,\r\n    port: PG_PORT,\r\n    database: PG_DATABASE,\r\n    user: PG_USERNAME,\r\n    password: PG_PASSWORD,\r\n    ssl: {\r\n        rejectUnauthorized: false,\r\n    },\r\n    connectionTimeoutMillis: 5000,\r\n};\r\n\r\nmodule.exports = async event => {\r\n    const client = new Client(dbOptions);\r\n    try {\r\n        console.log(`createProduct request`);\r\n        const body = JSON.parse(event.body || '{}');\r\n        if (!Object.keys(body).length) {\r\n            return {\r\n                statusCode: 400,\r\n                isBase64Encoded: false,\r\n                headers: {\r\n                    'Access-Control-Allow-Origin': '*',\r\n                },\r\n                body: JSON.stringify({}),\r\n            };\r\n        }\r\n\r\n        await client.connect();\r\n        await client.query('BEGIN');\r\n        await client.query(`\r\n            INSERT INTO public.products (id,title,description,price)\r\n                VALUES ($1, $2, $3, $4);\r\n        `, [body.id, body.title, body.description, body.price]);\r\n        await client.query(`\r\n            INSERT INTO public.stock (product_id, count)\r\n                VALUES ($1, $2);\r\n        `, [body.id, body.count]);\r\n        await client.query('COMMIT');\r\n        return {\r\n            statusCode: 201,\r\n            isBase64Encoded: false,\r\n            headers: {\r\n                'Access-Control-Allow-Origin': '*',\r\n            },\r\n            body: JSON.stringify({}),\r\n        };\r\n    } catch (e) {\r\n        console.log(e);\r\n        await client.query('ROLLBACK');\r\n\r\n        return {\r\n            statusCode: 500,\r\n            isBase64Encoded: false,\r\n            headers: {\r\n                'Access-Control-Allow-Origin': '*',\r\n            },\r\n            body: JSON.stringify({}),\r\n        };\r\n    } finally {\r\n        client.end();\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://productService/./handlers/createProduct.js?");

/***/ }),

/***/ "./handlers/getProductById.js":
/*!************************************!*\
  !*** ./handlers/getProductById.js ***!
  \************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 19:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nconst { Client } = __webpack_require__(/*! pg */ \"pg\");\r\n\r\nconst { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;\r\n\r\nconst dbOptions = {\r\n    host: PG_HOST,\r\n    port: PG_PORT,\r\n    database: PG_DATABASE,\r\n    user: PG_USERNAME,\r\n    password: PG_PASSWORD,\r\n    ssl: {\r\n        rejectUnauthorized: false,\r\n    },\r\n    connectionTimeoutMillis: 5000,\r\n};\r\n\r\nmodule.exports = async event => {\r\n    if (!event) {\r\n        event = {};\r\n    }\r\n\r\n    const client = new Client(dbOptions);\r\n    try {\r\n        await client.connect();\r\n\r\n        const { id } = event.queryStringParameters || '';\r\n        console.log(`getProductById request: id ${id}`);\r\n        const result = await client.query(\r\n            `\r\n                select * from products p \r\n                  inner join stock s on s.product_id = p.id\r\n                where p.id = $1::uuid\r\n            `,\r\n            [id],\r\n        );\r\n\r\n        if (result && result.rowCount > 0) {\r\n            return {\r\n                statusCode: 200,\r\n                isBase64Encoded: false,\r\n                headers: {\r\n                    'Access-Control-Allow-Origin': '*',\r\n                },\r\n                body: JSON.stringify(result.rows[0]),\r\n            };\r\n        }\r\n\r\n        return {\r\n            statusCode: 404,\r\n            isBase64Encoded: false,\r\n            headers: {\r\n                'Access-Control-Allow-Origin': '*',\r\n            },\r\n            body: JSON.stringify({}),\r\n        };\r\n    } catch (e) {\r\n        console.log(e);\r\n\r\n        return {\r\n            statusCode: 500,\r\n            isBase64Encoded: false,\r\n            headers: {\r\n                'Access-Control-Allow-Origin': '*',\r\n            },\r\n            body: JSON.stringify({}),\r\n        };\r\n    } finally {\r\n        client.end();\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://productService/./handlers/getProductById.js?");

/***/ }),

/***/ "./handlers/getProductList.js":
/*!************************************!*\
  !*** ./handlers/getProductList.js ***!
  \************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 19:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nconst { Client } = __webpack_require__(/*! pg */ \"pg\");\n\nconst { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;\n\nconst dbOptions = {\n    host: PG_HOST,\n    port: PG_PORT,\n    database: PG_DATABASE,\n    user: PG_USERNAME,\n    password: PG_PASSWORD,\n    ssl: {\n      rejectUnauthorized: false,\n    },\n    connectionTimeoutMillis: 5000,\n};\n\nmodule.exports = async event => {\n    const client = new Client(dbOptions);\n    try {\n        console.log(`getProductList request`);\n        await client.connect();\n\n        const result = await client.query(`\n            select * from products p \n                inner join stock s on s.product_id = p.id\n        `);\n\n        return {\n          statusCode: 200,\n          isBase64Encoded: false,\n          headers: {\n            'Access-Control-Allow-Origin': '*',\n          },\n          body: JSON.stringify(result.rows),\n        };\n    } catch (e) {\n        console.log(e);\n\n        return {\n          statusCode: 500,\n          isBase64Encoded: false,\n          headers: {\n            'Access-Control-Allow-Origin': '*',\n          },\n          body: JSON.stringify({}),\n        };\n    } finally {\n        client.end();\n    }\n};\n\n\n//# sourceURL=webpack://productService/./handlers/getProductList.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! default exports */
/*! export createProduct [provided] [maybe used in main (runtime-defined)] [usage and provision prevents renaming] -> ./handlers/createProduct.js */
/*!   exports [maybe provided (runtime-defined)] [no usage info] */
/*! export getProductById [provided] [maybe used in main (runtime-defined)] [usage and provision prevents renaming] -> ./handlers/getProductById.js */
/*!   exports [maybe provided (runtime-defined)] [no usage info] */
/*! export getProductList [provided] [maybe used in main (runtime-defined)] [usage and provision prevents renaming] -> ./handlers/getProductList.js */
/*!   exports [maybe provided (runtime-defined)] [no usage info] */
/*! other exports [not provided] [maybe used in main (runtime-defined)] */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports.getProductList = __webpack_require__(/*! ./handlers/getProductList */ \"./handlers/getProductList.js\");\r\nmodule.exports.getProductById = __webpack_require__(/*! ./handlers/getProductById */ \"./handlers/getProductById.js\");\r\nmodule.exports.createProduct = __webpack_require__(/*! ./handlers/createProduct */ \"./handlers/createProduct.js\");\r\n\n\n//# sourceURL=webpack://productService/./index.js?");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"pg\");;\n\n//# sourceURL=webpack://productService/external_%22pg%22?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./index.js");
/******/ })()
;