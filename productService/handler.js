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
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./handlers/catalogBatchProcess.js":
/*!*****************************************!*\
  !*** ./handlers/catalogBatchProcess.js ***!
  \*****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 20:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\n\r\nconst AWS = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\r\nconst { Client } = __webpack_require__(/*! pg */ \"pg\");\r\n\r\nconst { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;\r\n\r\nconst dbOptions = {\r\n    host: PG_HOST,\r\n    port: PG_PORT,\r\n    database: PG_DATABASE,\r\n    user: PG_USERNAME,\r\n    password: PG_PASSWORD,\r\n    ssl: {\r\n        rejectUnauthorized: false,\r\n    },\r\n    connectionTimeoutMillis: 5000,\r\n};\r\n\r\nmodule.exports = async (event) => {\r\n    const client = new Client(dbOptions);\r\n    try {\r\n        await client.connect();\r\n        const sns = new AWS.SNS({\r\n            region: 'eu-west-1',\r\n        });\r\n        let processed = 0;\r\n        for (const record of event.Records) {\r\n            try {\r\n                const body = JSON.parse(record.body);\r\n\r\n                await client.query('BEGIN');\r\n                const insertResult = await client.query(`\r\n                    INSERT INTO public.products (title, description, price)\r\n                        VALUES ($1, $2, $3) RETURNING id;\r\n                `, [body[0], body[1], body[2]]);\r\n                await client.query(`\r\n                    INSERT INTO public.stock (product_id, count)\r\n                        VALUES ($1, $2);\r\n                `, [insertResult.rows[0].id, body[3]]);\r\n                await client.query('COMMIT');\r\n                ++processed;\r\n            } catch (e) {\r\n                console.log('Error adding record ', e);\r\n            }\r\n        }\r\n\r\n        await sns.publish({\r\n            Subject: 'Records were imported',\r\n            Message: processed + ' records were imported',\r\n            TopicArn: process.env.SNS_ARN,\r\n        }).promise();\r\n\r\n        return {\r\n            statusCode: 200,\r\n            headers: {\r\n                'Access-Control-Allow-Origin': '*',\r\n            },\r\n            body: '',\r\n        };\r\n    } catch (e) {\r\n        console.log(e);\r\n\r\n        return {\r\n            statusCode: 500,\r\n            headers: {\r\n                'Access-Control-Allow-Origin': '*',\r\n            },\r\n            body: '',\r\n        };\r\n    } finally {\r\n        client.end();\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://productService/./handlers/catalogBatchProcess.js?");

/***/ }),

/***/ "./handlers/createProduct.js":
/*!***********************************!*\
  !*** ./handlers/createProduct.js ***!
  \***********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 19:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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

eval("\n\nconst { Client } = __webpack_require__(/*! pg */ \"pg\");\n\nconst { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;\n\nconst dbOptions = {\n    host: PG_HOST,\n    port: PG_PORT,\n    database: PG_DATABASE,\n    user: PG_USERNAME,\n    password: PG_PASSWORD,\n    ssl: {\n      rejectUnauthorized: false,\n    },\n    connectionTimeoutMillis: 5000,\n};\n\nmodule.exports = async event => {\n    const client = new Client(dbOptions);\n    try {\n        console.log(`getProductList request`);\n        await client.connect();\n\n        const result = await client.query(`\n            select * from products p \n                inner join stock s on s.product_id = p.id\n        `);\n\n        return {\n          statusCode: 200,\n          isBase64Encoded: false,\n          headers: {\n            'Access-Control-Allow-Origin': '*',\n          },\n          body: JSON.stringify(result.rows),\n        };\n    } catch (e) {\n        console.log(e);\n\n        return {\n          statusCode: 500,\n          isBase64Encoded: false,\n          headers: {\n            'Access-Control-Allow-Origin': '*',\n          },\n          body: JSON.stringify({}),\n        };\n    } finally {\n        client.end();\n    }\n};\n\n\n//# sourceURL=webpack://productService/./handlers/getProductList.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 3:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nmodule.exports = {\n    getProductList: __webpack_require__(/*! ./handlers/getProductList */ \"./handlers/getProductList.js\"),\n    getProductById: __webpack_require__(/*! ./handlers/getProductById */ \"./handlers/getProductById.js\"),\n    createProduct: __webpack_require__(/*! ./handlers/createProduct */ \"./handlers/createProduct.js\"),\n    catalogBatchProcess: __webpack_require__(/*! ../productService/handlers/catalogBatchProcess */ \"./handlers/catalogBatchProcess.js\"),\n};\n\n\n//# sourceURL=webpack://productService/./index.js?");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports = require(\"aws-sdk\");;\n\n//# sourceURL=webpack://productService/external_%22aws-sdk%22?");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

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