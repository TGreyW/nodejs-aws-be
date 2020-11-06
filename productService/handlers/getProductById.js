'use strict';

const stock = require('../stock');

module.exports = async event => {
    if (!event) {
        event = {};
    }
    const { id } = event.queryStringParameters || -1;
    const data = await stock();

    if (id >= 0 && data[id]) {
        return {
            statusCode: 200,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data[id]),
        };
    }

    return {
        statusCode: 404,
        isBase64Encoded: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({}),
    };
};
