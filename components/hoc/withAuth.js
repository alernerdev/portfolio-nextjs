import React from 'react';

import BaseLayout from '../layouts/BaseLayout';
import BasePage from '../BasePage';

// a page is the argument
export default function (Component) {
    // return a new component which wraps the passed in component and 
    //  extends functionality
    return class withAuth extends React.Component {

        // need to implement this if the wrapped component's 
        // getInitialProps is to work
        static async getInitialProps(args) {
            // if component has getInitialProps method, execute it
            const pageProps = await Component.getInitialProps &&
                                await Component.getInitialProps(args);

            return {...pageProps};
        }

        renderProtectedPage() {
            const { isAuthenticated } = this.props.auth;

            if (isAuthenticated) {
                // render whatever component does by default  
                // need to pass in whatever props the component page would have
                // recieved if it wasnt wrapped
                return <Component {...this.props} />
            }

            return <BaseLayout {...this.props.auth}>
                <BasePage>
                    <p>Please login to view this page</p>
                </BasePage>
            </BaseLayout>
        }

        render() {
            return this.renderProtectedPage();
        }
    }

}