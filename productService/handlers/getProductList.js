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
        console.log(`getProductList request`);
        await client.connect();

        const result = await client.query(`
            select * from products p 
                inner join stock s on s.product_id = p.id
        `);

        return {
          statusCode: 200,
          isBase64Encoded: false,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(result.rows),
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
