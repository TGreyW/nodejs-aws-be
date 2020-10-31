'use strict';

const data = require('./data');

module.exports = function () {
    return new Promise((resolve) => {
        //Emulate delayed request
        setTimeout(() => resolve(data), 1500);
    });
};
