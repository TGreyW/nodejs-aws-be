'use strict';

const path = require('path');

module.exports = {
    entry: './index.js',
    target: 'node',
    //mode: 'development',
    output: {
        path: path.resolve(__dirname),
        filename: 'handler.js',
        libraryTarget: 'commonjs2',
    },
};
