'use strict';

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './index.js',
    target: 'node',
    externals: [nodeExternals()],
    mode: 'development',
    output: {
        path: path.resolve(__dirname),
        filename: 'handler.js',
        libraryTarget: 'commonjs2',
    },
};
