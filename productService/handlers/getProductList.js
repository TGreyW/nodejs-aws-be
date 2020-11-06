'use strict';

const stock = require('../stock');

module.exports = async event => {
  const data = await stock();

  return {
    statusCode: 200,
    isBase64Encoded: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  };
};
