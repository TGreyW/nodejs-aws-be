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
    if (!event) {
        event = {};
    }

    const client = new Client(dbOptions);
    try {
        await client.connect();

        const { id } = event.queryStringParameters || '';
        console.log(`getProductById request: id ${id}`);
        const result = await client.query(
            `
                select * from products p 
                  inner join stock s on s.product_id = p.id
                where p.id = $1::uuid
            `,
            [id],
        );

        if (result && result.rowCount > 0) {
            return {
                statusCode: 200,
                isBase64Encoded: false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(result.rows[0]),
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
    } catch (e) {
        console.log(e);

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
