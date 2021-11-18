// using -> express-jwt (npm i express-jwt)
const expressJwt = require('express-jwt');

function authjwt() {
    const secret = process.env.secret;
    const api = process.env.api;
    return expressJwt({ secret, algorithms: ['HS256'],isRevoked: isRevoked }).unless({
        path: [

            // public routes that don't require authentication
            // { url: `${api}/products`, methods: ['GET','OPTIONS'] },
            { url: /\/resources\/uploads(.*)/, methods: ['GET','OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET','OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['GET','OPTIONS'] },
            '/api/v1/users/login',
            '/api/v1/users/register'
            ]
    });

}

async function isRevoked(req, payload, done) {
    // revoke token if user not admin
    if (!payload.isAdmin) {
        return done(null, true);
    }
    done();
};


module.exports = authjwt;

