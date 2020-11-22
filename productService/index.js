'use strict';

module.exports = {
    getProductList: require('./handlers/getProductList'),
    getProductById: require('./handlers/getProductById'),
    createProduct: require('./handlers/createProduct'),
    catalogBatchProcess: require('../productService/handlers/catalogBatchProcess'),
};
