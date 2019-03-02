// src/Auth/Auth.js

import auth0 from 'auth0-js';

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

    setSession() {
        // save tokens
    }
}

const auth0Client = new Auth0();
export default auth0Client;