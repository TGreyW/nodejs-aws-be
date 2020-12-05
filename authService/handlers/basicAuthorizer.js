'use strict';

const auth = require('basic-auth');

function generatePolicy(principalId, resource, effect) {
    return {
        principalId: principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                }
            ],
        }
    }
}

module.exports = async (event) => {
    if (event['type'] !== 'TOKEN') {
        throw new Error('Unauthorized');
    }

    try {
        const { name: login, pass : password } = auth.parse(event.authorizationToken);
        if (process.env[login] === password) {
            return generatePolicy('import', event.methodArn, 'Allow');
        } else {
            return generatePolicy('import', event.methodArn, 'Deny');
        }
    } catch (e) {
        console.log(e);

        throw new Error('Unauthorized');
    }
};
