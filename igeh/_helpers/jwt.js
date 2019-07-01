const jwt=require('jsonwebtoken');
const config = require('../config');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate'
        ]
    });
}