// src/Auth/Auth.js

import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

class Auth0 {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: 'dev-5qh4nzo3.auth0.com',
            clientID: 'zvoi30OJb6Np2YGS3NR1Y1rTVTJJDvbx',
            redirectUri: 'http://localhost:3000/callback',
            responseType: 'token id_token',
            scope: 'openid profile'
        });

        this.login = this.login.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.logout = this.logout.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    this.setSession(authResult);
                    resolve();
                } else if (err) {
                    console.log(err);
                    reject(err);
                }
            });
        });
    }

    setSession(authResult) {
        // Set the time that the access token will expire at
        const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        //this.accessToken = authResult.accessToken;
        Cookies.set('user', authResult.idTokenPayload)
        Cookies.set('jwt', authResult.idToken);
        Cookies.set('expiresAt', expiresAt);    
    }

    logout() {
        Cookies.remove('user');
        Cookies.remove('jwt');
        Cookies.remove('expiresAt');    

        this.auth0.logout({
            returnTo: '',
            clientID: 'zvoi30OJb6Np2YGS3NR1Y1rTVTJJDvbx'
        });
    }

    async clientAuth() {
        const token = Cookies.getJSON('jwt');
        const verifiedToken = await this.verifyToken(token);

        return verifiedToken;
    }

    // get my key set from my domain at auth0
    async getJWKS() {
        const res = await axios.get('https://dev-5qh4nzo3.auth0.com/.well-known/jwks.json');
        const jwks = res.data;
        // set of public keys used to verify the token
        return jwks;
    }

    async verifyToken(token) {
        if (!token) {
            return undefined;
        }

        const decodedToken = jwt.decode(token, {complete: true});
        const jwks = await this.getJWKS();
        const jwk = jwks.keys[0];

        // BUILD CERTIFICATE
        let cert = jwk.x5c[0];
        cert = cert.match(/.{1,64}/g).join('\n');
        cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

        if (jwk.kid === decodedToken.header.kid) {
            try {
                const verifiedToken = jwt.verify(token, cert);
                const expiresAt = verifiedToken.exp * 1000;
                return (verifiedToken && new Date().getTime() < expiresAt ? verifiedToken : undefined);
            } catch (err) {
                return undefined;
            }
        }

        return undefined;
    }

    async serverAuth(req) {
        if (req.headers.cookie) {
            const tokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));
            if (!tokenCookie)
                return undefined;

            const token = tokenCookie.split('=')[1];
            const verifiedToken = await this.verifyToken(token);

            return verifiedToken;
        } else {
            console.log("no cookies in the req -- no authentication");
            return undefined;
        }
    }
}

const auth0Client = new Auth0();
export default auth0Client; 