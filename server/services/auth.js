// express-jwt Middleware validates JsonWebTokens and sets req.user
const jwt = require('express-jwt');

//jwks-rsa Library to retrieve RSA signing keys from a JWKS (JSON Web Key Set) endpoint
const jwksRSA = require('jwks-rsa');

// MIDDLEWARE

// what we do here is similar to what we do in verifyToken function
exports.checkJWT = jwt({
    secret: jwksRSA({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: 'https://dev-5qh4nzo3.auth0.com/.well-known/jwks.json'
    }),
    audience: 'zvoi30OJb6Np2YGS3NR1Y1rTVTJJDvbx', // clientID
    issuer: 'https://dev-5qh4nzo3.auth0.com', // domain
    algorithms: ['RS256']
})