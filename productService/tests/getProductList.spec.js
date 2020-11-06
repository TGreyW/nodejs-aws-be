'use strict';

jest.mock('../stock');

const stock = require('../stock');
const getProductList = require('../handlers/getProductList');
const data = require('../data');

describe('Test getProductList', () => {
    beforeEach(() => {
        stock.mockReset();
    });

    it('Check return props', async () => {
        stock.mockResolvedValue(data);

        const result = await getProductList();
        expect(result).toEqual({
            statusCode: 200,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data),
        });
    });
});
