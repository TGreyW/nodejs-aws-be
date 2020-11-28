'use strict';

const AWS = require('aws-sdk');
const csv = require('csv-parse');

const DEFAULT_BUCKET_NAME = 'bulka-shop-static';

async function parseFile(s3, sqs, fileName) {
    let limit = 15; //prevent flood

    return new Promise((resolve, reject) => {
        s3.getObject({
            Bucket: DEFAULT_BUCKET_NAME,
            Key: fileName
        }).createReadStream()
            .pipe(csv({delimiter: '|'}))
            .on('error', reject)
            .on('data', async chunk => {
                if (--limit < 0) {
                    return;
                }
                console.log(chunk);
                await sqs.sendMessage({
                    QueueUrl: process.env.SQS_URL,
                    MessageBody: JSON.stringify(chunk),
                }).promise();
            })
            .on('end', resolve);
    });
}

module.exports = async (event) => {
    try {
        const s3 = new AWS.S3({region: 'eu-west-1'});
        const sqs = new AWS.SQS();

        for (const record of event.Records) {
            await parseFile(s3, sqs, record.s3.object.key);

            await s3.copyObject({
                Bucket: DEFAULT_BUCKET_NAME,
                CopySource: DEFAULT_BUCKET_NAME + '/' + record.s3.object.key,
                Key: record.s3.object.key.replace('uploaded', 'parsed'),
            }).promise();

            await s3.deleteObject({
                Bucket: DEFAULT_BUCKET_NAME,
                Key: record.s3.object.key,
            }).promise();

            console.log('File was successfully parsed');

            return {
                statusCode: 200,
                isBase64Encoded: false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: 'File was successfully parsed',
            };
        }
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
