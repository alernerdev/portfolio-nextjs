import React from 'react';
import App, { Container } from 'next/app';
import auth0 from '../services/auth0';

// this is a wrapper component for all of the pages
// I am overriding this so I can specify styling in the proper order

// styles: my styles override whats in bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';

class MyApp extends App {

    /* this function is executed on client and server for every page*/
    static async getInitialProps({ Component, Router, ctx }) {
        let pageProps = {};
        const isAuthenticated = process.browser ? auth0.clientAuth() : auth0.serverAuth(ctx.req);

        // if the page/component this wrapper is wrapping has getInitialProps 
        // defined, then call it
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        )
    }
}

export default MyApp;