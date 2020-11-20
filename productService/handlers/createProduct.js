'use strict';

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

module.exports = async event => {
    const client = new Client(dbOptions);
    try {
        console.log(`createProduct request`);
        const body = JSON.parse(event.body || '{}');
        if (!Object.keys(body).length) {
            return {
                statusCode: 400,
                isBase64Encoded: false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({}),
            };
        }

        await client.connect();
        await client.query('BEGIN');
        const insertResult = await client.query(`
            INSERT INTO public.products (title,description,price)
                VALUES ($1, $2, $3) RETURNING id;
        `, [body.title, body.description, body.price]);
        await client.query(`
            INSERT INTO public.stock (product_id, count)
                VALUES ($1, $2);
        `, [insertResult.rows[0].id, body.count]);
        await client.query('COMMIT');
        return {
            statusCode: 201,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({}),
        };
    } catch (e) {
        console.log(e);
        await client.query('ROLLBACK');

        return {
            statusCode: 500,
            isBase64Encoded: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({}),
        };
    } finally {
        client.end();
    }
};
