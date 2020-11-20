'use strict';

const mockS3 = jest.fn();
jest.mock('aws-sdk', () => {
    return {
        S3: mockS3,
    }
});

const importFileParser = require('../handlers/importFileParser');
const { Readable } = require('stream');

describe('Test importFileParser', () => {
    beforeEach(() => {
        mockS3.mockReset();
    });

    it('s3 exception', async () => {
        mockS3.mockImplementation(() => { throw new Error(); });
        const result = await importFileParser({});

        expect(result).toEqual({
            statusCode: 500,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: '',
        });
    });

    it('Process Records', async () => {
        const streamData = ['Some title|Some descr|10|10', '\n', 'Some title|Some descr|10|10'];
        const csvReadableStream = Readable.from(streamData);

        const getObjectMock = jest.fn().mockReturnValue({
            createReadStream: jest.fn().mockReturnValue(csvReadableStream),
        });
        const copyObjectMock = jest.fn().mockReturnValue({
            promise: jest.fn().mockResolvedValue({}),
        });
        const deleteObjectMock = jest.fn().mockReturnValue({
            promise: jest.fn().mockResolvedValue({}),
        });
        mockS3.mockReturnValue({
            getObject: getObjectMock,
            copyObject: copyObjectMock,
            deleteObject: deleteObjectMock,
        });

        const result = await importFileParser({
            Records: [
                {
                    s3: {
                        object: {
                            key: 'uploaded/test.csv',
                        },
                    },
                },
            ],
        });

        expect(getObjectMock).toHaveBeenCalledWith({
            Bucket: 'bulka-shop-static',
            Key: 'uploaded/test.csv'
        });
        expect(copyObjectMock).toHaveBeenCalledWith({
            Bucket: 'bulka-shop-static',
            CopySource: 'bulka-shop-static/uploaded/test.csv',
            Key: 'parsed/test.csv',
        });
        expect(deleteObjectMock).toHaveBeenCalledWith({
            Bucket: 'bulka-shop-static',
            Key: 'uploaded/test.csv',
        });
        expect(result).toEqual({
            statusCode: 200,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: 'File was successfully parsed',
        });
    });
});
