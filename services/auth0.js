// src/Auth/Auth.js

import auth0 from 'auth0-js';
import Cookies from 'js-cookie';

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
        this.isAuthenticated = this.isAuthenticated.bind(this);
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

    // this is client side auth thats running in the browser
    isAuthenticated() {
        const expiresAt = Cookies.getJSON('expiresAt');
        return (new Date().getTime() < expiresAt);
    }

    clientAuth() {
        return this.isAuthenticated();
    }

    serverAuth(req) {
        if (req.headers.cookies) {
            const expiresAtCookie = req.headers.split(';').find(c => c.trim().startsWith('expiresAt='));
            if (!expiresAtCookie)
                return undefined;

            const expiresAt = expiresAtCookie.split('=')[1];
            return (new Date().getTime() < expiresAt);
        }
    }
}

const auth0Client = new Auth0();
export default auth0Client;