'use strict';

const express = require('express');
const axios = require('axios');
const NodeCache = require( "node-cache" );

const app = express();
const port = process.env.PORT || 3000;
const date = new Date();
const cache = new NodeCache( { stdTTL: 60, checkperiod: 120 } );

console.log(`TRY TO START ${port} ${date.toUTCString()}`);

app.use(express.json());

process.env['product'] = 'https://9aj51mlxlc.execute-api.eu-west-1.amazonaws.com/dev';

app.all('/*', (req, res) => {
    console.log(`${req.originalUrl}, ${req.method}, ${JSON.stringify(req.body)}`);
    const urlParts = req.originalUrl.split('/').filter(path => (path ? true : false));
    console.log(urlParts);
    if (urlParts.length < 1) {
        console.log('Incorrect url');
        return;
    }

    const recipientUrl = process.env[urlParts[0]];
    if (!recipientUrl) {
        console.log(`Recipient url not found for recipient: ${urlParts[0]}`);
        return;
    }

    const url = recipientUrl + '/' + (urlParts.slice(1).join('/'));
    const config = {
        method: req.method,
        url: url,
        ...(Object.keys(req.body || {}).length > 0 && {data: req.body}),
    };
    console.log('Config ', config);

    const cachedResponse = cache.get(url);
    if (cachedResponse) {
        console.log('Response from cache');
        res.json(cachedResponse);
    } else {
        console.log('No cached response found, make request');
        axios(config)
            .then(response => {
                console.log('Got response ');
                res.json(response.data);
                if (config.method.toLowerCase() === 'get') {
                    console.log('Cache GET response');
                    cache.set(url, response.data);
                }
            })
            .catch(error => {
                console.log('Got error');
                if (error.response) {
                    res.status(error.response.status).json(error.response.data);
                } else {
                    res.status(500).json({error: error.message});
                }
            });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at :${port}`)
});
