'use strict';

const mockS3 = jest.fn();
const mockGetSignedUrlPromise = jest.fn();

const importProductsFile = require('../handlers/importProductsFile');

jest.mock('aws-sdk', () => {
    return {
        S3: mockS3,
    }
});

describe('Test importProductsFile', () => {
    beforeEach(() => {
        mockS3.mockReset();
        mockGetSignedUrlPromise.mockReset();
    });

    it('No name', async () => {
        const result = await importProductsFile({});

        expect(result).toEqual({
            statusCode: 400,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: 'File name not provided',
        });
    });

    it('Wrong  name', async () => {
        const result = await importProductsFile({queryStringParameters: {name: 'test.cvs'}});

        expect(result).toEqual({
            statusCode: 400,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: 'Accept only .csv extension',
        });
    });

    it('Good  result', async () => {
        const url = 'http://aws.com/signed/url/';
        const fileName = 'test.csv';

        mockS3.mockReturnValue(({
            getSignedUrlPromise: mockGetSignedUrlPromise,
        }));
        mockGetSignedUrlPromise.mockResolvedValue(url);

        const result = await importProductsFile({queryStringParameters: {name: fileName}});

        expect(mockS3).toHaveBeenCalledWith({region: 'eu-west-1'});
        expect(mockGetSignedUrlPromise).toHaveBeenCalledWith(
            'putObject',
            {
                Bucket: 'bulka-shop-static',
                Key: 'uploaded' + '/' + fileName,
                Expires: 60,
                ContentType: 'text/csv',
            }
        );
        expect(result).toEqual({
            statusCode: 200,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: url,
        });
    });
});
