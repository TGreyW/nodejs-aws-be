'use strict';

jest.mock('../stock');

const stock = require('../stock');
const getProductById = require('../handlers/getProductById');
const data = require('../data');

describe('Test getProductById', () => {
    beforeEach(() => {
        stock.mockReset();
    });

    it('Check no ID specified', async () => {
        const result = await getProductById({});
        expect(result).toEqual({
            statusCode: 404,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({}),
        });
    });

    it('Check too small ID', async () => {
        stock.mockResolvedValue(data);

        const result = await getProductById({'queryStringParameters': {'id': -1}});
        expect(result).toEqual({
            statusCode: 404,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({}),
        });
    });

    it('Check too high ID', async () => {
        stock.mockResolvedValue(data);

        const result = await getProductById({'queryStringParameters': {'id': 100500}});
        expect(result).toEqual({
            statusCode: 404,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({}),
        });
    });

    it('Check existed data', async () => {
        stock.mockResolvedValue(data);

        const result = await getProductById({'queryStringParameters': {'id': 4}});
        expect(result).toEqual({
            statusCode: 200,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                title: "Пирожок с тобой",
                description: "Пирожок с тобой",
                id: "4",
                price: 1000000,
                currency: "грн",
                count: 1,
            }),
        });
    });
});
