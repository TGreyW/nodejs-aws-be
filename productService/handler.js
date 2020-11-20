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
eval("\n\nconst { Client } = __webpack_require__(/*! pg */ \"pg\");\n\nconst { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;\n\nconst dbOptions = {\n    host: PG_HOST,\n    port: PG_PORT,\n    database: PG_DATABASE,\n    user: PG_USERNAME,\n    password: PG_PASSWORD,\n    ssl: {\n        rejectUnauthorized: false,\n    },\n    connectionTimeoutMillis: 5000,\n};\n\nmodule.exports = async event => {\n    const client = new Client(dbOptions);\n    try {\n        console.log(`createProduct request`);\n        const body = JSON.parse(event.body || '{}');\n        if (!Object.keys(body).length) {\n            return {\n                statusCode: 400,\n                isBase64Encoded: false,\n                headers: {\n                    'Access-Control-Allow-Origin': '*',\n                },\n                body: JSON.stringify({}),\n            };\n        }\n\n        await client.connect();\n        await client.query('BEGIN');\n        const insertResult = await client.query(`\n            INSERT INTO public.products (title,description,price)\n                VALUES ($1, $2, $3) RETURNING id;\n        `, [body.title, body.description, body.price]);\n        await client.query(`\n            INSERT INTO public.stock (product_id, count)\n                VALUES ($1, $2);\n        `, [insertResult.rows[0].id, body.count]);\n        await client.query('COMMIT');\n        return {\n            statusCode: 201,\n            isBase64Encoded: false,\n            headers: {\n                'Access-Control-Allow-Origin': '*',\n            },\n            body: JSON.stringify({}),\n        };\n    } catch (e) {\n        console.log(e);\n        await client.query('ROLLBACK');\n\n        return {\n            statusCode: 500,\n            isBase64Encoded: false,\n            headers: {\n                'Access-Control-Allow-Origin': '*',\n            },\n            body: JSON.stringify({}),\n        };\n    } finally {\n        client.end();\n    }\n};\n\n\n//# sourceURL=webpack://productService/./handlers/createProduct.js?");

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
eval("\n\nconst { Client } = __webpack_require__(/*! pg */ \"pg\");\n\nconst { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;\n\nconst dbOptions = {\n    host: PG_HOST,\n    port: PG_PORT,\n    database: PG_DATABASE,\n    user: PG_USERNAME,\n    password: PG_PASSWORD,\n    ssl: {\n        rejectUnauthorized: false,\n    },\n    connectionTimeoutMillis: 5000,\n};\n\nmodule.exports = async event => {\n    if (!event) {\n        event = {};\n    }\n\n    const client = new Client(dbOptions);\n    try {\n        await client.connect();\n\n        const { id } = event.queryStringParameters || '';\n        console.log(`getProductById request: id ${id}`);\n        const result = await client.query(\n            `\n                select * from products p \n                  inner join stock s on s.product_id = p.id\n                where p.id = $1::uuid\n            `,\n            [id],\n        );\n\n        if (result && result.rowCount > 0) {\n            return {\n                statusCode: 200,\n                isBase64Encoded: false,\n                headers: {\n                    'Access-Control-Allow-Origin': '*',\n                },\n                body: JSON.stringify(result.rows[0]),\n            };\n        }\n\n        return {\n            statusCode: 404,\n            isBase64Encoded: false,\n            headers: {\n                'Access-Control-Allow-Origin': '*',\n            },\n            body: JSON.stringify({}),\n        };\n    } catch (e) {\n        console.log(e);\n\n        return {\n            statusCode: 500,\n            isBase64Encoded: false,\n            headers: {\n                'Access-Control-Allow-Origin': '*',\n            },\n            body: JSON.stringify({}),\n        };\n    } finally {\n        client.end();\n    }\n};\n\n\n//# sourceURL=webpack://productService/./handlers/getProductById.js?");

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

eval("module.exports.getProductList = __webpack_require__(/*! ./handlers/getProductList */ \"./handlers/getProductList.js\");\nmodule.exports.getProductById = __webpack_require__(/*! ./handlers/getProductById */ \"./handlers/getProductById.js\");\nmodule.exports.createProduct = __webpack_require__(/*! ./handlers/createProduct */ \"./handlers/createProduct.js\");\n\n\n//# sourceURL=webpack://productService/./index.js?");

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