'use strict';

const awsSdk = require('aws-sdk');

const DEFAULT_BUCKET_NAME = 'bulka-shop-static';
const DEFAULT_CATALOG = 'uploaded';

module.exports = async (event) => {
    try {
        const { name } = event.queryStringParameters || {};
        if (!name) {
            return {
                statusCode: 400,
                isBase64Encoded: false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: 'File name not provided',
            };
        } else if (!name.endsWith('.csv')) {
            return {
                statusCode: 400,
                isBase64Encoded: false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: 'Accept only .csv extension',
            };
        }
        const s3 = new awsSdk.S3({region: 'eu-west-1'});

        const url = await s3.getSignedUrlPromise(
            'putObject',
            {
                Bucket: DEFAULT_BUCKET_NAME,
                Key: DEFAULT_CATALOG + '/' + name,
                Expires: 60,
                ContentType: 'text/csv',
            }
        );

        return {
            statusCode: 200,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: url,
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: '',
        };
    }
};
