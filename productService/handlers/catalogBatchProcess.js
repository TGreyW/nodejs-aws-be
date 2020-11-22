'use strict';

const AWS = require('aws-sdk');
const { Client } = require('pg');

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 5000,
};

module.exports = async (event) => {
    const client = new Client(dbOptions);
    try {
        await client.connect();
        const sns = new AWS.SNS({
            region: 'eu-west-1',
        });
        let processed = 0;
        for (const record of event.Records) {
            try {
                const body = JSON.parse(record.body);

                await client.query('BEGIN');
                const insertResult = await client.query(`
                    INSERT INTO public.products (title, description, price)
                        VALUES ($1, $2, $3) RETURNING id;
                `, [body[0], body[1], body[2]]);
                await client.query(`
                    INSERT INTO public.stock (product_id, count)
                        VALUES ($1, $2);
                `, [insertResult.rows[0].id, body[3]]);
                await client.query('COMMIT');
                ++processed;
            } catch (e) {
                console.log('Error adding record ', e);
            }
        }

        await sns.publish({
            Subject: 'Records were imported',
            Message: processed + ' records were imported',
            TopicArn: process.env.SNS_ARN,
        }).promise();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: '',
        };
    } catch (e) {
        console.log(e);

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: '',
        };
    } finally {
        client.end();
    }
};
